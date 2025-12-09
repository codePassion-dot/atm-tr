import { useQuery } from "@tanstack/react-query";
import { getLoggedUser } from "./server";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getLoggedUser,
    refetchOnWindowFocus: false,
  });
};
