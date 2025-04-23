import { useQuery } from "@tanstack/react-query";
import { get_all_chats } from "../api/Chat";


export default function useAllChat() {
  return useQuery({ queryKey: ["get_all_chat"], queryFn: get_all_chats });
}
