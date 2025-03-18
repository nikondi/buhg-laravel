import {IComment, IRequest, IUser, KeyValue, PageProps, ResourceCollection} from "@/types";

export type TRequestEditPage = PageProps<{
  request: IRequest,
  directors: KeyValue[]
  organizations: KeyValue[]
  documents: KeyValue[]
  statuses: KeyValue[]
  comments: ResourceCollection<IComment>
  history: ResourceCollection<IHistory>
}>

export interface IHistoryBody {
  key: string
  old: string
  new: string
}

export interface IHistory {
  id: number
  user: IUser
  body: IHistoryBody[]
  comment: string
  sended: boolean
  created_at: string
}

export type IRequestForm = {
  status: string
  number: string
  name: string
  surname: string
  lastname: string
  birthdate: string
  phone: string
  email: string
  inn: string
  doc_type: string
  doc_number: string
  doc_date: string
  contract_number: string
  contract_date: string
  contract_cost: string
  report_year: string
  same_student: boolean
  student_name: string
  student_surname: string
  student_lastname: string
  student_birthdate: string
  student_inn: string
  student_phone: string
  student_doc_type: string
  student_doc_number: string
  student_doc_date: string
  education_type: string
  pickup_type: string
  director_id: number
  organization_id: number
  comment: string
  save_history: boolean
  changes_count: number
}
