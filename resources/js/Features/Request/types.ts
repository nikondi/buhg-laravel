import {IOrganization, PageProps, ResourceCollection} from "@/types";

export type TOrganizationIndexPage = PageProps<{
  organizations: ResourceCollection<IOrganization>
}>
