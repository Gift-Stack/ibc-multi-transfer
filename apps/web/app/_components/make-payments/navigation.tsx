import {
  URLNavbar,
  NavbarItem as URLNavbarItem,
} from "@milkyway-engine/ui/nav";
import { TxNavbarItem, txNavbarItem } from "../../_types";

const Navigation = ({ activeTx: active }: { activeTx: TxNavbarItem }) => {
  return (
    <URLNavbar>
      <URLNavbarItem
        active={active === txNavbarItem.MakeSingleTx}
        label="Single Transaction"
        link={`/?active-tab=make-payments&tx=${txNavbarItem.MakeSingleTx}`}
      />
      <URLNavbarItem
        active={active === txNavbarItem.MakeMultiTx}
        label="Multi Transaction"
        link={`/?active-tab=make-payments&tx=${txNavbarItem.MakeMultiTx}`}
      />
    </URLNavbar>
  );
};

export default Navigation;
