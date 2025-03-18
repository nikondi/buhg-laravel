import {HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLTableElement>

export default function SimpleTable({className, children, ...attrs}: Props) {
  return <div className="simple-table-wrapper">
    <table className={"simple-table"+(className?` ${className}`:'')} {...attrs}>
      {children}
    </table>
  </div>
}
