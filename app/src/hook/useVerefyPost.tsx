import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCode } from "../api/Auth";
export default function useVerefyPost({ email }: { email: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => sendCode({ email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verefyPost"] });
    },
  });
  return mutation;
}
