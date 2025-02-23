import {IRequestRow, KeyValue, PageProps, ResourceCollection, TRequestStatus} from "@/types";

export type TWelcomePage = PageProps<{
  requests: ResourceCollection<IRequestRow>,
  statuses: Record<TRequestStatus, string>
  years: KeyValue[]
  filters: {
    search: string
    status: string
    year: string
  }
}>
