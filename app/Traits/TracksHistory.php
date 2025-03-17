<?php

namespace App\Traits;

use App\Interfaces\HasHistoryInterface;
use Illuminate\Support\Collection;

trait TracksHistory
{
    protected function track(HasHistoryInterface $model, callable $func = null, $table = null, $id = null, $comment = null): void
    {
        // Allow for overriding of table if it's not the model table
        $table = $table ?: $model->getTable();
        // Allow for overriding of id if it's not the model id
        $id = $id ?: $model->getKey();
        // Allow for customization of the history record if needed
        $func = $func ?: [$this, 'formatField'];

        // Get the dirty fields and run them through the custom function, then insert them into the history table
        $fields = $this->getUpdated($model)
            ->mapWithKeys(fn($value, $field) => [$field => call_user_func_array($func, [$value, $field])]);

        $old_body = [];
        foreach ($fields as $key => $value)
            $old_body[$key] = $model->getOriginal($key);

        $model->history()->create([
            'reference_table' => $table,
            'reference_id' => $id,
            'user_id' => auth()->id(),
            'body' => $fields,
            'old_body' => $old_body,
            'comment' => $comment
        ]);
    }

    protected function formatField($value, $field): mixed
    {
        return $value;
    }

    protected function getUpdated($model): Collection
    {
        return collect($model->getDirty())->filter(fn($value, $key) => !in_array($key, ['created_at', 'updated_at']));
    }
}
