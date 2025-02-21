<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RequestCreateRequest;
use App\Mail\RequestCreatedMail;
use App\Models\RequestModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class RequestController extends Controller
{
    public function store(RequestCreateRequest $request)
    {
        $requestModel = RequestModel::create($request->validated());

        try {
            foreach (config('mail.admin_email') as $email) {
                Mail::to($email)->send(new RequestCreatedMail($requestModel));
            }
        }
        catch (\Throwable $e) {
            Log::channel('requests')
                ->error(sprintf('Error sending request #%s: %s', $requestModel->number, $e->getMessage()));
        }

        return response()->json([
            'success' => true,
        ]);
    }
}
