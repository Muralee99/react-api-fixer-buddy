
import type { PipelineRow, TransactionData } from "@/services/mockDataService";

export const parseAmount = (amount: string): number => {
    return parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0;
};

const getFormatOptions = (currency: string): Intl.NumberFormatOptions => ({
    style: 'currency',
    currency: currency,
});

export const calculatePipelineAggregates = (pipelineRows: PipelineRow[]) => {
    if (pipelineRows.length === 0) return [];

    const groupedData = pipelineRows.reduce((acc, row) => {
        const date = row.lastExecution.split(' ')[0];
        const key = `${date}|${row.currency1}|${row.currency2}|${row.status}`;

        if (!acc[key]) {
            acc[key] = {
                date,
                currency1: row.currency1,
                currency2: row.currency2,
                status: row.status,
                totalAmount1: 0,
                totalAmount2: 0,
            };
        }

        acc[key].totalAmount1 += parseAmount(row.amount1);
        acc[key].totalAmount2 += parseAmount(row.amount2);

        return acc;
    }, {} as Record<string, { date: string; currency1: string; currency2: string; status: 'success' | 'failure'; totalAmount1: number; totalAmount2: number }>);

    const aggregates = Object.values(groupedData).map(group => ({
        'Date': group.date,
        'Status': group.status.charAt(0).toUpperCase() + group.status.slice(1),
        'Amount 1': group.totalAmount1.toLocaleString('en-US', getFormatOptions(group.currency1)),
        'Amount 2': group.totalAmount2.toLocaleString('en-US', getFormatOptions(group.currency2)),
    }));

    return aggregates.sort((a, b) => a.Date.localeCompare(b.Date));
};

export const calculateTransactionAggregates = (transactionRows: TransactionData[]) => {
    if (transactionRows.length === 0) return [];

    const groupedData = transactionRows.reduce((acc, row) => {
        const key = `${row.date}|${row.currency}`;

        if (!acc[key]) {
            acc[key] = {
                date: row.date,
                currency: row.currency,
                totalAmount1: 0,
                totalAmount2: 0,
            };
        }

        acc[key].totalAmount1 += parseAmount(row.amount1);
        acc[key].totalAmount2 += parseAmount(row.amount2);

        return acc;
    }, {} as Record<string, { date: string; currency: string; totalAmount1: number; totalAmount2: number }>);
    
    const aggregates = Object.values(groupedData).map(group => ({
        'Date': group.date,
        'Currency': group.currency,
        'Amount 1': group.totalAmount1.toLocaleString('en-US', getFormatOptions(group.currency)),
        'Amount 2': group.totalAmount2.toLocaleString('en-US', getFormatOptions(group.currency)),
    }));

    return aggregates.sort((a, b) => a.Date.localeCompare(b.Date) || a.Currency.localeCompare(b.Currency));
};
