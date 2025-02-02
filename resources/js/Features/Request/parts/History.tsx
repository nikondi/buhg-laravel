import {useState} from "react";
import {IHistory} from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import {Link} from "@inertiajs/react";

type Props = {
  requestId: number
}

export default function History({requestId}: Props) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [histories, setHistories] = useState<IHistory[]>(null);

  const load = () => {
    setOpened((prev) => !prev);
    if(histories)
      return;

    setLoading(true);
    axios.get(route('request.history', [requestId]))
      .then(({data}) => setHistories(data.data))
      .catch(() => toast.error('Произошла ошибка'))
      .finally(() => setLoading(false))
  }

  return <>
    <button onClick={load} className="border-b border-gray-400 mb-5 text-gray-700 hover:text-gray-800 transition-colors duration-300">История изменений</button>
    {opened && <div>
      {loading
        ? <div className="bg-gray-200 px-2 py-1 rounded">Загрузка...</div>
        : <div className="pb-6">
          {histories && <table className="simple-table">
            <thead>
            <tr>
              <th style={{width: 180}}>Дата</th>
              <th style={{width: 150}}>Пользователь</th>
              <th>Комментарий</th>
            </tr>
            </thead>
            <tbody>
            {histories.map((history) => <tr key={history.id}>
              <td className="text-center">{history.created_at}</td>
              <td>
                <Link href={route('user.edit', [history.user.id])} className="text-blue-600">{history.user.name}</Link>
              </td>
              <td>{history.comment}</td>
            </tr>)}
            </tbody>
          </table>}
        </div>
      }
    </div>}
  </>
}
