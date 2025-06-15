
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Eye } from 'lucide-react';
import type { TransactionData } from '@/services/mockDataService';

interface TransactionTableRowProps {
  row: TransactionData;
  rowIndex: number;
}

const TransactionTableRow: React.FC<TransactionTableRowProps> = ({ row, rowIndex }) => {
  const navigate = useNavigate();

  const onViewFlow = () => {
    navigate(`/transaction-flow/detail`);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{rowIndex + 1}</TableCell>
      <TableCell>{row.mid}</TableCell>
      <TableCell>{row.amount1}</TableCell>
      <TableCell>{row.amount2}</TableCell>
      <TableCell>{row.currency}</TableCell>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.account}</TableCell>
      <TableCell>
        <Button variant="outline" size="sm" onClick={onViewFlow} className="flex items-center gap-2">
          <Eye size={16} />
          View Flow
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TransactionTableRow;
