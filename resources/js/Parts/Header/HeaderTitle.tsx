import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

export default function HeaderTitle() {
  const {title, pageTitle} = usePage<PageProps>().props;

  return <div className="header-actions__title">{title || pageTitle}</div>
}
