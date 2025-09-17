
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, FilePlus, CreditCard, Undo2, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MiniMap,
  Node,
  Edge,
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
import { Badge } from "@/components/ui/badge";

import { 
  initiationNodes, 
  initiationEdges, 
  paymentNodes, 
  paymentEdges, 
  refundNodes, 
  refundEdges, 
  allStagesNodes, 
  allStagesEdges 
} from '@/components/transactions/transaction-stage-data';
import { TransactionNode } from '@/components/transactions/TransactionNode';
import { TransactionNodeData } from '@/components/transactions/TransactionNode';

interface TransactionStage {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  nodeIds: string[];
  status: 'completed' | 'in-progress' | 'pending';
}

const nodeTypes = {
  transactionNode: TransactionNode,
};

const TransactionFlowDetailPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(allStagesNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(allStagesEdges);
  const [isStagesOpen, setIsStagesOpen] = useState(true);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  
  const transactionStages: TransactionStage[] = [
    {
      id: 'initiation',
      name: 'Transaction Initiation',
      description: 'Initial transaction creation, validation and authorization',
      icon: FilePlus,
      nodeIds: ['1', '1a', '1b'],
      status: 'completed'
    },
    {
      id: 'payment',
      name: 'Payment Processing',
      description: 'Payment processing, bank authorization and settlement',
      icon: CreditCard,
      nodeIds: ['2', '2a', '2b', '2c'],
      status: 'completed'
    },
    {
      id: 'refund',
      name: 'Refund Processing',
      description: 'Processing multiple refund transactions',
      icon: Undo2,
      nodeIds: ['3', '4', '3a', '4a', '3b', '4b'],
      status: 'completed'
    }
  ];

  const iconMapping: Record<TransactionNodeData['name'], React.ElementType> = {
    Create: FilePlus,
    Payment: CreditCard,
    Refund: Undo2,
    'Partial Refund': Undo2,
  };

  const getStatusColor = (status: TransactionStage['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: TransactionStage['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return AlertCircle;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getFilteredNodesAndEdges = () => {
    if (!activeStageId) {
      return { filteredNodes: allStagesNodes, filteredEdges: allStagesEdges };
    }

    let stageNodes: Node<TransactionNodeData>[] = [];
    let stageEdges: Edge[] = [];

    switch (activeStageId) {
      case 'initiation':
        stageNodes = initiationNodes;
        stageEdges = initiationEdges;
        break;
      case 'payment':
        stageNodes = paymentNodes;
        stageEdges = paymentEdges;
        break;
      case 'refund':
        stageNodes = refundNodes;
        stageEdges = refundEdges;
        break;
      default:
        stageNodes = allStagesNodes;
        stageEdges = allStagesEdges;
    }

    return { filteredNodes: stageNodes, filteredEdges: stageEdges };
  };

  const { filteredNodes, filteredEdges } = getFilteredNodesAndEdges();
  
  const getStageData = (stageId: string) => {
    switch (stageId) {
      case 'initiation':
        return initiationNodes.map(node => node.data);
      case 'payment':
        return paymentNodes.map(node => node.data);
      case 'refund':
        return refundNodes.map(node => node.data);
      default:
        return allStagesNodes.map(node => node.data);
    }
  };

  const getCurrentDisplayData = () => {
    if (activeStageId) {
      return getStageData(activeStageId);
    }
    return allStagesNodes.map(node => node.data);
  };

  // Update nodes and edges when stage changes
  React.useEffect(() => {
    const { filteredNodes: newNodes, filteredEdges: newEdges } = getFilteredNodesAndEdges();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [activeStageId, setNodes, setEdges]);

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
                  <div className="space-y-2 mb-4">
                    <Button
                      variant={activeStageId === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveStageId(null)}
                    >
                      Show All Stages
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {transactionStages.map((stage) => {
                      const StatusIcon = getStatusIcon(stage.status);
                      const isActive = activeStageId === stage.id;
                      
                      return (
                        <div
                          key={stage.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            isActive
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'border-border bg-card hover:bg-muted/50'
                          }`}
                          onClick={() => setActiveStageId(stage.id)}
                        >
                          <div className="flex items-start gap-3">
                            <stage.icon className={`h-5 w-5 mt-0.5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <h4 className={`font-medium text-sm ${isActive ? 'text-primary' : 'text-foreground'}`}>
                                  {stage.name}
                                </h4>
                                <Badge variant="secondary" className={`text-xs ${getStatusColor(stage.status)}`}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {stage.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {stage.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {stage.nodeIds.length} node{stage.nodeIds.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <ReactFlow
                  nodes={filteredNodes}
                  edges={filteredEdges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.1 }}
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
                        {activeStageId 
                          ? `${transactionStages.find(s => s.id === activeStageId)?.name || 'Stage'} Details`
                          : 'All Transaction Details'
                        }
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
                              {getCurrentDisplayData().map((transaction, index) => (
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
