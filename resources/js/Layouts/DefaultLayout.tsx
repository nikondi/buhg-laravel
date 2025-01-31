import {PropsWithChildren} from "react";
import {Header} from "@/Parts";
import {Head, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

export default function DefaultLayout({children}: PropsWithChildren) {
  const {title} = usePage<PageProps>().props;
  return <div className="page-wrapper">
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <div className="page-content">
      {children}
    </div>
  </div>
}
