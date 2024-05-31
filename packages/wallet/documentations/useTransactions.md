# 🔄 useTransactions Hook Documentation

## 📜 Index

- [🔄 useTransactions Hook Documentation](#-usetransactions-hook-documentation)
  - [📜 Index](#-index)
  - [📚 Introduction](#-introduction)
  - [🛠 Installation](#-installation)
  - [🔧 Configuration](#-configuration)
  - [📖 API Reference](#-api-reference)
    - [`useTransactions`](#usetransactions)
      - [Parameters](#parameters)
      - [Returned Values](#returned-values)
      - [Functions](#functions)
  - [📘 Usage Example](#-usage-example)
  - [⚠️ Error Handling](#️-error-handling)
  - [📈 Common Use Cases](#-common-use-cases)
  - [🔍 Additional Information](#-additional-information)

---

## 📚 Introduction

The `useTransactions` hook is designed to manage cryptocurrency transactions, providing functionalities to fetch transaction data, send transactions, and manage transaction status. It integrates with the balance fetching and connection hooks to ensure seamless operations.

---

## 🛠 Installation

Ensure you have the following dependencies installed:

- `@keplr-wallet/unit`
- `@tanstack/react-query`
- You should also have related hooks and utilities available (`useBalance`, `useConnect`, `transactions` utils).

You can install these dependencies using npm:

```bash
npm install @keplr-wallet/unit @tanstack/react-query
```

---

## 🔧 Configuration

Before using the `useTransactions` hook, ensure that:

1. You are connected to the network using `useConnect`.
2. You have a valid address and sufficient balance.

---

## 📖 API Reference

### `useTransactions`

This hook manages the state and logic for sending and fetching transactions.

#### Parameters

- **`prefetch`** (`boolean`): Determines whether to prefetch transactions on hook initialization. Default is `false`.

```typescript
const {
  loading,
  fetchingTransactions,
  transactions,
  transactionStatus,
  sendTransaction,
  resetTransactionStatus,
} = useTransactions({ prefetch: true });
```

#### Returned Values

| Value                    | Type                | Description                                       |
| ------------------------ | ------------------- | ------------------------------------------------- |
| `loading`                | `boolean`           | Indicates if a transaction is being sent.         |
| `fetchingTransactions`   | `boolean`           | Indicates if transactions are being fetched.      |
| `transactions`           | `array`             | List of fetched transactions.                     |
| `transactionStatus`      | `TransactionStatus` | Current status of the transaction.                |
| `sendTransaction`        | `function`          | Function to send a transaction.                   |
| `resetTransactionStatus` | `function`          | Function to reset the transaction status to idle. |

#### Functions

1. **`sendTransaction`**

   - **Parameters:**
     - `addresses` (`string[]`): Array of recipient addresses.
     - `amounts` (`string[]`): Array of amounts to be sent.
   - **Returns:** `Promise<void>`
   - **Usage:** Sends a transaction to the specified addresses with the specified amounts.

2. **`resetTransactionStatus`**
   - **Parameters:** None
   - **Returns:** `void`
   - **Usage:** Resets the transaction status to idle.

---

## 📘 Usage Example

Here's a basic example of how to use the `useTransactions` hook in a React component:

```tsx
import React from "react";
import { useTransactions } from "@milkyway-engine/wallet";

const TransactionComponent = () => {
  const {
    loading,
    fetchingTransactions,
    transactions,
    transactionStatus,
    sendTransaction,
    resetTransactionStatus,
  } = useTransactions({ prefetch: true });

  const handleSendTransaction = () => {
    const addresses = ["address1", "address2"];
    const amounts = ["100", "200"];
    sendTransaction({ addresses, amounts });
  };

  return (
    <div>
      {fetchingTransactions && <p>Loading transactions...</p>}
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>{tx}</li>
        ))}
      </ul>
      <button onClick={handleSendTransaction} disabled={loading}>
        Send Transaction
      </button>
      {transactionStatus.status !== "idle" && (
        <div>
          <p>Status: {transactionStatus.status}</p>
          <p>Label: {transactionStatus.label}</p>
          <p>Description: {transactionStatus.description}</p>
          <button onClick={resetTransactionStatus}>Reset Status</button>
        </div>
      )}
    </div>
  );
};

export default TransactionComponent;
```

---

## ⚠️ Error Handling

Errors that occur during the transaction process are handled internally and reflected in the `transactionStatus`. The `status` will be set to `error`, and the `label` and `description` will provide details.

Make sure to handle the errors gracefully in your UI. For example:

```tsx
{
  transactionStatus.status === "error" && (
    <div className="error">
      <p>Error: {transactionStatus.label}</p>
      <p>{transactionStatus.description}</p>
    </div>
  );
}
```

---

## 📈 Common Use Cases

- **Fetching User Transactions:** Prefetch transactions to display a user's transaction history.
- **Sending Transactions:** Use the `sendTransaction` function to initiate transfers.
- **Managing Transaction States:** Track and display the status of ongoing transactions.

---

## 🔍 Additional Information

This hook is part of a larger ecosystem involving balance management and network connectivity. Ensure that you have the necessary context and environment set up to use this hook effectively.

---
