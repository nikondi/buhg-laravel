import {HeaderActions} from "@/Parts/Header";
import {FormEventHandler} from "react";
import {Button} from "@/Components";
import {IUser} from "@/types";
import {useForm} from "@inertiajs/react";
import {Input, Select} from "@/Components/Form";
import toast from "react-hot-toast";

type Props = {
  user: IUser
}

export default function Index({user}: Props) {
  const {data, setData, put, errors} = useForm({
    name: user.name,
    email: user.email,
    login: user.login,
    password: '',
    password_confirmation: '',
    role: user.role
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const toast_id = toast.loading('Сохранение...');
    put(route('user.update', [user.id]), {
      preserveScroll: true,
      onSuccess: () => toast.success('Сохранено'),
      onFinish: () => toast.dismiss(toast_id)
    });
  }

  return <>
    <HeaderActions/>
    <div className="container">
      <form onSubmit={handleSubmit} id="save-form" className="my-5 border shadow p-5 rounded-md" autoComplete="off">
        <div className="flex flex-wrap gap-x-3 mb-2">
          <Input label="Имя" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name}
                 required/>
          <Input label="Логин" value={data.login} onChange={(e) => setData('login', e.target.value)} error={errors.login}
                 required/>
          <Input label="Почта" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                 error={errors.email} required/>
        </div>
        <div className="flex flex-wrap gap-x-3 mb-2">
          <Input label="Пароль" type="password" value={data.password}
                 onChange={(e) => setData('password', e.target.value)}
                 error={errors.password} required/>
          <Input label="Подтверждение пароля" type="password" value={data.password_confirmation}
                 onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation}
                 required/>
          <Select label="Роль" value={data.role} onChange={(e) => setData('role', e.target.value as IUser['role'])}>
            <option value="admin">Администратор</option>
            <option value="manager">Менеджер</option>
          </Select>
        </div>
        <div className="mt-4 flex gap-x-3">
          <Button type="submit" className="!w-[200px]">Сохранить</Button>
        </div>
      </form>
    </div>
  </>
}
