import { useEffect } from "react";
import { getTransactions } from "../keplr";
import { useAtomValue } from "jotai";
import { storeAtom } from "../store";

export const useTransactions = () => {
  const { address } = useAtomValue(storeAtom);

  useEffect(() => {
    if (address) {
      getTransactions(address).then((transactions) => {
        console.log("tsgh_sbjvbss", transactions);
      });
    }
  }, [address]);

  return {
    transactions: [],
  };
};
