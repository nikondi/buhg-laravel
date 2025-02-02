import {TRequestEditPage} from "@/Features/Request/types";
import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import {Link, usePage} from "@inertiajs/react";
import {Button} from "@/Components";
import {mergeClass} from "@/helpers";
import useRequestForm, {RequestForm} from "@/Features/Request/contexts/RequestFormContext";
import {Input, Switcher, Select, Textarea} from "@/Features/Request/components";
import {History} from "@/Features/Request/parts";

const onlyChars = (value: string) => value.replace(/[^A-zА-я]/, '');
const onlyNumbers = (value: string) => value.replace(/\D/, '');
const inn = (value: string) => onlyNumbers(value).substring(0, 12);
const phone = (value: string) => onlyNumbers(value).substring(0, 10);

export default function Edit({request, directors, organizations, documents, statuses}: TRequestEditPage) {
  return <>
    <HeaderActions>
      <div className="flex gap-x-2">
        <Link href={route('welcome')} className="header-actions__link">Вернуться к списку</Link>
        <HeaderTitle/>
      </div>
      <div className="flex gap-x-2">
        {request.pickup_type == 'pickup' && <button
          className="btn btn--small !inline-flex items-center gap-x-2 !bg-green-600 !border-green-600 hover:!bg-green-700 hover:!border-green-700">
          <svg width="1em" height="1em" viewBox="0 0 512 512">
            <path
              d="M496 80.011H288v-48c0-4.768-2.112-9.28-5.792-12.32-3.648-3.04-8.544-4.352-13.152-3.392l-256 48A15.955 15.955 0 0 0 0 80.011v352c0 7.68 5.472 14.304 13.056 15.712l256 48c.96.192 1.952.288 2.944.288 3.712 0 7.328-1.28 10.208-3.68a16.006 16.006 0 0 0 5.792-12.32v-48h208c8.832 0 16-7.168 16-16v-320c0-8.832-7.168-16-16-16zM220.032 309.483c5.824 6.624 5.152 16.736-1.504 22.56A15.943 15.943 0 0 1 208 336.011a15.951 15.951 0 0 1-12.032-5.472l-46.528-53.152-40.8 52.48A16.073 16.073 0 0 1 96 336.011c-3.424 0-6.88-1.088-9.824-3.36-6.976-5.44-8.224-15.488-2.816-22.464l44.608-57.344-44-50.304c-5.824-6.624-5.152-16.736 1.504-22.56 6.624-5.824 16.704-5.184 22.592 1.504L148 227.115l47.392-60.928c5.44-6.944 15.488-8.224 22.464-2.784 6.976 5.408 8.224 15.456 2.784 22.464l-51.2 65.792 50.592 57.824zM480 400.011H288v-32h48c8.832 0 16-7.168 16-16s-7.168-16-16-16h-48v-32h48c8.832 0 16-7.168 16-16s-7.168-16-16-16h-48v-32h48c8.832 0 16-7.168 16-16s-7.168-16-16-16h-48v-32h48c8.832 0 16-7.168 16-16s-7.168-16-16-16h-48v-32h192v288z"
              fill="currentColor"/>
            <path
              d="M432 144.011h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16zM432 208.011h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16zM432 272.011h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16zM432 336.011h-32c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="currentColor"/>
          </svg>
          Скачать Excel
        </button>}
        {request.pickup_type == 'send' && <button className="btn btn--small !inline-flex items-center gap-x-2 !bg-blue-600 !border-blue-600 hover:!bg-blue-700 hover:!border-blue-700">
          <svg width="1.3em" height="1.3em" viewBox="0 0 24 24"><g><path d="m1.293 12.707 4 4a1 1 0 1 0 1.414-1.414L3.414 12l3.293-3.293a1 1 0 1 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414zM18.707 7.293a1 1 0 1 0-1.414 1.414L20.586 12l-3.293 3.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414zM13.039 4.726l-4 14a1 1 0 0 0 .686 1.236A1.053 1.053 0 0 0 10 20a1 1 0 0 0 .961-.726l4-14a1 1 0 1 0-1.922-.548z" fill="currentColor"></path></g></svg>
          Скачать XML
        </button>}
      </div>
    </HeaderActions>
    <div className="container my-5">
      <RequestForm request={request} className="flex gap-x-4 form items-start">
        <div className="flex-1 flex gap-x-5">
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-600 text-center mb-3">Данные ФЛ, оплатившего образовательные
              услуги
            </div>
            <Input label="Фамилия" name="surname" format={onlyChars} required/>
            <Input label="Имя" name="name" format={onlyChars} required/>
            <Input label="Отчество" name="lastname" format={onlyChars} required/>
            <Input type="date" label="Дата рождения" name="birthdate" required/>
            <Input label="ИНН" name="inn" format={inn} required/>
            <Select label="Документ" name="doc_type">
              {documents.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
            </Select>
            <Input label="Серия и номер документа" name="doc_number" required/>
            <Input type="date" label="Дата выдачи" name="doc_date" required/>
            <Input type="tel" label="Номер телефона" name="phone" format={phone} required/>
            <Input type="email" label="E-mail" name="email" required/>
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
          <Switcher name="same_student" className="mb-4 text-sm">Налогоплательщик и обучаемый являются одним
            лицом</Switcher>
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

          <Select label="Образовательная организация" name="status">
            {statuses.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
          </Select>

          <Textarea label="Комментарий" name="comment" rows={4}/>

          <Button type="submit" className="mt-6">Сохранить</Button>
        </div>
      </RequestForm>
    </div>
    <div className="container my-7">
      <History requestId={request.id}/>
    </div>

  </>
}

function StudentPart() {
  const {documents} = usePage<TRequestEditPage>().props;
  const {data} = useRequestForm();

  return <div className={mergeClass('flex-1', data.same_student && 'hidden')}>
    <div className="text-sm font-bold text-gray-600 text-center mb-3">Данные ФЛ, которому оказаны образовательные
      услуги
    </div>
    <Input label="Фамилия" name="student_surname" format={onlyChars} required={!data.same_student}/>
    <Input label="Имя" name="student_name" format={onlyChars} required={!data.same_student}/>
    <Input label="Отчество" name="student_lastname" format={onlyChars}/>
    <Input type="date" label="Дата рождения" name="student_birthdate" required={!data.same_student}/>
    <Input label="ИНН" name="student_inn" format={inn} required={!data.same_student}/>
    <Select label="Документ" name="student_doc_type" required={!data.same_student}>
      {documents.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
    </Select>
    <Input label="Серия и номер документа" name="student_doc_number" required={!data.same_student}/>
    <Input type="date" label="Дата выдачи" name="student_doc_date" required={!data.same_student}/>
    <Input type="tel" label="Номер телефона" name="student_phone" format={phone} required={!data.same_student}/>
  </div>
}

