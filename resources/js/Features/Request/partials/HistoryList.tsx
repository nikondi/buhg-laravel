import {usePage} from "@inertiajs/react";
import {IHistory, IHistoryBody, TRequestEditPage} from "@/Features/Request/types";
import {SimpleTable} from "@/Components";
import {useState} from "react";

export default function HistoryList() {
  const {history} = usePage<TRequestEditPage>().props;

  return <div>
    {history?.data.length > 0
      ? <SimpleTable>
        <thead>
        <tr>
        <th>Дата</th>
        <th>Пользователь</th>
        <th>Изменения <span className="text-xs font-normal text-gray-500">(Поле/Старое/Новое)</span></th>
        <th>Комментарий</th>
        <th>Отправлено</th>
        </tr>
        </thead>
        <tbody className="text-xs">
        {history.data.map((h) => <HistoryRow history={h} key={h.id}/>)}
        </tbody>
    </SimpleTable>
      : <div className="text-gray-600">Ничего нет...</div>
    }
  </div>
}

type HistoryRowProps = {
  history: IHistory
}

function HistoryRow({history}: HistoryRowProps) {
  const [opened, setOpened] = useState(false);

  return <tr>
    <td>{history.created_at}</td>
    <td>{history.user.name}</td>
    <td>
      <button type="button"
              className="px-2 py-1 transition-colors hover:text-blue-700 border-b border-b-orange-300"
              onClick={() => setOpened((prev) => !prev)}>{opened?'Закрыть':`Подробнее (${history.body.length})`}</button>
      {opened && <table style={{width: "100%"}} className="history-inner-table mt-2">
        <tbody>
        {history.body.map((item) => <HistoryBodyRow item={item} key={item.key}/>)}
        </tbody>
      </table>}
    </td>
    <td className="whitespace-pre-wrap">{history.comment}</td>
    <td>{history.sended ? 'Да' : 'Нет'}</td>
  </tr>
}

function renderValue(value: unknown) {
  if (!value)
    return <span className="text-gray-500">Пусто</span>;

  if (typeof value == 'string' || typeof value == 'number') {
    if (value == 'Не известно')
      return <span className="text-gray-500">{value}</span>;
    return value;
  }

  if (Array.isArray(value) || typeof value == 'object') {
    return <table style={{width: "100%"}}>
      <tbody>
      {
        Array.isArray(value)
          ? value.map((item, i) => <tr key={i}>
          <td>{renderValue(item)}</td>
        </tr>)
        : Object.entries(value).map(([key, val]) => <tr key={key}>
          <th>{key}</th>
          <td>{renderValue(val)}</td>
        </tr>)
      }
      </tbody>
    </table>
  }


}

type HistoryBodyRowProps = {
  item: IHistoryBody
}

function HistoryBodyRow({item}: HistoryBodyRowProps) {
  return <tr>
    <th>{item.key}</th>
    <td style={{overflowWrap: 'anywhere'}}>{renderValue(item.old)}</td>
    <td style={{overflowWrap: 'anywhere'}}>{renderValue(item.new)}</td>
  </tr>
}
