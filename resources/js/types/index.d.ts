import React from "react";

export interface User {
  id: number;
  name: string;
  login: string;
  phone: string;
  avatar: string;
  email_verified_at: string;
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  title: string
  pageTitle: string
};

export type ResourceCollection<T> = {
  data: T[],
  links: {
    first: string,
    last: string,
    next: string,
    prev: string,
  },
  meta: {
    current_page: number,
    from: number,
    last_page: number,
    links: {
      url: string | null,
      label: "pagination.previous" | "pagination.next" | string,
      active: boolean
    }[],
    path: string,
    per_page: number,
    to: number,
    total: number
  }
}
export interface KeyValue {
  key: string
  value: string
}

export type StateFunction<T> = React.Dispatch<React.SetStateAction<T>>

type setDataByObject<TForm> = (data: TForm) => void;
type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void;
type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(key: K, value: TForm[K]) => void;
export type setDataFunction<TForm> = setDataByObject<TForm> & setDataByMethod<TForm> & setDataByKeyValuePair<TForm>


export type TRequestStatus = 'new' | 'in_work' | 'downloaded_xml' | 'declined' | 'duplicate';

export interface IRequest {
  id: number
  number: string
  status: TRequestStatus
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
  contract_year: string
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
}

export interface IRequestRow {
  id: number
  status: TRequestStatus
  name: string
  surname: string
  lastname: string
  phone: string
  inn: string
  contract_year: string
  contract_cost: string
  contract_number: string
  contract_date: string
}

export interface IDirector {
  id: number
  type: string
  name: string
  surname: string
  lastname: string
  document: string
}

export interface IOrganization {
  id: number
  name: string
  inn: string
  kpp: string
}

export interface IUser {
  id: number
  name: string
  login: string
  email: string
}

export interface IHistory {
  id: number
  comment: string
  user: IUser
  request_id: number
  created_at: string
}
