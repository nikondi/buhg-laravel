import {HeaderActions} from "@/Parts/Header";
import {RequestRow} from "@/Features/Request/components";
import {TWelcomePage} from "@/Features/Welcome/types";


export default function Welcome({requests}: TWelcomePage) {
  return <>
    <HeaderActions/>

    <div className="container">
      <table className="simple-table my-4">
        <thead>
        <tr>
          <th>Номер<br />справки</th>
          <th>ФИО плательщика</th>
          <th>ИНН</th>
          <th>Номер<br />телефона</th>
          <th>Год</th>
          <th>Сумма</th>
          <th>Номер<br />договора</th>
          <th>Дата<br />договора</th>
          <th>Статус</th>
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
