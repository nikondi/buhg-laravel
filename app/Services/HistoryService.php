<?php

namespace App\Services;

use App\Helpers\RequestFormatter;
use App\Mail\RequestChangedMail;
use App\Models\History;
use App\Models\RequestModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class HistoryService
{
    public function __construct()
    {
    }

    public static function exceptFields(): array
    {
        return [
            'id', 'uuid',
            'director_id', 'organization_id',
            'changes_count', 'files'
        ];
    }

    /**
     * @param array<int>|int $histories
     */
    public static function send(RequestModel $request, array|int $histories, ?string $comment): bool
    {
        if (!is_array($histories))
            $histories = [$histories];

        $histories = History::query()
            ->whereIn('id', $histories)
            ->orderBy('created_at')
            ->get();

        $except = static::exceptFields();

        try {
            $send_comment = null;
            $body = [];
            foreach ($histories as $history) {
                foreach ($history->body as $key => $value) {
                    if (!in_array($key, $except)) {
                        $old_value = isset($body[$key])
                            ? $body[$key]['old_value']
                            : (isset($history->old_body[$key])
                                ? RequestFormatter::formatValue($key, $history->old_body[$key])
                                : ''
                            );

                        $body[$key] = [
                            'value' => RequestFormatter::formatValue($key, $value),
                            'old_value' => $old_value,
                            'label' => trans_df('request.changed.' . $key, default: $key),
                        ];

                        if(!empty($history->comment))
                            $send_comment = $history->comment;
                    }
                }
            }
            if(!is_null($comment))
                $send_comment = $comment;

            Mail::to($request->email)->send(new RequestChangedMail($request, $body, $send_comment));
            History::whereIn('id', $histories->pluck('id'))->update(['sended' => true]);
        }
        catch (\Throwable $e) {
            Log::channel('requests')
                ->error(sprintf(
                    "Error send history #%d: %s in %s:%s",
                    $request->id,
                    $e->getMessage(),
                    $e->getFile(),
                    $e->getLine()
                ));
            return false;
        }
        return true;
    }
}
