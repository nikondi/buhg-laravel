import useEditable from "./EditableContext";
import {PropsWithChildren} from "react";

export default function Edit({children}: PropsWithChildren) {
  const {edit} = useEditable()

  if(!edit)
    return;

  return children;
}
