import { useMutation } from "@tanstack/react-query";
import { delete_chat } from "../api/Chat";

export default function useDeleteChat(chatID: string) {
  return useMutation({
    mutationKey: ["deleteChat", chatID],

    mutationFn: () => delete_chat(chatID),
  });
}
