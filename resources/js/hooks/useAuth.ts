import {PageProps} from "@/types";
import {usePage} from "@inertiajs/react";

export default function useAuth() {
  return usePage<PageProps>().props.auth;
};
