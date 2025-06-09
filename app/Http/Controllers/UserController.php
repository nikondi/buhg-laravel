<?php

namespace App\Http\Controllers;

use App\DTO\CreateUserDTO;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return page()
            ->title('Пользователи')
            ->render('User/Index', [
                'users' => UserResource::collection(User::all())
            ]);
    }

    public function edit(User $user)
    {
        return page()
            ->title('Пользователь '.$user->name)
            ->render('User/Edit', [
                'user' => new UserResource($user)
            ]);
    }

    public function destroy(User $user) {
        $user->delete();
        return back();
    }

    public function store(CreateUserDTO $createUserDTO)
    {
        User::make($createUserDTO)
            ->save();

        return back();
    }
    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->validated());
        return back();
    }
}
