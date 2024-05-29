import { Dec } from "@keplr-wallet/unit";

export type Balances = {
  balances: CoinPrimitive[];
  pagination: {
    next_key?: string;
    total?: string;
  };
};

export type CoinPrimitive = {
  denom: string;
  amount: string;
};

export type AccountBalance = {
  decimals: number;
  symbol: string;
  value: Dec;
};
