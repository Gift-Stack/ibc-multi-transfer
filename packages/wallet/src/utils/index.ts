export const shortenAddress = (txHash: string) => {
  return txHash.slice(0, 6) + "..." + txHash.slice(-4);
};
