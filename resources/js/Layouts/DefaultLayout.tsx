import {PropsWithChildren} from "react";
import {Header} from "@/Parts";
import {Head, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Toaster} from "react-hot-toast";
import {PopupsProvider} from "@/Contexts/PopupsContext";

export default function DefaultLayout({children}: PropsWithChildren) {
  const {title} = usePage<PageProps>().props;
  return <PopupsProvider>
    <div className="page-wrapper">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="page-content">
        {children}
      </div>
      <Toaster toastOptions={{
        position: 'bottom-right',
        style: {
          background: 'rgba(0,0,0,.7)',
          backdropFilter: 'blur(10px)',
          color: '#ffffff'
        }
      }}/>
    </div>
  </PopupsProvider>
}
