import {IOrganization} from "@/types";
import {Editable} from "@/Components/Editable";
import OrganizationForm from "./OrganizationForm";

type Props = {
  organization?: IOrganization
}

export default function OrganizationRow({organization}: Props) {
  return <Editable>
    <OrganizationForm organization={organization}/>
  </Editable>
}


