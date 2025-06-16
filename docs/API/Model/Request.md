# # Request
Заявка

## Properties

| Поле                   | Тип                                   | Описание                                                        | Заметки    |
|------------------------|---------------------------------------|-----------------------------------------------------------------|------------|
| **number**             | **int**                               | Номер заявки. Генерируется, если не передан                     | [optional] |
| **director_id**        | **int**                               | ID ответственного                                               | [optional] |
| **organization_id**    | **int**                               | ID организации                                                  | [optional] |
| **status**             | **[RequestStatus](RequestStatus.md)** | Статус заявки                                                   |            |
| **education_type**     | **[EducationType](EducationType.md)** | Вид обучения                                                    |            |
| **pickup_type**        | **[PickupType](PickupType.md)**       | Вид получения                                                   |            |
| **surname**            | **string**                            | Фамилия плательщика                                             |            |
| **name**               | **string**                            | Имя плательщика                                                 |            |
| **lastname**           | **string**                            | Отчество плательщика                                            | [optional] |
| **phone**              | **string**                            | Номер телефона плательщика                                      |            |
| **email**              | **string**                            | E-mail плательщика                                              |            |
| **birthdate**          | **[string (date)](StringDate.md)**    | Дата рождения плательщика                                       |            |
| **inn**                | **float**                             | ИНН плательщика                                                 |            |
| **doc_type**           | [**DocType**](DocType.md)             | Код документа                                                   |            |
| **doc_number**         | **string**                            | Номер документа                                                 |            |
| **doc_date**           | **[string (date)](StringDate.md)**    | Дата выдачи документа                                           |            |
| **contract_number**    | **string**                            | Номер договора                                                  |            |
| **contract_date**      | **[string (date)](StringDate.md)**    | Дата договора                                                   |            |
| **contract_cost**      | **float**                             | Сумма расходов на оказанные услуги                              |            |
| **report_year**        | **float**                             | Отчетный год                                                    |            |
| **same_student**       | **bool**                              | Налогоплательщик и обучаемый являются одним лицом               | [optional] |
| **student_surname**    | **string**                            | Фамилия студента                                                | [optional] |
| **student_name**       | **string**                            | Имя студента                                                    | [optional] |
| **student_lastname**   | **string**                            | Отчество студента                                               | [optional] |
| **student_phone**      | **string**                            | Номер телефона студента                                         | [optional] |
| **student_birthdate**  | **[string (date)](StringDate.md)**    | Дата рождения студента                                          | [optional] |
| **student_inn**        | **float**                             | ИНН студента                                                    | [optional] |
| **student_doc_type**   | [**DocType**](DocType.md)             | Код документа                                                   | [optional] |
| **student_doc_number** | **string**                            | Номер документа                                                 | [optional] |
| **student_doc_date**   | **[string (date)](StringDate.md)**    | Дата выдачи документа                                           | [optional] |
| **files**              | **Массив файлов**                     | Чеки об оплате. Только для `application/x-www-form-urlencoded`  | [optional] |

[[Вернуться к моделям]](../../API.md#модели)
