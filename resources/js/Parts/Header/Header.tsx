import {Link} from "@inertiajs/react";
import {UserMenu} from "./components";
import {HasRole} from "@/Components";
import {useAuth} from "@/hooks";
import {mergeClass} from "@/helpers";

export default function Header() {
  const {user} = useAuth();

  return <header className="header">
    <div className="header-top">
      <div className="container">
        <div className="header__logo">
          <Link href={route('welcome')}>Справки об оплате образовательных услуг</Link>
        </div>
        <div className="header-menu">
          {user && <>
            <HasRole roles="admin">
              <Link href={route('user.index')} className={mergeClass("header-menu__link", route().current().startsWith('user.') && 'active')}>Пользователи</Link>
            </HasRole>
            <Link href={route('welcome')} className={mergeClass("header-menu__link", route().current() == 'welcome' && 'active')}>Заявки</Link>
            <Link href={route('director.index')} className={mergeClass("header-menu__link", route().current().startsWith('director.') && 'active')}>Директора ОО</Link>
            <Link href={route('organization.index')} className={mergeClass("header-menu__link", route().current().startsWith('organization.') && 'active')}>Организации</Link>
            <UserMenu/>
          </>}
        </div>
      </div>
    </div>
  </header>
}
