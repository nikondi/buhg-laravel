<?php

namespace App\Http\Controllers;

use App\Enums\RequestStatus;
use App\Http\Resources\RequestRowResource;
use App\Models\RequestModel;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = RequestModel::query()
            ->orderByRaw("(case status
              when 'new' then 1
              when 'in_work' then 2
              when 'ready_pickup' then 3
              when 'duplicate' then 4
              when 'downloaded_xml' then 5
              when 'done' then 6
              when 'declined' then 7
              ELSE 8
              end)")
            ->orderBy('created_at');

        $filters = $request->validate([
            'status' => 'nullable',
            'year' => 'nullable',
//            'search' => 'nullable',
        ]);
        $filters = array_map(fn($item) => $item === null?'':$item, $filters);

        if(!empty($filters['status']))
            $query->where('status', $filters['status']);
        if(!empty($filters['year']))
            $query->where('report_year', $filters['year']);

        $requests = $query->paginate(30)
            ->withQueryString();

        $years = RequestModel::query()->distinct()->select('report_year')->pluck('report_year');
        return page()
            ->title('Главная')
            ->render('Welcome', [
                'requests' => RequestRowResource::collection($requests),
                'years' => $years->map(fn($year) => ['key' => $year, 'value' => $year]),
                'statuses' => collect(RequestStatus::cases())->mapWithKeys(fn(RequestStatus $item) => [$item->value => $item->shortLabel()]),
                'filters' => $filters,
            ]);
    }
}
