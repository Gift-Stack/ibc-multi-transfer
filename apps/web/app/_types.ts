export const navbarItem = {
  MakePayments: "make-payments",
  Transactions: "transactions",
} as const;

export type NavbarItem = (typeof navbarItem)[keyof typeof navbarItem];

export const txNavbarItem = {
  MakeSingleTx: "single-tx",
  MakeMultiTx: "multi-tx",
} as const;

export type TxNavbarItem = (typeof txNavbarItem)[keyof typeof txNavbarItem];
