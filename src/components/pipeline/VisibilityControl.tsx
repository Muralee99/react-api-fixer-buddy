
import React from 'react';
import { Button } from '@/components/ui/button';

export type SelectedTable = 'all' | 'pipeline' | 'transactions' | 'pipeline_aggregates' | 'transaction_aggregates';

const SECTIONS: { id: SelectedTable; label: string }[] = [
  { id: 'all', label: 'All Tables' },
  { id: 'pipeline', label: 'Pipeline Data' },
  { id: 'transactions', label: 'Transactional Data' },
  { id: 'pipeline_aggregates', label: 'Pipeline Aggregates' },
  { id: 'transaction_aggregates', label: 'Transactional Aggregates' },
];

interface VisibilityControlProps {
  selected: SelectedTable;
  onSelect: (selected: SelectedTable) => void;
  disabled: boolean;
}

export const VisibilityControl: React.FC<VisibilityControlProps> = ({ selected, onSelect, disabled }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-card border rounded-lg shadow-sm h-fit">
      <h3 className="font-semibold mb-2 text-lg">Display Options</h3>
      {SECTIONS.map((section) => (
        <Button
          key={section.id}
          variant={selected === section.id ? 'secondary' : 'ghost'}
          onClick={() => onSelect(section.id)}
          className="justify-start"
          disabled={disabled}
        >
          {section.label}
        </Button>
      ))}
    </div>
  );
};

