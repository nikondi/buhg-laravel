import {TRequestEditPage} from "@/Features/Request/types";
import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import {Link, usePage} from "@inertiajs/react";
import {Button, Fancybox, Icon} from "@/Components";
import {mergeClass} from "@/helpers";
import useRequestForm, {RequestForm} from "@/Features/Request/contexts/RequestFormContext";
import {Input, Select, Switcher, Textarea, XMLDownload} from "@/Features/Request/components";
import {History} from "@/Features/Request/parts";

const onlyChars = (value: string) => value.replace(/[^A-zА-я]/, '');
const onlyNumbers = (value: string) => value.replace(/\D/, '');
const inn = (value: string) => onlyNumbers(value).substring(0, 12);
const phone = (value: string) => onlyNumbers(value).substring(0, 10);

export default function Edit({request, documents}: TRequestEditPage) {
  return <>
    <HeaderActions>
      <div className="flex gap-x-2">
        <Link href={route('welcome')} className="header-actions__link">Вернуться к списку</Link>
        <HeaderTitle/>
      </div>
      <div className="flex gap-x-2">
        <a href={route('request.excel', [request.id])} target="_blank" className="btn btn--small !inline-flex items-center gap-x-2 !bg-green-600 !border-green-600 hover:!bg-green-700 hover:!border-green-700">
          <Icon icon="excel"/>
          Скачать Excel
        </a>
        <XMLDownload request_id={request.id} className="xml-download-dropdown"/>
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
        <Sidebar/>
      </RequestForm>
    </div>
    <div className="container my-5">
      {request.files.length > 0 &&
        <Fancybox className="border p-3 border-gray-500 mb-5">
          <div className="mb-2 font-semibold">Вложения</div>
          <div className="flex gap-x-3 flex-wrap">
            {request.files.map((link, i) => <div><a href={link.url} data-fancybox="files" key={link.key} className="text-blue-600 underline underline-offset-4 transition-colors duration-200 hover:text-blue-700">{link.label}</a>{i < request.files.length - 1 && ','}</div>)}
          </div>
        </Fancybox>
      }
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

function Sidebar() {
  const {directors, organizations, statuses} = usePage<TRequestEditPage>().props;
  const {data, setData} = useRequestForm();
  return <div className="w-[300px] bg-white rounded-md shadow-md p-3">
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
    <Input type="number" min={2000} max={2200} label="Отчетный год" name="report_year"/>
    <Input type="number" min={0} max={255} label="Номер корректировки" name="changes_count"/>

    <Select label="Статус заявки" name="status">
      {statuses.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
    </Select>

    <label className="flex gap-x-2 my-4 text-sm cursor-pointer">
      <input type="checkbox" checked={data.save_history} onChange={(e) => setData('save_history', e.target.checked)}/>
      Оповестить плательщика
    </label>

    {data.save_history && <Textarea label="Комментарий" name="comment" rows={4}/>}

    <Button type="submit" className="mt-6">Сохранить</Button>
  </div>
}
