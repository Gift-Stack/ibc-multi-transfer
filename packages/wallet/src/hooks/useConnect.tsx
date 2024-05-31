import { useEffect } from "react";
import { connectKeplr } from "../keplr";
import { useQuery } from "@tanstack/react-query";

export const useConnect = () => {
  const {
    data: account,
    error,
    refetch: connectWallet,
  } = useQuery({
    queryKey: ["account"],
    queryFn: connectKeplr,
  });

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", () => {
      connectWallet();
    });
  }, []);

  return {
    connect: connectWallet,
    isConnected: !!account,
    account: account,
    error: error?.message || "An error occurred, please refresh the page",
  };
};
