import {router, usePage} from "@inertiajs/react";
import {IHistory, IHistoryBody, TRequestEditPage} from "@/Features/Request/types";
import {Button, Check, SimpleTable} from "@/Components";
import {useCallback, useState} from "react";
import toast from "react-hot-toast";
import {Textarea} from "@/Components/Form";
import {useAxios} from "@/hooks";
import {mergeClass} from "@/helpers";

export default function HistoryList() {
  const {history, request} = usePage<TRequestEditPage>().props;
  const {data, setData, post, reset} = useAxios({
    histories: [],
    comment: ''
  });

  const onToggle = (id: number, selected: boolean) => {
    const new_histories = [...data.histories].filter((item) => item != id);
    if(selected)
      new_histories.push(id);
    setData('histories', new_histories);
  }
  const send = useCallback(() => {
    if(data.histories.length == 0)
      return;

    const toast_id = toast.loading('Отправка');

    post(route('request.send-history', [request.id]), {
      onSuccess: ({success}) => {
        if(!success) {
          toast.error('Произошла ошибка')
          return;
        }

        reset();

        toast.success('Отправлено');
        router.reload({
          only: ['history']
        });
      },
      onError: () => toast.error('Произошла ошибка'),
      onFinally: () => toast.dismiss(toast_id)
    });
  }, [data]);

  return <div>
    <div className="mb-4">
      {data.histories.length > 0 && <Textarea label="Комментарий" value={data.comment}
                                              className="mb-2"
                                              onChange={(e) => setData('comment', e.target.value)}/>}
      <Button className="btn--small !w-auto !px-4" onClick={send} disabled={data.histories.length == 0}>
        Оповестить плательщика
      </Button>
    </div>
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
        {history.data.map((h) => <HistoryRow history={h} onToggle={onToggle} checked={data.histories.includes(h.id)} key={h.id}/>)}
        </tbody>
    </SimpleTable>
      : <div className="text-gray-600">Ничего нет...</div>
    }
  </div>
}

type HistoryRowProps = {
  history: IHistory
  onToggle: (id: number, selected: boolean) => void
  checked: boolean
}

function HistoryRow({history, onToggle, checked}: HistoryRowProps) {
  const [opened, setOpened] = useState(false);

  return <tr className={mergeClass(history.sended && "bg-green-50")}>
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
    <td>
      <div className="flex justify-between">
        {history.sended
        ? <span className="text-green-700">Отправлено</span>
        : <span className="text-orange-600">Не отправлено</span>}

        <Check onChange={(checked) => onToggle(history.id, checked)} checked={checked} />
      </div>
    </td>
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
