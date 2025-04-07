import {Input, Select} from "../components";
import {RequestForm} from "../contexts/RequestFormContext";
import React from "react";
import {usePage} from "@inertiajs/react";
import {TRequestEditPage} from "../types";
import {fioChars, inn, phone} from "../helpers";
import StudentPart from "./StudentPart";
import Sidebar from "./Sidebar";
import {Fancybox} from "@/Components";

export default function Form() {
  const {request, documents} = usePage<TRequestEditPage>().props

  return <div>
    <RequestForm request={request} className="flex gap-x-4 form items-start">
      <div className="flex-1 flex gap-x-5">
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-600 text-center mb-3">Данные ФЛ, оплатившего образовательные
            услуги
          </div>
          <Input label="Фамилия" name="surname" format={fioChars} required/>
          <Input label="Имя" name="name" format={fioChars} required/>
          <Input label="Отчество" name="lastname" format={fioChars} required/>
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
    <div className="my-5">
      {request.files.length > 0 &&
        <Fancybox className="border p-3 border-gray-500 mb-5">
          <div className="mb-2 font-semibold">Вложения</div>
          <div className="flex gap-x-3 flex-wrap">
            {request.files.map((link, i) => <div><a href={link.url} data-fancybox="files" key={link.key}
                                                    className="text-blue-600 underline underline-offset-4 transition-colors duration-200 hover:text-blue-700">{link.label}</a>{i < request.files.length - 1 && ','}
            </div>)}
          </div>
        </Fancybox>
      }
    </div>
  </div>
}
