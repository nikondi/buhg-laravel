import {usePage} from "@inertiajs/react";
import {TRequestEditPage} from "@/Features/Request/types";
import useRequestForm from "@/Features/Request/contexts/RequestFormContext";
import {Input, Select, Switcher, Textarea} from "@/Features/Request/components";
import {Button} from "@/Components";
import React from "react";

export default function Sidebar() {
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

    <Textarea label="Комментарий" name="comment" rows={4}/>

    <Button type="submit" className="mt-6">Сохранить</Button>
  </div>
}
