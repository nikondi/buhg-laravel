@extends('layout.default')

@section('content')
    <div class="h-full flex p-2 items-center justify-center">
        <div class="p-4 w-[350px] border border-gray-300 rounded-md">
            <form class="form" method="post" action="{{ route('login.handle') }}">
                <x-form.input name="login" label="Логин"/>
                <x-form.input name="password" label="Пароль" type="password"/>
                @csrf
                <x-form.button type="submit" class="mt-5">Войти</x-form.button>
            </form>
        </div>
    </div>
@endsection
