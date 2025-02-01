<?php

namespace App\Http\Controllers;

use App\Models\RequestModel;

class RequestController extends Controller
{
    public function destroy(RequestModel $request)
    {
        $request->delete();

        return back();
    }
}
