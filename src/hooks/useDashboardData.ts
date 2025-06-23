
import { useState, useEffect } from 'react';
import type { DashboardFilters } from '@/pages/Dashboard';

export interface DashboardData {
  overviewData: Array<{
    name: string;
    value: number;
    country?: string;
    paymentMethod?: string;
    currency?: string;
  }>;
  paymentCurrencyData: Array<{
    name: string;
    value: number;
  }>;
  currencyStatusData: Array<{
    name: string;
    successful: number;
    pending: number;
    failed: number;
  }>;
}

export const useDashboardData = (filters: DashboardFilters, shouldFetch: boolean) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    overviewData: [],
    paymentCurrencyData: [],
    currencyStatusData: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data based on filters
      const mockData = generateMockData(filters);
      setDashboardData(mockData);
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [filters, shouldFetch]);

  return { dashboardData, isLoading };
};

const generateMockData = (filters: DashboardFilters): DashboardData => {
  const selectedCountries = filters.countries.length > 0 ? filters.countries : ['US', 'UK'];
  const selectedPaymentMethods = filters.paymentMethods.length > 0 ? filters.paymentMethods : ['VISA', 'MASTERCARD', 'RUPAY'];
  const selectedCurrencies = filters.currencies.length > 0 ? filters.currencies : ['USD', 'EUR', 'GBP', 'INR'];
  const selectedStatuses = filters.transactionStatuses.length > 0 ? filters.transactionStatuses : ['SUCCESSFUL', 'PENDING', 'FAILED'];

  // Overview data - combining countries, payment methods, and currencies
  const overviewData = [];
  selectedCountries.forEach(country => {
    selectedPaymentMethods.forEach(method => {
      selectedCurrencies.forEach(currency => {
        overviewData.push({
          name: `${country}-${method}-${currency}`,
          value: Math.floor(Math.random() * 1000) + 100,
          country,
          paymentMethod: method,
          currency
        });
      });
    });
  });

  // Payment methods and currencies data
  const paymentCurrencyData = [];
  selectedPaymentMethods.forEach(method => {
    selectedCurrencies.forEach(currency => {
      paymentCurrencyData.push({
        name: `${method}-${currency}`,
        value: Math.floor(Math.random() * 500) + 50
      });
    });
  });

  // Currencies and transaction statuses data
  const currencyStatusData = selectedCurrencies.map(currency => ({
    name: currency,
    successful: Math.floor(Math.random() * 800) + 200,
    pending: Math.floor(Math.random() * 200) + 50,
    failed: Math.floor(Math.random() * 100) + 10
  }));

  return {
    overviewData: overviewData.slice(0, 15), // Limit for better visualization
    paymentCurrencyData: paymentCurrencyData.slice(0, 8),
    currencyStatusData
  };
};
