import {IUser} from "@/types";
import {useMemo} from "react";

type Props = {
  user: IUser
}

export default function UserAvatar({user}: Props) {
  const initials = useMemo(() => {
    return user.name.split(' ').slice(0,2).map((str) => str.substring(0, 1).toUpperCase()).join('');
  }, [user]);
  return <div className="user-avatar">
    {initials}
  </div>
}
