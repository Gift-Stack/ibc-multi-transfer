import { Keplr, Window as KeplrWindow } from "@keplr-wallet/types";
import { OsmosisChainInfo } from "../constants";

declare global {
  interface Window extends KeplrWindow {}
}

export const getKeplrFromWindow: () => Promise<
  Keplr | undefined
> = async () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  if (window.keplr) {
    return window.keplr;
  }

  if (document.readyState === "complete") {
    return window.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        resolve(window.keplr);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};

export const connectKeplr = async () => {
  const keplr = await getKeplrFromWindow();

  if (!keplr) {
    alert("Please install Keplr extension");
    throw new Error("Keplr extension not found");
  }

  await keplr.experimentalSuggestChain(OsmosisChainInfo);
  const key = await keplr.getKey(OsmosisChainInfo.chainId);
  if (key) {
    window.localStorage.setItem("milkywayConnectedAccounts", key.bech32Address);
    return key.bech32Address;
  }
};

export const disconnectKeplr = async (options?: { returnFalse: boolean }) => {
  if (options?.returnFalse) {
    return false;
  }
  const keplr = await getKeplrFromWindow();

  window.localStorage.removeItem("milkywayConnectedAccounts");
  await keplr?.disable();
  return true;
};
