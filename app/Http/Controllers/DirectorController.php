<?php

namespace App\Http\Controllers;

use App\Enums\DirectorType;
use App\Http\Resources\DirectorResource;
use App\Models\Director;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    public function index()
    {
        $directors = Director::all();
        $labels = collect(DirectorType::cases())->mapWithKeys(fn(DirectorType $type) => [$type->value => $type->label()]);

        return page()
            ->title('Директора ОО')
            ->render('Director/Index', [
                'directors' => DirectorResource::collection($directors),
                'labels' => $labels
            ]);
    }

    public function update(Request $request, Director $director) {
        $data = $request->validate([
            'surname' => 'required',
            'name' => 'required',
            'document' => 'required',
            'lastname' => 'nullable',
            'type' => '',
        ]);
        $director->update($data);
        return back();
    }

    public function destroy(Director $director) {
        $director->delete();
        return back();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'surname' => 'required',
            'name' => 'required',
            'document' => 'required',
            'lastname' => 'nullable',
            'type' => '',
        ]);

        Director::create($data);

        return back();
    }
}
