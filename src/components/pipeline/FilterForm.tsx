
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface FilterFormProps {
  onSubmit: (filters: {
    fromDate: string;
    toDate: string;
    merchantId: string;
  }) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fromDate,
      toDate,
      merchantId,
    });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full mb-4"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="flex items-center gap-2">
            <Search size={20} />
            Pipeline Data Filter
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
            <form onSubmit={handleSubmit} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="fromDate">From Date</Label>
                <Input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="toDate">To Date</Label>
                <Input
                  id="toDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="merchantId">Merchant ID</Label>
                <Input
                  id="merchantId"
                  type="text"
                  placeholder="Enter Merchant ID"
                  value={merchantId}
                  onChange={(e) => setMerchantId(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="flex items-center gap-2">
                <Search size={16} />
                Submit
              </Button>
            </form>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
