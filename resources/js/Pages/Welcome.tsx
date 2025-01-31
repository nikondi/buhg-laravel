import {ResourceCollection} from "@/types";
import {HeaderActions, HeaderTitle} from "@/Parts/Header";

type Props = {
  requests: ResourceCollection<Request>
}

export default function Welcome() {
  return <>
    <HeaderActions>
      <HeaderTitle/>
    </HeaderActions>
  </>
}
