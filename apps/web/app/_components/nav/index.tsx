"use client";
import { useSearchParams } from "next/navigation";
import { NavbarItem, navbarItem } from "../../_types";
import {
  URLNavbar,
  NavbarItem as URLNavbarItem,
} from "@milkyway-engine/ui/nav";
import dynamic from "next/dynamic";

const ConnectButton = dynamic(() => import("./connect-button"), { ssr: false });

const Navbar = () => {
  const searchParams = useSearchParams();

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

      <ConnectButton />
    </div>
  );
};

export default Navbar;
