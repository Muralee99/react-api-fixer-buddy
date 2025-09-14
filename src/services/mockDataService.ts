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

export interface Job {
  id: string;
  name: string;
  lastExecution: string;
  status: 'success' | 'failure' | 'running';
  recordsProcessed: number;
  pendingRecords: number;
  exception?: string;
}

export interface JobStep {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: 'success' | 'failure' | 'running';
  recordsProcessed: number;
  recordsFailed: number;
}

export interface JobHistory {
  id: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: 'success' | 'failure' | 'running';
  totalRecords: number;
  successRecords: number;
  failedRecords: number;
  steps: JobStep[];
}

export interface JobDetails {
  id: string;
  name: string;
  description: string;
  type: 'spring-batch';
  currentStatus: 'success' | 'failure' | 'running';
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

export const fetchJobsForPipeline = async (
  rowData: PipelineRow | TransactionData
): Promise<Job[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200));

  const isPipelineRow = 'nodeType' in rowData;
  const jobs: Job[] = [];

  if (isPipelineRow) {
    const baseStatus = rowData.status;
    const jobNames = [
      'Data Ingestion',
      'Data Validation',
      'Data Transformation',
      'Enrichment',
      'Data Loading'
    ];
    for (let i = 0; i < 5; i++) {
      const status = (i < 3) ? 'success' : (i === 3 && baseStatus === 'failure') ? 'failure' : 'success';
      jobs.push({
        id: `job-p-${rowData.id}-${i}`,
        name: jobNames[i],
        lastExecution: rowData.lastExecution,
        status: status,
        recordsProcessed: Math.floor(rowData.documentsProcessed / 5),
        pendingRecords: i === 4 ? 0 : Math.floor(Math.random() * 20),
        exception: status === 'failure' ? 'Error code 502: Invalid data format' : undefined,
      });
    }
  } else {
    const jobNames = [
      'Transaction Fetching',
      'Transaction Aggregation',
      'Reporting'
    ];
    for (let i = 0; i < 3; i++) {
      const status = i < 2 ? 'success' : 'running';
      jobs.push({
        id: `job-t-${rowData.id}-${i}`,
        name: jobNames[i],
        lastExecution: rowData.date,
        status: status as Job['status'],
        recordsProcessed: Math.floor(Math.random() * 1000),
        pendingRecords: i === 2 ? 50 : 0,
        exception: undefined,
      });
    }
  }
  return jobs;
};

export const fetchJobDetails = async (jobId: string): Promise<JobDetails> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    id: jobId,
    name: `Payment Processing Job ${jobId}`,
    description: 'Spring Batch job for processing payment transactions',
    type: 'spring-batch',
    currentStatus: 'success'
  };
};

export const fetchJobHistory = async (jobId: string): Promise<JobHistory[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const history: JobHistory[] = [];
  
  for (let i = 0; i < 10; i++) {
    const startTime = new Date(Date.now() - (i * 24 * 60 * 60 * 1000) - (i * 2 * 60 * 60 * 1000));
    const endTime = new Date(startTime.getTime() + (45 + Math.random() * 30) * 60 * 1000);
    const totalRecords = 1000 + Math.floor(Math.random() * 5000);
    const failedRecords = Math.floor(Math.random() * 50);
    const successRecords = totalRecords - failedRecords;
    
    const steps: JobStep[] = [
      {
        id: `step-1-${i}`,
        name: 'Data Validation',
        startTime: startTime.toISOString(),
        endTime: new Date(startTime.getTime() + 10 * 60 * 1000).toISOString(),
        duration: '10m 0s',
        status: 'success',
        recordsProcessed: totalRecords,
        recordsFailed: Math.floor(Math.random() * 10)
      },
      {
        id: `step-2-${i}`,
        name: 'Payment Processing',
        startTime: new Date(startTime.getTime() + 10 * 60 * 1000).toISOString(),
        endTime: new Date(startTime.getTime() + 35 * 60 * 1000).toISOString(),
        duration: '25m 0s',
        status: 'success',
        recordsProcessed: totalRecords - Math.floor(Math.random() * 10),
        recordsFailed: Math.floor(Math.random() * 20)
      },
      {
        id: `step-3-${i}`,
        name: 'Reconciliation',
        startTime: new Date(startTime.getTime() + 35 * 60 * 1000).toISOString(),
        endTime: endTime.toISOString(),
        duration: '10m 0s',
        status: i > 7 ? 'success' : Math.random() > 0.8 ? 'failure' : 'success',
        recordsProcessed: totalRecords - failedRecords,
        recordsFailed: Math.floor(Math.random() * 20)
      }
    ];
    
    history.push({
      id: `history-${i}`,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: `${Math.floor((endTime.getTime() - startTime.getTime()) / 60000)}m ${
        Math.floor(((endTime.getTime() - startTime.getTime()) % 60000) / 1000)
      }s`,
      status: i > 7 ? 'success' : Math.random() > 0.8 ? 'failure' : 'success',
      totalRecords,
      successRecords,
      failedRecords,
      steps
    });
  }
  
  return history;
};
