import {IUser} from "@/types";
import {Icon} from "@/Components";
import {Link, router} from "@inertiajs/react";

type Props = {
  user?: IUser
}

export default function UserRow({user}: Props) {
  const onDelete = () => {
    if(!confirm('Точно удалить?'))
      return;

    router.delete(route('user.destroy', [user.id]), {
      preserveScroll: true
    });
  }
  return <tr>
    <td>{user.id}</td>
    <td>{user.login}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>
      <div className="flex gap-x-1 justify-end">
        <Link href={route('user.edit', [user.id])} className="director-form__button">
          <Icon icon="edit"/>
        </Link>
        <button onClick={onDelete} className="director-form__button">
          <Icon icon="trash" size="1.15em"/>
        </button>
      </div>
    </td>
  </tr>
}

