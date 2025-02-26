import {Icon} from "@/Components";
import {useState} from "react";
import {mergeClass} from "@/helpers";
import {useOutsideClick} from "@/hooks";

type Props = {
  request_id: number
  className?: string
}

export default function XMLDownload({request_id, className}: Props) {
  const [opened, setOpened] = useState(false);
  const elRef = useOutsideClick<HTMLDivElement>(() => setOpened(false));

  return <div className={mergeClass("dropdown", className, opened && 'active')} ref={elRef}>
    <button onClick={() => setOpened((prev) => !prev)} className="btn btn--small !inline-flex items-center gap-x-2 !bg-blue-600 !border-blue-600 hover:!bg-blue-700 hover:!border-blue-700 text-nowrap">
      <Icon icon="xml"/>
      Скачать XML
    </button>
    <ul className="dropdown__list">
      <li><a href={route('request.xml', {request: request_id, _query: {'doc_type': 'inn'}})} target="_blank">С ИНН</a></li>
      <li><a href={route('request.xml', {request: request_id, _query: {'doc_type': 'passport'}})} target="_blank">С документом</a></li>
    </ul>
  </div>
}
