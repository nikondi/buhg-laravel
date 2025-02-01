import {mergeClass} from "@/helpers";
import {SelectHTMLAttributes} from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string
  label: string
  showLabel?: boolean
}

export default function Select({error, label, className, showLabel = true, required, ...attrs}: Props) {
  return <label className={mergeClass("form-input", className, error && "form-input--error")}>
    {showLabel && <span className="form-input__label">{label}</span>}
    <select required={required} {...attrs}/>
    {error && <span className="form-input__error">{error}</span>}
  </label>
}
