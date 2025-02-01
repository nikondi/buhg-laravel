import {mergeClass} from "@/helpers";
import {SelectHTMLAttributes} from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string
  label: string
}

export default function Select({error, label, className, required, ...attrs}: Props) {
  return <label className={mergeClass("form-input", className, error && "form-input--error")}>
    <span className="form-input__label">{label}</span>
    <select required={required} {...attrs}/>
    {error && <span className="form-input__error">{error}</span>}
  </label>
}
