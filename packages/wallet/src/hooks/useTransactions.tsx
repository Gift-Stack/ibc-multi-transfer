import {
  sendTransaction as sendTransactionPrimitive,
  getTransactions,
} from "../utils/transactions";
import { useBalance } from "./useBalance";
import { Dec } from "@keplr-wallet/unit";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnect } from "./useConnect";
import { useState } from "react";

const initialTransactionStatus = {
  status: "pending",
  label: "Initializing transaction",
  description: "Your transfer is currently being processed.",
} as const;

const idleTransactionStatu = {
  status: "idle",
  label: "",
  description: "",
} as const;

type TransactionStatus = {
  status: "pending" | "error" | "idle" | "success";
  label: string;
  description: string;
};

export const useTransactions = (
  {
    prefetch = false,
  }: {
    prefetch?: boolean;
  } = { prefetch: false }
) => {
  const { account: address } = useConnect();
  const [transactionStatus, setStatus] =
    useState<TransactionStatus>(idleTransactionStatu);
  const { fetchBalance, data: balance } = useBalance();

  const fetchTransactions = async () => {
    if (!address) return [];
    const trx = await getTransactions(address);

    return trx;
  };

  const sendTransactionFn = async (data: {
    addresses: string[];
    amounts: `${number}`[];
  }) => {
    const { addresses, amounts } = data;
    if (addresses.length !== amounts.length) {
      throw new Error("addresses and amounts must have the same length"); // Won't happen in the UI, but it's a good idea to check anyway
    }

    const cummulativeAmount = amounts.reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0
    );
    if (balance?.value.lt(new Dec(cummulativeAmount))) {
      alert("Insufficient balance");
      return;
    }

    setStatus(initialTransactionStatus);

    await sendTransactionPrimitive(addresses, amounts, setStatus);
  };

  const { data: transactions = [], isLoading: fetchingTransactions } = useQuery(
    {
      queryKey: ["transactions", address],
      queryFn: fetchTransactions,
      enabled: !!address && prefetch,
    }
  );

  const { mutate: sendTransaction, isPending: loading } = useMutation({
    mutationFn: sendTransactionFn,
    onSuccess: async () => {
      await fetchBalance();
    },
    onError: (err) => {
      setStatus({
        description: err.message,
        label: err.cause
          ? typeof err.cause === "string"
            ? err.cause
            : (err.cause as any)?.message
          : "An Error occured",
        status: "error",
      });
    },
  });

  const resetTransactionStatus = () => {
    setStatus(idleTransactionStatu);
  };

  return {
    loading,
    fetchingTransactions,
    transactions,
    transactionStatus,
    sendTransaction,
    resetTransactionStatus,
  };
};
