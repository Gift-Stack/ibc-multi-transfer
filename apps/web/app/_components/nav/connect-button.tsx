import { Button } from "@milkyway-engine/ui/button";
import { useBalance, useConnect } from "@milkyway-engine/wallet";
import React from "react";

const ConnectButton = () => {
  const { account, connect, disconnect } = useConnect();
  const { data: balance, fetchingBalance } = useBalance();

  const parsedBalance = `${balance?.value.toString(balance.decimals) ?? "0"} OSMO`;

  if (fetchingBalance) return "Loading...";
  if (account)
    return (
      <div className="flex items-center gap-2">
        <p>{parsedBalance}</p>
        <Button className="p-0 border-none w-max" onPress={() => disconnect()}>
          <DisconnectSvg className="h-5 w-5" />
        </Button>
      </div>
    );

  return (
    <Button
      onPress={() => connect()}
      className="hidden md:block bg-callout border border-callout-border rounded-xl px-4 py-3.5 text-sm text-white max-w-max"
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectButton;

const DisconnectSvg = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);
