import useRequestForm from "../contexts/RequestFormContext";
import {IRequestForm} from "@/Features/Request/types";
import {Textarea as TextareaComponent} from "@/Components/Form";
import {TextareaHTMLAttributes} from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & {
  label: string
  name: keyof IRequestForm
}

export default function Input({label, name, ...attrs}: Props) {
  const {data, setData, errors} = useRequestForm();
  return <TextareaComponent label={label} value={(data[name] as string)} onChange={(e) => setData(name, e.target.value)} error={errors[name]} {...attrs}/>
}
