<style>
    .body {
        font-family: sans-serif;
        font-size: 15px;
        padding: 20px 15px;
    }
    pre {
        font: inherit;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }
    td,
    th {
        border: 1px solid #dddddd;
        padding: 8px;
    }
    td:first-child {
        width: 175px;
        font-weight: 500;
        vertical-align: top;
    }
    th {
        background-color: #dddddd;
    }
    .first-row td {
        background-color: #f5f5f5;
        text-align: center;
        vertical-align: center;
        width: 33%;
    }
    .comment {
        padding: 8px;
    }
</style>
<div class="body">
    @if(!empty($comment))
        <div>
            <b>Комментарий</b>
            <pre class="comment">{{ $comment }}</pre>
        </div>
    @endif
    @if(!empty($dirty))
        <table>
            <tbody>
            <tr>
                <th colspan="3">Изменения</th>
            </tr>
            <tr class="first-row">
                <td>Поле</td>
                <td>Старое значение</td>
                <td>Новое значение</td>
            </tr>
            @foreach($dirty as $item)
                <tr>
                    <td>{{ $item['label'] }}</td>
                    <td>{{ $item['old_value'] }}</td>
                    <td>{{ $item['value'] }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    @endif
</div>
