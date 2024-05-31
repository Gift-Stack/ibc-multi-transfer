# 📜 Documentation for `useBalance.tsx`

## 📋 Index

1. [Introduction](#introduction)
2. [Dependencies](#dependencies)
3. [Functionality](#functionality)
4. [Code Walkthrough](#code-walkthrough)
5. [Usage](#usage)
6. [API](#api)

---

## 📖 Introduction

The `useBalance.tsx` file defines a custom React hook named `useBalance`. This hook is designed to fetch and manage the balance of a connected account using the `react-query` library.

---

## 📦 Dependencies

Before diving into the code, let's take a look at the dependencies:

| Dependency   | Description                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| `useQuery`   | A hook from the `@tanstack/react-query` package for fetching and caching data.      |
| `useConnect` | A custom hook defined in `useConnect.tsx` which manages account connection.         |
| `getBalance` | A utility function from the `../utils/balance` module to fetch the account balance. |

---

## ⚙️ Functionality

The `useBalance` hook performs the following tasks:

1. **Checks if an account is connected** using the `useConnect` hook.
2. **Fetches the account balance** using the `getBalance` function.
3. **Provides methods and states** related to the balance fetching process.

---

## 🔍 Code Walkthrough

```typescript
import { getBalance } from "../utils/balance";
import { useQuery } from "@tanstack/react-query";
import { useConnect } from "./useConnect";

export const useBalance = () => {
  const { account } = useConnect();

  const {
    data: balance,
    isLoading: fetchingBalance,
    refetch: fetchBalance,
  } = useQuery({
    queryKey: ["balance", account],
    queryFn: getBalance,
    enabled: !!account,
  });

  return {
    data: balance,
    fetchBalance,
    fetchingBalance,
  };
};
```

### 1. Import Statements

- **`getBalance`**: Utility function to fetch balance.
- **`useQuery`**: Hook for data fetching from `@tanstack/react-query`.
- **`useConnect`**: Custom hook to manage the account connection.

### 2. Main `useBalance` Function

- **Account Connection**:

  ```typescript
  const { account } = useConnect();
  ```

  Uses the `useConnect` hook to get the connected account.

- **Query Setup**:

  ```typescript
  const {
    data: balance,
    isLoading: fetchingBalance,
    refetch: fetchBalance,
  } = useQuery({
    queryKey: ["balance", account],
    queryFn: getBalance,
    enabled: !!account,
  });
  ```

  - **`queryKey`**: Unique key for the query.
  - **`queryFn`**: The function to fetch the balance.
  - **`enabled`**: The query will run only if there is an account.

- **Returned Values**:
  ```typescript
  return {
    data: balance,
    fetchBalance,
    fetchingBalance,
  };
  ```
  - **`balance`**: The fetched balance.
  - **`fetchBalance`**: Method to manually refetch the balance.
  - **`fetchingBalance`**: State indicating if the balance is currently being fetched.

---

## 🛠 Usage

Here's a simple example of how to use the `useBalance` hook in a React component:

```tsx
import React from "react";
import { useBalance } from "@milkyway-engine/wallet";

const BalanceComponent = () => {
  const { data: balance, fetchBalance, fetchingBalance } = useBalance();

  return (
    <div>
      <h1>Account Balance</h1>
      {fetchingBalance ? <p>Loading...</p> : <p>Balance: {balance}</p>}
      <button onClick={fetchBalance}>Refresh Balance</button>
    </div>
  );
};

export default BalanceComponent;
```

---

## 🔑 API

### **`useBalance()`**

#### Return Values

| Key               | Type       | Description                                            |
| ----------------- | ---------- | ------------------------------------------------------ |
| `data`            | `any`      | The fetched balance of the connected account.          |
| `fetchBalance`    | `function` | Function to manually refetch the balance.              |
| `fetchingBalance` | `boolean`  | Boolean indicating if the balance fetching is ongoing. |

---

By following this documentation, you should have a clear understanding of how the `useBalance` hook works, its dependencies, and how to integrate it into your React application. This makes it easier to manage and display account balances effectively.
