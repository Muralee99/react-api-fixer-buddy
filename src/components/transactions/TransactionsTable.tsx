
import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCaption,
} from '@/components/ui/table';
import type { TransactionData } from '@/services/mockDataService';
import TransactionTableRow from './TransactionTableRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TransactionsTableProps {
  transactions: TransactionData[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>MID</TableHead>
              <TableHead>Amount 1</TableHead>
              <TableHead>Amount 2</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TransactionTableRow key={transaction.id} row={transaction} rowIndex={index} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
