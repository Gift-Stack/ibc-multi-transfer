import { useAtomValue, useSetAtom } from "jotai";
import { storeAtom } from "../store";
import { useEffect } from "react";
import { getBalance } from "../keplr";

export const useBalance = () => {
  const { address, balance, fetching } = useAtomValue(storeAtom);
  const setStore = useSetAtom(storeAtom);

  useEffect(() => {
    if (!address) return;
    getBalance()
      .then((balance_) => {
        setStore({ address, balance: balance_, fetching: false });
      })
      .catch(() => {
        setStore({ address, balance, fetching: false });
      });
  }, [address]);

  return {
    data: balance,
    fetching,
  };
};
