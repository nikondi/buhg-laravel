import {HTMLAttributes, PropsWithChildren} from "react";
import {mergeClass} from "@/helpers";
import usePopup from "@/Contexts/PopupContext";

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function Popup({children, className, ...attrs}: Props) {
  const {closing} = usePopup();

  return <div className={mergeClass("popup", closing && "popup--closing", className)} {...attrs}>{children}</div>
}
