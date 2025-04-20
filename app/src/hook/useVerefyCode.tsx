import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verefy_post } from "../api/Auth";
export default function useVerefyCode({
  email,
  code,
}: {
  email: string;
  code: number;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => verefy_post({ email, code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verefyCode"] });
    },
  });
  return mutation;
}
