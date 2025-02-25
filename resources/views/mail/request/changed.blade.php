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
        max-width: 800px;
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
</style>
<div class="body">
    <table>
        <tbody>
        <tr>
            <th colspan="3">Изменения</th>
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
</div>
