"use client";
import React, { useState } from "react";

const MultiTransaction = () => {
  const [addresses, setAddresses] = useState<string[]>(["", ""]);
  const [inputs, setInputs] = useState(2);

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAddresses = [...addresses];
    newAddresses[index] = e.target.value;
    setAddresses(newAddresses);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      <p className="font-medium mb-4">Enter addresses to send to</p>

      <div className="flex flex-col space-y-4 w-full">
        {Array(inputs)
          .fill(0)
          .map((_, i) => (
            <Input
              key={i}
              value={addresses[i]!}
              onChange={(e) => handleAddressChange(e, i)}
            />
          ))}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={() => {
              if (inputs === 2) return;
              setInputs(inputs - 1);
              setAddresses(addresses.slice(0, -1));
            }}
            disabled={inputs === 2}
            className={`font-bold px-3 py-1 rounded-lg bg-callout-border transition-[opacity] duration-200 ease-in-out ${inputs === 2 ? "opacity-0" : "opacity-100"}`}
          >
            -
          </button>

          <button
            onClick={() => {
              setInputs(inputs + 1);
              setAddresses([...addresses, ""]);
            }}
            className="font-bold px-3 py-1 rounded-lg bg-callout-border"
          >
            +
          </button>
        </div>
        <button className="w-full p-3 rounded-lg border border-callout-border">
          Send
        </button>
      </div>
    </div>
  );
};

export default MultiTransaction;

const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      className="w-full p-3 rounded-lg border border-callout-border bg-card transition-all duration-1000 ease-in-out placeholder:italic placeholder:text-sm text-sm"
      value={value}
      onChange={onChange}
      placeholder="osmo1qnk49vfg..."
    />
  );
};
