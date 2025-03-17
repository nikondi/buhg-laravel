import {HeaderActions, HeaderTitle} from "@/Parts/Header";
import React from "react";
import {Deferred} from "@inertiajs/react";
import {FilterForm, List} from "@/Features/Welcome/partials";
import {Skeleton} from "@/Components";

export default function Welcome() {
  return <>
    <HeaderActions>
      <HeaderTitle/>
      <FilterForm />
    </HeaderActions>

    <div className="container mt-5">
      <Deferred data="requests" fallback={<Skeleton style={{height: 400, marginTop: 64}}/>}>
        <List/>
      </Deferred>
    </div>
  </>
}
