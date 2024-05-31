import { Button } from "@milkyway-engine/ui/button";
import { useBalance, useConnect } from "@milkyway-engine/wallet";
import React from "react";

const ConnectButton = () => {
  const { account, connect } = useConnect();
  const { data: balance, fetchingBalance } = useBalance();

  const parsedBalance = `${balance?.value.toString(balance.decimals) ?? "0"} OSMO`;

  if (fetchingBalance) return "Loading...";
  if (account) return parsedBalance;

  return (
    <Button
      onPress={() => connect()}
      className="hidden md:block bg-callout border border-callout-border rounded-xl px-4 py-3.5 text-sm text-white"
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectButton;
