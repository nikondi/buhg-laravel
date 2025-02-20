import {IRequestRow} from "@/types";
import {CopyText, Icon} from "@/Components";
import {Link, router} from "@inertiajs/react";
import Status from "./Status";
import {formatPhone, number_format} from "@/helpers";

type Props = {
  request?: IRequestRow
}

export default function RequestRow({request}: Props) {
  const onDelete = () => {
    if(!confirm('Точно удалить?'))
      return;

    router.delete(route('request.destroy', [request.id]), {
      preserveScroll: true
    });
  }
  return <tr>
    <td>{request.number || request.id}</td>
    <td>{request.surname} {request.name} {request.lastname}</td>
    <td className="text-center"><CopyText text={request.inn}>{request.inn}</CopyText></td>
    <td className="text-center"><CopyText text={'+7'+request.phone}>{formatPhone(request.phone)}</CopyText></td>
    <td className="text-center">{request.report_year}</td>
    <td className="text-center">{number_format(parseFloat(request.contract_cost), 2, '.', ' ')}</td>
    <td className="text-center">{request.contract_number}</td>
    <td className="text-center">{request.contract_date}</td>
    <td className="text-center"><Status status={request.status}/></td>
    <td className="text-center">{request.created_at}</td>
    <td>
      <div className="flex gap-x-1 justify-end">
        {request.pickup_type == 'pickup'
          ? <a target="_blank" href={route('request.excel', [request.id])} className="director-form__button">
            <Icon icon="excel" size="1.2em"/>
          </a>
          : <a target="_blank" href={route('request.xml', [request.id])} className="director-form__button">
            <Icon icon="xml" size="1.2em"/>
          </a>
        }
        <Link href={route('request.edit', [request.id])} className="director-form__button">
          <Icon icon="edit"/>
        </Link>
        <button onClick={onDelete} className="director-form__button">
          <Icon icon="trash" size="1.15em"/>
        </button>
      </div>
    </td>
  </tr>
}

