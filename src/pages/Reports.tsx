import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/DatePicker';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Download, 
  Calendar,
  Filter,
  RefreshCw,
  FileDown,
  GitCompare
} from 'lucide-react';
import { PaymentAnalytics } from '@/components/dashboard/PaymentAnalytics';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import SmartAggregateChart from '@/components/pipeline/SmartAggregateChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { usePipelineData } from '@/hooks/usePipelineData';
import type { DashboardFilters, DashboardFormData } from '@/pages/Dashboard';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('last30days');
  const [reportType, setReportType] = useState('overview');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTab, setDataTab] = useState('transactions');
  const itemsPerPage = 10;
  
  // Mock filters for dashboard data
  const dashboardFilters: DashboardFilters = {
    countries: [],
    paymentMethods: [],
    currencies: [],
    transactionStatuses: []
  };
  
  const formData: DashboardFormData = {
    fromDate: startDate?.toISOString().split('T')[0] || '2024-01-01',
    toDate: endDate?.toISOString().split('T')[0] || '2024-12-31',
    merchantId: ''
  };
  
  const { dashboardData } = useDashboardData(dashboardFilters, true, formData);
  const { pipelineAggregates, transactionAggregates } = usePipelineData();

  const reportTypes = [
    { value: 'overview', label: 'Business Overview', icon: TrendingUp },
    { value: 'payments', label: 'Payment Analytics', icon: BarChart3 },
    { value: 'pipeline', label: 'Pipeline Performance', icon: FileText },
    { value: 'operational', label: 'Operational Metrics', icon: RefreshCw },
    { value: 'download', label: 'Download Report', icon: FileDown },
    { value: 'reconciliation', label: 'Reconciliation', icon: GitCompare },
  ];

  const timePeriods = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const handleExportReport = (format: 'excel' | 'pdf') => {
    console.log(`Exporting report as ${format}...`);
    // Mock export functionality
    const filename = `report_${reportType}_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
    alert(`Downloading ${filename}`);
    setShowExportOptions(false);
  };

  const handleRefreshData = () => {
    console.log('Refreshing data...');
  };

  // Mock data for download and reconciliation reports
  const mockTransactionData = Array.from({ length: 50 }, (_, i) => ({
    id: `TXN${1000 + i}`,
    date: new Date(2024, 0, 1 + i).toLocaleDateString(),
    merchant: `Merchant ${i % 5 + 1}`,
    amount: `$${(Math.random() * 1000).toFixed(2)}`,
    status: ['Completed', 'Pending', 'Failed'][i % 3],
    type: ['Credit', 'Debit'][i % 2]
  }));

  const mockReconciliationData = Array.from({ length: 50 }, (_, i) => ({
    id: `REC${2000 + i}`,
    date: new Date(2024, 0, 1 + i).toLocaleDateString(),
    merchant: `Merchant ${i % 5 + 1}`,
    expected: `$${(Math.random() * 1000).toFixed(2)}`,
    actual: `$${(Math.random() * 1000).toFixed(2)}`,
    difference: `$${(Math.random() * 10).toFixed(2)}`,
    status: ['Matched', 'Unmatched', 'Pending'][i % 3]
  }));

  const getCurrentPageData = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(mockTransactionData.length / itemsPerPage);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive business intelligence and reporting dashboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {(reportType === 'download' || reportType === 'reconciliation') && (
            <div className="relative">
              <Button onClick={() => setShowExportOptions(!showExportOptions)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {showExportOptions && (
                <div className="absolute right-0 mt-2 w-32 bg-background border rounded-md shadow-lg z-50">
                  <button
                    onClick={() => handleExportReport('excel')}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => handleExportReport('pdf')}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                  >
                    PDF
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timePeriods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPeriod === 'custom' && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">End Date</label>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          {reportTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value} className="flex items-center gap-2">
              <type.icon className="h-4 w-4" />
              <span className="hidden md:inline">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Business Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6">
            <DashboardCharts data={dashboardData} />
            
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>
                  Summary of critical business metrics for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$2.4M</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      +12.5%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                      <p className="text-2xl font-bold">45,231</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      +8.2%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold">98.7%</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      +0.3%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Analytics */}
        <TabsContent value="payments" className="space-y-6">
          <PaymentAnalytics />
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Performance Summary</CardTitle>
              <CardDescription>
                Detailed breakdown of payment processing metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Processing Volume</h4>
                  <p className="text-xl font-bold">$1.8M</p>
                  <p className="text-xs text-green-600">+15% from last period</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Failed Payments</h4>
                  <p className="text-xl font-bold">1,247</p>
                  <p className="text-xs text-red-600">-5% from last period</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Refunds</h4>
                  <p className="text-xl font-bold">$45K</p>
                  <p className="text-xs text-yellow-600">+2% from last period</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Chargebacks</h4>
                  <p className="text-xl font-bold">23</p>
                  <p className="text-xs text-green-600">-12% from last period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Performance */}
        <TabsContent value="pipeline" className="space-y-6">
          {pipelineAggregates.length > 0 && (
            <SmartAggregateChart
              title="Pipeline Performance Analytics"
              description="Comprehensive analysis of data pipeline performance, processing volumes, and efficiency metrics"
              data={pipelineAggregates}
              dataKeys={[
                { name: 'Records Processed', key: 'recordsProcessed' },
                { name: 'Success Rate', key: 'successRate' },
                { name: 'Processing Time', key: 'avgProcessingTime' }
              ]}
              xAxisKey="pipeline"
              chartConfig={{
                recordsProcessed: { label: 'Records Processed', color: 'hsl(var(--primary))' },
                successRate: { label: 'Success Rate (%)', color: 'hsl(var(--chart-2))' },
                avgProcessingTime: { label: 'Avg Processing Time (ms)', color: 'hsl(var(--chart-3))' }
              }}
            />
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Health Metrics</CardTitle>
              <CardDescription>
                Real-time monitoring of pipeline performance and reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Active Pipelines</h4>
                  <p className="text-xl font-bold">12</p>
                  <p className="text-xs text-green-600">All operational</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Avg Throughput</h4>
                  <p className="text-xl font-bold">2.4K/min</p>
                  <p className="text-xs text-blue-600">+18% efficiency</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Error Rate</h4>
                  <p className="text-xl font-bold">0.3%</p>
                  <p className="text-xs text-green-600">Within SLA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Metrics */}
        <TabsContent value="operational" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>
                  Infrastructure and operational health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">System Uptime</h4>
                    <p className="text-xl font-bold">99.9%</p>
                    <p className="text-xs text-green-600">Last 30 days</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Response Time</h4>
                    <p className="text-xl font-bold">145ms</p>
                    <p className="text-xs text-green-600">Avg API response</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Active Jobs</h4>
                    <p className="text-xl font-bold">234</p>
                    <p className="text-xs text-blue-600">Currently running</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Data Quality</h4>
                    <p className="text-xl font-bold">97.8%</p>
                    <p className="text-xs text-green-600">Validation passed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>
                  System resource usage and capacity planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-sm">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Download Report */}
        <TabsContent value="download" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Download Report</CardTitle>
              <CardDescription>
                Select date range and download detailed report data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">From Date</label>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">To Date</label>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={dataTab} onValueChange={setDataTab}>
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Merchant</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCurrentPageData(mockTransactionData).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.id}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.merchant}</TableCell>
                          <TableCell>{row.amount}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>
                            <Badge variant={row.status === 'Completed' ? 'default' : row.status === 'Pending' ? 'secondary' : 'destructive'}>
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {totalPages > 5 && <PaginationEllipsis />}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentAnalytics />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardCharts data={dashboardData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Reconciliation */}
        <TabsContent value="reconciliation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Report</CardTitle>
              <CardDescription>
                Compare expected vs actual transactions for reconciliation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">From Date</label>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">To Date</label>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={dataTab} onValueChange={setDataTab}>
            <TabsList>
              <TabsTrigger value="matched">Matched</TabsTrigger>
              <TabsTrigger value="unmatched">Unmatched</TabsTrigger>
              <TabsTrigger value="all">All Records</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reconciliation Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Merchant</TableHead>
                        <TableHead>Expected</TableHead>
                        <TableHead>Actual</TableHead>
                        <TableHead>Difference</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCurrentPageData(mockReconciliationData).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.id}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.merchant}</TableCell>
                          <TableCell>{row.expected}</TableCell>
                          <TableCell>{row.actual}</TableCell>
                          <TableCell className={row.difference !== '$0.00' ? 'text-red-600 font-semibold' : ''}>
                            {row.difference}
                          </TableCell>
                          <TableCell>
                            <Badge variant={row.status === 'Matched' ? 'default' : row.status === 'Pending' ? 'secondary' : 'destructive'}>
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {totalPages > 5 && <PaginationEllipsis />}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matched" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Matched Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Merchant</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCurrentPageData(mockReconciliationData.filter(r => r.status === 'Matched')).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.id}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.merchant}</TableCell>
                          <TableCell>{row.expected}</TableCell>
                          <TableCell>
                            <Badge variant="default">Matched</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unmatched" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Unmatched Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Merchant</TableHead>
                        <TableHead>Expected</TableHead>
                        <TableHead>Actual</TableHead>
                        <TableHead>Difference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCurrentPageData(mockReconciliationData.filter(r => r.status === 'Unmatched')).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.id}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.merchant}</TableCell>
                          <TableCell>{row.expected}</TableCell>
                          <TableCell>{row.actual}</TableCell>
                          <TableCell className="text-red-600 font-semibold">{row.difference}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}