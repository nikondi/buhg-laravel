<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationResource;
use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function index()
    {
        $organizations = Organization::all();
        return page()
            ->title('Организации')
            ->render('Organization/Index', [
                'organizations' => OrganizationResource::collection($organizations),
            ]);
    }

    public function update(Request $request, Organization $organization) {
        $data = $request->validate([
            'name' => 'required',
            'inn' => 'digits_between:10,12|unique:organizations,inn,' . $organization->id,
            'kpp' => 'digits:9',
        ]);
        $organization->update($data);
        return back();
    }

    public function destroy(Organization $director) {
        $director->delete();
        return back();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'short_name' => 'required',
            'inn' => 'digits_between:10,12|unique:organizations,inn',
            'kpp' => 'digits:9',
        ]);

        Organization::create($data);

        return back();
    }
}
