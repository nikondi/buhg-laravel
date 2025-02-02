import {createContext, useContext} from "react";
import {IRequestFormContext} from "./types";


export const RequestFormContext = createContext<IRequestFormContext>(null);
const useRequestForm = () => useContext(RequestFormContext);

export default useRequestForm;
