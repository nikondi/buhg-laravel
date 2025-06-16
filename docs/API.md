# Интеграция (API)
Интеграция осуществляется при помощи API. Документация приведена ниже, а также в формате Swagger в файле 
[swagger.yaml](API/swagger.yaml)

## API Endpoints

Все пути относительно *http://{APP_URL}/api*

| Класс        | Метод                                                | HTTP request      | Описание       |
|--------------|------------------------------------------------------|-------------------|----------------|
| *RequestAPI* | [**createRequest**](API/RequestAPI.md#createrequest) | **POST** /request | Создать заявку |

## Модели

- [Заявка](API/Model/Request.md)
- [Код документа](API/Model/DocType.md)
- [Вид обучения](API/Model/EducationType.md)
- [Вид получения](API/Model/PickupType.md)
- [Статус заявки](API/Model/RequestStatus.md)
- [Формат даты](API/Model/StringDate.md)
- [Ошибка при создании заявки](API/Model/Error.md)
- [Ответ на успешное создание заявки](API/Model/CreateRequest200Response.md)


## Авторизация

Авторизация осуществляется при помощи передачи Bearer-токена в заголовке запроса
```http request
Authorization: Bearer {токен}
```
Генерация токена осуществляется командой
```shell
php artisan token:generate {user_id}
```
где `{user_id}` - id пользователя. **Рекомендуется** для API использовать специально созданного
[локального пользователя](DATABASE.md#локальные-пользователи)  

## Пример

```json
{
  "number": 38,
  "director_id": 1,
  "organization_id": 1,
  "status": "new",
  "education_type": "full-time",
  "pickup_type": "pickup",
  "surname": "Пупкин",
  "name": "Василий",
  "lastname": "Петрович",
  "phone": "1231231212",
  "email": "example@example.ru",
  "birthdate": "2003-07-01",
  "inn": "123123123123",
  "doc_type": "21",
  "doc_number": "12 12 123123",
  "doc_date": "2020-07-10",
  "contract_number": "48-12",
  "contract_date": "2024-10-14",
  "contract_cost": 46999.99,
  "report_year": 2025,
  "same_student": true,
  "student_surname": "Васечкина",
  "student_name": "Ангелина",
  "student_lastname": "Александровна",
  "student_phone": "1231231212",
  "student_birthdate": "2003-07-01",
  "student_inn": "123123123123",
  "student_doc_type": "21",
  "student_doc_number": "12 12 123123",
  "student_doc_date": "2020-08-11",
  "files": []
}
```
