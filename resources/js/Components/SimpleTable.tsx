import {HTMLAttributes} from "react";
import {mergeClass} from "@/helpers";

type Props = HTMLAttributes<HTMLTableElement>

export default function SimpleTable({className, children, ...attrs}: Props) {
  return <div className="simple-table-wrapper">
    <table className={mergeClass("simple-table", className)} {...attrs}>
      {children}
    </table>
  </div>
}
