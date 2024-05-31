"use client";
import { useConnect, useTransactions } from "@milkyway-engine/wallet";
import { Dialog } from "@milkyway-engine/ui/dialog";
import { Button } from "@milkyway-engine/ui/button";
import Toggle from "@milkyway-engine/ui/toggle";
import { useState } from "react";

const SingleTransaction = () => {
  const { account, connect } = useConnect();
  const [ibc, setIBC] = useState(false);
  const {
    loading,
    transactionStatus,
    sendTransaction,
    setIbcTransaction,
    resetTransactionStatus,
  } = useTransactions();

  const amountToSend = "0.0001";
  const accountToSendTo = "osmo1qnk49vfgl6yyc4ank9papskl9zswv8r8w9ca7w";
  const cosmosAddressToSendTo = "cosmos1qnk49vfgl6yyc4ank9papskl9zswv8r8x7tdgu";

  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      <Toggle checked={ibc} onChange={() => setIBC(!ibc)}>
        IBC Transfer
      </Toggle>
      <p className="italic text-sm text-center pb-5 font-medium">
        Attention: You are about to send{" "}
        {ibc ? cosmosAddressToSendTo : amountToSend} OSMO to this address{" "}
        <span>{ibc ? `(Osmosis <> Cosmos)` : ""}</span>
      </p>

      <p className="py-3 px-3 mb-5 rounded-xl bg-card w-full truncate">
        {accountToSendTo}
      </p>

      {!account ? (
        <Button
          onPress={() => connect()}
          className="w-full p-3 rounded-lg border border-callout-border"
        >
          Connect wallet to send
        </Button>
      ) : (
        <Dialog
          isOpen={transactionStatus.status !== "idle"}
          reset={resetTransactionStatus}
          status={transactionStatus.status}
          label={transactionStatus.label}
          description={transactionStatus.description}
        >
          <Button
            onPress={() =>
              ibc
                ? setIbcTransaction({
                    amount: amountToSend,
                    recipient: cosmosAddressToSendTo,
                  })
                : sendTransaction({
                    addresses: [accountToSendTo],
                    amounts: [amountToSend],
                  })
            }
            isDisabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Dialog>
      )}
    </div>
  );
};

export default SingleTransaction;
