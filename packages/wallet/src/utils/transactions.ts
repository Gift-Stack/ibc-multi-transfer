import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { Transaction } from "../types";
import { OsmosisChainInfo } from "../constants";
import { Dec, DecUtils } from "@keplr-wallet/unit";
import { simulateMsgs } from "./simulateTx";
import { sendTx } from "./sendTx";

type TransactionDB = {
  id: string;
  transactions: Transaction[];
};

type TransactionStatus = {
  status: "error" | "pending" | "idle" | "success";
  label: string;
  description: string;
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

export const sendTransaction = async (
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
