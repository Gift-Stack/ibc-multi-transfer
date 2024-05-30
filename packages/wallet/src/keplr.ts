import { Keplr, Window as KeplrWindow } from "@keplr-wallet/types";
import { Dec, DecUtils } from "@keplr-wallet/unit";
import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { OsmosisChainInfo } from "./constants";
import { Balances } from "./types";
import { sendTx } from "./utils/sendTx";
import { api } from "./utils/api";
import { simulateMsgs } from "./utils/simulateTx";

declare global {
  interface Window extends KeplrWindow {}
}

type KeplrConnectOption = {
  setError: (error: string | null) => void;
  setAccount: (account: string) => void;
};

export const getKeplrFromWindow: () => Promise<
  Keplr | undefined
> = async () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  if (window.keplr) {
    return window.keplr;
  }

  if (document.readyState === "complete") {
    return window.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        resolve(window.keplr);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};

export const connectKeplr = async ({
  setError,
  setAccount,
}: KeplrConnectOption) => {
  const keplr = await getKeplrFromWindow();

  if (keplr) {
    try {
      await keplr.experimentalSuggestChain(OsmosisChainInfo);
      const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
      if (key) {
        setAccount(key.bech32Address);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        setError(e.message);
      }
    }
  }
};

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

export const getTransactions = async (walletAddress: string) => {
  return [];
};

export const sendBalance = async (recipient: string, amount: string) => {
  if (!window.keplr) return;

  const key = await window.keplr.getKey(OsmosisChainInfo.chainId);
  const protoMsgs = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: MsgSend.encode({
      fromAddress: key.bech32Address,
      toAddress: recipient,
      amount: [
        {
          denom: "uosmo",
          amount: DecUtils.getTenExponentN(6)
            .mul(new Dec(amount))
            .truncate()
            .toString(),
        },
      ],
    }).finish(),
  };

  try {
    const gasUsed = await simulateMsgs(
      OsmosisChainInfo,
      key.bech32Address,
      [protoMsgs],
      [{ denom: "uosmo", amount: "236" }]
    );

    if (gasUsed) {
      await sendTx(
        window.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        {
          amount: [{ denom: "uosmo", amount: "236" }],
          gas: Math.floor(gasUsed * 1.5).toString(),
        }
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};
