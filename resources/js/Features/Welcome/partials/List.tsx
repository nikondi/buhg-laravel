import {Link, usePage} from "@inertiajs/react";
import {mergeClass} from "@/helpers";
import {RequestRow} from "@/Features/Request/components";
import React from "react";
import {TWelcomePage} from "@/Features/Welcome/types";
import {SimpleTable} from "@/Components";

export default function List() {
  const {requests} = usePage<TWelcomePage>().props;


  return <>
    <div className="page-selector">
      <Link href={requests.links.prev} preserveScroll={true}
            className={mergeClass("page-selector__back", !requests.links.prev && 'page-selector__back--disabled')}
            onClick={(e) => !requests.links.prev && e.preventDefault()}></Link>

      <div className="page-selector__pages-wrapper">
        {requests.meta.links
          .filter((link) => link.label !== 'pagination.next' && link.label !== 'pagination.previous')
          .map((link) => <Link key={link.label} preserveScroll={true} href={link.url}
                               className={"page-selector__page" + (link.active ? ' page-selector__page--select' : '')}>{link.label}</Link>)
        }
      </div>

      <Link href={requests.links.next} preserveScroll={true}
            className={mergeClass("page-selector__next", !requests.links.next && 'page-selector__next--disabled')}
            onClick={(e) => !requests.links.next && e.preventDefault()}></Link>
    </div>

    <SimpleTable className="my-4 text-sm">
      <thead>
      <tr>
        <th>Номер<br/>справки</th>
        <th>ФИО плательщика</th>
        <th>ИНН</th>
        <th>Номер<br/>телефона</th>
        <th>Отчетный<br/>год</th>
        <th>Сумма</th>
        <th>Номер<br/>договора</th>
        <th>Дата<br/>договора</th>
        <th>Статус</th>
        <th>Дата создания</th>
        <th style={{width: 75}}></th>
      </tr>
      </thead>
      <tbody>
      {requests.data.length > 0
        ? requests.data.map((request) => <RequestRow key={request.id} request={request}/>)
        : <tr><td colSpan={11} className="text-center text-base text-gray-500">Ничего не найдено</td></tr>
      }
      </tbody>
    </SimpleTable>

  </>
}
