<?php

namespace App\Http\Controllers;

use App\DTO\KeyValueDTO;
use App\Enums\DocumentType;
use App\Enums\RequestStatus;
use App\Helpers\DocFormatter;
use App\Http\Requests\RequestUpdateRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\HistoryResource;
use App\Http\Resources\RequestResource;
use App\Http\Resources\RequestRowResource;
use App\Http\Resources\RequestShowResource;
use App\Mail\RequestChangedMail;
use App\Models\Director;
use App\Models\Comment;
use App\Models\History;
use App\Models\Organization;
use App\Models\RequestModel;
use App\Services\HistoryService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class RequestController extends Controller
{
    public function index(Request $request)
    {
        return page()
            ->title('Главная')
            ->render('Welcome', [
                'requests' => Inertia::defer(function() use ($request) {
                    $search = $this->getSearchQuery($request);

                    if(!empty($search)) {
                        $query = RequestModel::search($search)
                            ->query(function (Builder $builder) use ($request) {
                                /* @var Builder|RequestModel $builder */
                                return $builder
                                    ->filtered($request)
                                    ->ordered();
                            });
                    }
                    else {
                        $query = RequestModel::query()
                            ->ordered()
                            ->filtered($request);
                    }

                    $requests = $query
                        ->paginate(30)
                        ->withQueryString();


                    if(!empty($search)) {
                        $requests->each(function(RequestModel $requestModel) use ($search) {
                            $requestModel->highlightAttributes($search, [
                                'name', 'surname', 'inn'
                            ]);
                        });
                    }

                    return RequestRowResource::collection($requests);
                }),
                'years' => function() {
                    $years = RequestModel::query()->orderByDesc('report_year')->distinct()->select('report_year')->pluck('report_year');
                    return $years->map(fn($year) => ['key' => $year, 'value' => $year]);
                },
                'statuses' => fn() => collect(RequestStatus::cases())->mapWithKeys(fn(RequestStatus $item) => [$item->value => $item->shortLabel()]),
                'filters' => fn() => collect(['query', 'year', 'status'])->mapWithKeys(fn($key) => [$key => $request->get($key, '')]),
            ]);
    }

    protected function getSearchQuery(Request $request, string $query = 'query'): string
    {
        return $request->str($query)->trim()->toString();
    }

    public function destroy(RequestModel $request)
    {
        $request->delete();

        return back();
    }

    public function edit(RequestModel $request) {
        $request->loadCount('comments');
        $statuses = RequestStatus::cases();

        return page()
            ->title('Запрос #'.$request->id)
            ->render('Request/Edit', [
                'request' => fn() => new RequestResource($request),
                'directors' => fn() => KeyValueDTO::collection(Director::all(), 'id', fn(Director $director) => "{$director->surname} {$director->name} {$director->lastname}"),
                'organizations' => fn() =>  KeyValueDTO::collection(Organization::all(), 'id', 'name'),
                'documents' => function () {
                    $documents = DocumentType::getLabels();
                    return array_map(fn($key, $value) => compact('key', 'value'), array_keys($documents), $documents);
                },
                'statuses' => fn() => KeyValueDTO::collection($statuses, 'value', fn(RequestStatus $status) => $status->label()),
                'comments' => Inertia::defer(function () use ($request) {
                    $comments = $request->comments()
                        ->orderByDesc('created_at')
                        ->get();

                    return CommentResource::collection($comments);
                }),
                'history' => Inertia::optional(fn() => HistoryResource::collection($request->history()->orderByDesc('created_at')->get()))
            ]);
    }

    public function update(RequestModel $request, RequestUpdateRequest $_request) {
        $data = $_request->except(['comment', 'save_history']);

        $data['doc_number'] = DocFormatter::from($data['doc_type'], $data['doc_number']);
        if($data['student_doc_type'] && $data['student_doc_number'])
            $data['student_doc_number'] = DocFormatter::from($data['student_doc_type'], $data['student_doc_number']);

        $request->fill($data);
        $is_dirty = $request->isDirty();
        $request->save();

        if($_request->get('save_history')) {
            if(!empty($request->email)) {
                if($is_dirty) {
                    $history = $request->history()->oldest('id')->first();
                    HistoryService::send($request, $history->id, $_request->get('comment'));
                }
                else if(!empty($_request->get('comment'))) {
                    $history = $request->history()->create([
                        'old_body' => [],
                        'body' => [],
                        'comment' => $_request->get('comment'),
                    ]);
                    HistoryService::send($request, $history->id, $_request->get('comment'));
                }
            }
        }

        return back();
    }

    public function show(RequestModel $request)
    {
        $request->load(['organization', 'director'])
            ->loadCount('comments');

        return response()
            ->json(new RequestShowResource($request));
    }

    public function sendHistory(Request $httpRequest, RequestModel $request)
    {
        $data = $httpRequest->validate([
            'histories' => 'array',
            'comment' => 'nullable'
        ]);

        $success = HistoryService::send($request, $data['histories'], $data['comment']);

        return response()
            ->json(['success' => $success]);
    }
}
