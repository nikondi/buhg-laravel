<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogApiRequests
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $data = $request->all();

        $channel = $request->routeIs('api.request.*')?'requests':'default';

        Log::channel($channel)->info("API Request: {$request->method()}, {$request->fullUrl()}", [
            'headers' => $request->headers->all(),
            'body' => $data,
        ]);

        $response = $next($request);

        // Log the response
        Log::channel($channel)->{$response->getStatusCode() == 200?"info":"error"}("API Response: {$response->status()}, {$request->fullUrl()}", [
            'headers' => $response->headers->all(),
            'body' => $response->getStatusCode() == 500?(json_decode($response->getContent(), JSON_OBJECT_AS_ARRAY)['message'] ?? $response->getContent()):$response->getContent(),
        ]);

        return $response;
    }
}
