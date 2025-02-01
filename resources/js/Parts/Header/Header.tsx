import {Link} from "@inertiajs/react";
import {UserMenu} from "./components";

export default function Header() {
  return <header className="header">
    <div className="header-top">
      <div className="container">
        <div className="header__logo">
          <Link href={route('welcome')}>Справки об оплате образовательных услуг</Link>
        </div>
        <div className="header-menu">
          <Link href={route('director.index')} className="header-menu__link">Директора ОО</Link>
          <Link href={route('organization.index')} className="header-menu__link">Организации</Link>
          <UserMenu/>
        </div>
      </div>
    </div>
  </header>
}
