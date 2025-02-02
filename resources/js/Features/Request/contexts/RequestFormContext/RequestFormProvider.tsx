import {RequestFormContext} from "./RequestFormContext";
import {useForm} from "@inertiajs/react";
import {IRequest} from "@/types";
import {IRequestForm} from "@/Features/Request/types";
import {FormEventHandler, PropsWithChildren} from "react";
import toast from "react-hot-toast";

type Props = PropsWithChildren<{
  request: IRequest
  className?: string
}>

export default function RequestForm({request, children, className}: Props) {
  const {data, setData, errors, put} = useForm<IRequestForm>({
    comment: "",
    number: request.number || '',
    status: request.status || '',
    name: request.name || '',
    surname: request.surname || '',
    lastname: request.lastname || '',
    birthdate: request.birthdate || '',
    phone: request.phone || '',
    email: request.email || '',
    inn: request.inn || '',
    doc_type: request.doc_type || '',
    doc_number: request.doc_number || '',
    doc_date: request.doc_date || '',
    contract_number: request.contract_number || '',
    contract_date: request.contract_date || '',
    contract_cost: request.contract_cost || '',
    contract_year: request.contract_year || '',
    same_student: request.same_student || false,
    student_name: request.student_name || '',
    student_surname: request.student_surname || '',
    student_lastname: request.student_lastname || '',
    student_birthdate: request.student_birthdate || '',
    student_inn: request.student_inn || '',
    student_phone: request.student_phone || '',
    student_doc_type: request.student_doc_type || '',
    student_doc_number: request.student_doc_number || '',
    student_doc_date: request.student_doc_date || '',
    education_type: request.education_type || '',
    pickup_type: request.pickup_type || '',
    director_id: request.director_id,
    organization_id: request.organization_id
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const toast_id = toast.loading('Сохранение');
    put(route('request.update', [request.id]), {
      onSuccess: () => {
        toast.success('Запрос сохранен');
      },
      onFinish: () => {
        toast.dismiss(toast_id);
      }
    })
  }

  return <RequestFormContext.Provider value={{
    data, setData, errors
  }}>
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  </RequestFormContext.Provider>
}
