
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type SelectedTable = 'all' | 'pipeline' | 'transactions' | 'pipeline_aggregates' | 'transaction_aggregates';

export const SECTIONS: { id: SelectedTable; label: string }[] = [
  { id: 'all', label: 'All Tables' },
  { id: 'pipeline', label: 'Pipeline Data' },
  { id: 'transactions', label: 'Transactional Data' },
  { id: 'pipeline_aggregates', label: 'Pipeline Aggregates' },
  { id: 'transaction_aggregates', label: 'Transactional Aggregates' },
];

interface VisibilityControlProps {
  selected: SelectedTable[];
  onSelect: (selected: SelectedTable[]) => void;
  disabled: boolean;
}

export const VisibilityControl: React.FC<VisibilityControlProps> = ({ selected, onSelect, disabled }) => {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelect(SECTIONS.map((s) => s.id));
    } else {
      onSelect([]);
    }
  };

  const handleSelectOne = (id: SelectedTable, checked: boolean) => {
    let newSelected: SelectedTable[];
    if (checked) {
      newSelected = [...selected, id];
      const allOtherIds = SECTIONS.filter((s) => s.id !== 'all').map((s) => s.id);
      if (allOtherIds.every((otherId) => newSelected.includes(otherId))) {
        if (!newSelected.includes('all')) {
          newSelected.push('all');
        }
      }
    } else {
      newSelected = selected.filter((s) => s !== id && s !== 'all');
    }
    onSelect(newSelected);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-card border rounded-lg shadow-sm h-fit">
      <h3 className="font-semibold mb-2 text-lg">Display Options</h3>
      {SECTIONS.map((section) => (
        <div key={section.id} className="flex items-center space-x-2">
          <Checkbox
            id={section.id}
            checked={selected.includes(section.id)}
            onCheckedChange={(checked) => {
              if (section.id === 'all') {
                handleSelectAll(!!checked);
              } else {
                handleSelectOne(section.id, !!checked);
              }
            }}
            disabled={disabled}
          />
          <Label htmlFor={section.id} className="font-normal cursor-pointer">
            {section.label}
          </Label>
        </div>
      ))}
    </div>
  );
};
