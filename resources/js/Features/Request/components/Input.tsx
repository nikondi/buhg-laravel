import useRequestForm from "../contexts/RequestFormContext";
import {IRequestForm} from "@/Features/Request/types";
import {Input as InputComponent} from "@/Components/Form";
import {InputHTMLAttributes} from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  label: string
  name: keyof IRequestForm
}

export default function Input({label, name, ...attrs}: Props) {
  const {data, setData, errors} = useRequestForm();
  return <InputComponent label={label} value={(data[name] as string)} onChange={(e) => setData(name, e.target.value)} error={errors[name]} {...attrs}/>
}
