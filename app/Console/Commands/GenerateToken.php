<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class GenerateToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'token:generate
        {user_id : ID пользователя}
        {type=api : Тип авторизации}
        {--clear : Удалить предыдущий токен}
        {--years= : Время жизни токена, лет}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Создание api-токена для интеграции с внешними приложениями';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $user_id = $this->argument('user_id');
        $user = User::find($user_id);
        if($user === null)
            $user = User::where('login', $user_id)->first();

        if($user === null) {
            $this->error('Пользователь не найден');
            return;
        }

        if($this->option('clear'))
            $user->tokens()->delete();

        $expires = null;
        if($this->option('years'))
            $expires = now()->addYears($this->option('years'));

        $this->info('Token: '.$user->createToken($this->argument('type'), ['*'], $expires)->plainTextToken);
    }
}
