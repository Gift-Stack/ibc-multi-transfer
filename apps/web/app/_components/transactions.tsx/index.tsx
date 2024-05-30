"use client";
import { useConnect, useTransactions } from "@milkyway-engine/wallet";
import { Table } from "@milkyway-engine/ui/table";
import React from "react";

const TransactionList = () => {
  const { account } = useConnect();
  const { transactions } = useTransactions();

  return (
    <div>
      <p className="text-3xl md:text-5xl font-semibold font-mono text-left mb-5">
        Transactions
      </p>

      {!account ? (
        <p className="text-xl font-medium">
          Connect to see your transaction history.
        </p>
      ) : (
        <Table transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionList;
