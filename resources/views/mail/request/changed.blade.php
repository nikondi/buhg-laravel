<style>
    p,
    pre {
        font-family: sans-serif;
        font-size: 16px;
    }
</style>

@if($request->number != $old_request->number)
    <p><b>Новый номер:</b> #{{ $request->number }}</p>
@endif
@if($request->status != $old_request->status)
    <p><b>Новый статус:</b> #{{ $request->status->label() }}</p>
@endif
@if(!empty($history->comment))
    <p><b>Комментарий:</b></p>
    <pre>{{ $history->comment }}</pre>
@endif
