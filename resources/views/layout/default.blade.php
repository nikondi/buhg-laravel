<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $title ?? config('app.name') }}</title>

    @vite(['resources/css/app.scss', 'resources/js/app.ts'])
</head>
<body class="font-sans antialiased">
    <div class="page-wrapper">
        @include('parts.header')
        <div class="page-content">
            @yield('content')
        </div>
    </div>
</body>
</html>
