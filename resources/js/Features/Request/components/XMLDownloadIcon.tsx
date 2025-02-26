import {Icon} from "@/Components";
import {useState} from "react";
import {mergeClass} from "@/helpers";
import {useOutsideClick} from "@/hooks";

type Props = {
  request_id: number
}

export default function XMLDownload({request_id}: Props) {
  const [opened, setOpened] = useState(false);
  const elRef = useOutsideClick<HTMLDivElement>(() => setOpened(false));

  return <div className={mergeClass("dropdown xml-icon-download-dropdown", opened && 'active')} ref={elRef}>
    <button className="director-form__button" onClick={() => setOpened((prev) => !prev)}>
      <Icon icon="xml" size="1.15em"/>
    </button>

    <ul className="dropdown__list">
      <li><a href={route('request.xml', {request: request_id, _query: {'doc_type': 'inn'}})} target="_blank">С ИНН</a>
      </li>
      <li><a href={route('request.xml', {request: request_id, _query: {'doc_type': 'passport'}})} target="_blank">С
        документом</a></li>
    </ul>
  </div>
}
