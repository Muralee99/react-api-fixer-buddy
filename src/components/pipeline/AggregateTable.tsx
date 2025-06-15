
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface AggregateData {
  label: string;
  value: string;
}

interface AggregateTableProps {
  title: string;
  data: AggregateData[];
}

const AggregateTable: React.FC<AggregateTableProps> = ({ title, data }) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.label}>
                <TableCell className="font-medium">{item.label}</TableCell>
                <TableCell className="text-right">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AggregateTable;
