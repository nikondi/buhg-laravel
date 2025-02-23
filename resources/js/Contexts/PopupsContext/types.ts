import {ReactNode} from "react";

export type PopupWithId = {
  id: string,
  el: ReactNode
}

export interface IPopupsContext {
  openPopup: (id: string, el: ReactNode) => void,
  closePopup: (id: string) => void
  isOpened: (id: string) => boolean
}
