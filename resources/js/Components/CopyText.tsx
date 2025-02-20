import toast from "react-hot-toast";
import {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
  text: string
}>

export default function CopyText({text, children}: Props) {
  const copy = () => {
    navigator.clipboard.writeText(text)
      .then(()  => toast.success('Текст скопирован'))
      .catch(() => toast.error('Ошибка при копировании'));
  }
  return <span className="copy-phone" onClick={copy}>
    {children}
  </span>;
}
