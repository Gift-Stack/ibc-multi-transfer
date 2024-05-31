import { useEffect, useState } from "react";
import { connectKeplr } from "../keplr";
import { storeAtom } from "../store";
import { useAtomValue, useSetAtom } from "jotai";

export const useConnect = () => {
  const [error, setError] = useState<string | null>(null);

  const { address: account } = useAtomValue(storeAtom);
  const setStore = useSetAtom(storeAtom);
  const setAccount = (address: string) =>
    setStore((rest) => ({ ...rest, address }));

  const connectWallet = () => {
    connectKeplr({ setError, setAccount });
  };

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", () => {
      connectWallet();
    });

    connectWallet();
  }, []);

  return {
    connect: connectWallet,
    isConnected: !!account,
    account: account,
    error,
  };
};
