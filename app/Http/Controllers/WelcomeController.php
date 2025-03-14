<?php

namespace App\Http\Controllers;

use App\Enums\RequestStatus;
use App\Http\Resources\RequestRowResource;
use App\Models\RequestModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $years = RequestModel::query()->orderByDesc('report_year')->distinct()->select('report_year')->pluck('report_year');
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
                'years' => $years->map(fn($year) => ['key' => $year, 'value' => $year]),
                'statuses' => collect(RequestStatus::cases())->mapWithKeys(fn(RequestStatus $item) => [$item->value => $item->shortLabel()]),
                'filters' => fn() => collect(['search', 'year', 'status'])->mapWithKeys(fn($key) => [$key => $request->get($key, '')]),
            ]);
    }

    protected function getSearchQuery(Request $request, string $query = 'search'): string
    {
        return $request->str($query)->trim()->toString();
    }
}
