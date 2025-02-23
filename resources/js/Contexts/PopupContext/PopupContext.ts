import {createContext, useContext} from "react";
import {IPopupContext} from "@/Contexts/PopupContext/types";

export const PopupContext = createContext<IPopupContext>(null);
const usePopup = () => useContext(PopupContext);

export default usePopup;
