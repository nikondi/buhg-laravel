import {ButtonHTMLAttributes} from "react";
import {mergeClass} from "@/helpers";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({className, children, ...attrs}: Props) {
  return <button className={mergeClass("btn", className)} {...attrs}>{children}</button>
}
