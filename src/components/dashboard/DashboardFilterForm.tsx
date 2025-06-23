
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { DashboardFilters } from '@/pages/Dashboard';

interface DashboardFilterFormProps {
  onSubmit: (filters: DashboardFilters) => void;
}

const COUNTRIES = [
  { id: 'US', label: 'United States' },
  { id: 'UK', label: 'United Kingdom' }
];

const PAYMENT_METHODS = [
  { id: 'VISA', label: 'Visa' },
  { id: 'MASTERCARD', label: 'MasterCard' },
  { id: 'RUPAY', label: 'RuPay' }
];

const CURRENCIES = [
  { id: 'USD', label: 'US Dollar (USD)' },
  { id: 'EUR', label: 'Euro (EUR)' },
  { id: 'GBP', label: 'British Pound (GBP)' },
  { id: 'INR', label: 'Indian Rupee (INR)' }
];

const TRANSACTION_STATUSES = [
  { id: 'SUCCESSFUL', label: 'Successful Transactions' },
  { id: 'PENDING', label: 'Pending Transactions' },
  { id: 'FAILED', label: 'Failed Transactions' }
];

export const DashboardFilterForm: React.FC<DashboardFilterFormProps> = ({ onSubmit }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [transactionStatuses, setTransactionStatuses] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      countries,
      paymentMethods,
      currencies,
      transactionStatuses
    });
  };

  const handleCheckboxChange = (
    value: string,
    checked: boolean,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => 
      checked 
        ? [...prev, value]
        : prev.filter(item => item !== value)
    );
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
            Dashboard Filters
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Countries */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Countries</Label>
                  <div className="space-y-2">
                    {COUNTRIES.map((country) => (
                      <div key={country.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`country-${country.id}`}
                          checked={countries.includes(country.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(country.id, checked as boolean, setCountries)
                          }
                        />
                        <Label
                          htmlFor={`country-${country.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {country.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Payment Methods</Label>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`payment-${method.id}`}
                          checked={paymentMethods.includes(method.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(method.id, checked as boolean, setPaymentMethods)
                          }
                        />
                        <Label
                          htmlFor={`payment-${method.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Currencies */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Currencies</Label>
                  <div className="space-y-2">
                    {CURRENCIES.map((currency) => (
                      <div key={currency.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`currency-${currency.id}`}
                          checked={currencies.includes(currency.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(currency.id, checked as boolean, setCurrencies)
                          }
                        />
                        <Label
                          htmlFor={`currency-${currency.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {currency.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transaction Statuses */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Transaction Status</Label>
                  <div className="space-y-2">
                    {TRANSACTION_STATUSES.map((status) => (
                      <div key={status.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status.id}`}
                          checked={transactionStatuses.includes(status.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(status.id, checked as boolean, setTransactionStatuses)
                          }
                        />
                        <Label
                          htmlFor={`status-${status.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {status.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Search size={16} />
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
