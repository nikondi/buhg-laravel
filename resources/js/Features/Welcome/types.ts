import {IRequestRow, PageProps, ResourceCollection} from "@/types";

export type TWelcomePage = PageProps<{
  requests: ResourceCollection<IRequestRow>,
  labels: Record<string, string>
}>
