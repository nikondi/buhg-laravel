import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import {useState} from "react";
import {Create} from "@/Features/Organization/parts";
import {Icon, SimpleTable} from "@/Components";
import {TOrganizationIndexPage} from "@/Features/Organization/types";
import {OrganizationRow} from "@/Features/Organization/components";

export default function Index({organizations}: TOrganizationIndexPage) {
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
          <th>Название</th>
          <th style={{width: 175}}>ИНН</th>
          <th style={{width: 175}}>КПП</th>
          <th style={{width: 105}}></th>
        </tr>
        </thead>
        <tbody>
          {organizations.data.map((organization) => <OrganizationRow key={organization.id} organization={organization}/>)}
        </tbody>
      </SimpleTable>
    </div>
  </>
}
