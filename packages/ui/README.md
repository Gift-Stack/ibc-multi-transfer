# 📚 UI Components Documentation

Welcome to the documentation of our React components. This guide is designed to help you understand the purpose and usage of each component in our project.

## Index

1. [Button](#button)
2. [Dialog](#dialog)
3. [Navbar](#navbar)
4. [Table](#table)
5. [Code](#code)
6. [Toast](#toast)
7. [Card](#card)

---

## Button

### 📁 `button.tsx`

The `Button` component is a styled button that leverages the `react-aria-components` library for accessibility.

### Code

```tsx
import { Button as ButtonPrimitive } from "react-aria-components";

export const Button = ({
  children,
  className,
  ...props
}: Parameters<typeof ButtonPrimitive>[number]) => {
  return (
    <ButtonPrimitive
      className={`w-full p-3 rounded-lg border border-callout-border disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};
```

### Usage

- **Props**: Accepts all props that `ButtonPrimitive` accepts.
- **ClassName**: Adds custom styles to the button.

```jsx
<Button className="my-custom-class">Click Me</Button>
```

### Features

- Fully accessible.
- Customizable via `className`.
- Handles disabled state gracefully.

---

## Dialog

### 📁 `dialog.tsx`

The `Dialog` component is used to display modal dialogs with different statuses (`pending`, `success`, `error`, `idle`).

### Code

```tsx
import { ReactNode } from "react";
import {
  Button,
  Dialog as DialogPrimitive,
  DialogTrigger,
  Modal as ModalPrimitive,
  ModalOverlay,
  Heading,
} from "react-aria-components";
import { Button as UIButton } from "./button";

type Status = "pending" | "success" | "error" | "idle";

export function Dialog({
  children,
  status,
  label,
  description,
  isOpen,
  reset,
}: {
  children: ReactNode;
  status: Status;
  label?: string;
  description?: string;
  isOpen: boolean;
  reset?: () => void;
}) {
  const iconClassNames = {
    pending: "bg-blue-100 text-blue-500 animate-spin",
    success: "bg-green-100 text-green-500",
    error: "bg-red-100 text-red-500",
    idle: "hidden",
  };

  return (
    <DialogTrigger isOpen={isOpen}>
      {children}
      <ModalOverlay
        className={({ isEntering, isExiting }) =>
          ` fixed inset-0 z-10 overflow-y-auto bg-black/50 flex min-h-full items-center justify-center p-4 text-center backdrop-blur ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""} ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""} `
        }
      >
        <ModalPrimitive
          className={({ isEntering, isExiting }) =>
            ` w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl ${isEntering ? "animate-in zoom-in-95 ease-out duration-300" : ""} ${isExiting ? "animate-out zoom-out-95 ease-in duration-200" : ""} `
          }
        >
          <DialogPrimitive role="alertdialog" className="outline-none relative">
            {({ close }) => (
              <>
                <Heading
                  slot="title"
                  className="text-xxl font-semibold leading-6 my-0 text-slate-700"
                >
                  Transaction status
                </Heading>
                <div className="grid gap-4 py-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={"rounded-full p-2 " + iconClassNames[status]}
                    >
                      {status === "pending" && (
                        <LoaderIcon className="h-6 w-6" />
                      )}
                      {status === "success" && (
                        <CheckIcon className="h-6 w-6" />
                      )}
                      {status === "error" && <XIcon className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-black font-medium">{label}</p>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <UIButton
                    onPress={() => {
                      close();
                      reset?.();
                    }}
                    className="text-black py-3 px-5 text-sm max-w-max"
                  >
                    Close
                  </UIButton>
                </div>
              </>
            )}
          </DialogPrimitive>
        </ModalPrimitive>
      </ModalOverlay>
    </DialogTrigger>
  );
}
```

### Usage

- **Props**:
  - `children`: Content to trigger the dialog.
  - `status`: `pending | success | error | idle`.
  - `label`: Optional label.
  - `description`: Optional description.
  - `isOpen`: Boolean to control the open state.
  - `reset`: Optional reset function.

```jsx
<Dialog
  status="pending"
  label="Transaction pending"
  description="Please wait..."
  isOpen={true}
  reset={() => {}}
>
  <Button className="my-custom-class">Click Me</Button>
</Dialog>
```

### Features

- Different statuses with custom icons.
- Fully accessible modal dialog.
- Customizable close button.

---

## Navbar

### 📁 `nav.tsx`

The `Navbar` component consists of a container (`URLNavbar`) and individual navigation items (`NavbarItem`).

### Code

```tsx
import Link from "next/link";
import { PropsWithChildren } from "react";

type NavbarItemProps = {
  link: string;
  label: string;
  active: boolean;
};

export const URLNavbar = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative text-center w-full p-2 rounded-xl bg-callout border border-callout-border max-w-max mx-auto md:mx-0 gap-3 font-mono">
      {children}
    </div>
  );
};

export const NavbarItem = ({ active, label, link }: NavbarItemProps) => {
  return (
    <Link href={link}>
      <button
        className={`h-8 px-3 rounded-lg ${active ? "bg-white text-black" : "text-white"}`}
      >
        {label}
      </button>
    </Link>
  );
};
```

### Usage

- **URLNavbar**: Wraps around `NavbarItem`s.
- **NavbarItem**:
  - `link`: URL for the navigation item.
  - `label`: Text to display.
  - `active`: Boolean to indicate the active state.

```jsx
<URLNavbar>
  <NavbarItem link="/home" label="Home" active={true} />
  <NavbarItem link="/about" label="About" active={false} />
</URLNavbar>
```

### Features

- Easy navigation setup.
- Customizable active state.

---

## Table

### 📁 `table.tsx`

The `Table` component is used to display transaction data in a tabular format.

### Code

```tsx
import {
  Cell,
  Column,
  Row,
  Table as TableAria,
  TableBody,
  TableHeader,
} from "react-aria-components";
import { shortenAddress } from "@milkyway-engine/wallet/utils";

export type Transaction = {
  account: string;
  txHash: string;
  targetAddresses: string[];
  amounts: string[];
  timestamp: string;
};

const Table = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <TableAria
      aria-label="Files"
      selectionMode="none"
      className="w-full text-sm text-left rtl:text-right text-gray-400"
    >
      <TableHeader className="text-xs uppercase bg-gray-50- border-b border-gray-700 text-gray-400">
        <Column className="pr-6 py-3" isRowHeader>
          Transaction hash
        </Column>
        <Column className="px-6 py-3">Target Addresses</Column>
        <Column className="px-6 py-3">Amounts</Column>
        <Column className="px-6 py-3">Timestamp</Column>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, i) => (
          <TransactionRow transaction={transaction} key={i} />
        ))}
      </TableBody>
    </TableAria>
  );
};

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
  const targetAddresses = transaction.targetAddresses.join("\n");
  const amounts = transaction.amounts.join("\n");
  const transactionTime = new Date(transaction.timestamp).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <Row className="hover:bg-gray-800 transition-all duration-300 ease-in-out">
      <Cell className="pr-6 py-4 flex items-center gap-2">
        {transaction.txHash && (
          <CopySVG
            onClick={() => {
              navigator.clipboard.writeText(transaction.txHash);
              alert("Copied to clipboard");
            }}
            className="h-4 w-4 cursor-pointer"
          />
        )}
        {transaction.txHash ? shortenAddress(transaction.txHash) : "N/A"}
      </Cell>
      <Cell className="px-6 py-4">{targetAddresses}</Cell>
      <Cell className="px-6 py-4">{amounts}</Cell>
      <Cell className="px-6 py-4">{transactionTime}</Cell>
    </Row>
  );
};

export { Table };

const CopySVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
```

### Usage

- **Props**:
  - `transactions`: Array of transaction objects.

```jsx
<Table transactions={transactions} />
```

### Features

- Displays transaction data in a table.
- Copy transaction hash to clipboard.
- Customizable columns.

---

## Code

### 📁 `code.tsx`

The `Code` component is used to render inline code snippets.

### Code

```tsx
export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return <code className={className}>{children}</code>;
}
```

### Usage

- **Props**:
  - `children`: The code content.
  - `className`: Additional CSS classes.

```jsx
<Code className="my-code-class">const x = 10;</Code>
```

### Features

- Simple and lightweight.
- Customizable via `className`.

---

## Toast

### 📁 `toast.tsx`

The `Toast` component is a simple dialog for user signup.

### Code

```tsx
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from "react-aria-components";

const InfoDialog = () => {
  return (
    <DialogTrigger>
      <Button>Sign up…</Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <form>
              <Heading slot="title">Sign up</Heading>
              <TextField autoFocus>
                <Label>First Name</Label>
                <Input />
              </TextField>
              <TextField>
                <Label>Last Name</Label>
                <Input />
              </TextField>
              <Button onPress={close} style={{ marginTop: 8 }}>
                Submit
              </Button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export default InfoDialog;
```

### Usage

- **Props**: No specific props.
- **Structure**:
  - `DialogTrigger` to open the dialog.
  - `Modal` for the modal content.
  - `Dialog` for the form.

### Features

- Simple signup form.
- Fully accessible.
- Easy to integrate.

---

## Card

### 📁 `card.tsx`

The `Card` component is a simple card with a title, content, and a link.

### Code

```tsx
export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}
```

### Usage

- **Props**:
  - `className`: Additional CSS classes.
  - `title`: Title of the card.
  - `children`: Content of the card.
  - `href`: Link URL.

```jsx
<Card title="Learn More" href="https://example.com">
  This is a card description.
</Card>
```

### Features

- Simple and customizable.
- Link opens in a new tab.

---

Feel free to explore and use these components in your projects. If you have any questions or need further assistance, please reach out. Happy coding! 🚀
