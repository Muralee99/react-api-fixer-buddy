
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Receipt, RefreshCw, DollarSign } from 'lucide-react';

interface PaymentDetailsTableProps {
  selectedFilters: {
    category: string;
    subcategory: string;
  };
}

interface PaymentDetail {
  id: string;
  type: string;
  amount: number;
  status: string;
  date: string;
  merchantId: string;
  currency: string;
}

export const PaymentDetailsTable: React.FC<PaymentDetailsTableProps> = ({ selectedFilters }) => {
  // Generate mock data based on selected filters
  const generateMockData = (): PaymentDetail[] => {
    const types = {
      'Payments': {
        'Captures': ['Payment Capture', 'Card Capture', 'Digital Capture'],
        'Funded': ['Bank Transfer', 'Wallet Transfer', 'Direct Deposit'],
        'Authorized': ['Card Auth', 'Payment Auth', 'Pre-auth']
      },
      'Refunds': {
        'Full Refunds': ['Full Refund', 'Complete Refund'],
        'Partial Refunds': ['Partial Refund', 'Adjustment Refund']
      },
      'Fees': {
        'Transaction Fees': ['Processing Fee', 'Gateway Fee'],
        'Scheme Fees': ['Visa Fee', 'Mastercard Fee', 'Network Fee']
      }
    };

    const statuses = ['Completed', 'Pending', 'Processing', 'Failed'];
    const currencies = ['USD', 'EUR', 'GBP'];
    const merchants = ['MERCHANT_001', 'MERCHANT_002', 'MERCHANT_003'];

    const data: PaymentDetail[] = [];
    const relevantTypes = selectedFilters.subcategory 
      ? types[selectedFilters.category as keyof typeof types]?.[selectedFilters.subcategory as keyof typeof types[keyof typeof types]] || []
      : Object.values(types[selectedFilters.category as keyof typeof types] || {}).flat();

    for (let i = 0; i < 50; i++) {
      const randomType = relevantTypes[Math.floor(Math.random() * relevantTypes.length)] || 'Transaction';
      data.push({
        id: `TXN-${String(i + 1).padStart(6, '0')}`,
        type: randomType,
        amount: Math.floor(Math.random() * 5000) + 100,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        merchantId: merchants[Math.floor(Math.random() * merchants.length)],
        currency: currencies[Math.floor(Math.random() * currencies.length)]
      });
    }

    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const data = generateMockData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'Payments': return Receipt;
      case 'Refunds': return RefreshCw;
      case 'Fees': return DollarSign;
      default: return Receipt;
    }
  };

  const Icon = getIcon(selectedFilters.category);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {selectedFilters.category} Details
          {selectedFilters.subcategory && ` - ${selectedFilters.subcategory}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Currency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 20).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.id}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="font-medium">${item.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="font-mono text-sm">{item.merchantId}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
