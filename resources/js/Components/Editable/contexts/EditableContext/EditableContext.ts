import {createContext, useContext} from "react";
import {StateFunction} from "@/types";

interface IEditableContext {
  edit: boolean
  setEdit: StateFunction<boolean>
}

export const EditableContext = createContext<IEditableContext>(null);
const useEditable = () => useContext(EditableContext);

export default useEditable;
