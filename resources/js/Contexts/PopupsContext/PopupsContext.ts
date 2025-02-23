import {createContext, useContext} from "react";
import {IPopupsContext} from "./types";

export const PopupsContext = createContext<IPopupsContext>(null);
const usePopups = () => useContext(PopupsContext);

export default usePopups;
