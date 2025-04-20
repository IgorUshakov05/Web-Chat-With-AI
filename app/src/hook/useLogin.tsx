import { login_user } from "../api/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputData } from "../types/InputForm";
export default function useLogin(data: InputData) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => login_user(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
  return mutation;
}
