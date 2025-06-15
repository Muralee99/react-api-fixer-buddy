
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { PipelineRow } from "@/services/mockDataService";

interface PipelineTableRowProps {
  row: PipelineRow;
  onViewFlow: (row: PipelineRow) => void;
  style?: React.CSSProperties;
  rowIndex: number; // new prop
}

const PipelineTableRow: React.FC<PipelineTableRowProps> = React.memo(
  ({ row, onViewFlow, style, rowIndex }) => (
    <div
      style={style}
      className="flex items-center border-b last:border-b-0 bg-white even:bg-gray-50"
    >
      <div className="p-4 align-middle whitespace-nowrap font-medium text-gray-500 w-[4%]">{rowIndex}</div>
      <div className="p-4 align-middle whitespace-nowrap font-medium w-[12%] truncate">{row.nodeType}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[7%]">{row.amount1}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[7%]">{row.amount2}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[7%]">{row.currency1}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[7%]">{row.currency2}</div>
      <div className="p-4 align-middle w-[12%] break-words">{row.lastExecution}</div>
      <div className="p-4 align-middle whitespace-nowrap w-[8%]">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      </div>
      <div className="p-4 align-middle w-[12%] break-words">{row.nextScheduled}</div>
      <div className="p-4 align-middle w-[7%]">{row.documentsProcessed}</div>
      <div className="p-4 align-middle w-[7%]">{row.documentsFailed}</div>
      <div className="p-4 align-middle w-[10%]">
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

PipelineTableRow.displayName = "PipelineTableRow";
export default PipelineTableRow;
