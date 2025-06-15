
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchPipelineData, fetchTransactionData, type TransactionData, type PipelineRow, PipelineData } from '@/services/mockDataService';
import { calculatePipelineAggregates, calculateTransactionAggregates } from '@/lib/data-aggregation';

const NODE_TYPES = [
    { key: 'dealBooking', label: 'Deal Booking' }
];

export const usePipelineData = () => {
    const [pipelineRows, setPipelineRows] = useState<PipelineRow[]>([]);
    const [transactionRows, setTransactionRows] = useState<TransactionData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = async (filters: {
        fromDate: string;
        toDate: string;
        merchantId: string;
    }) => {
        setIsLoading(true);
        console.log('Form submitted with filters:', filters);

        try {
            const pipelineDataPromise = fetchPipelineData(filters);
            const transactionDataPromise = fetchTransactionData(filters);
            const [data, transactions] = await Promise.all([pipelineDataPromise, transactionDataPromise]);


            // Only generate Deal Booking rows
            const rows: PipelineRow[] = [];
            // Adjust the count as desired; here, still 350
            for (let i = 0; i < 350; i++) {
                const nodeTypeConfig = NODE_TYPES[0]; // Only Deal Booking
                const dataKey = nodeTypeConfig.key as keyof PipelineData;
                rows.push({
                    id: `${nodeTypeConfig.key}-${i + 1}`,
                    nodeType: nodeTypeConfig.label,
                    ...(data[dataKey] as Omit<PipelineRow, "id" | "nodeType" | "filters">),
                    filters
                });
            }
            setPipelineRows(rows);
            setTransactionRows(transactions);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewFlow = (row: PipelineRow) => {
        // Navigate to React Flow with the data
        navigate('/pipeline-designer', { 
            state: { 
                pipelineData: {
                    dealBooking: pipelineRows.find(r => r.nodeType === 'Deal Booking'),
                    paymentDebit: pipelineRows.find(r => r.nodeType === 'Payment Debit'),
                    paymentCredit: pipelineRows.find(r => r.nodeType === 'Payment Credit'),
                    fundInitial: pipelineRows.find(r => r.nodeType === 'Fund Initial'),
                    fundFunding: pipelineRows.find(r => r.nodeType === 'Fund Funding'),
                },
                filters: row.filters
            }
        });
    };

    const handleTransactionViewFlow = (row: TransactionData) => {
        toast.info("View Flow Clicked", {
            description: `Transaction ID: ${row.id} for MID ${row.mid}`,
        });
        console.log('View flow for transaction:', row);
    };

    const pipelineAggregates = useMemo(() => calculatePipelineAggregates(pipelineRows), [pipelineRows]);
    const transactionAggregates = useMemo(() => calculateTransactionAggregates(transactionRows), [transactionRows]);

    return {
        pipelineRows,
        transactionRows,
        isLoading,
        handleFormSubmit,
        handleViewFlow,
        handleTransactionViewFlow,
        pipelineAggregates,
        transactionAggregates
    };
};
