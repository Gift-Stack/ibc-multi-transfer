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
  chain: string;
  count: number;
  txResults: {
    block_height: number;
    tx_index: number;
    created_at: string;
    tx_hash: string;
    tx_result: string;
    tx_messages: {
      block_height: number;
      tx_index: number;
      msg_index: number;
      signer: string;
      msg_string: string;
      type: string;
      code: number;
    }[];
  }[];
};
