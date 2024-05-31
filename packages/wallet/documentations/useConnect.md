# 📄 useConnect.tsx Documentation

Welcome to the **`useConnect.tsx`** documentation! This guide will help you understand the purpose and functionality of the `useConnect` hook. We'll cover its main features, usage, and how it integrates into your application.

## 📋 Index

- [📄 useConnect.tsx Documentation](#-useconnecttsx-documentation)
  - [📋 Index](#-index)
  - [🌟 Introduction](#-introduction)
  - [📦 Dependencies](#-dependencies)
  - [⚙️ Functionality](#️-functionality)
    - [Code Breakdown](#code-breakdown)
  - [🔄 Return Values](#-return-values)
  - [📄 Usage Example](#-usage-example)
  - [🎉 Conclusion](#-conclusion)

## 🌟 Introduction

The **`useConnect`** hook is a custom React hook used to manage the connection between a user's wallet and your application via Keplr, a popular wallet extension for interacting with blockchain networks. This hook provides functionalities to connect, disconnect, and check the connection status of the user's wallet.

## 📦 Dependencies

The `useConnect` hook relies on the following dependencies:

- **React**: For using hooks like `useEffect`.
- **React Query**: For managing and caching server state.
- **Keplr**: Utility functions for connecting to the Keplr wallet.

```tsx
import { useEffect } from "react";
import { connectKeplr } from "../utils/keplr";
import { useQuery } from "@tanstack/react-query";
```

## ⚙️ Functionality

The `useConnect` hook performs the following tasks:

- **Check Window Availability**: Ensures that the hook is only executed in a browser environment.
- **Retrieve Connected Accounts**: Fetches the list of already connected accounts from local storage.
- **Use React Query**: Utilizes `useQuery` from React Query to manage the connection state with Keplr.
- **Event Listener**: Sets up an event listener to handle changes in the Keplr keystore.

### Code Breakdown

1. **Check if Window is Defined**

   ```tsx
   if (typeof window === "undefined") {
     return {
       connect: () => {},
       disconnect: () => {},
       isConnected: false,
       account: undefined,
       error: "",
     };
   }
   ```

   This ensures the hook does not execute on the server side, which prevents potential errors.

2. **Retrieve Connected Accounts**

   ```tsx
   let milkywayConnectedAccounts = window.localStorage.getItem(
     "milkywayConnectedAccounts"
   );
   ```

   Fetches the connected accounts from local storage.

3. **React Query Setup**

   ```tsx
   const {
     data: account,
     error,
     refetch: connectWallet,
   } = useQuery({
     queryKey: ["account"],
     queryFn: connectKeplr,
     enabled: !!milkywayConnectedAccounts,
     retry: false,
     refetchInterval: false,
     refetchOnWindowFocus: false,
   });
   ```

   Uses `useQuery` to manage the connection state with Keplr. The connection is automatically attempted if there are accounts available.

4. **Event Listener for Keplr Keystore Changes**

   ```tsx
   useEffect(() => {
     window.addEventListener("keplr_keystorechange", () => {
       connectWallet();
     });
   }, []);
   ```

   Sets up an event listener that triggers the `connectWallet` function whenever there is a change in the Keplr keystore.

## 🔄 Return Values

The `useConnect` hook returns an object with the following properties:

| Property      | Type     | Description                                            |
| ------------- | -------- | ------------------------------------------------------ |
| `connect`     | Function | Function to initiate the connection to the wallet.     |
| `disconnect`  | Function | Function to disconnect the wallet (currently a no-op). |
| `isConnected` | Boolean  | Boolean indicating if the wallet is connected.         |
| `account`     | Object   | The connected account information.                     |
| `error`       | String   | Error message if connection fails.                     |

## 📄 Usage Example

Below is an example of how to use the `useConnect` hook in a React component:

```tsx
import React from "react";
import { useConnect } from "@milkyway-engine/wallet";

const WalletConnector = () => {
  const { connect, disconnect, isConnected, account, error } = useConnect();

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected Account: {account?.address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connect}>Connect Wallet</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
```

This example demonstrates how to use the hook to connect and disconnect the wallet within a React component, and handle the connected state and any errors.

## 🎉 Conclusion

The **`useConnect`** hook simplifies managing the connection state between your application and the Keplr wallet. By leveraging React Query and event listeners, it provides an efficient way to handle wallet connections and state updates.

Feel free to integrate this hook into your application to streamline wallet connection management! 🚀
