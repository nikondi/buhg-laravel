import {FormEventHandler} from "react";
import {useForm} from "@inertiajs/react";
import {Input, Select} from "@/Components/Form";
import {Button} from "@/Components";

type Props = {
  decline: () => void
}

export default function Create({decline}: Props) {
  const {data, setData, post, errors} = useForm({
    name: '',
    email: '',
    login: '',
    password: '',
    password_confirmation: '',
    role: 'manager',
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('user.store'), {
      onSuccess: decline,
      preserveScroll: true
    });
  }

  return <form onSubmit={handleSubmit} className="my-5 border shadow p-5 rounded-md">
    <div className="flex flex-wrap gap-x-3 mb-2">
      <Input label="Имя" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} required/>
      <Input label="Логин" value={data.login} onChange={(e) => setData('login', e.target.value)} error={errors.login} required/>
      <Input label="Почта" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} required/>
    </div>
    <div className="flex flex-wrap gap-x-3 mb-2">
      <Input label="Пароль" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password} required/>
      <Input label="Подтверждение пароля" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation} required/>
      <Select label="Роль" value={data.role} onChange={(e) => setData('role', e.target.value)}>
        <option value="admin">Администратор</option>
        <option value="manager">Менеджер</option>
      </Select>
    </div>
    <div className="mt-4 flex gap-x-3">
      <Button type="submit" className="!w-[200px]">Добавить</Button>
      <Button type="button" className="!w-[150px] btn--outline" onClick={decline}>Отмена</Button>
    </div>
  </form>
}
