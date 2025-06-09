<?php

namespace App\Console\Commands;

use App\DTO\CreateUserDTO;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Validation\ValidationException;

class CreateUserCommand extends Command
{
    protected $signature = 'user:create';

    protected $description = 'Создание суперпользователя, не привязанного к LDAP';

    /**
     * @throws \Throwable
     */
    public function handle(): void
    {
        $data = [];

        $data['email'] = $this->ask('E-mail');
        $data['login'] = $this->ask('Логин');
        $data['name'] = $this->ask('Имя (ФИО)');

        $data['password'] = $this->secret('Пароль');
        $data['password_confirmation'] = $this->secret('Подтверждение пароля');

        $role = $this->choice('Роль', collect(UserRole::cases())->mapWithKeys(function (UserRole $role) {
            return [$role->value => $role->getLabel()];
        })->toArray(), UserRole::MANAGER->value);
        $data['role'] = UserRole::from($role);

        try {
            CreateUserDTO::validate($data);
        }
        catch (ValidationException $e) {
            foreach ($e->validator->getMessageBag()->toArray() as $error)
                foreach ($error as $message)
                    $this->error($message);

            $this->fail('Произошла ошибка при создании пользователя');
        }

        $user = User::make(CreateUserDTO::from($data));
        $user->save();

        $this->info('Пользователь #'.$user->id.' ('.$data['login'].') создан');
    }

}
