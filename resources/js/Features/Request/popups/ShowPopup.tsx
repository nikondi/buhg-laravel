import {Background, Close, Loading, Popup} from "@/Components/Popup";
import {PropsWithChildren, useEffect, useState} from "react";
import axios from "axios";
import {IRequestShow} from "@/types";
import {CopyText, Fancybox, Icon} from "@/Components";
import {copyToClipboard, formatPhone, formatPrice} from "@/helpers";
import toast from "react-hot-toast";
import Info from "@/Components/Info";
import {XMLDownload} from "@/Features/Request/components";

type Props = {
  request_id: number
}

export default function ShowPopup({request_id}: Props) {
  const [request, setRequest] = useState<IRequestShow>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(route('request.show', [request_id]))
      .then(({data}) => setRequest(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return <Popup className="request-show-popup">
    <Background/>
    <div className="popup__content-wrapper">
      <Close/>
      <div className="popup__content">
        {!loading
          ? (
            !error && request
              ? <>
                <div className="mb-3 flex justify-between items-center mt-3">
                  <div className="flex gap-x-2">
                    <a href={route('request.excel', [request.id])} target="_blank" className="btn btn--small !inline-flex items-center gap-x-2 !bg-green-600 !border-green-600 hover:!bg-green-700 hover:!border-green-700">
                      <Icon icon="excel"/>
                      Скачать Excel
                    </a>
                    <XMLDownload request_id={request.id} />
                  </div>
                  <div className="text-xl text-orange-500"><CopyText text={request.number}>#{request.number}</CopyText>
                  </div>
                </div>
                {request.files.length > 0 &&
                  <Fancybox className="border p-3 border-gray-500 mb-5">
                    <div className="mb-2 font-semibold">Вложения</div>
                    <div className="flex gap-x-2 flex-wrap">
                      {request.files.map((link, i) => <div><a href={link.url} data-fancybox="files" key={link.key} className="text-blue-600 underline underline-offset-4 transition-colors duration-200 hover:text-blue-700">{link.label}</a>{i < request.files.length - 1 && ','}</div>)}
                    </div>
                  </Fancybox>
                }

                <div className="request-show__title">Информация о заявке</div>
                <table className="request-show-table">
                  <tbody>
                  <tr>
                    <td>Договор</td>
                    <td>
                      <table>
                        <tbody>
                        <tr>
                          <td className="pr-2 py-0.5">Номер:</td>
                          <td><CopyText text={request.contract_number}>{request.contract_number}</CopyText></td>
                        </tr>
                        <tr>
                          <td className="pr-2 py-0.5">Сумма расходов:</td>
                          <td>{formatPrice(request.contract_cost)} <span className="text-orange-500">₽</span></td>
                        </tr>
                        <tr>
                          <td className="pr-2 py-0.5">Дата:</td>
                          <td>{request.contract_date}</td>
                        </tr>
                        </tbody>
                      </table>

                    </td>
                  </tr>
                  <tr>
                    <td>Ответственный</td>
                    <td>
                      <p className="text-gray-600">{request.director.type}</p>
                      <p>{request.director.fio}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Форма обучения</td>
                    <td>{request.education_type}</td>
                  </tr>
                  <tr>
                    <td>Вид запроса</td>
                    <td>{request.pickup_type_label}</td>
                  </tr>
                  <tr>
                    <td>Отчетный год</td>
                    <td>{request.report_year}</td>
                  </tr>
                  </tbody>
                </table>

                <div className="request-show__title mt-4">Информация о плательщике</div>
                <table className="request-show-table">
                  <tbody>
                  <tr>
                    <td>ФИО</td>
                    <td>{request.fio}</td>
                  </tr>
                  <tr>
                    <td>ИНН</td>
                    <td>{request.inn}</td>
                  </tr>
                  <tr>
                    <td>Дата рождения</td>
                    <td>{request.birthdate}</td>
                  </tr>
                  <tr>
                    <td>Документ</td>
                    <td>
                      <p className="leading-4 mb-2">{request.doc_type}</p>
                      <p>{request.doc_number} <span>({request.doc_date})</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td>Контактная информация</td>
                    <td>
                      <div><CopyContact text={request.email}><a
                        href={"mailto:" + request.email}>{request.email}</a></CopyContact></div>
                      <div><CopyContact text={'+7' + request.phone}><a
                        href={"tel:+7" + request.phone}>{formatPhone(request.phone)}</a></CopyContact></div>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div className="request-show__title mt-4">Информация о студенте</div>
                {request.same_student
                  ? <Info>
                    Налогоплательщик и обучаемый являются одним лицом
                  </Info>
                  : <table className="request-show-table">
                    <tbody>
                    <tr>
                      <td>ФИО</td>
                      <td>{request.student_fio}</td>
                    </tr>
                    <tr>
                      <td>ИНН</td>
                      <td>{request.student_inn}</td>
                    </tr>
                    <tr>
                      <td>Дата рождения</td>
                      <td>{request.student_birthdate}</td>
                    </tr>
                    <tr>
                      <td>Документ</td>
                      <td>
                        <p className="leading-4 mb-2">{request.student_doc_type}</p>
                        <p>{request.student_doc_number} <span>({request.student_doc_date})</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td>Контактная информация</td>
                      <td>
                        <div><CopyContact text={'+7' + request.student_phone}><a
                          href={"tel:+7" + request.student_phone}>{formatPhone(request.student_phone)}</a></CopyContact>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                }
              </>
              : <div className="text-center h-full text-xl text-red-600 mt-5">Произошла ошибка</div>
          )
          : <Loading/>
        }
      </div>
    </div>
  </Popup>
}

function CopyContact({children, text}: PropsWithChildren<{ text: string }>) {
  const copy = () => {
    copyToClipboard(text)
      .then(() => toast.success('Текст скопирован'))
      .catch(() => toast.error('Ошибка при копировании'));
  }

  return <div className="copy-contact">
    <div>{children}</div>
    <button onClick={copy}>
      <Icon icon="copy"/>
    </button>
  </div>
}
