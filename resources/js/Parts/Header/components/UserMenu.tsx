import {useAuth, useOutsideClick} from "@/hooks";
import {useState} from "react";
import {mergeClass} from "@/helpers";
import {Link} from "@inertiajs/react";
import {UserAvatar} from "@/Components";

export default function UserMenu() {
  const {user} = useAuth();
  const [opened, setOpened] = useState(false);
  const listRef = useOutsideClick<HTMLDivElement>(() => setOpened(false));

  if(!user)
    return;

  const handleClick = () => setOpened((prev) => !prev);

  return <div className={mergeClass("header-user dropdown", opened && 'active')} ref={listRef}>
    <div className="header-user__name" onClick={handleClick}>
      <svg width="1em" height="1em" viewBox="0 0 451.847 451.847">
        <path
          d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
          fill="currentColor"></path>
      </svg>
      <span>{user.name}</span>
      <UserAvatar user={user}/>
    </div>
    <div className="dropdown__list">
      <ul>
        <li><Link href={route('login.logout')}>Выйти</Link></li>
      </ul>
    </div>
  </div>
}
