import { signin_google } from "../api/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function useLoginGoogle() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { access_token: string }) => signin_google(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["google_signin"] });
    },
  });
  return mutation;
}
