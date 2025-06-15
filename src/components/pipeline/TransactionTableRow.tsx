
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { TransactionData } from "@/services/mockDataService";

interface TransactionTableRowProps {
  row: TransactionData;
  onViewFlow: (row: TransactionData) => void;
  style?: React.CSSProperties;
  rowIndex: number;
}

const TransactionTableRow: React.FC<TransactionTableRowProps> = React.memo(
  ({ row, onViewFlow, style, rowIndex }) => (
    <div
      style={style}
      className="flex items-center border-b last:border-b-0 bg-white even:bg-gray-50 text-sm"
    >
      <div className="p-4 align-middle whitespace-nowrap font-medium text-gray-500 w-[5%]">{rowIndex}</div>
      <div className="p-4 align-middle whitespace-nowrap font-medium w-[15%] truncate">{row.mid}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[10%] text-right">{row.amount1}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[10%] text-right">{row.amount2}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[10%] text-center">{row.currency}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[15%]">{row.date}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[20%] truncate">{row.account}</div>
      <div className="p-4 align-middle w-[15%] text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewFlow(row)}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          View Flow
        </Button>
      </div>
    </div>
  )
);

TransactionTableRow.displayName = "TransactionTableRow";
export default TransactionTableRow;
