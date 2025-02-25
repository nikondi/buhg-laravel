import {FormEventHandler} from "react";
import {useForm} from "@inertiajs/react";
import {Input} from "@/Components/Form";
import {Button} from "@/Components";

type Props = {
  decline: () => void
}

export default function Create({decline}: Props) {
  const {data, setData, post, errors} = useForm({
    name: '',
    kpp: '',
    inn: '',
    short_name: ''
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('organization.store'), {
      onSuccess: decline,
      preserveScroll: true
    });
  }

  return <form onSubmit={handleSubmit} className="my-5 border shadow p-5 rounded-md">
    <div className="flex flex-wrap gap-x-3 mb-2">
      <Input label="Название" value={data.name} onChange={(e) => setData('name', e.target.value)} required/>
      <Input label="Короткое название" value={data.short_name} onChange={(e) => setData('short_name', e.target.value)} required/>
    </div>
    <div className="flex flex-wrap gap-x-3 mb-2">
      <Input label="ИНН" value={data.inn} onChange={(e) => setData('inn', e.target.value)} required error={errors.inn}/>
      <Input label="КПП" value={data.kpp} onChange={(e) => setData('kpp', e.target.value)} required error={errors.kpp}/>
    </div>
    <div className="mt-4 flex gap-x-3">
      <Button type="submit" className="!w-[200px]">Добавить</Button>
      <Button type="button" className="!w-[150px] btn--outline" onClick={decline}>Отмена</Button>
    </div>
  </form>
}
