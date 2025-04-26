import { useMutation } from "@tanstack/react-query";
import { send_message_without_authification } from "../api/Chat";

export default function useMessageWithOutAuth(message: string) {
  console.log("useMessageWithOutAuth", message);
  return useMutation({
    mutationKey: ["messageWithoutAuth"],
    mutationFn: () => send_message_without_authification(message),
  });
}
