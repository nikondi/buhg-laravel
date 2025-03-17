<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'text' => 'required',
            'request_id' => 'required|numeric'
        ]);
        $request->user()->comments()->create($data);
        return back();
    }

    public function destroy(int $comment, Request $request)
    {
        $request->user()->comments()->where('id', $comment)->delete();
        return ['success' => true];
    }
}
