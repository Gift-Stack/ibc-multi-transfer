import { useAtomValue, useSetAtom } from "jotai";
import { storeAtom } from "../store";
import { useEffect } from "react";
import { getBalance } from "../keplr";

export const useBalance = () => {
  const { address, balance, fetching } = useAtomValue(storeAtom);
  const setStore = useSetAtom(storeAtom);

  const fetchBalance = async () => {
    try {
      setStore((rest) => ({ ...rest, fetching: true }));
      const balance_ = await getBalance();
      setStore((rest) => ({ ...rest, balance: balance_, fetching: false }));
    } catch (error) {
      setStore((rest) => ({ ...rest, fetching: false }));
    }
  };

  useEffect(() => {
    if (!address) return;

    fetchBalance();
  }, [address]);

  return {
    data: balance,
    fetchBalance,
    fetching,
  };
};
