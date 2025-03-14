import {IRequestRow, KeyValue, PageProps, ResourceCollection, TRequestStatus} from "@/types";

export type TWelcomePage = PageProps<{
  requests: ResourceCollection<IRequestRow>,
  statuses: Record<TRequestStatus, string>
  years: KeyValue[]
  filters: {
    query: string
    status: string
    year: string
  }
}>
