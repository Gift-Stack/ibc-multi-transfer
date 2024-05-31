import { useEffect } from "react";
import { getTransactions, sendBalance } from "../keplr";
import { useAtomValue, useSetAtom } from "jotai";
import { storeAtom } from "../store";
import { useBalance } from "./useBalance";

export const useTransactions = () => {
  const { address, transactions, transactionInProgress, transactionStatus } =
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
    const initialTransactionStatus = {
      status: "pending",
      label: "Initializing transaction",
      description: "Your transfer is currently being processed.",
    } as const;

    // const successTransactionStatus = {
    //   status: "success",
    //   label: "Transaction sent",
    //   description: `Your transfer of ${amount} OSMO was successful.`,
    // } as const;

    const errorTransactionStatus = {
      status: "error",
      label: "Transaction failed",
      description: "Your transfer failed.",
    } as const;
    try {
      const setStatus = (status: typeof transactionStatus) => {
        setStore((rest) => ({
          ...rest,
          transactionStatus: status,
        }));
      };

      setStore((rest) => ({
        ...rest,
        transactionStatus: initialTransactionStatus,
        transactionInProgress: true,
      }));
      await sendBalance(address!, amount, setStatus);
      await fetchBalance();
      setStore((rest) => ({
        ...rest,
        transactionInProgress: false,
      }));
    } catch (error) {
      setStore((rest) => ({
        ...rest,
        transactionInProgress: false,
      }));
    }
  };

  return {
    loading: transactionInProgress,
    transactions,
    transactionStatus,
    sendSingleTransaction,
    sendMultipleTransactions: () => {},
  };
};
