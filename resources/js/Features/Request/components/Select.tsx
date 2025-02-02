import useRequestForm from "../contexts/RequestFormContext";
import {Select as SelectComponent} from "@/Components/Form";
import {SelectHTMLAttributes} from "react";
import {IRequestForm} from "@/Features/Request/types";

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> & {
  name: keyof IRequestForm
  error?: string
  label: string
  showLabel?: boolean
}

export default function Input({label, name, ...attrs}: Props) {
  const {data, setData, errors} = useRequestForm();
  return <SelectComponent label={label} value={(data[name] as string)} onChange={(e) => setData(name, e.target.value)} error={errors[name]} {...attrs}/>
}
