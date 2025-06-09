<?php

namespace App\Observers;

use App\Models\RequestModel;
use App\Traits\TracksHistory;

class RequestObserver
{
    use TracksHistory;

    public function creating(RequestModel $requestModel): void
    {
        if(!$requestModel->number)
            $requestModel->number = str_pad($this->getLastNumber() + 1, 12, "0", STR_PAD_LEFT);
    }

    public function updating(RequestModel $requestModel): void
    {
        if(!$requestModel->number) {
            $requestModel->number = str_pad($this->getLastNumber() + 1, 12, "0", STR_PAD_LEFT);
        }
        if(request()->user()?->login != 'site')
            $this->track($requestModel, comment: request()->get('comment', null));
    }

    public function getLastNumber(): int {
        return RequestModel::selectRaw("coalesce(number::int, 0) as trimmed_number")->orderByDesc('trimmed_number')->first()->trimmed_number ?? 0;
    }
}
