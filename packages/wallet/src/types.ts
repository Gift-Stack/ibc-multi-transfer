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

export type Transaction = {
  account: string;
  txHash: string;
  targetAddresses: string[];
  amounts: string[];
  timestamp: string;
};

export type GasSimulateResponse = {
  gas_info: {
    gas_used: string;
    gas_wanted: string;
  };
};
