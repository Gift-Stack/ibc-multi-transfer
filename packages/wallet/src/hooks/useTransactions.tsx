import { useEffect } from "react";
import { getTransactions, sendBalance } from "../keplr";
import { useAtomValue, useSetAtom } from "jotai";
import { storeAtom } from "../store";
import { useBalance } from "./useBalance";

export const useTransactions = () => {
  const { address, transactions, transactionInProgress } =
    useAtomValue(storeAtom);
  const { fetchBalance } = useBalance({ prefetch: false });
  const setStore = useSetAtom(storeAtom);

  useEffect(() => {
    if (address) {
      setStore((rest) => ({ ...rest, transactionInProgress: true }));
      getTransactions(address, (trx) =>
        setStore((rest) => ({ ...rest, transactions: trx }))
      ).then(() => {
        setStore((rest) => ({ ...rest, transactionInProgress: false }));
      });
    }
  }, [address]);

  const sendSingleTransaction = async (amount: `${number}`) => {
    setStore((rest) => ({ ...rest, transactionInProgress: true }));
    await sendBalance(address!, amount);
    await fetchBalance();
    setStore((rest) => ({ ...rest, transactionInProgress: false }));
  };

  return {
    loading: transactionInProgress,
    transactions,
    sendSingleTransaction,
    sendMultipleTransactions: () => {},
  };
};
