Комментарий:
{{ $comment }}
@if(!empty($dirty))
@foreach($dirty as $key => $item)
{{ $item['label'] }}
    Старое значение: {{ $item['old_value'] }}
    Новое значение:  {{ $item['value'] }}

@endforeach
@endif
