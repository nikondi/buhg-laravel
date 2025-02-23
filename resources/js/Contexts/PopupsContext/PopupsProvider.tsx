import {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {lockBody, unlockBody} from "@/helpers/popup";
import {PopupWithId} from "./types";
import {PopupsContext} from "./PopupsContext";
import {PopupProvider} from "@/Contexts/PopupContext";

export default function PopupsProvider({children}: PropsWithChildren) {
  const [popups, setPopups] = useState<PopupWithId[]>([]);
  const openPopup = (id: string, el: ReactNode) => {
    setPopups((prev) => (prev.find(({id: _id}) => _id == id))?prev:[...prev, {id, el}])
  }
  const closePopup = (id: string) => setPopups((prev) => prev.filter((popup) => popup.id !== id))
  const isOpened = (id: string) => !!popups.findIndex((popup) => id == popup.id)

  useEffect(() => {
    if(!window)
      return;

    if(popups.length > 0)
      lockBody();
    else
      unlockBody();

    const onEscape = (e: KeyboardEvent) => {
      if(e.key == 'Escape' && popups.length > 0)
        closePopup(popups[popups.length - 1].id);
    };
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape);
  }, [popups.length]);

  return <PopupsContext.Provider value={{
    openPopup, closePopup, isOpened
  }}>
    {children}
    {popups.map((popup, i) => <PopupProvider key={popup.id+i} id={popup.id}>{popup.el}</PopupProvider>)}
  </PopupsContext.Provider>
}
