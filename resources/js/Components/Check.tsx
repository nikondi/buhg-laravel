import {ChangeEventHandler, HTMLAttributes, PropsWithChildren} from "react";
import Icon from "@/Components/Icon";

type Props = PropsWithChildren<Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange?: (checked: boolean) => void
  checked?: boolean
}>

export default function Check({onChange, children, ...props}: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange && onChange(e.target.checked);
  }
  return <label className="check">
    <input type="checkbox" onChange={handleChange} {...props}/>
    <div className="check__check">
      <Icon icon="check"/>
    </div>
    {children && <div className="check__inner">
      {children}
    </div>}
  </label>
}
