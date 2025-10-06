import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/DatePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CreditCard, AlertCircle, CheckCircle, Clock, LayoutGrid, Table2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentData {
  country: string;
  merchantId: string;
  status: 'Completed' | 'In Progress' | 'Exception';
  paymentDate: Date;
  nextPaymentDate: Date;
  amount: number;
  transactionId: string;
  stage?: 'Initiated' | 'Authorized' | 'Settled';
  errorMessage?: string;
}

const countries = ['USA', 'UK', 'Canada', 'Germany', 'France', 'India', 'Australia'];
const merchantIds = ['MERCH-001', 'MERCH-002', 'MERCH-003', 'MERCH-004', 'MERCH-005'];

const PaymentsOverview = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'charts'>('cards');
  const [isFormExpanded, setIsFormExpanded] = useState(true);

  const generateRandomData = (): void => {
    const data: PaymentData[] = [];
    
    selectedCountries.forEach(country => {
      selectedMerchants.forEach(merchantId => {
        const statuses: ('Completed' | 'In Progress' | 'Exception')[] = ['Completed', 'In Progress', 'Exception'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const paymentDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        const nextPaymentDate = new Date(paymentDate.getTime() + 24 * 60 * 60 * 1000);
        
        const payment: PaymentData = {
          country,
          merchantId,
          status,
          paymentDate,
          nextPaymentDate,
          amount: Math.floor(Math.random() * 4900) + 100,
          transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        };

        if (status === 'In Progress') {
          const stages: ('Initiated' | 'Authorized' | 'Settled')[] = ['Initiated', 'Authorized', 'Settled'];
          payment.stage = stages[Math.floor(Math.random() * stages.length)];
        }

        if (status === 'Exception') {
          const errors = [
            'Payment gateway timeout',
            'Insufficient funds',
            'Invalid card details',
            'Network error occurred',
            'Merchant verification failed'
          ];
          payment.errorMessage = errors[Math.floor(Math.random() * errors.length)];
        }

        data.push(payment);
      });
    });

    setPaymentData(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountries.length === 0 || selectedMerchants.length === 0) {
      return;
    }
    generateRandomData();
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const toggleMerchant = (merchant: string) => {
    setSelectedMerchants(prev =>
      prev.includes(merchant)
        ? prev.filter(m => m !== merchant)
        : [...prev, merchant]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Exception':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'Exception':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStageProgress = (stage?: string) => {
    switch (stage) {
      case 'Initiated':
        return 33;
      case 'Authorized':
        return 66;
      case 'Settled':
        return 100;
      default:
        return 0;
    }
  };

  const getChartData = () => {
    const statusCount = paymentData.reduce((acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const COLORS = {
    'Completed': '#10b981',
    'In Progress': '#3b82f6',
    'Exception': '#ef4444',
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Filter Form */}
      <Card className="shadow-lg animate-fade-in">
        <CardHeader 
          className="cursor-pointer select-none"
          onClick={() => setIsFormExpanded(!isFormExpanded)}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Payment Filters
              </CardTitle>
              <CardDescription>Select countries, merchants, and date range</CardDescription>
            </div>
            {isFormExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </CardHeader>
        <CardContent className={cn(
          "transition-all duration-300 overflow-hidden",
          isFormExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country Multi-Select */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Countries</Label>
                <div className="border rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto bg-card">
                  {countries.map(country => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox
                        id={`country-${country}`}
                        checked={selectedCountries.includes(country)}
                        onCheckedChange={() => toggleCountry(country)}
                      />
                      <label
                        htmlFor={`country-${country}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Merchant Multi-Select */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Merchant IDs</Label>
                <div className="border rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto bg-card">
                  {merchantIds.map(merchant => (
                    <div key={merchant} className="flex items-center space-x-2">
                      <Checkbox
                        id={`merchant-${merchant}`}
                        checked={selectedMerchants.includes(merchant)}
                        onCheckedChange={() => toggleMerchant(merchant)}
                      />
                      <label
                        htmlFor={`merchant-${merchant}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {merchant}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Pickers */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">From Date & Time</Label>
                <DatePicker date={fromDate} setDate={setFromDate} />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">To Date & Time</Label>
                <DatePicker date={toDate} setDate={setToDate} />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full md:w-auto px-8"
              disabled={selectedCountries.length === 0 || selectedMerchants.length === 0}
            >
              Generate Payment Data
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* View Toggle */}
      {paymentData.length > 0 && (
        <div className="flex justify-end gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            onClick={() => setViewMode('cards')}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            onClick={() => setViewMode('table')}
            className="gap-2"
          >
            <Table2 className="h-4 w-4" />
            Table
          </Button>
          <Button
            variant={viewMode === 'charts' ? 'default' : 'outline'}
            onClick={() => setViewMode('charts')}
            className="gap-2"
          >
            <BarChart className="h-4 w-4" />
            Charts
          </Button>
        </div>
      )}

      {/* Results Display */}
      {paymentData.length === 0 ? (
        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <CreditCard className="h-16 w-16 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground">No payment data available</p>
            <p className="text-sm text-muted-foreground">Select filters and generate data to view results</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Graphical Cards View */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {paymentData.map((payment, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{payment.country}</CardTitle>
                      {getStatusIcon(payment.status)}
                    </div>
                    <CardDescription className="font-mono text-xs">
                      {payment.merchantId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className={cn(getStatusColor(payment.status), "text-white")}>
                        {payment.status}
                      </Badge>
                    </div>
                    
                    {payment.stage && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Stage: {payment.stage}</span>
                          <span className="font-medium">{getStageProgress(payment.stage)}%</span>
                        </div>
                        <Progress value={getStageProgress(payment.stage)} className="h-2" />
                      </div>
                    )}

                    {payment.errorMessage && (
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md p-2">
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {payment.errorMessage}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 space-y-1 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-semibold text-primary">${payment.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-mono">{payment.transactionId}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Payment Date</span>
                        <span>{payment.paymentDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Next Payment</span>
                        <span>{payment.nextPaymentDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <Card className="shadow-md animate-fade-in">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead>Merchant ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Next Payment</TableHead>
                        <TableHead>Error</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentData.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{payment.country}</TableCell>
                          <TableCell className="font-mono text-sm">{payment.merchantId}</TableCell>
                          <TableCell>
                            <Badge className={cn(getStatusColor(payment.status), "text-white")}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {payment.stage && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{payment.stage}</span>
                                <Progress value={getStageProgress(payment.stage)} className="h-1 w-16" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-semibold">${payment.amount.toLocaleString()}</TableCell>
                          <TableCell className="font-mono text-xs">{payment.transactionId}</TableCell>
                          <TableCell className="text-sm">{payment.paymentDate.toLocaleDateString()}</TableCell>
                          <TableCell className="text-sm">{payment.nextPaymentDate.toLocaleDateString()}</TableCell>
                          <TableCell>
                            {payment.errorMessage && (
                              <span className="text-xs text-red-600 dark:text-red-400">
                                {payment.errorMessage}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Charts View */}
          {viewMode === 'charts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              {/* Pie Chart */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Payment Status Distribution</CardTitle>
                  <CardDescription>Breakdown by completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getChartData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Payment Count by Status</CardTitle>
                  <CardDescription>Visual comparison of payment statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#3b82f6" name="Count">
                        {getChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <Card className="shadow-md lg:col-span-2">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg bg-card">
                      <p className="text-sm text-muted-foreground">Total Payments</p>
                      <p className="text-2xl font-bold">{paymentData.length}</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-green-600">
                        {paymentData.filter(p => p.status === 'Completed').length}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {paymentData.filter(p => p.status === 'In Progress').length}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20">
                      <p className="text-sm text-muted-foreground">Exceptions</p>
                      <p className="text-2xl font-bold text-red-600">
                        {paymentData.filter(p => p.status === 'Exception').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentsOverview;