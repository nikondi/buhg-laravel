import {ChangeEventHandler, InputHTMLAttributes, PropsWithChildren} from "react";
import {mergeClass} from "@/helpers";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & PropsWithChildren<{
  onChange?: (checked: boolean) => void
  className?: string
}>

export default function Switcher({children, className, onChange, ...attrs}: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange && onChange(e.target.checked);
  }

  return <label className={mergeClass("switcher", className)}>
    <input type="checkbox" onChange={handleChange} {...attrs}/>
    <span className="switcher__check"></span>
    <span>{children}</span>
  </label>
}
