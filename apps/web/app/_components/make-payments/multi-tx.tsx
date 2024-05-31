"use client";
import { Button } from "@milkyway-engine/ui/button";
import { Dialog } from "@milkyway-engine/ui/dialog";
import { useTransactions } from "@milkyway-engine/wallet";
import React, { useState } from "react";

const MultiTransaction = () => {
  const [addresses, setAddresses] = useState<string[]>(["", ""]);
  const [inputs, setInputs] = useState(2);

  const {
    loading,
    transactionStatus,
    sendTransaction,
    resetTransactionStatus,
  } = useTransactions();
  const amountToSend = "0.0001";

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAddresses = [...addresses];
    newAddresses[index] = e.target.value;
    setAddresses(newAddresses);
  };

  const handleSendMultiTransaction = () => {
    sendTransaction(addresses, Array(inputs).fill(amountToSend));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      <p className="font-medium mb-4">Enter addresses to send to</p>

      <div className="flex flex-col space-y-4 w-full">
        {Array(inputs)
          .fill(0)
          .map((_, i) => (
            <Input
              key={i}
              value={addresses[i]!}
              onChange={(e) => handleAddressChange(e, i)}
            />
          ))}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={() => {
              if (inputs === 2) return;
              setInputs(inputs - 1);
              setAddresses(addresses.slice(0, -1));
            }}
            disabled={inputs === 2}
            className={`font-bold px-3 py-1 rounded-lg bg-callout-border transition-[opacity] duration-200 ease-in-out ${inputs === 2 ? "opacity-0" : "opacity-100"}`}
          >
            -
          </button>

          <button
            onClick={() => {
              setInputs(inputs + 1);
              setAddresses([...addresses, ""]);
            }}
            className="font-bold px-3 py-1 rounded-lg bg-callout-border"
          >
            +
          </button>
        </div>

        <Dialog
          isOpen={transactionStatus.status !== "idle"}
          reset={resetTransactionStatus}
          status={transactionStatus.status}
          label={transactionStatus.label}
          description={transactionStatus.description}
        >
          <Button
            onPress={handleSendMultiTransaction}
            isDisabled={loading || !addresses[0] || !addresses[1]}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Dialog>
      </div>
    </div>
  );
};

export default MultiTransaction;

const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      className="w-full p-3 rounded-lg border border-callout-border bg-card transition-all duration-1000 ease-in-out placeholder:italic placeholder:text-sm text-sm"
      value={value}
      onChange={onChange}
      placeholder="osmo1qnk49vfg..."
    />
  );
};
