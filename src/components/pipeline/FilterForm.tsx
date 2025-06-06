
import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fromDate,
      toDate,
      merchantId,
    });
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search size={20} />
          Pipeline Data Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
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
    </Card>
  );
};
