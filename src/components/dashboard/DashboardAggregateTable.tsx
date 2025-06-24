
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DashboardAggregateTableProps {
  title: string;
  data: Record<string, string | number>[];
  onTableClick?: (data: any) => void;
}

const DashboardAggregateTable: React.FC<DashboardAggregateTableProps> = ({ 
  title, 
  data, 
  onTableClick 
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
          onClick={() => onTableClick && onTableClick(data)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead 
                  key={header} 
                  className={header.toLowerCase().includes('amount') || header.toLowerCase().includes('volume') ? 'text-right' : ''}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 5).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header) => (
                  <TableCell 
                    key={`${rowIndex}-${header}`} 
                    className={header.toLowerCase().includes('amount') || header.toLowerCase().includes('volume') ? 'font-medium text-right' : 'font-medium'}
                  >
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data.length > 5 && (
          <div className="text-sm text-gray-500 mt-2 text-center">
            Showing 5 of {data.length} entries
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardAggregateTable;
