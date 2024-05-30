import { atom } from "jotai";
import { AccountBalance } from "./types";

export type Store = {
  balance: AccountBalance | undefined;
  address: string | undefined;
  fetching: boolean;
  transactionInProgress: boolean;
};

export const storeAtom = atom<Store>({
  balance: undefined,
  address: undefined,
  fetching: false,
  transactionInProgress: false,
});
