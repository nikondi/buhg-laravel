<?php

namespace App\Http\Controllers\Api;

use App\Helpers\DocFormatter;
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
        $data = $request->validated();

        $data['doc_number'] = DocFormatter::from($data['doc_type'], $data['doc_number']);
        if($data['student_doc_type'] && $data['student_doc_number'])
            $data['student_doc_number'] = DocFormatter::from($data['student_doc_type'], $data['student_doc_number']);

        $requestModel = RequestModel::create($data);

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
