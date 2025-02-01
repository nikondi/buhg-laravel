import {IRequest} from "@/types";
import {Icon} from "@/Components";
import {router} from "@inertiajs/react";
import Status from "./Status";

type Props = {
  request?: IRequest
}

export default function RequestRow({request}: Props) {
  const onDelete = () => {
    if(!confirm('Точно удалить?'))
      return;

    router.delete(route('request.destroy', [request.id]), {
      preserveScroll: true
    });
  }
  return <tr className="director-form">
    <td>{request.id}</td>
    <td>{request.surname} {request.name} {request.lastname}</td>
    <td className="text-center">{request.inn}</td>
    <td className="text-center">+7 {request.phone}</td>
    <td className="text-center">{request.contract_year}</td>
    <td className="text-center">{request.contract_cost}</td>
    <td className="text-center">{request.contract_number}</td>
    <td className="text-center">{request.contract_date}</td>
    <td className="text-center"><Status status={request.status}/></td>
    <td>
      <div className="flex gap-x-1 justify-end">
        <button onClick={onDelete} className="director-form__button">
          <Icon icon="trash" size="1.2em"/>
        </button>
        <button className="director-form__button">
          <Icon icon="edit"/>
        </button>
      </div>
    </td>
  </tr>
}

