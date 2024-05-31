import { BroadcastMode, ChainInfo, Keplr, StdFee } from "@keplr-wallet/types";
import {
  AuthInfo,
  Fee,
  TxBody,
  TxRaw,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import Long from "long";
import { Buffer } from "buffer";
import { TendermintTxTracer } from "@keplr-wallet/cosmos";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Transaction } from "../types";

type SendTxOption = {
  keplr: Keplr;
  chainInfo: ChainInfo;
  sender: string;
  proto: Any[];
  fee: StdFee;
  memo?: string;
  decryptedAmounts: `${number}`[];
  decryptedAddresses: string[];
  setStatus: (status: TransactionStatus) => void;
};

type TransactionStatus = {
  status: "error" | "pending" | "idle" | "success";
  label: string;
  description: string;
};

export const sendTx = async ({
  keplr,
  chainInfo,
  sender,
  proto,
  fee,
  memo = "",
  decryptedAmounts,
  decryptedAddresses,
  setStatus,
}: SendTxOption) => {
  const account = await fetchAccountInfo(chainInfo, sender);
  const { pubKey } = await keplr.getKey(chainInfo.chainId);

  if (!account) return;
  const signDoc = {
    bodyBytes: TxBody.encode(
      TxBody.fromPartial({
        messages: proto,
        memo,
      })
    ).finish(),
    authInfoBytes: AuthInfo.encode({
      signerInfos: [
        {
          publicKey: {
            typeUrl: "/cosmos.crypto.secp256k1.PubKey",
            value: PubKey.encode({
              key: pubKey,
            }).finish(),
          },
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT,
            },
            multi: undefined,
          },
          sequence: account.sequence,
        },
      ],
      fee: Fee.fromPartial({
        amount: fee.amount.map((coin) => {
          return {
            denom: coin.denom,
            amount: coin.amount.toString(),
          };
        }),
        gasLimit: fee.gas,
      }),
    }).finish(),
    chainId: chainInfo.chainId,
    accountNumber: Long.fromString(account.account_number),
  };

  const signed = await keplr.signDirect(chainInfo.chainId, sender, signDoc);

  const signedTx = {
    tx: TxRaw.encode({
      bodyBytes: signed.signed.bodyBytes,
      authInfoBytes: signed.signed.authInfoBytes,
      signatures: [Buffer.from(signed.signature.signature, "base64")],
    }).finish(),
    signDoc: signed.signed,
  };

  const txHash = await broadcastTxSync(keplr, chainInfo.chainId, signedTx.tx);

  setStatus({
    label: "Transaction committing",
    description: "Your transaction is being committed to the blockchain",
    status: "pending",
  });

  const txTracer = new TendermintTxTracer(chainInfo.rpc, "/websocket");

  await txTracer.traceTx(txHash).then(() => {
    setStatus({
      label: "Transaction commit successful",
      description: "Your transaction has been committed to the blockchain",
      status: "pending",
    });
  });

  txTracer.addEventListener("message", (event) => {
    const parsedData = JSON.parse(event.data);

    if (parsedData.result?.hash) {
      const cumulativeAmount = decryptedAmounts.reduce(
        (acc, curr) => Number(acc) + Number(curr),
        0
      );
      const parsedCumulativeAmout = cumulativeAmount.toLocaleString(undefined, {
        maximumFractionDigits: 6,
      });

      saveToIndexedDB({
        account: sender,
        txHash: parsedData.result.hash,
        targetAddresses: decryptedAddresses,
        amounts: decryptedAmounts,
        timestamp: new Date().toISOString(),
      });

      setStatus({
        label: "Transaction completed",
        description: `Your transfer of ${parsedCumulativeAmout} OSMO was successful.`,
        status: "success",
      });
      return;
    }

    // -32603 is unsigned tx not found
    if (parsedData.error && parsedData.error.code !== -32603) {
      throw new Error(parsedData.error.data, {
        cause: parsedData.error.message || "Transaction failed",
      });
    }
  });
};

export const fetchAccountInfo = async (
  chainInfo: ChainInfo,
  address: string
) => {
  const offlineSigner = window.keplr?.getOfflineSigner(chainInfo.chainId);
  const client: SigningStargateClient =
    await SigningStargateClient.connectWithSigner(
      chainInfo.rpc,
      offlineSigner!
    );

  const account = await client.getAccount(address);

  if (!account) {
    return undefined;
  }

  return {
    ...account,
    account_number: account.accountNumber.toString(),
    sequence: account.sequence.toString(),
  };
};

export const broadcastTxSync = async (
  keplr: Keplr,
  chainId: string,
  tx: Uint8Array
): Promise<Uint8Array> => {
  return keplr.sendTx(chainId, tx, "sync" as BroadcastMode);
};

function saveToIndexedDB(data: Transaction) {
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
  }

  const request = window.indexedDB.open("MilkyWayDB", 1);

  request.onerror = function (event) {
    console.log("error: ");
  };

  request.onupgradeneeded = function (event: any) {
    const db = request.result;
    if (!db.objectStoreNames.contains("transactions")) {
      db.createObjectStore("transactions", {
        keyPath: "id",
      });
    }
  };

  request.onsuccess = function () {
    let db = request.result;

    const transaction = db.transaction(["transactions"], "readwrite");

    const allTransactions = transaction.objectStore("transactions");

    const userTransactions = allTransactions.get(data.account);

    userTransactions.onsuccess = function () {
      let userTx: { id: string; transactions: Transaction[] };

      if (!userTransactions.result) {
        userTx = {
          id: data.account,
          transactions: [data],
        };
        transaction.objectStore("transactions").add(userTx);
      } else {
        userTx = {
          id: data.account,
          transactions: [data, ...userTransactions.result.transactions],
        };
        transaction.objectStore("transactions").put(userTx);
      }
    };
  };
}
