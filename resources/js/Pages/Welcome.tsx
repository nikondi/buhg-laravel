import {ResourceCollection} from "@/types";
import {HeaderActions, HeaderTitle} from "@/Parts/Header";

type Props = {
  requests: ResourceCollection<Request>
}

export default function Welcome({}: Props) {
  return <>
    <HeaderActions>
      <HeaderTitle/>
    </HeaderActions>
  </>
}
