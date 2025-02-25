<?php

namespace App\Http\Controllers;

use App\DTO\KeyValueDTO;
use App\Enums\DocumentType;
use App\Enums\RequestStatus;
use App\Helpers\DocFormatter;
use App\Http\Requests\RequestUpdateRequest;
use App\Http\Resources\HistoryResource;
use App\Http\Resources\RequestResource;
use App\Http\Resources\RequestShowResource;
use App\Mail\RequestChangedMail;
use App\Models\Director;
use App\Models\History;
use App\Models\Organization;
use App\Models\RequestModel;
use Illuminate\Support\Facades\Mail;

class RequestController extends Controller
{
    public function destroy(RequestModel $request)
    {
        $request->delete();

        return back();
    }

    public function edit(RequestModel $request) {
        $request->loadCount('history');
        $directors = Director::all();
        $organizations = Organization::all();
        $documents = DocumentType::getLabels();
        $statuses = RequestStatus::cases();

        return page()
            ->title('Запрос #'.$request->id)
            ->render('Request/Edit', [
                'request' => new RequestResource($request),
                'directors' => KeyValueDTO::collection($directors, 'id', fn(Director $director) => "{$director->surname} {$director->name} {$director->lastname}"),
                'organizations' => KeyValueDTO::collection($organizations, 'id', 'name'),
                'documents' => array_map(fn($key, $value) => compact('key', 'value'), array_keys($documents), $documents),
                'statuses' => KeyValueDTO::collection($statuses, 'value', fn(RequestStatus $status) => $status->label())
            ]);
    }

    public function update(RequestModel $request, RequestUpdateRequest $_request) {
        $data = $_request->except(['comment', 'save_history']);

        $data['doc_number'] = DocFormatter::from($data['doc_type'], $data['doc_number']);
        if($data['student_doc_type'] && $data['student_doc_number'])
            $data['student_doc_number'] = DocFormatter::from($data['student_doc_type'], $data['student_doc_number']);

        $request->fill($data);

//        $history = History::create([
//            'request_id' => $request->id,
//            'user_id' => $_request->user()->id,
//            'comment' => $_request->get('comment'),
//        ]);

        if($_request->get('save_history')) {
            if(!empty($request->email) && $request->isDirty()) {
                Mail::to($request->email)->send(new RequestChangedMail($request, $_request->get('comment')));
            }
        }

        $request->save();

        return back();
    }

    public function show(RequestModel $request)
    {
        $request->load(['organization', 'director'])
            ->loadCount('history');

        return response()
            ->json(new RequestShowResource($request));
    }

    public function history($request) {
        $history = History::query()
            ->where('request_id', $request)
            ->orderBy('created_at', 'desc')
            ->get();

        return HistoryResource::collection($history);
    }
}
