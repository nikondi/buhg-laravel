import {usePage} from "@inertiajs/react";
import {TWelcomePage} from "@/Features/Welcome/types";
import {TRequestStatus} from "@/types";
import {mergeClass} from "@/helpers";
import {useMemo} from "react";

type Props = {
  status: TRequestStatus
}

export default function Status({status}: Props) {
  const {statuses} = usePage<TWelcomePage>().props;

  const color = useMemo(() => {
    switch (status) {
      case "new":
        return 'bg-yellow-300';
      case "downloaded_xml":
      case "done":
        return 'bg-green-500';
      case "declined":
        return 'bg-red-500';
      case "in_work":
      case "duplicate":
        return 'bg-cyan-500';
      default:
        return 'bg-gray-400';
    }
  }, [status]);

  return <span className={mergeClass("inline-block rounded px-2.5 py-1", color)}>
    {statuses[status] || status}
  </span>
}
