import {Link} from "@inertiajs/react";
import {UserMenu} from "./components";
import {HasRole} from "@/Components";
import {useAuth} from "@/hooks";

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
              <Link href={route('user.index')} className="header-menu__link">Пользователи</Link>
            </HasRole>
            <Link href={route('director.index')} className="header-menu__link">Директора ОО</Link>
            <Link href={route('organization.index')} className="header-menu__link">Организации</Link>
            <UserMenu/>
          </>}
        </div>
      </div>
    </div>
  </header>
}
