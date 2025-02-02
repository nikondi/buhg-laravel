import useRequestForm from "../contexts/RequestFormContext";
import {IRequestForm} from "@/Features/Request/types";
import {Switcher as SwitcherComponent} from "@/Components/Form";
import {InputHTMLAttributes, PropsWithChildren} from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'onChange'> & PropsWithChildren<{
  onChange?: (checked: boolean) => void
  className?: string
  name: keyof IRequestForm
}>

export default function Switcher({name, ...attrs}: Props) {
  const {data, setData} = useRequestForm();
  return <SwitcherComponent checked={(data[name] as boolean)} onChange={(checked) => setData(name, checked)} {...attrs}/>
}
