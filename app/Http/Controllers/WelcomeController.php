<?php

namespace App\Http\Controllers;

use App\Enums\RequestStatus;
use App\Http\Resources\RequestRowResource;
use App\Models\RequestModel;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $requests = RequestModel::query()
            ->paginate(30);

        return page()
            ->title('Главная')
            ->render('Welcome', [
                'requests' => RequestRowResource::collection($requests),
                'labels' => collect(RequestStatus::cases())->mapWithKeys(fn(RequestStatus $item) => [$item->value => $item->label()])
            ]);
    }
}
