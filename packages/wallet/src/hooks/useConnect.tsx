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

  useEffect(() => {
    connectKeplr({ setError, setAccount })
      .then(() => {
        setStore((rest) => ({ ...rest, fetching: false }));
      })
      .catch((e) => {
        setStore((rest) => ({ ...rest, fetching: false }));
      });
  }, []);

  return {
    connect: () => connectKeplr({ setError, setAccount }),
    isConnected: !!account,
    account: account,
    error,
  };
};
