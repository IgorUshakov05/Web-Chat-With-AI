import { useMutation, useQueryClient } from "@tanstack/react-query";
import { get_all_chats } from "../api/Chat";

export default function useAllChat() {
  const queryClient = useQueryClient();

  const mutation =  useMutation({
    mutationFn: () => get_all_chats(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_chat"] });
    },
  });
  return mutation
}
