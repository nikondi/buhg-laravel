<?php

namespace App\Http\Controllers;

use App\DTO\KeyValueDTO;
use App\Enums\DocumentType;
use App\Enums\RequestStatus;
use App\Helpers\DocFormatter;
use App\Http\Requests\RequestUpdateRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\RequestResource;
use App\Http\Resources\RequestShowResource;
use App\Mail\RequestChangedMail;
use App\Models\Director;
use App\Models\Comment;
use App\Models\Organization;
use App\Models\RequestModel;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class RequestController extends Controller
{
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
                })
            ]);
    }

    public function update(RequestModel $request, RequestUpdateRequest $_request) {
        $data = $_request->except(['comment', 'save_history']);

        $data['doc_number'] = DocFormatter::from($data['doc_type'], $data['doc_number']);
        if($data['student_doc_type'] && $data['student_doc_number'])
            $data['student_doc_number'] = DocFormatter::from($data['student_doc_type'], $data['student_doc_number']);

        $request->fill($data);

        if($_request->get('save_history')) {
            if(!empty($request->email) && ($request->isDirty() || !empty($_request->get('comment')))) {
                Mail::to($request->email)->send(new RequestChangedMail($request, $_request->get('comment')));
            }
        }

        $request->save();

        return back();
    }

    public function show(RequestModel $request)
    {
        $request->load(['organization', 'director'])
            ->loadCount('comments');

        return response()
            ->json(new RequestShowResource($request));
    }

    public function history($request) {
        $history = Comment::query()
            ->where('request_id', $request)
            ->orderBy('created_at', 'desc')
            ->get();

        return CommentResource::collection($history);
    }
}
