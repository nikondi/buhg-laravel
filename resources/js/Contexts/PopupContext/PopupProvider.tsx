import {PropsWithChildren, useState} from "react";
import {PopupContext} from "./PopupContext";
import usePopups from "@/Contexts/PopupsContext";

export default function PopupProvider({id, children}: PropsWithChildren<{ id: string }>) {
  const {closePopup} = usePopups()
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => closePopup(id), 300)
  };

  return <PopupContext.Provider value={{
    id, close, closing
  }}>
    {children}
  </PopupContext.Provider>
}
