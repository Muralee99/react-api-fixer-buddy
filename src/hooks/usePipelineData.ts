
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchPipelineData, fetchTransactionData, type TransactionData, type PipelineRow, type PipelineData, fetchJobsForPipeline } from '@/services/mockDataService';
import { calculatePipelineAggregates, calculateTransactionAggregates } from '@/lib/data-aggregation';

const NODE_TYPES = [
    { key: 'dealBooking', label: 'Deal Booking' }
];

export const usePipelineData = () => {
    const [pipelineData, setPipelineData] = useState<PipelineData | null>(null);
    const [pipelineRows, setPipelineRows] = useState<PipelineRow[]>([]);
    const [transactionRows, setTransactionRows] = useState<TransactionData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = useCallback(async (filters: {
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

            setPipelineData(data);

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
    }, []);

    const handleViewFlow = async (row: PipelineRow) => {
        toast.info("Loading flow and jobs...");
        const jobs = await fetchJobsForPipeline(row);
        // Navigate to React Flow with the data
        navigate('/pipeline-designer', { 
            state: { 
                pipelineData: pipelineData,
                jobs,
                filters: row.filters
            }
        });
    };

    const handleTransactionViewFlow = async (row: TransactionData) => {
        toast.info("Loading flow and jobs...");
        const jobs = await fetchJobsForPipeline(row);
        navigate('/pipeline-designer', {
            state: {
                jobs,
                pipelineData: null,
                filters: {
                    fromDate: row.date,
                    toDate: row.date,
                    merchantId: row.mid
                }
            }
        });
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
