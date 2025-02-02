import useRequestForm from "../contexts/RequestFormContext";
import {IRequestForm} from "@/Features/Request/types";
import {Input as InputComponent} from "@/Components/Form";
import {ChangeEventHandler, InputHTMLAttributes} from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  label: string
  name: keyof IRequestForm
  format?: (value: string) => string
}

export default function Input({label, name, format, ...attrs}: Props) {
  const {data, setData, errors} = useRequestForm();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData(name, format?format(e.target.value):e.target.value)
  }
  return <InputComponent label={label} value={(data[name] as string)} onChange={onChange} error={errors[name]} {...attrs}/>
}
