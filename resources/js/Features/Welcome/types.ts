import {IRequestRow, KeyValue, PageProps, ResourceCollection} from "@/types";

export type TWelcomePage = PageProps<{
  requests: ResourceCollection<IRequestRow>,
  labels: Record<string, string>
  statuses: KeyValue[]
  years: KeyValue[]
  filters: {
    search: string
    status: string
    year: string
  }
}>
