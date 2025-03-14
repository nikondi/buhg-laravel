import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import React from "react";
import {Deferred} from "@inertiajs/react";
import {FilterForm, List} from "@/Features/Welcome/partials";
import {Skeleton} from "@/Components";


/*{filters && <form className="w-full flex gap-x-2 items-end shadow p-3 mt-2 rounded-md" onSubmit={handleSubmit}>
  {/!*<Input label="Поиск" value={data.search} onChange={(e) => setData('search', e.target.value)}/>*!/}
  <Select label="Отчетный год" value={data.year} onChange={(e) => setData('year', e.target.value)}>
    <option value="">-- Не выбрано</option>
    {years.map(({key, value}) => <option key={key} value={key}>{value}</option>)}
  </Select>
  <Select label="Статус" value={data.status} onChange={(e) => setData('status', e.target.value)}>
    <option value="">-- Не выбрано</option>
    {Object.entries(statuses).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
  </Select>
  <Button type="submit" className="h-[35px] !w-[150px]">Поиск</Button>
</form>}*/


export default function Welcome() {
  return <>
    <HeaderActions>
      <HeaderTitle/>
      <FilterForm />
    </HeaderActions>

    <div className="container mt-5">
      <Deferred data="requests" fallback={<Skeleton style={{height: 400, marginTop: 48}}/>}>
        <List/>
      </Deferred>
    </div>
  </>
}
