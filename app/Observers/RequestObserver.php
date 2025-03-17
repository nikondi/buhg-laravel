<?php

namespace App\Observers;

use App\Models\RequestModel;
use App\Traits\TracksHistory;

class RequestObserver
{
    use TracksHistory;

    public function created(RequestModel $requestModel): void
    {
        if(!$requestModel->number) {
            $requestModel->number = str_pad($requestModel->id, 12, "0", STR_PAD_LEFT);
            $requestModel->save();
        }
    }

    public function updating(RequestModel $requestModel): void
    {
        if(!$requestModel->number) {
            $requestModel->number = str_pad($requestModel->id, 12, "0", STR_PAD_LEFT);
        }
        $this->track($requestModel, comment: request()->get('comment', null));
    }
}
