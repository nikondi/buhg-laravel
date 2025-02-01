import {IDirector} from "@/types";
import {TDirectorIndexPage} from "../types";
import {useForm, usePage} from "@inertiajs/react";
import {Edit, useEditable, View} from "@/Components/Editable";
import {Icon} from "@/Components";
import {Input, Select} from "@/Components/Form";

export default function DirectorForm({director}: {director: IDirector}) {
  const {labels} = usePage<TDirectorIndexPage>().props
  const {edit, setEdit} = useEditable();

  const {data, setData, put, delete: deleteForm} = useForm({
    name: director.name,
    surname: director.surname,
    lastname: director.lastname || '',
    type: director.type,
    document: director.document
  });

  const onDelete = () => {
    if(!confirm('Точно удалить?'))
      return;
    deleteForm(route('director.destroy', [director.id]), {
      preserveScroll: true
    })
  }
  const onSave = () => {
    put(route('director.update', [director.id]), {
      onSuccess: () => setEdit(false),
      preserveScroll: true
    })
  }

  return <tr className="director-form">
    <td>
      <Edit>
        <Select label="" showLabel={false} value={data.type} onChange={(e) => setData('type', e.target.value)}>
          {Object.entries(labels).map(([key, value]) => <option value={key} key={key}>{value}</option>)}
        </Select>
      </Edit>
      <View>
        {labels[director.type]}
      </View>
    </td>
    <td className="director-form__fio">
      <Edit>
        <div className="flex gap-x-2 flex-wrap">
          <Input label="Фамилия" value={data.surname} onChange={(e) => setData('surname', e.target.value)} showLabel={false}/>
          <Input label="Имя" value={data.name} onChange={(e) => setData('name', e.target.value)} showLabel={false}/>
          <Input label="Отчество" value={data.lastname} onChange={(e) => setData('lastname', e.target.value)} showLabel={false}/>
        </div>
      </Edit>
      <View>
        {director.surname} {director.name} {director.lastname}
      </View>
    </td>
    <td>
      <Edit>
        <Input label="Документ" value={data.document} onChange={(e) => setData('document', e.target.value)} showLabel={false}/>
      </Edit>
      <View>
        {director.document}
      </View>
    </td>
    <td>
      <div className="flex gap-x-1 justify-end">
        <Edit>
          <button onClick={onDelete} className="director-form__button">
            <Icon icon="trash" size="1.2em"/>
          </button>
          <button onClick={onSave} className="director-form__button">
            <Icon icon="check" size="1.25em"/>
          </button>
        </Edit>
        <button onClick={() => setEdit((prev) => !prev)} className="director-form__button">
          {edit
            ? <Icon icon="close"/>
            : <Icon icon="edit"/>
          }
        </button>
      </div>
    </td>
  </tr>
}
