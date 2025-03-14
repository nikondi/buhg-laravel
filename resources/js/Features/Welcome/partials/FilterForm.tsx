import {useForm, usePage} from "@inertiajs/react";
import {TWelcomePage} from "@/Features/Welcome/types";
import {ChangeEventHandler, FormEventHandler, useEffect, useState} from "react";
import {KeyValue} from "@/types";
import {mergeClass} from "@/helpers";
import toast from "react-hot-toast";

export default function FilterForm() {
  const {filters, years, statuses} = usePage<TWelcomePage>().props;
  const {get, data, setData, transform, cancel} = useForm(filters);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    cancel();
    transform((data) => {
      const res = {};
      // @ts-ignore
      Object.entries(data).forEach(([key, value]) => value && (res[key] = value));
      return res;
    });

    const toast_id = toast.loading('Загрузка заявок');
    get(route('welcome'), {
      only: ['requests', 'filters'],
      onFinish: () => {
        toast.dismiss(toast_id);
      }
    });
  }

  return <form onSubmit={handleSubmit} className="filter-form" method="GET">
    <Select options={years} value={data.year} onChange={(val) => setData('year', val)} placeholder="- Отчётный год"/>
    <Select
      options={Object.entries(statuses).map(([key, value]) => ({key, value}))} value={data.status}
      onChange={(val) => setData('status', val)}
      placeholder="- Статус"/>
    <input type="text" onChange={(e) => setData('query', e.target.value)} value={data.query} placeholder="Поиск..."/>
    <button type="submit">
      <svg width="1em" height="1em" viewBox="0 0 56.966 56.966"><path d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" fill="currentColor"/></svg>
    </button>
  </form>
}

type SelectProps = {
  options: KeyValue[]
  onChange?: (value: string) => void
  value: string
  placeholder?: string
}

function Select({options, value, onChange: propOnChange, placeholder}: SelectProps) {
  const [empty, setEmpty] = useState(!!value);

  useEffect(() => {
    setEmpty(!value);
  }, [value]);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (propOnChange)
      propOnChange(e.target.value);
  };

  return <select onChange={onChange} className={mergeClass(empty && "filter-form__select--empty")} value={value}>
    <option value="">{placeholder || "Не выбрано"}</option>
    {options && options.map((option) => <option value={option.key} key={option.key}>{option.value}</option>)}
  </select>
}
