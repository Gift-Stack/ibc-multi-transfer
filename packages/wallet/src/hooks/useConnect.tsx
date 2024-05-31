import { useEffect } from "react";
import { connectKeplr, disconnectKeplr } from "../keplr";
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

  const { data: disconnected, refetch: disconnectWallet } = useQuery({
    queryKey: ["disconnect"],
    queryFn: disconnectKeplr,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", (e) => {
      connectWallet();
    });
  }, []);

  return {
    connect: connectWallet,
    disconnect: disconnectWallet,
    isConnected: !!account && !disconnected,
    account: disconnected ? undefined : account,
    error: error?.message || "An error occurred, please refresh the page",
  };
};
