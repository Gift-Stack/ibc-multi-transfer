"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useBalance, useConnect } from "@milkyway-engine/wallet";
import { NavbarItem, navbarItem } from "../../_types";
import {
  URLNavbar,
  NavbarItem as URLNavbarItem,
} from "@milkyway-engine/ui/nav";

const Navbar = () => {
  const searchParams = useSearchParams();
  const { account, connect } = useConnect();
  const { data: balance, fetching: loadingBalance } = useBalance();

  const parsedBalance = `${balance?.value.toString(balance.decimals) ?? "0"} OSMO`;

  const active =
    (searchParams.get("active-tab") as NavbarItem) || "make-payments";

  return (
    <div
      className={`flex items-center justify-between items-centertext-sm max-w-[1100px] w-full z-[2] font-mono`}
    >
      <URLNavbar>
        <URLNavbarItem
          active={active === navbarItem.MakePayments}
          label="Make Payments"
          link={`/?active-tab=${navbarItem.MakePayments}`}
        />
        <URLNavbarItem
          active={active === navbarItem.Transactions}
          label="Transactions"
          link={`/?active-tab=${navbarItem.Transactions}`}
        />
      </URLNavbar>

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
