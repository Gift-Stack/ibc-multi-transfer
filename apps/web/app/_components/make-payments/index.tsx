import React from "react";
import Navigation from "./navigation";
import { TxNavbarItem, txNavbarItem } from "../../_types";
import SingleTransaction from "./single-tx";
import MultiTransaction from "./multi-tx";

const MakePayments = ({ activeTx }: { activeTx: TxNavbarItem }) => {
  return (
    <div className="flex flex-col items-center mt-10 max-w-[500px] w-full mx-auto rounded-xl py-3 md:py-4 px-3 md:px-5 transition-all duration-200 bg-callout border border-callout-border">
      <Navigation activeTx={activeTx} />

      {activeTx === txNavbarItem.MakeSingleTx && <SingleTransaction />}
      {activeTx === txNavbarItem.MakeMultiTx && <MultiTransaction />}
    </div>
  );
};

export default MakePayments;
