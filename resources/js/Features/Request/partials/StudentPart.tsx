import {usePage} from "@inertiajs/react";
import {TRequestEditPage} from "../types";
import useRequestForm from "../contexts/RequestFormContext";
import {mergeClass} from "@/helpers";
import {Input, Select} from "../components";
import React from "react";
import {fioChars, inn, phone} from "../helpers";

export default function StudentPart() {
  const {documents} = usePage<TRequestEditPage>().props;
  const {data} = useRequestForm();

  return <div className={mergeClass('flex-1', data.same_student && 'hidden')}>
    <div className="text-sm font-bold text-gray-600 text-center mb-3">Данные ФЛ, которому оказаны образовательные
      услуги
    </div>
    <Input label="Фамилия" name="student_surname" format={fioChars} required={!data.same_student}/>
    <Input label="Имя" name="student_name" format={fioChars} required={!data.same_student}/>
    <Input label="Отчество" name="student_lastname" format={fioChars}/>
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
