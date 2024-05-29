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
    setStore((rest) => ({ ...rest, fetching: true }));
    connectKeplr({ setError, setAccount })
      .then(() => {
        setStore((rest) => ({ ...rest, fetching: false }));
      })
      .catch(() => {
        setStore((rest) => ({ ...rest, fetching: false }));
      });
  };

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", () => {
      connectWallet();
    });
  }, []);

  return {
    connect: connectWallet,
    isConnected: !!account,
    account: account,
    error,
  };
};
