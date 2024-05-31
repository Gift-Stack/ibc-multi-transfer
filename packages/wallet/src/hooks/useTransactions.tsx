import { useEffect } from "react";
import { getTransactions, sendBalance } from "../keplr";
import { useAtomValue, useSetAtom } from "jotai";
import { storeAtom } from "../store";
import { useBalance } from "./useBalance";
import { Dec } from "@keplr-wallet/unit";

export const useTransactions = () => {
  const { address, transactions, transactionInProgress, transactionStatus } =
    useAtomValue(storeAtom);
  const { fetchBalance, data: balance } = useBalance({ prefetch: false });
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

  const sendTransaction = async (
    addresses: string[],
    amounts: `${number}`[]
  ) => {
    const cummulativeAmount = amounts.reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0
    );
    if (balance?.value.lt(new Dec(cummulativeAmount))) {
      alert("Insufficient balance");
      return;
    }

    const initialTransactionStatus = {
      status: "pending",
      label: "Initializing transaction",
      description: "Your transfer is currently being processed.",
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
      await sendBalance(addresses, amounts, setStatus);
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

  const resetTransactionStatus = () => {
    setStore((rest) => ({
      ...rest,
      transactionStatus: {
        status: "idle",
        label: "",
        description: "",
      },
    }));
  };

  return {
    loading: transactionInProgress,
    transactions,
    transactionStatus,
    sendTransaction,
    resetTransactionStatus,
  };
};
