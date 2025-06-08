
export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'currency' | 'status' | 'number' | 'date';
  icon?: string;
  formatter?: (value: any) => string;
}

export interface SectionConfig {
  title: string;
  icon?: string;
  fields: FieldConfig[];
}

export interface NodeConfig {
  type: string;
  title: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  sectionBgColor: string;
  handleColor: string;
  sections: SectionConfig[];
  handles: {
    target?: boolean;
    source?: boolean;
  };
}

export const nodeConfigurations: Record<string, NodeConfig> = {
  dealBooking: {
    type: 'dealBooking',
    title: 'Deal Booking Card',
    icon: 'CreditCard',
    bgColor: 'bg-orange-500',
    borderColor: 'border-orange-600',
    sectionBgColor: 'bg-orange-600',
    handleColor: 'bg-orange-300',
    sections: [
      {
        title: 'Amounts & Currencies',
        fields: [
          { key: 'amount1', label: 'Amount 1', type: 'currency' },
          { key: 'amount2', label: 'Amount 2', type: 'currency' },
          { key: 'currency1', label: 'Currency 1', type: 'text' },
          { key: 'currency2', label: 'Currency 2', type: 'text' },
        ],
      },
      {
        title: 'Job Execution',
        icon: 'Clock',
        fields: [
          { key: 'label', label: 'Job', type: 'text' },
          { key: 'status', label: 'Last', type: 'status' },
          { key: 'lastExecution', label: '', type: 'date' },
          { key: 'nextScheduled', label: 'Next', type: 'date' },
        ],
      },
      {
        title: 'Document Processing',
        icon: 'FileText',
        fields: [
          { key: 'documentsProcessed', label: 'Processed', type: 'number' },
          { key: 'documentsFailed', label: 'Failed', type: 'number', icon: 'XCircle' },
        ],
      },
    ],
    handles: {
      source: true,
    },
  },
  paymentDebit: {
    type: 'paymentDebit',
    title: 'Debit Leg',
    icon: 'TrendingDown',
    bgColor: 'bg-red-500',
    borderColor: 'border-red-600',
    sectionBgColor: 'bg-red-600',
    handleColor: 'bg-red-300',
    sections: [
      {
        title: 'Amounts & Currencies',
        fields: [
          { key: 'amount1', label: 'Amount 1', type: 'currency' },
          { key: 'amount2', label: 'Amount 2', type: 'currency' },
          { key: 'currency1', label: 'Currency 1', type: 'text' },
          { key: 'currency2', label: 'Currency 2', type: 'text' },
        ],
      },
      {
        title: 'Job Execution',
        icon: 'Clock',
        fields: [
          { key: 'label', label: 'Job', type: 'text' },
          { key: 'status', label: 'Last', type: 'status' },
          { key: 'lastExecution', label: '', type: 'date' },
          { key: 'nextScheduled', label: 'Next', type: 'date' },
        ],
      },
      {
        title: 'Document Processing',
        icon: 'FileText',
        fields: [
          { key: 'documentsProcessed', label: 'Processed', type: 'number' },
          { key: 'documentsFailed', label: 'Failed', type: 'number', icon: 'XCircle' },
        ],
      },
    ],
    handles: {
      target: true,
      source: true,
    },
  },
  paymentCredit: {
    type: 'paymentCredit',
    title: 'Credit Leg',
    icon: 'TrendingUp',
    bgColor: 'bg-green-500',
    borderColor: 'border-green-600',
    sectionBgColor: 'bg-green-600',
    handleColor: 'bg-green-300',
    sections: [
      {
        title: 'Amounts & Currencies',
        fields: [
          { key: 'amount1', label: 'Amount 1', type: 'currency' },
          { key: 'amount2', label: 'Amount 2', type: 'currency' },
          { key: 'currency1', label: 'Currency 1', type: 'text' },
          { key: 'currency2', label: 'Currency 2', type: 'text' },
        ],
      },
      {
        title: 'Job Execution',
        icon: 'Clock',
        fields: [
          { key: 'label', label: 'Job', type: 'text' },
          { key: 'status', label: 'Last', type: 'status' },
          { key: 'lastExecution', label: '', type: 'date' },
          { key: 'nextScheduled', label: 'Next', type: 'date' },
        ],
      },
      {
        title: 'Document Processing',
        icon: 'FileText',
        fields: [
          { key: 'documentsProcessed', label: 'Processed', type: 'number' },
          { key: 'documentsFailed', label: 'Failed', type: 'number', icon: 'XCircle' },
        ],
      },
    ],
    handles: {
      target: true,
      source: true,
    },
  },
  fundInitial: {
    type: 'fundInitial',
    title: 'Fund Record',
    icon: 'FileText',
    bgColor: 'bg-teal-500',
    borderColor: 'border-teal-600',
    sectionBgColor: 'bg-teal-600',
    handleColor: 'bg-teal-300',
    sections: [
      {
        title: 'Amounts & Currencies',
        fields: [
          { key: 'amount1', label: 'Amount 1', type: 'currency' },
          { key: 'amount2', label: 'Amount 2', type: 'currency' },
          { key: 'currency1', label: 'Currency 1', type: 'text' },
          { key: 'currency2', label: 'Currency 2', type: 'text' },
        ],
      },
      {
        title: 'Job Execution',
        icon: 'Clock',
        fields: [
          { key: 'label', label: 'Job', type: 'text' },
          { key: 'status', label: 'Last', type: 'status' },
          { key: 'lastExecution', label: '', type: 'date' },
          { key: 'nextScheduled', label: 'Next', type: 'date' },
        ],
      },
      {
        title: 'Document Processing',
        icon: 'FileText',
        fields: [
          { key: 'documentsProcessed', label: 'Processed', type: 'number' },
          { key: 'documentsFailed', label: 'Failed', type: 'number', icon: 'XCircle' },
        ],
      },
    ],
    handles: {
      target: true,
      source: true,
    },
  },
  fundFunding: {
    type: 'fundFunding',
    title: 'Funding Records',
    icon: 'Wallet',
    bgColor: 'bg-indigo-500',
    borderColor: 'border-indigo-600',
    sectionBgColor: 'bg-indigo-600',
    handleColor: 'bg-indigo-300',
    sections: [
      {
        title: 'Amounts & Currencies',
        fields: [
          { key: 'amount1', label: 'Amount 1', type: 'currency' },
          { key: 'amount2', label: 'Amount 2', type: 'currency' },
          { key: 'currency1', label: 'Currency 1', type: 'text' },
          { key: 'currency2', label: 'Currency 2', type: 'text' },
        ],
      },
      {
        title: 'Job Execution',
        icon: 'Clock',
        fields: [
          { key: 'label', label: 'Job', type: 'text' },
          { key: 'status', label: 'Last', type: 'status' },
          { key: 'lastExecution', label: '', type: 'date' },
          { key: 'nextScheduled', label: 'Next', type: 'date' },
        ],
      },
      {
        title: 'Document Processing',
        icon: 'FileText',
        fields: [
          { key: 'documentsProcessed', label: 'Processed', type: 'number' },
          { key: 'documentsFailed', label: 'Failed', type: 'number', icon: 'XCircle' },
        ],
      },
    ],
    handles: {
      target: true,
    },
  },
};
