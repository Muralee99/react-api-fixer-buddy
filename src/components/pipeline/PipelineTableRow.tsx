
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { PipelineRow } from "@/pages/PipelineData"; // Change import to type

interface PipelineTableRowProps {
  row: PipelineRow;
  onViewFlow: (row: PipelineRow) => void;
  style?: React.CSSProperties;
}

const PipelineTableRow: React.FC<PipelineTableRowProps> = React.memo(
  ({ row, onViewFlow, style }) => (
    <tr style={style} className="border-b last:border-b-0">
      <td className="font-medium">{row.nodeType}</td>
      <td>{row.amount1}</td>
      <td>{row.amount2}</td>
      <td>{row.currency1}</td>
      <td>{row.currency2}</td>
      <td>{row.lastExecution}</td>
      <td>
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
      <td>{row.nextScheduled}</td>
      <td>{row.documentsProcessed}</td>
      <td>{row.documentsFailed}</td>
      <td>
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

