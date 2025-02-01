import {FormEventHandler} from "react";
import {useForm, usePage} from "@inertiajs/react";
import {Input, Select} from "@/Components/Form";
import {TDirectorIndexPage} from "@/Features/Director/types";
import {Button} from "@/Components";

type Props = {
  decline: () => void
}

export default function Create({decline}: Props) {
  const {labels} = usePage<TDirectorIndexPage>().props;
  const {data, setData, post} = useForm({
    type: '1',
    surname: '',
    name: '',
    lastname: '',
    document: ''
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('director.store'), {
      onSuccess: decline,
      preserveScroll: true
    });
  }

  return <form onSubmit={handleSubmit} className="my-5 border shadow p-5 rounded-md">
    <div className="flex flex-wrap gap-x-3 mb-2">
      <Input label="Фамилия" value={data.surname} onChange={(e) => setData('surname', e.target.value)} required/>
      <Input label="Имя" value={data.name} onChange={(e) => setData('name', e.target.value)} required/>
      <Input label="Отчетство" value={data.lastname} onChange={(e) => setData('lastname', e.target.value)}/>
    </div>
    <div className="flex flex-wrap gap-x-3">
      <Select label="Признак лица" onChange={(e) => setData('type', e.target.value)} value={data.type}>
        {Object.entries(labels).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
      </Select>
      <Input label="Документ, подтверждающий полномочия" value={data.document} onChange={(e) => setData('document', e.target.value)} required/>
    </div>
    <div className="mt-4 flex gap-x-3">
      <Button type="submit" className="!w-[200px]">Добавить</Button>
      <Button type="button" className="!w-[150px] btn--outline" onClick={decline}>Отмена</Button>
    </div>
  </form>
}
