import useEditable from "./EditableContext";
import {PropsWithChildren} from "react";

export default function View({children}: PropsWithChildren) {
  const {edit} = useEditable()

  if(edit)
    return;

  return children;
}
