import {Input} from "@/Components/Form";
import Button from "@/Components/Button";
import {useForm} from "@inertiajs/react";
import {HeaderActions} from "@/Parts/Header";
import {FormEventHandler} from "react";
import {mergeClass} from "@/helpers";

export default function Login() {
  const {data, setData, errors, setError, post, processing} = useForm({
    login: '',
    password: ''
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login.handle'), {
      onBefore: () => setError(null),
    });
  }

  return <>
    <HeaderActions/>
    <div className="h-full flex p-2 items-center justify-center">
      <div className={mergeClass("p-4 w-[350px] border border-gray-300 rounded-md transition", processing && "pointer-events-none opacity-75")}>
        <form className="form" method="post" onSubmit={handleSubmit}>
          <Input label="Логин" value={data.login} onChange={(e) => setData('login', e.target.value)} error={errors.login}/>
          <Input label="Пароль" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password}/>

          <Button type="submit" className="mt-5" disabled={processing}>Войти</Button>
        </form>
      </div>
    </div>
  </>
}
