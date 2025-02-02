import {TRequestEditPage} from "@/Features/Request/types";
import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import {Link, usePage} from "@inertiajs/react";
import {Button} from "@/Components";
import {mergeClass} from "@/helpers";
import useRequestForm, {RequestForm} from "@/Features/Request/contexts/RequestFormContext";
import {Input, Switcher, Select, Textarea} from "@/Features/Request/components";


export default function Edit({request, directors, organizations, documents}: TRequestEditPage) {
  return <>
    <HeaderActions>
      <div className="flex gap-x-2">
        <Link href={route('welcome')} className="header-actions__link">Вернуться к списку</Link>
        <HeaderTitle/>
      </div>
    </HeaderActions>
    <div className="container my-5">
      <RequestForm request={request} className="flex gap-x-4 form items-start">
        <div className="flex-1 flex gap-x-5">
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-600 text-center mb-3">Данные ФЛ, оплатившего образовательные услуги</div>
            <Input label="Фамилия" name="surname"/>
            <Input label="Имя" name="name"/>
            <Input label="Отчество" name="lastname"/>
            <Input type="date" label="Дата рождения" name="birthdate"/>
            <Input label="ИНН" name="inn"/>
            <Select label="Документ" name="doc_type">
              {documents.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
            </Select>
            <Input label="Серия и номер документа" name="doc_number"/>
            <Input type="date" label="Дата выдачи" name="doc_date"/>
            <Input type="tel" label="Номер телефона" name="phone"/>
            <Input type="email" label="E-mail" name="email"/>
          </div>
          <StudentPart/>
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-600 text-center mb-3">Данные о договоре</div>
            <Input type="number" min="0" step="0.01" label="Сумма расходов" name="contract_cost"/>
            <Input label="Номер договора" name="contract_number"/>
            <Select label="Форма обучения" name="education_type">
              <option value="full-time">Очная</option>
              <option value="part-time">Заочная</option>
            </Select>
            <Input type="date" label="Дата договора" name="contract_date"/>
          </div>
        </div>
        <div className="w-[300px] bg-white rounded-md shadow-md p-3">
          <Switcher name="same_student" className="mb-4 text-sm">Налогоплательщик и обучаемый являются одним лицом</Switcher>
          <Select label="Образовательная организация" name="organization_id">
            {organizations.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
          </Select>
          <Select label="Директор" name="director_id" className="!mb-4">
            {directors.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
          </Select>
          <Input label="Номер запроса" name="number"/>
          <Select label="Вид запроса" name="pickup_type" className="!mb-4">
            <option value="pickup">Получить лично</option>
            <option value="send">Отправить в налоговый орган</option>
          </Select>
          <Input type="number" min={2000} max={2200} label="Отчетный год" name="contract_year"/>
          <Textarea label="Комментарий" name="comment" rows={4}/>

          <Button type="submit" className="mt-6">Сохранить</Button>
        </div>
      </RequestForm>
    </div>
  </>
}

function StudentPart() {
  const {documents} = usePage<TRequestEditPage>().props;
  const {data} = useRequestForm();

  return <div className={mergeClass('flex-1', data.same_student && 'hidden')}>
    <div className="text-sm font-bold text-gray-600 text-center mb-3">Данные ФЛ, которому оказаны образовательные услуги</div>
    <Input label="Фамилия" name="student_surname" required={!data.same_student}/>
    <Input label="Имя" name="student_name" required={!data.same_student}/>
    <Input label="Отчество" name="student_lastname" required={!data.same_student}/>
    <Input type="date" label="Дата рождения" name="student_birthdate" required={!data.same_student}/>
    <Input label="ИНН" name="student_inn" required={!data.same_student}/>
    <Select label="Документ" name="student_doc_type" required={!data.same_student}>
      {documents.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
    </Select>
    <Input label="Серия и номер документа" name="student_doc_number" required={!data.same_student}/>
    <Input type="date" label="Дата выдачи" name="student_doc_date" required={!data.same_student}/>
    <Input type="tel" label="Номер телефона" name="student_phone" required={!data.same_student}/>
  </div>
}
