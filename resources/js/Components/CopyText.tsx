import toast from "react-hot-toast";
import {PropsWithChildren} from "react";
import {copyToClipboard} from "@/helpers";

type Props = PropsWithChildren<{
  text: string
}>

export default function CopyText({text, children}: Props) {
  const copy = () => {
    try {
      copyToClipboard(text)
        .then(() => toast.success('Текст скопирован'))
        .catch(() => toast.error('Ошибка при копировании'));
    }
    catch (e) {
      toast.error('Ошибка при копировании')
    }
  }
  return <span className="copy-phone" onClick={copy}>
    {children}
  </span>;
}
