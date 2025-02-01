import {IOrganization} from "@/types";
import {useForm} from "@inertiajs/react";
import {Edit, useEditable, View} from "@/Components/Editable";
import {Icon} from "@/Components";
import {Input} from "@/Components/Form";

type Props = {
  organization: IOrganization
}

export default function OrganizationForm({organization}: Props) {
  const {edit, setEdit} = useEditable();

  const {data, setData, put, delete: deleteForm, errors} = useForm({
    name: organization.name,
    inn: organization.inn,
    kpp: organization.kpp
  });

  const onDelete = () => {
    if(!confirm('Точно удалить?'))
      return;
    deleteForm(route('organization.destroy', [organization.id]), {
      preserveScroll: true
    })
  }
  const onSave = () => {
    put(route('organization.update', [organization.id]), {
      onSuccess: () => setEdit(false),
      preserveScroll: true
    })
  }

  return <tr className="director-form">
    <td>
      <Edit>
        <Input label="Название" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} showLabel={false}/>
      </Edit>
      <View>
        {organization.name}
      </View>
    </td>
    <td>
      <Edit>
        <Input label="ИНН" value={data.inn} onChange={(e) => setData('inn', e.target.value)} error={errors.inn} showLabel={false}/>
      </Edit>
      <View>
        {organization.inn}
      </View>
    </td>
    <td>
      <Edit>
        <Input label="КПП" value={data.kpp} onChange={(e) => setData('kpp', e.target.value)} error={errors.kpp} showLabel={false}/>
      </Edit>
      <View>
        {organization.kpp}
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
