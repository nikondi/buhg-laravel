<?php

namespace App\Http\Controllers;

use App\DTO\KeyValueDTO;
use App\Enums\DocumentType;
use App\Enums\RequestStatus;
use App\Http\Requests\RequestUpdateRequest;
use App\Http\Resources\HistoryResource;
use App\Http\Resources\RequestResource;
use App\Models\Director;
use App\Models\History;
use App\Models\Organization;
use App\Models\RequestModel;

class RequestController extends Controller
{
    public function destroy(RequestModel $request)
    {
        $request->delete();

        return back();
    }

    public function edit(RequestModel $request) {
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
        $request->update($_request->except('comment'));

        History::create([
            'request_id' => $request->id,
            'user_id' => $_request->user()->id,
            'comment' => $_request->get('comment'),
        ]);

        return back();
    }

    public function history($request) {
        $history = History::query()
            ->where('request_id', $request)
            ->get();

        return HistoryResource::collection($history);
    }
}
