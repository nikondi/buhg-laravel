<?php

namespace App\Http\Controllers;

use App\DTO\KeyValueDTO;
use App\Enums\DocumentType;
use App\Http\Requests\RequestUpdateRequest;
use App\Http\Resources\RequestResource;
use App\Models\Director;
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

        return page()
            ->title('Запрос #'.$request->id)
            ->render('Request/Edit', [
                'request' => new RequestResource($request),
                'directors' => KeyValueDTO::collection($directors, 'id', fn(Director $director) => "{$director->surname} {$director->name} {$director->lastname}"),
                'organizations' => KeyValueDTO::collection($organizations, 'id', 'name'),
                'documents' => array_map(fn($key, $value) => compact('key', 'value'), array_keys($documents), $documents),
            ]);
    }

    public function update(RequestModel $requestModel, RequestUpdateRequest $request) {
        $requestModel->update($request->except('comment'));

        return back();
    }
}
