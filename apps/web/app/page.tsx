/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import TransactionList from "./_components/transactions.tsx";
import MakePayments from "./_components/make-payments";
import { NavbarItem, TxNavbarItem } from "./_types";
import Navbar from "./_components/nav";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        "absolute pointer-events-none mix-blend-normal will-change-[filter]",
        conic ? "bg-glow-conic" : undefined,
        small ? "filter blur-[32px]" : "filter blur-[75px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element {
  const activeTab =
    (searchParams["active-tab"] as NavbarItem) || "make-payments";

  const activeTx = (searchParams["tx"] as TxNavbarItem) || "single-tx";

  return (
    <main className="relative flex flex-col items-center justify-between- min-h-screen p-5 md:p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>

      <div className="flex fixed top-[50%] translate-y-[-50%] place-items-center-">
        <div className="">
          <div className="flex z-50 items-center justify-center w-full">
            <div className="absolute pointer-events-none min-w-[307px] md:min-w-[614px] min-h-[307px] md:min-h-[614px]">
              <img
                alt=""
                src="circles.svg"
                className="h-[307px] md:h-[614px] w-[307px] md:w-[614px] pointer-events-none"
              />
            </div>
          </div>

          <Gradient
            className="w-[1000px] h-[1000px] -top-[500px] opacity-15"
            conic
          />
        </div>
      </div>

      <div className="pt-8 md:pt-16 w-full max-w-[1100px]">
        {activeTab === "transactions" && <TransactionList />}
        {activeTab === "make-payments" && <MakePayments activeTx={activeTx} />}
      </div>
    </main>
  );
}
