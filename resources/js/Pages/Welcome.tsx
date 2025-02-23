import {HeaderActions} from "@/Parts/Header";
import {RequestRow} from "@/Features/Request/components";
import {TWelcomePage} from "@/Features/Welcome/types";
import React, {FormEventHandler, useState} from "react";
import {Link, useForm} from "@inertiajs/react";
import {mergeClass} from "@/helpers";
import {Select} from "@/Components/Form";
import {Button} from "@/Components";

export default function Welcome({requests, statuses, years, filters: _filters}: TWelcomePage) {
  const [filters, setFilters] = useState(Object.values(_filters).filter((val) => val).length > 0);
  const {data, setData, get} = useForm(_filters);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    get(route('welcome'));
  }

  return <>
    <HeaderActions/>

    <div className="container">
      <div className="flex flex-wrap my-5 items-center">
        <div className="flex-1">
          <button className="border-b border-gray-400 mb-5 text-gray-700 hover:text-gray-800 transition-colors duration-300" onClick={() => setFilters((prev) => !prev)}>Фильтры</button>
        </div>
        <div className="page-selector">
          <Link href={requests.links.prev} preserveScroll={true} className={mergeClass("page-selector__back", !requests.links.prev && 'page-selector__back--disabled')} onClick={(e) => !requests.links.prev && e.preventDefault()}></Link>

          <div className="page-selector__pages-wrapper">
            {requests.meta.links
              .filter((link) => link.label !== 'pagination.next' && link.label !== 'pagination.previous')
              .map((link) => <Link key={link.label} preserveScroll={true} href={link.url}
                                   className={"page-selector__page" + (link.active ? ' page-selector__page--select' : '')}>{link.label}</Link>)
            }
          </div>

          <Link href={requests.links.next} preserveScroll={true} className={mergeClass("page-selector__next", !requests.links.next && 'page-selector__next--disabled')} onClick={(e) => !requests.links.next && e.preventDefault()}></Link>
        </div>

        {filters && <form className="w-full flex gap-x-2 items-end shadow p-3 mt-2 rounded-md" onSubmit={handleSubmit}>
          {/*<Input label="Поиск" value={data.search} onChange={(e) => setData('search', e.target.value)}/>*/}
          <Select label="Год" value={data.year} onChange={(e) => setData('year', e.target.value)}>
            <option value="">-- Не выбрано</option>
            {years.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
          </Select>
          <Select label="Статус" value={data.status} onChange={(e) => setData('status', e.target.value)}>
            <option value="">-- Не выбрано</option>
            {statuses.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
          </Select>
          <Button type="submit" className="h-[35px] !w-[150px]">Поиск</Button>
        </form>}
      </div>

      <table className="simple-table my-4 text-sm">
        <thead>
        <tr>
          <th>Номер<br/>справки</th>
          <th>ФИО плательщика</th>
          <th>ИНН</th>
          <th>Номер<br/>телефона</th>
          <th>Отчетный<br />год</th>
          <th>Сумма</th>
          <th>Номер<br/>договора</th>
          <th>Дата<br/>договора</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th style={{width: 75}}></th>
        </tr>
        </thead>
        <tbody>
        {requests.data.map((request) => <RequestRow key={request.id} request={request}/>)}
        </tbody>
      </table>
    </div>
  </>
}
