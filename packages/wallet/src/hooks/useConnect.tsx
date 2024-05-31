import { useEffect } from "react";
import { connectKeplr } from "../utils/keplr";
import { useQuery } from "@tanstack/react-query";

export const useConnect = () => {
  if (typeof window === "undefined") {
    return {
      connect: () => {},
      disconnect: () => {},
      isConnected: false,
      account: undefined,
      error: "",
    };
  }

  let milkywayConnectedAccounts = window.localStorage.getItem(
    "milkywayConnectedAccounts"
  );

  const {
    data: account,
    error,
    refetch: connectWallet,
  } = useQuery({
    queryKey: ["account"],
    queryFn: connectKeplr,
    enabled: !!milkywayConnectedAccounts,
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", () => {
      connectWallet();
    });
  }, []);

  return {
    connect: connectWallet,
    disconnect: () => {},
    isConnected: !!account,
    account: account,
    error: error?.message || "An error occurred, please refresh the page",
  };
};
