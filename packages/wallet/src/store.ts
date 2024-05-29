import { atom } from "jotai";
import { AccountBalance } from "./types";

export type Store = {
  balance: AccountBalance | undefined;
  address: string | undefined;
  fetching: boolean;
};

export const storeAtom = atom<Store>({
  balance: undefined,
  address: undefined,
  fetching: true,
});
