<?php

namespace App\Http\Controllers\Api;

use App\Helpers\DocFormatter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RequestCreateRequest;
use App\Mail\RequestCreatedMail;
use App\Models\RequestModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class RequestController extends Controller
{
    public function store(RequestCreateRequest $request)
    {
        $data = $request->validated();

        $data['doc_number'] = DocFormatter::from($data['doc_type'], $data['doc_number']);

        if(!empty($data['student_doc_type']) && !empty($data['student_doc_number']))
            $data['student_doc_number'] = DocFormatter::from($data['student_doc_type'], $data['student_doc_number']);

        if(empty($data['student_surname']))
            $data['same_student'] = true;

        $requestModel = RequestModel::create($data);

        try {
            foreach (config('mail.admin_email') as $email) {
                Mail::to($email)->send(new RequestCreatedMail($requestModel));
            }
        }
        catch (Throwable $e) {
            Log::channel('requests')
                ->error(sprintf('Error sending request #%s: %s', $requestModel->number, $e->getMessage()));
        }

        $files = $request->file('files', []);

        $file_names = [];
        $not_uploaded = [];

        try {
            foreach ($files as $file) {
                $filename = $file->getClientOriginalName();
                if($file->storeAs($requestModel->id, $filename, 'requests'))
                    $file_names[] = $filename;
                else
                    $not_uploaded[] = $file;
            }
        }
        catch (Throwable $e) {
            Log::channel('requests')
                ->error(sprintf('Error upload files #%s: %s', $requestModel->number, $e->getMessage()));
        }

        if(!empty($not_uploaded)) {
            foreach ($not_uploaded as $file) {
                Log::channel('requests')
                    ->error(sprintf('Error upload file #%s: %s', $requestModel->number, $file->getClientOriginalName().' ('.$file->getError().'): '.$file->getSize()));
            }
        }

        $requestModel->update(['files' => empty($file_names)?null:array_filter($file_names, fn($item) => is_string($item))]);

        return response()->json([
            'success' => true,
        ]);
    }
}
