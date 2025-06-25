import { useMutation, useQuery } from "@tanstack/react-query";
import { authentication } from "../api/Auth";
import { useNavigate } from "react-router-dom";
import { open_new_chat } from "../api/Chat";

export default function useRedirectToChat() {
  const navigate = useNavigate();
  const newChat = useMutation({
    mutationKey: ["new chat"],
    mutationFn: open_new_chat,
    onSuccess: (data) => {
      navigate(`/chat/${data.chat_id}`);
    },
  });
  const user = useQuery({
    queryKey: ["user"],
    queryFn: authentication,
    retry: false,
  });
  return { user, newChat };
}
