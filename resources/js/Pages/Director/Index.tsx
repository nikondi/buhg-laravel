import {TDirectorIndexPage} from "@/Features/Director/types";
import {DirectorRow} from "@/Features/Director/components";
import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import {useState} from "react";
import {Create} from "@/Features/Director/parts";
import {Icon, SimpleTable} from "@/Components";

export default function Index({directors}: TDirectorIndexPage) {
  const [creating, setCreating] = useState(false);
  return <>
    <HeaderActions>
      <HeaderTitle/>
      <div className="header-actions__buttons">
        <button className="btn btn--small !flex gap-x-1.5 items-center" onClick={() => setCreating((prev) => !prev)}>
          <Icon icon="plus"/>
          {creating ? 'Отмена' : 'Создать'}
        </button>
      </div>
    </HeaderActions>
    <div className="container">
      {creating && <Create decline={() => setCreating(false)}/>}
      <SimpleTable className="my-4">
        <thead>
        <tr>
          <th style={{width: 285}}>Признак лица</th>
          <th>ФИО</th>
          <th style={{width: 365}}>Документ, подтверждающий полномочия</th>
          <th style={{width: 105}}></th>
        </tr>
        </thead>
        <tbody>
          {directors.data.map((director) => <DirectorRow key={director.id} director={director}/>)}
        </tbody>
      </SimpleTable>
    </div>
  </>
}
