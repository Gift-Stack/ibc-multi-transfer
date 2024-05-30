import React from "react";

const SingleTransaction = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <p className="italic text-sm pb-5 font-medium">
        Attention: You are about to send a transaction to this address
      </p>

      <p className="py-3 px-3 mb-5 rounded-xl bg-card w-full">
        osmo1qnk49vfgl6yyc4ank9papskl9zswv8r8w9ca7w
      </p>

      <button className="w-full p-3 rounded-lg border border-callout-border">
        Send
      </button>
    </div>
  );
};

export default SingleTransaction;
