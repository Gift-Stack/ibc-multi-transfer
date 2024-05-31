import { getBalance } from "../utils/balance";
import { useQuery } from "@tanstack/react-query";
import { useConnect } from "./useConnect";

export const useBalance = () => {
  const { account } = useConnect();

  const {
    data: balance,
    isLoading: fetchingBalance,
    refetch: fetchBalance,
  } = useQuery({
    queryKey: ["balance", account],
    queryFn: getBalance,
    enabled: !!account,
  });

  return {
    data: balance,
    fetchBalance,
    fetchingBalance,
  };
};
