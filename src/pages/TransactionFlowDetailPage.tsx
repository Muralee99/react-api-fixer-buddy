
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { initialNodes, initialEdges } from '@/components/transactions/transaction-flow-initial-elements';
import { TransactionNode } from '@/components/transactions/TransactionNode';

const nodeTypes = {
  transactionNode: TransactionNode,
};

const TransactionFlowDetailPage = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const transactionData = initialNodes.map(node => node.data);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Transaction Flow Detail</h1>
        <div className="flex items-center gap-2">
            <Link to="/transaction-flow">
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Transactions
                </Button>
            </Link>
            <Link to="/" aria-label="Go to Dashboard">
                <Button variant="ghost" size="icon">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
        <div className="border-t bg-white">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 font-semibold text-base">
                View Transaction Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="max-h-64 overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-gray-50">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Country</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionData.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{transaction.name}</TableCell>
                          <TableCell>{transaction.time}</TableCell>
                          <TableCell>{transaction.state}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.currency}</TableCell>
                          <TableCell>{transaction.country}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default TransactionFlowDetailPage;
