export const shortenAddress = (txHash: string) => {
  return txHash.slice(0, 10) + "..." + txHash.slice(-6);
};
