import { useQuery } from "@tanstack/react-query";
import { authentication } from "../api/Auth";

export default function useAuntification() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () => authentication(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  return user
}
