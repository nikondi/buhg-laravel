# Установка
## Локальная разработки / разворачивание через Docker

1. Клонировать репозиторий
   ```shell
   git clone https://github.com/nikondi/buhg-laravel.git
    ```

2. Перейти в директорию приложения

3. Скопировать файл `.env.example` в `.env` и [сконфигурировать](CONFIG.md) приложение в файле `.env`. 
Для локальной разработки не обязательно изменять параметры. 

4. Установить зависимости Composer
    ```shell
    docker compose exec backend composer install
    ```

5. Сгенерировать ключ приложения
    ```shell
   docker compose exec backend php artisan key:generate
   ```

6. Мигрировать структуру [базы данных](DATABASE.md)
    ```shell
   docker compose exec backend php artisan migrate
   ```

Приложение будет доступно по адресу http://localhost

## Установка на сервер

1. Установить и настроить Nginx/Apache (конкретно для Laravel) + MeiliSearch согласно официальным документациям  
    **Важно** Входная точка приложения (index.php) находится в директории `public/`

2. Выполнить пункты 1-3 из локальной разработки

3. Установить [Composer](https://getcomposer.org/) и установить зависимости приложения
    ```shell
    composer install
    ```

4. Сгенерировать ключ приложения
    ```shell
    php artisan key:generate
    ```

5. Установить зависимости Node.js для сборки фронтенда и собрать
    ```shell
    npm install && npm run build
    ```

6. Мигрировать структуру [базы данных](DATABASE.md)
    ```shell
   php artisan migrate
   ```

# ! Важно
При обновлении приложения через `git pull` в обоих методах установки требуется выполнить миграцию (п. 6) и
установить зависимости Composer (п.4 и п.3 соотв.), а также выполнить п.5 при разворачивании на сервере

Для выполнения команд в контейнерах Docker (`backend`, `node`, `db`) используется префикс команд
`docker compose exec {container}`. Также можно зайти в консоль `backend` и `node` командой
```shell
docker compose exec {container} bash
```
