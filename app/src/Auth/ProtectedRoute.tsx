import { JSX, useEffect } from "react";
import useAuntification from "../hook/useAuntification";
import { authStore } from "../store";

interface ProtectProps {
  children: JSX.Element;
}
export default function Protect({ children }: ProtectProps) {
  const { data, isPending } = useAuntification();
  useEffect(() => {
    authStore.setWaitAuth(isPending);
    authStore.setAuth(Boolean(data?.success));
  }, [data, isPending]);
  return children;
}
