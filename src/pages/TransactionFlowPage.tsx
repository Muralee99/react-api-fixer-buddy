
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ArrowLeft, Home, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import TransactionFilterForm, { TransactionFormValues } from '@/components/transactions/TransactionFilterForm';
import TransactionsTable from '@/components/transactions/TransactionsTable';
import { TransactionFilterSidebar } from '@/components/transactions/TransactionFilterSidebar';
import { fetchTransactionData, TransactionData } from '@/services/mockDataService';
import { format } from 'date-fns';

const TransactionFlowPage = () => {
  console.log('TransactionFlowPage component is rendering...');
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSearch = async (data: TransactionFormValues) => {
    setIsLoading(true);
    const filters = {
      merchantId: data.mid,
      fromDate: format(data.fromDate, 'yyyy-MM-dd'),
      toDate: format(data.toDate, 'yyyy-MM-dd'),
    };
    const result = await fetchTransactionData(filters);
    setTransactions(result);
    setIsLoading(false);
    setSearched(true);
  };

  const handleFiltersChange = (filters: any) => {
    // Here you would apply the filters to your transaction data
    console.log('Filters changed:', filters);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
          <h1 className="text-xl font-semibold">Transaction Flow</h1>
        </div>
        <div className="flex items-center gap-2">
            <Link to="/">
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Dashboard
                </Button>
            </Link>
            <Link to="/" aria-label="Go to Dashboard">
                <Button variant="ghost" size="icon">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
        </div>
      </header>
      
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div>Transaction Flow Page is working!</div>
        <TransactionFilterForm onSearch={handleSearch} isLoading={isLoading} />
        {searched && (
          <div>
            {transactions.length > 0 ? (
              <TransactionsTable transactions={transactions} />
            ) : (
              <div className="text-center py-10">
                <p>No transactions found for the selected criteria.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TransactionFlowPage;
