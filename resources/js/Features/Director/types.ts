import {IDirector, PageProps, ResourceCollection} from "@/types";

export type TDirectorIndexPage = PageProps<{
  directors: ResourceCollection<IDirector>
  labels: Record<string, string>
}>
