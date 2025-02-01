import {EditableContext} from "@/Components/Editable/contexts/EditableContext/EditableContext";
import {PropsWithChildren, useState} from "react";

type Props = PropsWithChildren;

export default function EditableProvider({children}: Props) {
  const [edit, setEdit] = useState(false);

  return <EditableContext.Provider value={{
    edit, setEdit
  }}>
    {children}
  </EditableContext.Provider>
}
