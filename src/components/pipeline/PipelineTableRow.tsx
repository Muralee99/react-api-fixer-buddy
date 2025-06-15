
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { PipelineRow } from "@/pages/PipelineData";

interface PipelineTableRowProps {
  row: PipelineRow;
  onViewFlow: (row: PipelineRow) => void;
  style?: React.CSSProperties;
}

const PipelineTableRow: React.FC<PipelineTableRowProps> = React.memo(
  ({ row, onViewFlow, style }) => (
    <tr
      style={style}
      className="border-b last:border-b-0 bg-white even:bg-gray-50"
    >
      <td className="p-4 align-middle whitespace-nowrap font-medium">{row.nodeType}</td>
      <td className="p-4 align-middle whitespace-nowrap">{row.amount1}</td>
      <td className="p-4 align-middle whitespace-nowrap">{row.amount2}</td>
      <td className="p-4 align-middle whitespace-nowrap">{row.currency1}</td>
      <td className="p-4 align-middle whitespace-nowrap">{row.currency2}</td>
      <td className="p-4 align-middle whitespace-nowrap">{row.lastExecution}</td>
      <td className="p-4 align-middle whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      </td>
      <td className="p-4 align-middle whitespace-nowrap">{row.nextScheduled}</td>
      <td className="p-4 align-middle">{row.documentsProcessed}</td>
      <td className="p-4 align-middle">{row.documentsFailed}</td>
      <td className="p-4 align-middle">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewFlow(row)}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          View Flow
        </Button>
      </td>
    </tr>
  )
);

PipelineTableRow.displayName = "PipelineTableRow";
export default PipelineTableRow;

