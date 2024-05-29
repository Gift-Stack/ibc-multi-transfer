"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useBalance, useConnect } from "@milkyway-engine/wallet";

const navbarItem = {
  MakePayments: "make-payments",
  Transactions: "transactions",
} as const;

type NavbarItem = (typeof navbarItem)[keyof typeof navbarItem];

const Navbar = () => {
  const searchParams = useSearchParams();
  const { account, connect } = useConnect();
  const { data: balance, fetching: loadingBalance } = useBalance();

  const parsedBalance = `${balance?.value.toString(balance.decimals) ?? "0"} OSMO`;

  const active =
    (searchParams.get("active-tab") as NavbarItem) || "make-payments";

  const setActive = (value: NavbarItem) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("active-tab", value);

    return params.toString();
  };

  return (
    <div
      className={`flex items-center justify-between items-centertext-sm max-w-[1100px] w-full z-[2] font-mono`}
    >
      <div className="relative p-2 rounded-xl bg-callout border border-callout-border max-w-max mx-auto md:mx-0 space-x-3">
        <Link href={`/?active-tab=${navbarItem.MakePayments}`}>
          <button
            className={`h-8 px-3 rounded-lg ${active === navbarItem.MakePayments ? "bg-white text-black" : "text-white"}`}
          >
            Make Payments
          </button>
        </Link>
        <Link href={`/?active-tab=${navbarItem.Transactions}`}>
          <button
            className={`h-8 px-3 rounded-lg ${active === navbarItem.Transactions ? "bg-white text-black" : "text-white"}`}
          >
            Transactions
          </button>
        </Link>
      </div>

      {loadingBalance ? (
        "Loading..."
      ) : account ? (
        parsedBalance
      ) : (
        <button
          onClick={connect}
          className="hidden md:block bg-callout border border-callout-border rounded-xl px-4 py-3.5 text-sm text-white"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Navbar;
