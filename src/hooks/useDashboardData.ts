import { useState, useEffect } from 'react';
import type { DashboardFilters, DashboardFormData } from '@/pages/Dashboard';

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
  trafficData: Array<{
    time: string;
    requests: number;
    dataVolume: number;
    errors: number;
  }>;
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

export const useDashboardData = (
  filters: DashboardFilters, 
  shouldFetch: boolean,
  formData: DashboardFormData
) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    overviewData: [],
    paymentCurrencyData: [],
    currencyStatusData: [],
    trafficData: []
  });
  const [availableFilters, setAvailableFilters] = useState<FilterData>({
    countries: {}
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!shouldFetch || !formData.fromDate || !formData.toDate || !formData.merchantId) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data based on form data and filters
      const { mockData, dynamicFilters } = generateMockDataWithFilters(formData, filters);
      setDashboardData(mockData);
      setAvailableFilters(dynamicFilters);
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [filters, shouldFetch, formData]);

  return { dashboardData, isLoading, availableFilters };
};

const generateMockDataWithFilters = (
  formData: DashboardFormData,
  filters: DashboardFilters
): { mockData: DashboardData; dynamicFilters: FilterData } => {
  // Simulate dynamic filters based on "transaction results"
  const availableCountries = ['US', 'UK'];
  const availablePaymentMethods = ['VISA', 'MASTERCARD', 'RUPAY'];
  const availableCurrencies = ['USD', 'EUR', 'GBP', 'INR'];
  const availableStatuses = ['SUCCESSFUL', 'PENDING', 'FAILED'];

  // Generate dynamic filter structure based on "data results"
  const dynamicFilters: FilterData = {
    countries: {}
  };

  availableCountries.forEach(country => {
    const countryLabel = country === 'US' ? 'United States' : 'United Kingdom';
    dynamicFilters.countries[country] = {
      label: countryLabel,
      paymentMethods: {}
    };

    // Add payment methods based on country
    const methodsForCountry = country === 'US' 
      ? ['VISA', 'MASTERCARD'] 
      : ['VISA', 'RUPAY'];

    methodsForCountry.forEach(method => {
      const methodLabel = method === 'VISA' ? 'Visa' : 
                         method === 'MASTERCARD' ? 'MasterCard' : 'RuPay';
      
      dynamicFilters.countries[country].paymentMethods[method] = {
        label: methodLabel,
        currencies: {}
      };

      // Add currencies based on country and method
      const currenciesForMethod = country === 'US' 
        ? ['USD', 'EUR'] 
        : method === 'VISA' ? ['GBP', 'EUR'] : ['INR', 'GBP'];

      currenciesForMethod.forEach(currency => {
        const currencyLabel = 
          currency === 'USD' ? 'US Dollar' :
          currency === 'EUR' ? 'Euro' :
          currency === 'GBP' ? 'British Pound' : 'Indian Rupee';

        dynamicFilters.countries[country].paymentMethods[method].currencies[currency] = {
          label: currencyLabel,
          statuses: availableStatuses
        };
      });
    });
  });

  // Generate traffic data based on time range
  const generateTrafficData = () => {
    const startDate = new Date(formData.fromDate);
    const endDate = new Date(formData.toDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const trafficData = [];
    const hoursToGenerate = Math.min(diffDays * 24, 168); // Max 7 days of hourly data
    
    for (let i = 0; i < hoursToGenerate; i++) {
      const time = new Date(startDate.getTime() + i * 60 * 60 * 1000);
      const baseRequests = 1000 + Math.sin(i / 4) * 300; // Simulate daily patterns
      const variance = Math.random() * 200 - 100;
      
      trafficData.push({
        time: time.toISOString(),
        requests: Math.max(0, Math.floor(baseRequests + variance)),
        dataVolume: Math.floor((baseRequests + variance) * 0.5 + Math.random() * 100),
        errors: Math.floor(Math.random() * 50)
      });
    }
    
    return trafficData;
  };

  // Generate chart data
  const selectedCountries = filters.countries.length > 0 ? filters.countries : availableCountries;
  const selectedPaymentMethods = filters.paymentMethods.length > 0 ? filters.paymentMethods : availablePaymentMethods;
  const selectedCurrencies = filters.currencies.length > 0 ? filters.currencies : availableCurrencies;

  // Overview data
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
    mockData: {
      overviewData: overviewData.slice(0, 15),
      paymentCurrencyData: paymentCurrencyData.slice(0, 8),
      currencyStatusData,
      trafficData: generateTrafficData()
    },
    dynamicFilters
  };
};
