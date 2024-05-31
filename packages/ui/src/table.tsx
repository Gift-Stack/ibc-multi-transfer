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
