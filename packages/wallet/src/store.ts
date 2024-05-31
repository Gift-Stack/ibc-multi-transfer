import { atom } from "jotai";
import { AccountBalance, Transaction } from "./types";

export type Store = {
  balance: AccountBalance | undefined;
  address: string | undefined;
  fetchingBalance: boolean;
  transactions: Transaction[];
  transactionInProgress: boolean;
  transactionStatus: {
    status: "pending" | "success" | "error" | "idle";
    label: string;
    description: string;
  };
};

export const storeAtom = atom<Store>({
  balance: undefined,
  address: undefined,
  fetchingBalance: false,
  transactions: [],
  transactionInProgress: false,
  transactionStatus: {
    status: "idle",
    label: "",
    description: "",
  },
});
