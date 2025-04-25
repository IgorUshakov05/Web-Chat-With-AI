import { JSX } from "react";
import { authStore } from "../store";

interface ProtectProps {
  children: JSX.Element;
}
export default function ProtectNotRequire({ children }: ProtectProps) {
  let acccess_token = localStorage.getItem("access");
  let refresh_token = localStorage.getItem("refresh");
  if (!acccess_token || !refresh_token) {
    authStore.setWaitAuth(false);
    authStore.setAuth(false);
  } else {
    authStore.setWaitAuth(true);
    authStore.setAuth(true);
  }
  return children;
}
