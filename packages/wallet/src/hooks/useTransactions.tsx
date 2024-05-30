import { useEffect } from "react";
import { getTransactions, sendBalance } from "../keplr";
import { useAtomValue, useSetAtom } from "jotai";
import { storeAtom } from "../store";
import { useBalance } from "./useBalance";

export const useTransactions = () => {
  const { address, transactionInProgress } = useAtomValue(storeAtom);
  const { fetchBalance } = useBalance();
  const setStore = useSetAtom(storeAtom);

  useEffect(() => {
    if (address) {
      getTransactions(address).then((transactions) => {
        setStore((rest) => ({ ...rest, transactions }));
      });
    }
  }, [address]);

  const sendSingleTransaction = async () => {
    setStore((rest) => ({ ...rest, transactionInProgress: true }));
    await sendBalance(address!, "0.0001");
    await fetchBalance();
    setStore((rest) => ({ ...rest, transactionInProgress: false }));
  };

  return {
    loading: transactionInProgress,
    transactions: [],
    sendSingleTransaction,
    sendMultipleTransactions: () => {},
  };
};
