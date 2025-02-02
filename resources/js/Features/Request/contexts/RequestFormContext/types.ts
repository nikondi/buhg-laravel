import {setDataFunction} from "@/types";
import {IRequestForm} from "@/Features/Request/types";

export interface IRequestFormContext {
  data: IRequestForm
  setData: setDataFunction<IRequestForm>
  errors: Partial<Record<keyof IRequestForm, string>>
}
