export interface PipelineData {
  dealBooking: {
    amount1: string;
    amount2: string;
    currency1: string;
    currency2: string;
    lastExecution: string;
    status: 'success' | 'failure';
    nextScheduled: string;
    documentsProcessed: number;
    documentsFailed: number;
  };
  paymentDebit: {
    amount1: string;
    amount2: string;
    currency1: string;
    currency2: string;
    lastExecution: string;
    status: 'success' | 'failure';
    nextScheduled: string;
    documentsProcessed: number;
    documentsFailed: number;
  };
  paymentCredit: {
    amount1: string;
    amount2: string;
    currency1: string;
    currency2: string;
    lastExecution: string;
    status: 'success' | 'failure';
    nextScheduled: string;
    documentsProcessed: number;
    documentsFailed: number;
  };
  fundInitial: {
    amount1: string;
    amount2: string;
    currency1: string;
    currency2: string;
    lastExecution: string;
    status: 'success' | 'failure';
    nextScheduled: string;
    documentsProcessed: number;
    documentsFailed: number;
  };
  fundFunding: {
    amount1: string;
    amount2: string;
    currency1: string;
    currency2: string;
    lastExecution: string;
    status: 'success' | 'failure';
    nextScheduled: string;
    documentsProcessed: number;
    documentsFailed: number;
  };
}

export interface PipelineRow {
  id: string;
  nodeType: string;
  amount1: string;
  amount2: string;
  currency1: string;
  currency2: string;
  lastExecution: string;
  status: 'success' | 'failure';
  nextScheduled: string;
  documentsProcessed: number;
  documentsFailed: number;
  filters: {
    fromDate: string;
    toDate: string;
    merchantId: string;
  };
}

export interface TransactionData {
  id: string;
  mid: string;
  amount1: string;
  amount2: string;
  currency: string;
  date: string;
  account: string;
}

export const fetchPipelineData = async (filters: {
  fromDate: string;
  toDate: string;
  merchantId: string;
}): Promise<PipelineData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Fetching data with filters:', filters);

  // Mock data based on merchant ID for variation
  const merchantVariant = parseInt(filters.merchantId) % 3;
  
  const mockData: PipelineData = {
    dealBooking: {
      amount1: merchantVariant === 0 ? '$5,000' : merchantVariant === 1 ? '$7,500' : '$3,200',
      amount2: merchantVariant === 0 ? '$4,200' : merchantVariant === 1 ? '$6,800' : '$2,900',
      currency1: 'USD',
      currency2: 'EUR',
      lastExecution: `${filters.fromDate} 14:30`,
      status: merchantVariant === 2 ? 'failure' : 'success',
      nextScheduled: `${filters.toDate} 09:00`,
      documentsProcessed: 1245 + merchantVariant * 100,
      documentsFailed: merchantVariant === 2 ? 8 : 3,
    },
    paymentDebit: {
      amount1: merchantVariant === 0 ? '$2,500' : merchantVariant === 1 ? '$3,750' : '$1,600',
      amount2: merchantVariant === 0 ? '$2,100' : merchantVariant === 1 ? '$3,400' : '$1,450',
      currency1: 'USD',
      currency2: 'EUR',
      lastExecution: `${filters.fromDate} 15:15`,
      status: 'success',
      nextScheduled: `${filters.toDate} 10:30`,
      documentsProcessed: 987 + merchantVariant * 50,
      documentsFailed: merchantVariant,
    },
    paymentCredit: {
      amount1: merchantVariant === 0 ? '$2,500' : merchantVariant === 1 ? '$3,750' : '$1,600',
      amount2: merchantVariant === 0 ? '$2,100' : merchantVariant === 1 ? '$3,400' : '$1,450',
      currency1: 'USD',
      currency2: 'EUR',
      lastExecution: `${filters.fromDate} 15:20`,
      status: 'success',
      nextScheduled: `${filters.toDate} 10:35`,
      documentsProcessed: 1156 + merchantVariant * 75,
      documentsFailed: merchantVariant + 1,
    },
    fundInitial: {
      amount1: merchantVariant === 0 ? '$5,000' : merchantVariant === 1 ? '$7,500' : '$3,200',
      amount2: merchantVariant === 0 ? '$4,200' : merchantVariant === 1 ? '$6,800' : '$2,900',
      currency1: 'USD',
      currency2: 'EUR',
      lastExecution: `${filters.fromDate} 16:00`,
      status: 'success',
      nextScheduled: `${filters.toDate} 11:00`,
      documentsProcessed: 1890 + merchantVariant * 60,
      documentsFailed: merchantVariant === 2 ? 5 : 2,
    },
    fundFunding: {
      amount1: merchantVariant === 0 ? '$5,000' : merchantVariant === 1 ? '$7,500' : '$3,200',
      amount2: merchantVariant === 0 ? '$4,200' : merchantVariant === 1 ? '$6,800' : '$2,900',
      currency1: 'USD',
      currency2: 'EUR',
      lastExecution: `${filters.fromDate} 16:30`,
      status: merchantVariant === 1 ? 'failure' : 'success',
      nextScheduled: `${filters.toDate} 11:30`,
      documentsProcessed: 2156 + merchantVariant * 80,
      documentsFailed: merchantVariant === 1 ? 7 : 5,
    },
  };

  return mockData;
};

export const fetchTransactionData = async (filters: {
  fromDate: string;
  toDate: string;
  merchantId: string;
}): Promise<TransactionData[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log('Fetching transaction data with filters:', filters);

  const transactions: TransactionData[] = [];
  const count = 250; // Generate 250 mock transactions

  for (let i = 0; i < count; i++) {
    const merchantVariant = (parseInt(filters.merchantId) + i) % 4;
    const date = new Date(new Date(filters.fromDate).getTime() + i * 86400000); // one per day
    
    transactions.push({
      id: `txn-${i + 1}`,
      mid: filters.merchantId,
      amount1: `$${(1000 + merchantVariant * 150 + i * 10).toFixed(2)}`,
      amount2: `$${(950 + merchantVariant * 150 + i * 5).toFixed(2)}`,
      currency: 'USD',
      date: date.toISOString().split('T')[0],
      account: `**** **** **** ${1000 + i % 100}`,
    });
  }

  return transactions;
};
