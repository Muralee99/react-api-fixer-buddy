import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw } from 'lucide-react';

interface TransactionFilterSidebarProps {
  onFiltersChange: (filters: {
    country: string;
    type: string;
    currency: string;
    paymentType: string;
    transactionType: string;
    transactionStatus: string[];
  }) => void;
}

export const TransactionFilterSidebar: React.FC<TransactionFilterSidebarProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = React.useState({
    country: '',
    type: '',
    currency: '',
    paymentType: '',
    transactionType: '',
    transactionStatus: [] as string[],
  });

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan'];
  const types = ['Card Payment', 'Bank Transfer', 'Digital Wallet', 'Cryptocurrency'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];
  const paymentTypes = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'];
  const transactionTypes = ['Purchase', 'Refund', 'Chargeback', 'Fee', 'Adjustment'];
  const transactionStatuses = ['Completed', 'Pending', 'Processing', 'Failed', 'Cancelled', 'Declined'];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked 
      ? [...filters.transactionStatus, status]
      : filters.transactionStatus.filter(s => s !== status);
    
    const newFilters = { ...filters, transactionStatus: newStatuses };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      country: '',
      type: '',
      currency: '',
      paymentType: '',
      transactionType: '',
      transactionStatus: [],
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Transaction Filters
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Country</Label>
          <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Type Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Type</Label>
          <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Currency Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Currency</Label>
          <Select value={filters.currency} onValueChange={(value) => handleFilterChange('currency', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Currencies</SelectItem>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Payment Type Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Payment Type</Label>
          <Select value={filters.paymentType} onValueChange={(value) => handleFilterChange('paymentType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Payment Types</SelectItem>
              {paymentTypes.map((paymentType) => (
                <SelectItem key={paymentType} value={paymentType}>{paymentType}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Transaction Type Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Transaction Type</Label>
          <Select value={filters.transactionType} onValueChange={(value) => handleFilterChange('transactionType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Transaction Types</SelectItem>
              {transactionTypes.map((transactionType) => (
                <SelectItem key={transactionType} value={transactionType}>{transactionType}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Transaction Status Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Transaction Status</Label>
          <div className="space-y-2">
            {transactionStatuses.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.transactionStatus.includes(status)}
                  onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                />
                <Label htmlFor={`status-${status}`} className="text-sm">{status}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};