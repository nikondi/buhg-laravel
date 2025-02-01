import {mergeClass} from "@/helpers";
import {InputHTMLAttributes} from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  label: string
  showLabel?: boolean
}

export default function Input({error, label, showLabel = true, className, required, ...attrs}: Props) {
  return <label className={mergeClass("form-input", className, error && "form-input--error", required && 'form-input--required')}>
    {showLabel && <span className="form-input__label">{label}</span>}
    <input placeholder={label} required={required} {...attrs}/>
    {error && <span className="form-input__error">{error}</span>}
  </label>

}
