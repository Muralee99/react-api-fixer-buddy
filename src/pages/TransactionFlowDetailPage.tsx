
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, FilePlus, CreditCard, Undo2, ChevronDown } from 'lucide-react';
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
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { initialNodes, initialEdges } from '@/components/transactions/transaction-flow-initial-elements';
import { TransactionNode } from '@/components/transactions/TransactionNode';
import { TransactionNodeData } from '@/components/transactions/TransactionNode';

const nodeTypes = {
  transactionNode: TransactionNode,
};

const TransactionFlowDetailPage = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [isStagesOpen, setIsStagesOpen] = useState(true);
  const transactionData = initialNodes.map(node => node.data);

  const iconMapping: Record<TransactionNodeData['name'], React.ElementType> = {
    Create: FilePlus,
    Payment: CreditCard,
    Refund: Undo2,
    'Partial Refund': Undo2,
  };

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
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <Collapsible
              open={isStagesOpen}
              onOpenChange={setIsStagesOpen}
              className="h-full w-full flex flex-col"
            >
              <div className="flex items-center justify-between p-4 bg-gray-100/50 border-r border-b">
                <h3 className="text-lg font-semibold">Stages</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isStagesOpen && 'rotate-180'
                      }`}
                    />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="flex-1 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                <div className="h-full p-4 bg-gray-100/50 border-r overflow-y-auto">
                  <ul className="space-y-1">
                    {transactionData.map((transaction, index) => {
                      const Icon = iconMapping[transaction.name];
                      return (
                        <li key={index} className="p-2 rounded-lg hover:bg-gray-200/60 flex items-center gap-3 cursor-pointer">
                          {Icon && <Icon className="h-5 w-5 text-gray-700" />}
                          <span className="font-medium text-sm">{transaction.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
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
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30}>
                <div className="h-full overflow-y-auto">
                  <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="px-6 py-4 font-semibold text-base sticky top-0 bg-white z-10 border-b">
                        View Transaction Details
                      </AccordionTrigger>
                      <AccordionContent>
                          <Table>
                            <TableHeader>
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
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default TransactionFlowDetailPage;
