import { useQuery } from "@tanstack/react-query";
import { get_messages_on_chat } from "../api/Chat";

export default function useCurrentChat(chatID: string) {
  return useQuery({
    queryKey: ["current_chat", chatID],
    staleTime: 5 * 60 * 1000,
    queryFn: () => get_messages_on_chat(chatID),
  });
}
