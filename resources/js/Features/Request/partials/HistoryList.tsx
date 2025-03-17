import {usePage} from "@inertiajs/react";
import {TRequestEditPage} from "@/Features/Request/types";

export default function HistoryList() {
  const {history} = usePage<TRequestEditPage>().props;

  return <div>
    {history?.data.length > 0
      ? <table className="simple-table">
        <thead>
        <tr>
        <th>Дата</th>
        <th>Пользователь</th>
        <th>Изменения</th>
        <th>Комментарий</th>
        <th>Отправлено</th>
        </tr>
        </thead>
        <tbody className="text-xs">
        {history.data.map((h) => <tr key={h.id}>
          <td>{h.created_at}</td>
          <td>{h.user.name}</td>
          <td>
            <table style={{width: "100%"}}>
            <tbody>
            {h.body.map(({key, old, new: fieldNew}) => <tr key={key}>
              <td>{key}</td>
              <td>{old}</td>
              <td>{fieldNew}</td>
            </tr>)}
            </tbody>
            </table>
          </td>
          <td className="whitespace-pre-wrap">{h.comment}</td>
          <td>{h.sended?'Да':'Нет'}</td>
        </tr>)}
        </tbody>
    </table>
      : <div className="text-gray-600">Ничего нет...</div>
    }
  </div>
}
