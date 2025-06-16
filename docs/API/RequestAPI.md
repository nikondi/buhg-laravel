# RequestAPI

Все пути относительно *http://{APP_URL}/api*

| Метод                                              | HTTP request      | Описание       |
|----------------------------------------------------|-------------------|----------------|
| [**createRequest()**](RequestAPI.md#createRequest) | **POST** /request | Создать заявку |


## `createRequest()`

### Формат тела запроса

[**Заявка**](Model/Request.md)

### Возвращаемые значения

- [**200 ответ сервера на создание заявки**](Model/CreateRequest200Response.md)
- [**Ошибка**](Model/Error.md)

### Авторизация

[Bearer-токен](../API.md#авторизация)

### HTTP заголовки

- **Content-Type**: `application/json`, `application/x-www-form-urlencoded`
- **Accept**: `application/json`
