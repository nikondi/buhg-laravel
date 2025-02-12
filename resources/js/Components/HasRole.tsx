import {PropsWithChildren} from "react";
import {IUser} from "@/types";
import {useAuth} from "@/hooks";

type Props = PropsWithChildren<{
  roles: IUser['role']|IUser['role'][]
}>

export default function HasRole({roles, children}: Props) {
  const {user} = useAuth();
  if(!user)
    return;
  if(typeof roles == 'string')
    roles = [roles];

  if(roles.filter((role) => user.role == role).length == 0)
    return;

  return children;
}
