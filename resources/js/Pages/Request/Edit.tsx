import {TRequestEditPage} from "@/Features/Request/types";
import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import {Deferred, Link, WhenVisible} from "@inertiajs/react";
import {Fancybox, Icon, Skeleton} from "@/Components";
import {XMLDownload} from "@/Features/Request/components";
import {Comments, Form, HistoryList} from "@/Features/Request/partials";
import React, {useState} from "react";

export default function Edit({request}: TRequestEditPage) {
  const [tab, setTab] = useState('main')
  return <>
    <HeaderActions>
      <div className="flex gap-x-2">
        <Link href={route('welcome')} className="header-actions__link">Вернуться к списку</Link>
        <HeaderTitle/>
      </div>
      <div className="flex gap-x-2">
        <a href={route('request.excel', [request.id])} target="_blank" className="btn btn--small !inline-flex items-center gap-x-2 !bg-green-600 !border-green-600 hover:!bg-green-700 hover:!border-green-700">
          <Icon icon="excel"/>
          Скачать Excel
        </a>
        <XMLDownload request_id={request.id} className="xml-download-dropdown"/>
      </div>
    </HeaderActions>
    <div className="container">
      <div className="request-tabs">
        <button type="button" className={tab == 'main'?'active':''} onClick={() => setTab('main')}>Заявка</button>
        <button type="button" className={tab == 'history'?'active':''} onClick={() => setTab('history')}>История изменений</button>
      </div>
    </div>
    <div className="container my-5">
      {tab == 'main' && <Form/>}
      {tab == 'history' && <WhenVisible data="history" fallback={<Skeleton style={{height: 400}}/>}>
        <HistoryList/>
      </WhenVisible>}

    </div>
    <div className="container my-5">
      {request.files.length > 0 &&
        <Fancybox className="border p-3 border-gray-500 mb-5">
          <div className="mb-2 font-semibold">Вложения</div>
          <div className="flex gap-x-3 flex-wrap">
            {request.files.map((link, i) => <div><a href={link.url} data-fancybox="files" key={link.key} className="text-blue-600 underline underline-offset-4 transition-colors duration-200 hover:text-blue-700">{link.label}</a>{i < request.files.length - 1 && ','}</div>)}
          </div>
        </Fancybox>
      }
    </div>
    <div className="container my-7">
      <Deferred data="comments" fallback={<Skeleton style={{height: 400}}/>}>
        <Comments/>
      </Deferred>
    </div>

  </>
}

