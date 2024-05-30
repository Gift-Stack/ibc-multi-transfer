import { atom } from "jotai";
import { AccountBalance, Transaction } from "./types";

export type Store = {
  balance: AccountBalance | undefined;
  address: string | undefined;
  fetching: boolean;
  transactions: Transaction[];
  transactionInProgress: boolean;
};

export const storeAtom = atom<Store>({
  balance: undefined,
  address: undefined,
  fetching: false,
  transactions: [],
  transactionInProgress: false,
});
