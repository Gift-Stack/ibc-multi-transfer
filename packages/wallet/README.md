# 📚 useConnect, useBalance, and useTransactions Hooks Documentation

Welcome to the detailed documentation for the `useConnect`, `useBalance`, and `useTransactions` hooks. These custom hooks are designed to handle wallet connections, balance fetching, and transaction management in a React application. This documentation will guide you through their functionalities, usage, and integration.

## Index

- [📚 useConnect, useBalance, and useTransactions Hooks Documentation](#-useconnect-usebalance-and-usetransactions-hooks-documentation)
  - [Index](#index)
  - [useConnect](#useconnect)
    - [Purpose](#purpose)
    - [Usage](#usage)
    - [API](#api)
  - [useBalance](#usebalance)
    - [Purpose](#purpose-1)
    - [Usage](#usage-1)
    - [API](#api-1)
  - [useTransactions](#usetransactions)
    - [Purpose](#purpose-2)
    - [Usage](#usage-2)
    - [API](#api-2)
    - [Types](#types)
      - [TransactionStatus](#transactionstatus)
  - [Conclusion](#conclusion)

---

## useConnect

[Read implementation docs](documentations/useConnect.md)

### Purpose

The `useConnect` hook manages the connection state of a user's wallet using the Keplr extension. It handles connecting, disconnecting, and monitoring the connection status.

### Usage

To use the `useConnect` hook, simply import and call it within a React component:

```tsx
import { useConnect } from "./useConnect";

const WalletComponent = () => {
  const { connect, disconnect, isConnected, account, error } = useConnect();

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
```

### API

| Property      | Type                  | Description                                            |
| ------------- | --------------------- | ------------------------------------------------------ |
| `connect`     | `Function`            | Function to initiate the wallet connection.            |
| `disconnect`  | `Function`            | Function to disconnect the wallet (currently a no-op). |
| `isConnected` | `boolean`             | Indicates if the wallet is connected.                  |
| `account`     | `string \| undefined` | The connected account address.                         |
| `error`       | `string`              | Error message if any error occurs.                     |

---

## useBalance

[Read implementation docs](documentations/useBalance.md)

### Purpose

The `useBalance` hook fetches and provides the balance of the connected wallet account.

### Usage

To use the `useBalance` hook, import and call it within a React component:

```tsx
import { useBalance } from "./useBalance";

const BalanceComponent = () => {
  const { data: balance, fetchBalance, fetchingBalance } = useBalance();

  return (
    <div>
      <p>Balance: {fetchingBalance ? "Loading..." : balance}</p>
      <button onClick={fetchBalance}>Refresh Balance</button>
    </div>
  );
};
```

### API

| Property          | Type       | Description                                          |
| ----------------- | ---------- | ---------------------------------------------------- |
| `data`            | `any`      | The fetched balance data.                            |
| `fetchBalance`    | `Function` | Function to manually refetch the balance.            |
| `fetchingBalance` | `boolean`  | Indicates if the balance is currently being fetched. |

---

## useTransactions

[Read implementation docs](documentations/useTransactions.md)

### Purpose

The `useTransactions` hook manages transaction-related operations, including fetching transaction history and sending transactions.

### Usage

To use the `useTransactions` hook, import and call it within a React component:

```tsx
import { useTransactions } from "./useTransactions";

const TransactionsComponent = () => {
  const {
    loading,
    fetchingTransactions,
    transactions,
    transactionStatus,
    sendTransaction,
    resetTransactionStatus,
  } = useTransactions();

  const handleSendTransaction = () => {
    const addresses = ["address1", "address2"];
    const amounts = ["10", "20"];
    sendTransaction({ addresses, amounts });
  };

  return (
    <div>
      <button onClick={handleSendTransaction} disabled={loading}>
        Send Transaction
      </button>
      {fetchingTransactions ? (
        <p>Loading transactions...</p>
      ) : (
        <ul>
          {transactions.map((trx, index) => (
            <li key={index}>{trx.details}</li>
          ))}
        </ul>
      )}
      <p>{transactionStatus.label}</p>
      <p>{transactionStatus.description}</p>
      <button onClick={resetTransactionStatus}>Reset Status</button>
    </div>
  );
};
```

### API

| Property                 | Type                | Description                                                 |
| ------------------------ | ------------------- | ----------------------------------------------------------- |
| `loading`                | `boolean`           | Indicates if a transaction is being sent.                   |
| `fetchingTransactions`   | `boolean`           | Indicates if transactions are being fetched.                |
| `transactions`           | `any[]`             | List of fetched transactions.                               |
| `transactionStatus`      | `TransactionStatus` | Current status of the transaction process.                  |
| `sendTransaction`        | `Function`          | Function to send a new transaction.                         |
| `resetTransactionStatus` | `Function`          | Function to reset the transaction status to its idle state. |

### Types

#### TransactionStatus

```ts
type TransactionStatus = {
  status: "pending" | "error" | "idle" | "success";
  label: string;
  description: string;
};
```

---

## Conclusion

These hooks (`useConnect`, `useBalance`, `useTransactions`) provide a robust and reusable way to manage wallet connections, balance fetching, and transaction operations in a React application. By abstracting these functionalities into hooks, you can easily integrate them into your components and maintain a clean and organized codebase.
