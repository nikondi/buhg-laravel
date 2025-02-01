import {IRequest, ResourceCollection} from "@/types";

export type TWelcomePage = {
  requests: ResourceCollection<IRequest>,
  labels: Record<string, string>
}
