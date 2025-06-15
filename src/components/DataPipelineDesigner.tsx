
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { ArrowLeft } from 'lucide-react';
import type { Job, PipelineData } from '@/services/mockDataService';
import { ScrollArea } from '@/components/ui/scroll-area';
import PipelineDetailTable from './pipeline/PipelineDetailTable';

const DataPipelineDesigner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [pipelineInfo, setPipelineInfo] = useState<PipelineData | null>(null);
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
  }, [location.state]);

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
          onClick={() => navigate('/pipeline-data')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Data Table
        </Button>
        <h1 className="text-xl font-semibold">Pipeline Designer</h1>
        <div></div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {jobs ? <JobsSidebar jobs={jobs} /> : <Sidebar />}
        <div className="flex-1 flex flex-col">
            <div className="flex-1">
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
                    className="bg-gray-50"
                >
                    <Controls />
                    <MiniMap nodeClassName={nodeClassName} />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </div>
            {pipelineInfo && (
              <div className="h-1/2 lg:h-1/3 border-t bg-white">
                <ScrollArea className="h-full w-full p-4">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Pipeline Details</h2>
                  <div className="space-y-6">
                    <PipelineDetailTable title="Deal Booking Information" data={pipelineInfo.dealBooking} />
                    <PipelineDetailTable title="Debit Leg Information" data={pipelineInfo.paymentDebit} />
                    <PipelineDetailTable title="Credit Leg Information" data={pipelineInfo.paymentCredit} />
                    <PipelineDetailTable title="Fund Record Information" data={pipelineInfo.fundInitial} />
                    <PipelineDetailTable title="Funding Record Information" data={pipelineInfo.fundFunding} />
                  </div>
                </ScrollArea>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DataPipelineDesigner;
