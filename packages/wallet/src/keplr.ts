import { Keplr } from "@keplr-wallet/types";
import { Dec } from "@keplr-wallet/unit";
import { OsmosisChainInfo } from "./constants";
import { Balances, Transaction } from "./types";
import { SigningStargateClient } from "@cosmjs/stargate";

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
  const offlineSigner = window.keplr?.getOfflineSigner(
    OsmosisChainInfo.chainId
  );
  const client: SigningStargateClient =
    await SigningStargateClient.connectWithSigner(
      OsmosisChainInfo.rpc,
      offlineSigner!
    );

  // const transaction = client.searchTx([
  //   { key: "sentFromOrTo", value: walletAddress },
  // ]);
  const query = `transfer.recipient='${walletAddress}' AND transfer.sender='osmo1pyssygjaj8mvu3skp7aj4q9m9hj87cnkqnheg2'`;
  const transaction = client.searchTx([
    // { key: "minHeight", value: 0 },
    // { key: "maxHeight", value: 1111133539 },
    // { key: "from", value: walletAddress },
    // { key: "to", value: walletAddress },
    { key: "transfer.recipient", value: walletAddress },
    // { key: "transfer.sender", value: walletAddress },
  ]);
  // const transaction = await client.getTx(
  //   "10CE638D69292F79D5DE35CBEC12371E0AD53633AF932B25BF50CC5713635C67"
  // );

  return transaction;

  // if (walletAddress) {
  //   const uri = `https://api-indexer.keplr.app/v1/history/${walletAddress}?limit=15&offset=0&chains=${OsmosisChainInfo.chainName.toLowerCase()}`;
  //   const data = await api<Transaction[]>(uri);
  //   return data;
  // }
};

const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
};
