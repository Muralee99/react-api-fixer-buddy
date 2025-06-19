import React, { useCallback, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  BackgroundVariant,  
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from './pipeline/initialElements';
import { nodeTypes } from './pipeline/nodeTypes';
import { Sidebar } from './pipeline/Sidebar';
import JobsSidebar from './pipeline/JobsSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, ChevronDown } from 'lucide-react';
import type { Job, PipelineData } from '@/services/mockDataService';
import { ScrollArea } from '@/components/ui/scroll-area';
import PipelineDetailTable from './pipeline/PipelineDetailTable';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const DataPipelineDesigner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [pipelineInfo, setPipelineInfo] = useState<PipelineData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle incoming pipeline data from navigation
  useEffect(() => {
    if (location.state?.pipelineData) {
      const pipelineData = location.state.pipelineData as PipelineData;
      updateNodesWithData(pipelineData);
      setPipelineInfo(pipelineData);
    }
    if (location.state?.jobs) {
      setJobs(location.state.jobs);
    } else {
      setJobs(null);
    }
    if (location.state?.filters) {
      setCurrentFilters(location.state.filters);
    }
  }, [location.state]);

  const handleBackToPipelineData = () => {
    navigate('/pipeline-data', {
      state: {
        preserveData: true,
        filters: currentFilters,
        pipelineData: pipelineInfo
      }
    });
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (typeof nodeType === 'undefined' || !nodeType) {
        return;
      }

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 40,
      };

      // Create appropriate data based on node type
      let nodeData: any = { 
        label: `${nodeType} node`,
        nodeType: nodeType
      };
      
      if (nodeType === 'paymentLegNode') {
        nodeData = { 
          label: 'New Payment',
          nodeType: 'paymentLegNode',
          type: Math.random() > 0.5 ? 'debit' : 'credit'
        };
      } else if (nodeType === 'fundRecordNode') {
        nodeData = { 
          label: 'New Fund Record',
          nodeType: 'fundRecordNode',
          type: 'initial'
        };
      } else if (nodeType === 'dealBookingNode') {
        nodeData = {
          label: 'New Deal Booking',
          nodeType: 'dealBookingNode'
        };
      }

      const newNode = {
        id: `${nodeType}-${Date.now()}`,
        type: 'universalNode',
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );

  const updateNodesWithData = (pipelineData: any) => {
    setNodes((nds) => 
      nds.map((node) => {
        switch (node.id) {
          case 'deal-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: pipelineData.dealBooking,
              },
            };
          case 'payment-debit-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: pipelineData.paymentDebit,
              },
            };
          case 'payment-credit-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: pipelineData.paymentCredit,
              },
            };
          case 'fund-initial-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: pipelineData.fundInitial,
              },
            };
          case 'fund-funding-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: pipelineData.fundFunding,
              },
            };
          default:
            return node;
        }
      })
    );
  };

  const nodeClassName = (node: any) => node.type;

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBackToPipelineData}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Data Table
        </Button>
        <h1 className="text-xl font-semibold">Pipeline Designer</h1>
        <Link to="/" aria-label="Go to Dashboard">
            <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
            </Button>
        </Link>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {jobs ? <JobsSidebar jobs={jobs} /> : <Sidebar />}
        <div className="flex-1 flex flex-col">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={jobs ? undefined : onDrop}
                onDragOver={jobs ? undefined : onDragOver}
                nodeTypes={nodeTypes}
                fitView
                className="bg-gray-50 h-full"
              >
                <Controls />
                <MiniMap nodeClassName={nodeClassName} />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
              </ReactFlow>
            </ResizablePanel>
            {pipelineInfo && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={33} minSize={10}>
                  <Collapsible
                    open={isDetailsOpen}
                    onOpenChange={setIsDetailsOpen}
                    className="h-full w-full flex flex-col"
                  >
                    <div className="flex items-center justify-between p-4 border-b bg-white">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Pipeline Details
                      </h2>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isDetailsOpen && 'rotate-180'
                            }`}
                          />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="flex-1 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                      <ScrollArea className="h-full w-full p-4 bg-white">
                        <div className="space-y-6">
                          <PipelineDetailTable
                            title="Deal Booking Information"
                            data={
                              pipelineInfo.dealBooking
                                ? [pipelineInfo.dealBooking]
                                : []
                            }
                          />
                          <PipelineDetailTable
                            title="Payment Legs Information"
                            data={[
                              { ...pipelineInfo.paymentDebit, type: 'Debit Leg' },
                              { ...pipelineInfo.paymentCredit, type: 'Credit Leg' },
                            ]}
                          />
                          <PipelineDetailTable
                            title="Fund Records Information"
                            data={[
                              { ...pipelineInfo.fundInitial, type: 'Initial Record' },
                              { ...pipelineInfo.fundFunding, type: 'Funding Record' },
                            ]}
                          />
                        </div>
                      </ScrollArea>
                    </CollapsibleContent>
                  </Collapsible>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default DataPipelineDesigner;
