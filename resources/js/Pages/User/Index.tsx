import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import {useState} from "react";
import {Create} from "@/Features/User/parts";
import {Icon, SimpleTable} from "@/Components";
import {IUser, ResourceCollection} from "@/types";
import {UserRow} from "@/Features/User/components";

type Props = {
  users: ResourceCollection<IUser>
}

export default function Index({users}: Props) {
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
          <th>ID</th>
          <th>Логин</th>
          <th>Имя</th>
          <th>Почта</th>
          <th style={{width: 75}}></th>
        </tr>
        </thead>
        <tbody>
          {users.data.map((user) => <UserRow key={user.id} user={user}/>)}
        </tbody>
      </SimpleTable>
    </div>
  </>
}
