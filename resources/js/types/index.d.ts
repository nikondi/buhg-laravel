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

export type StateFunction<T> = React.Dispatch<React.SetStateAction<T>>



export type Request = {

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
