import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';

interface TransactionFilterSidebarProps {
  onFiltersChange: (filters: {
    country: string[];
    type: string[];
    currency: string[];
    paymentType: string[];
    transactionType: string[];
    transactionStatus: string[];
  }) => void;
}

export const TransactionFilterSidebar: React.FC<TransactionFilterSidebarProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = React.useState({
    country: [] as string[],
    type: [] as string[],
    currency: [] as string[],
    paymentType: [] as string[],
    transactionType: [] as string[],
    transactionStatus: [] as string[],
  });

  const [openSections, setOpenSections] = React.useState({
    country: false,
    type: false,
    currency: false,
    paymentType: false,
    transactionType: false,
    transactionStatus: false,
  });

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan'];
  const types = ['Card Payment', 'Bank Transfer', 'Digital Wallet', 'Cryptocurrency'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];
  const paymentTypes = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'];
  const transactionTypes = ['Purchase', 'Refund', 'Chargeback', 'Fee', 'Adjustment'];
  const transactionStatuses = ['Completed', 'Pending', 'Processing', 'Failed', 'Cancelled', 'Declined'];

  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    const currentArray = filters[key as keyof typeof filters] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    const newFilters = { ...filters, [key]: newArray };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReset = () => {
    const resetFilters = {
      country: [],
      type: [],
      currency: [],
      paymentType: [],
      transactionType: [],
      transactionStatus: [],
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const FilterSection = ({ 
    title, 
    items, 
    filterKey, 
    isOpen 
  }: { 
    title: string; 
    items: string[]; 
    filterKey: keyof typeof filters;
    isOpen: boolean;
  }) => (
    <div>
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(filterKey)}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex w-full items-center justify-start gap-2 p-0 font-semibold text-base hover:bg-transparent"
          >
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
            <Label className="text-base font-semibold cursor-pointer">{title}</Label>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          {items.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={`${filterKey}-${item}`}
                checked={filters[filterKey].includes(item)}
                onCheckedChange={(checked) => handleFilterChange(filterKey, item, checked as boolean)}
              />
              <Label htmlFor={`${filterKey}-${item}`} className="text-sm cursor-pointer">{item}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

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
        <FilterSection 
          title="Country" 
          items={countries} 
          filterKey="country" 
          isOpen={openSections.country}
        />
        
        <Separator />
        
        <FilterSection 
          title="Type" 
          items={types} 
          filterKey="type" 
          isOpen={openSections.type}
        />
        
        <Separator />
        
        <FilterSection 
          title="Currency" 
          items={currencies} 
          filterKey="currency" 
          isOpen={openSections.currency}
        />
        
        <Separator />
        
        <FilterSection 
          title="Payment Type" 
          items={paymentTypes} 
          filterKey="paymentType" 
          isOpen={openSections.paymentType}
        />
        
        <Separator />
        
        <FilterSection 
          title="Transaction Type" 
          items={transactionTypes} 
          filterKey="transactionType" 
          isOpen={openSections.transactionType}
        />
        
        <Separator />
        
        <FilterSection 
          title="Transaction Status" 
          items={transactionStatuses} 
          filterKey="transactionStatus" 
          isOpen={openSections.transactionStatus}
        />
      </CardContent>
    </Card>
  );
};