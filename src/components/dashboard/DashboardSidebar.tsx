
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { DashboardFilters } from '@/pages/Dashboard';

interface DashboardSidebarProps {
  onSubmit: (filters: DashboardFilters) => void;
}

interface CurrencyData {
  label: string;
  statuses: string[];
}

interface PaymentMethodData {
  label: string;
  currencies: Record<string, CurrencyData>;
}

interface CountryData {
  label: string;
  paymentMethods: Record<string, PaymentMethodData>;
}

interface FilterData {
  countries: Record<string, CountryData>;
}

const FILTER_DATA: FilterData = {
  countries: {
    US: {
      label: 'United States',
      paymentMethods: {
        VISA: {
          label: 'Visa',
          currencies: {
            USD: {
              label: 'US Dollar',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            },
            EUR: {
              label: 'Euro',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            }
          }
        },
        MASTERCARD: {
          label: 'MasterCard',
          currencies: {
            USD: {
              label: 'US Dollar',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            },
            EUR: {
              label: 'Euro',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            }
          }
        }
      }
    },
    UK: {
      label: 'United Kingdom',
      paymentMethods: {
        VISA: {
          label: 'Visa',
          currencies: {
            GBP: {
              label: 'British Pound',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            },
            EUR: {
              label: 'Euro',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            }
          }
        },
        RUPAY: {
          label: 'RuPay',
          currencies: {
            INR: {
              label: 'Indian Rupee',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            },
            GBP: {
              label: 'British Pound',
              statuses: ['SUCCESSFUL', 'PENDING', 'FAILED']
            }
          }
        }
      }
    }
  }
};

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onSubmit }) => {
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({});
  const [expandedPaymentMethods, setExpandedPaymentMethods] = useState<Record<string, boolean>>({});
  const [expandedCurrencies, setExpandedCurrencies] = useState<Record<string, boolean>>({});
  
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleCountry = (countryId: string) => {
    setExpandedCountries(prev => ({
      ...prev,
      [countryId]: !prev[countryId]
    }));
  };

  const togglePaymentMethod = (countryId: string, methodId: string) => {
    const key = `${countryId}-${methodId}`;
    setExpandedPaymentMethods(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleCurrency = (countryId: string, methodId: string, currencyId: string) => {
    const key = `${countryId}-${methodId}-${currencyId}`;
    setExpandedCurrencies(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      countries: selectedCountries,
      paymentMethods: selectedPaymentMethods,
      currencies: selectedCurrencies,
      transactionStatuses: selectedStatuses
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search size={20} />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Countries</Label>
            
            {Object.entries(FILTER_DATA.countries).map(([countryId, countryData]) => (
              <div key={countryId} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => toggleCountry(countryId)}
                    className="flex items-center space-x-1"
                  >
                    {expandedCountries[countryId] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  <Checkbox
                    id={`country-${countryId}`}
                    checked={selectedCountries.includes(countryId)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(countryId, checked as boolean, setSelectedCountries)
                    }
                  />
                  <Label htmlFor={`country-${countryId}`} className="text-sm cursor-pointer">
                    {countryData.label}
                  </Label>
                </div>

                {expandedCountries[countryId] && (
                  <div className="ml-6 space-y-2">
                    <Label className="text-sm font-medium">Payment Methods</Label>
                    
                    {Object.entries(countryData.paymentMethods).map(([methodId, methodData]) => (
                      <div key={methodId} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => togglePaymentMethod(countryId, methodId)}
                            className="flex items-center space-x-1"
                          >
                            {expandedPaymentMethods[`${countryId}-${methodId}`] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                          <Checkbox
                            id={`method-${countryId}-${methodId}`}
                            checked={selectedPaymentMethods.includes(methodId)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(methodId, checked as boolean, setSelectedPaymentMethods)
                            }
                          />
                          <Label htmlFor={`method-${countryId}-${methodId}`} className="text-sm cursor-pointer">
                            {methodData.label}
                          </Label>
                        </div>

                        {expandedPaymentMethods[`${countryId}-${methodId}`] && (
                          <div className="ml-6 space-y-2">
                            <Label className="text-xs font-medium">Currencies</Label>
                            
                            {Object.entries(methodData.currencies).map(([currencyId, currencyData]) => (
                              <div key={currencyId} className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => toggleCurrency(countryId, methodId, currencyId)}
                                    className="flex items-center space-x-1"
                                  >
                                    {expandedCurrencies[`${countryId}-${methodId}-${currencyId}`] ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </button>
                                  <Checkbox
                                    id={`currency-${countryId}-${methodId}-${currencyId}`}
                                    checked={selectedCurrencies.includes(currencyId)}
                                    onCheckedChange={(checked) =>
                                      handleCheckboxChange(currencyId, checked as boolean, setSelectedCurrencies)
                                    }
                                  />
                                  <Label htmlFor={`currency-${countryId}-${methodId}-${currencyId}`} className="text-xs cursor-pointer">
                                    {currencyData.label}
                                  </Label>
                                </div>

                                {expandedCurrencies[`${countryId}-${methodId}-${currencyId}`] && (
                                  <div className="ml-6 space-y-1">
                                    <Label className="text-xs font-medium">Transaction Status</Label>
                                    {currencyData.statuses.map((status) => (
                                      <div key={status} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`status-${countryId}-${methodId}-${currencyId}-${status}`}
                                          checked={selectedStatuses.includes(status)}
                                          onCheckedChange={(checked) =>
                                            handleCheckboxChange(status, checked as boolean, setSelectedStatuses)
                                          }
                                        />
                                        <Label htmlFor={`status-${countryId}-${methodId}-${currencyId}-${status}`} className="text-xs cursor-pointer">
                                          {status.charAt(0) + status.slice(1).toLowerCase()} Transactions
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full flex items-center gap-2">
            <Search size={16} />
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
