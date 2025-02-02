import {mergeClass} from "@/helpers";
import {TextareaHTMLAttributes} from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
  label: string
  showLabel?: boolean
}

export default function Textarea({error, label, showLabel = true, className, required, ...attrs}: Props) {
  return <label className={mergeClass("form-input", className, error && "form-input--error", required && 'form-input--required')}>
    {showLabel && <span className="form-input__label">{label}</span>}
    <textarea placeholder={label} required={required} {...attrs}/>
    {error && <span className="form-input__error">{error}</span>}
  </label>

}
