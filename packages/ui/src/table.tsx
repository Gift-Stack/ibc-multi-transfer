import {
  Cell,
  Column,
  Row,
  Table as TableAria,
  TableBody,
  TableHeader,
} from "react-aria-components";

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
  const targetAddresses = transaction.targetAddresses.join(", ");

  const amounts = transaction.amounts.join(", ");

  const transactionTime = new Date(transaction.timestamp).toLocaleDateString();
  return (
    <Row className="hover:bg-gray-800 transition-all duration-300 ease-in-out">
      <Cell className="px-6 py-4">{transaction.txHash || "N/A"}</Cell>
      <Cell className="px-6 py-4">{targetAddresses}</Cell>
      <Cell className="px-6 py-4">{amounts}</Cell>
      <Cell className="px-6 py-4">{transactionTime}</Cell>
    </Row>
  );
};

export { Table };
