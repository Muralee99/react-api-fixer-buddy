
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Filter, BarChart3, Table2 } from 'lucide-react';

interface PaymentFilterSidebarProps {
  onFiltersChange: (filters: {
    category: string;
    subcategory: string;
    viewType: 'charts' | 'table' | 'both';
    statuses: string[];
    dateRange: string;
  }) => void;
}

export const PaymentFilterSidebar: React.FC<PaymentFilterSidebarProps> = ({ onFiltersChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Payments');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [viewType, setViewType] = useState<'charts' | 'table' | 'both'>('both');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('30days');

  const categories = {
    'Payments': ['Captures', 'Funded', 'Authorized'],
    'Refunds': ['Full Refunds', 'Partial Refunds'],
    'Fees': ['Transaction Fees', 'Scheme Fees']
  };

  const statuses = ['Completed', 'Pending', 'Processing', 'Failed'];
  const dateRanges = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '1year', label: 'Last year' }
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    applyFilters(category, '', viewType, selectedStatuses, dateRange);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    applyFilters(selectedCategory, subcategory, viewType, selectedStatuses, dateRange);
  };

  const handleViewTypeChange = (newViewType: 'charts' | 'table' | 'both') => {
    setViewType(newViewType);
    applyFilters(selectedCategory, selectedSubcategory, newViewType, selectedStatuses, dateRange);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked 
      ? [...selectedStatuses, status]
      : selectedStatuses.filter(s => s !== status);
    setSelectedStatuses(newStatuses);
    applyFilters(selectedCategory, selectedSubcategory, viewType, newStatuses, dateRange);
  };

  const handleDateRangeChange = (newDateRange: string) => {
    setDateRange(newDateRange);
    applyFilters(selectedCategory, selectedSubcategory, viewType, selectedStatuses, newDateRange);
  };

  const applyFilters = (category: string, subcategory: string, view: string, statuses: string[], range: string) => {
    onFiltersChange({
      category,
      subcategory,
      viewType: view as 'charts' | 'table' | 'both',
      statuses,
      dateRange: range
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Payment Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Selection */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Category</Label>
          <RadioGroup value={selectedCategory} onValueChange={handleCategoryChange}>
            {Object.keys(categories).map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={`category-${category}`} />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Subcategory Selection */}
        {selectedCategory && (
          <div>
            <Label className="text-base font-semibold mb-3 block">
              {selectedCategory} Types
            </Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subcategory-all"
                  checked={selectedSubcategory === ''}
                  onCheckedChange={() => handleSubcategoryChange('')}
                />
                <Label htmlFor="subcategory-all">All Types</Label>
              </div>
              {categories[selectedCategory as keyof typeof categories].map((subcategory) => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subcategory-${subcategory}`}
                    checked={selectedSubcategory === subcategory}
                    onCheckedChange={() => handleSubcategoryChange(subcategory)}
                  />
                  <Label htmlFor={`subcategory-${subcategory}`}>{subcategory}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* View Type Selection */}
        <div>
          <Label className="text-base font-semibold mb-3 block">View Type</Label>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={viewType === 'charts' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewTypeChange('charts')}
              className="justify-start"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Charts Only
            </Button>
            <Button
              variant={viewType === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewTypeChange('table')}
              className="justify-start"
            >
              <Table2 className="mr-2 h-4 w-4" />
              Table Only
            </Button>
            <Button
              variant={viewType === 'both' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewTypeChange('both')}
              className="justify-start"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Charts & Table
            </Button>
          </div>
        </div>

        <Separator />

        {/* Status Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Status Filter</Label>
          <div className="space-y-2">
            {statuses.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                />
                <Label htmlFor={`status-${status}`}>{status}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Date Range */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Date Range</Label>
          <RadioGroup value={dateRange} onValueChange={handleDateRangeChange}>
            {dateRanges.map((range) => (
              <div key={range.value} className="flex items-center space-x-2">
                <RadioGroupItem value={range.value} id={`date-${range.value}`} />
                <Label htmlFor={`date-${range.value}`}>{range.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
