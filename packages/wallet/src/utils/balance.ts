import { Dec } from "@keplr-wallet/unit";
import { OsmosisChainInfo } from "../constants";
import { Balances } from "../types";
import { api } from "./api";

export const getBalance = async () => {
  const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);

  if (key) {
    const uri = `${OsmosisChainInfo.rest}/cosmos/bank/v1beta1/balances/${key.bech32Address}?pagination.limit=1000`;

    const data = await api<Balances>(uri);
    const balance = data.balances.find((balance) => balance.denom === "uosmo");
    const osmoDecimal = OsmosisChainInfo.currencies.find(
      (currency) => currency.coinMinimalDenom === "uosmo"
    )?.coinDecimals;

    if (balance) {
      const amount = new Dec(balance.amount, osmoDecimal);
      return {
        decimals: osmoDecimal || 6,
        symbol: "OSMO",
        value: amount,
      };
    } else {
      return {
        decimals: osmoDecimal || 6,
        symbol: "OSMO",
        value: new Dec(0, 6),
      };
    }
  }
};
