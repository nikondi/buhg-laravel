import {IDirector} from "@/types";
import {Editable} from "@/Components/Editable";
import DirectorForm from "./DirectorForm";

type Props = {
  director?: IDirector
}

export default function DirectorRow({director}: Props) {
  return <Editable>
    <DirectorForm director={director}/>
  </Editable>
}


