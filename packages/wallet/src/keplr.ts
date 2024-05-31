import { Keplr, Window as KeplrWindow } from "@keplr-wallet/types";
import { Dec, DecUtils } from "@keplr-wallet/unit";
import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { OsmosisChainInfo } from "./constants";
import { Balances, Transaction } from "./types";
import { sendTx } from "./utils/sendTx";
import { api } from "./utils/api";
import { simulateMsgs } from "./utils/simulateTx";

declare global {
  interface Window extends KeplrWindow {}
}

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

export const connectKeplr = async () => {
  const keplr = await getKeplrFromWindow();

  if (!keplr) return undefined;

  await keplr.experimentalSuggestChain(OsmosisChainInfo);
  const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
  if (key) {
    return key.bech32Address;
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

type TransactionDB = {
  id: string;
  transactions: Transaction[];
};

export const getTransactions = async (walletAddress: string) => {
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
  }

  const request = window.indexedDB.open("MilkyWayDB", 1);

  return new Promise<Transaction[]>((resolve, reject) => {
    request.onerror = function () {
      console.log("error: ");
      reject(request.error);
    };

    request.onupgradeneeded = function () {
      const db = request.result;
      if (!db.objectStoreNames.contains("transactions")) {
        db.createObjectStore("transactions", {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = function () {
      const db = request.result;
      const txs = db.transaction("transactions", "readonly");
      const store = txs.objectStore("transactions");
      const range = IDBKeyRange.only(walletAddress);
      const transactions = <IDBRequest<TransactionDB | undefined>>(
        store.get(range)
      );
      transactions.onsuccess = function () {
        const txs = transactions.result;

        if (!txs) {
          resolve([]);
          return;
        }

        resolve(txs.transactions);
      };
    };
  });
};

type TransactionStatus = {
  status: "error" | "pending" | "idle" | "success";
  label: string;
  description: string;
};

export const sendBalance = async (
  recipients: string[],
  amounts: `${number}`[],
  setStatus: (status: TransactionStatus) => void
) => {
  if (!window.keplr) return;

  const key = await window.keplr.getKey(OsmosisChainInfo.chainId);
  const protoMsgs = recipients.map((recipient, index) => ({
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: MsgSend.encode({
      fromAddress: key.bech32Address,
      toAddress: recipient,
      amount: [
        {
          denom: "uosmo",
          amount: DecUtils.getTenExponentN(
            OsmosisChainInfo.feeCurrencies[0]?.coinDecimals || 6
          )
            .mul(new Dec(amounts[index]!))
            .truncate()
            .toString(),
        },
      ],
    }).finish(),
  }));

  const gasUsed = await simulateMsgs(
    OsmosisChainInfo,
    key.bech32Address,
    protoMsgs,
    [{ denom: "uosmo", amount: "236" }]
  );

  if (gasUsed) {
    await sendTx({
      keplr: window.keplr,
      chainInfo: OsmosisChainInfo,
      sender: key.bech32Address,
      proto: protoMsgs,
      fee: {
        amount: [{ denom: "uosmo", amount: "236" }],
        gas: Math.floor(gasUsed * 1.5).toString(),
      },
      decryptedAddresses: recipients,
      decryptedAmounts: amounts,
      setStatus,
    });
  }
};
