import { registration_user } from "../api/Auth";
import User from "../types/FormType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function useRegistration(data: User) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => registration_user(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
    },
  });
  return mutation;
}
