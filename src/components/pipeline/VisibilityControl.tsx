
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ListCollapse } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SelectedTable = 'all' | 'pipeline' | 'transactions' | 'pipeline_infographics' | 'pipeline_aggregates_table' | 'transaction_infographics' | 'transaction_aggregates_table';

export const SECTIONS: { id: SelectedTable; label: string }[] = [
  { id: 'all', label: 'All Tables' },
  { id: 'pipeline', label: 'Pipeline Data' },
  { id: 'transactions', label: 'Transactional Data' },
  { id: 'pipeline_infographics', label: 'Pipeline Infographics' },
  { id: 'pipeline_aggregates_table', label: 'Pipeline Aggregates' },
  { id: 'transaction_infographics', label: 'Transactional Infographics' },
  { id: 'transaction_aggregates_table', label: 'Transactional Aggregates' },
];

interface VisibilityControlProps {
  selected: SelectedTable[];
  onSelect: (selected: SelectedTable[]) => void;
  disabled: boolean;
}

export const VisibilityControl: React.FC<VisibilityControlProps> = ({ selected, onSelect, disabled }) => {
  const [isOpen, setIsOpen] = useState(true);
  
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
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full h-fit"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ListCollapse size={20} />
            Display Options
          </CardTitle>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
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
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
