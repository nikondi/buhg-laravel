import {PropsWithChildren} from "react";
import HeaderTitle from "./HeaderTitle";

export default function HeaderActions({children}: PropsWithChildren) {
  return <div className="header-actions">
    <div className="container">
      {children
        ? children
        : <HeaderTitle/>
      }
    </div>
  </div>

}
