
import React from 'react';
import {
  Sidebar,
  SidebarContent,
} from '@/components/ui/sidebar';
import { VisibilityControl, type SelectedTable } from './VisibilityControl';

interface PipelineSidebarProps {
  selected: SelectedTable[];
  onSelect: (selected: SelectedTable[]) => void;
  disabled: boolean;
}

export const PipelineSidebar: React.FC<PipelineSidebarProps> = ({ selected, onSelect, disabled }) => {
  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <VisibilityControl
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
        />
      </SidebarContent>
    </Sidebar>
  );
};
