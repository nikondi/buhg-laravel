@if($request->number != $old_request->number)
Новый номер: #{{ $request->number }}
@endif
@if($request->status != $old_request->status)
Новый статус: #{{ $request->status->label() }}
@endif
@if(!empty($history->comment))
Комментарий:
{{ $history->comment }}
@endif
