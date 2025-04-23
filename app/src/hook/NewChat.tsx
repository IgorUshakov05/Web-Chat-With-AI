import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { open_new_chat } from "../api/Chat";

export const useNewChat = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["new chat"],
    mutationFn: open_new_chat,
    onSuccess: (data) => {
      navigate(`/chat/${data.chat_id}`);
    },
  });

  return { mutate };
};
