<?php

namespace App\Observers;

use App\Models\RequestModel;

class RequestObserver
{
    public function created(RequestModel $requestModel): void
    {

    }

    public function updating(RequestModel $requestModel): void
    {
        if(!$requestModel->number) {
            $requestModel->number = str_pad($requestModel->id, 12, "0", STR_PAD_LEFT);
        }
    }
}
