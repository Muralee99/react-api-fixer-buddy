
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, Play, Clock, CheckCircle } from 'lucide-react';
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
import { JobNode } from '@/components/jobs/JobNode';

const nodeTypes = {
  jobNode: JobNode,
};

// Mock data for different flows
const flowsData = {
  Flow1: {
    name: 'Payment Processing Flow',
    description: 'Handles payment transactions and validations',
    status: 'active',
    totalJobs: 5,
    nodes: [
      {
        id: 'job-1',
        type: 'jobNode',
        position: { x: 50, y: 50 },
        data: {
          name: 'Payment Validation',
          status: 'success',
          lastExecutionTime: '2025-07-01 08:00',
          nextExecutionTime: '2025-07-01 09:00',
          recordsProcessed: 1500,
          pendingRecords: 0,
        },
      },
      {
        id: 'job-2',
        type: 'jobNode',
        position: { x: 350, y: 50 },
        data: {
          name: 'Payment Processing',
          status: 'running',
          lastExecutionTime: '2025-07-01 08:15',
          nextExecutionTime: '2025-07-01 08:30',
          recordsProcessed: 1200,
          pendingRecords: 300,
        },
      },
      {
        id: 'job-3',
        type: 'jobNode',
        position: { x: 200, y: 200 },
        data: {
          name: 'Settlement',
          status: 'pending',
          lastExecutionTime: 'N/A',
          nextExecutionTime: 'On Completion',
          recordsProcessed: 0,
          pendingRecords: 1500,
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'job-1', target: 'job-2', type: 'smoothstep', animated: true },
      { id: 'e2-3', source: 'job-2', target: 'job-3', type: 'smoothstep' },
    ],
  },
  Flow2: {
    name: 'Data Reconciliation Flow',
    description: 'Reconciles transaction data across systems',
    status: 'active',
    totalJobs: 4,
    nodes: [
      {
        id: 'job-1',
        type: 'jobNode',
        position: { x: 50, y: 50 },
        data: {
          name: 'Data Collection',
          status: 'success',
          lastExecutionTime: '2025-07-01 07:00',
          nextExecutionTime: '2025-07-01 08:00',
          recordsProcessed: 2500,
          pendingRecords: 0,
        },
      },
      {
        id: 'job-2',
        type: 'jobNode',
        position: { x: 350, y: 50 },
        data: {
          name: 'Data Matching',
          status: 'failure',
          lastExecutionTime: '2025-07-01 07:30',
          nextExecutionTime: '2025-07-01 08:30',
          recordsProcessed: 2000,
          pendingRecords: 500,
        },
      },
      {
        id: 'job-3',
        type: 'jobNode',
        position: { x: 200, y: 200 },
        data: {
          name: 'Reconciliation Report',
          status: 'pending',
          lastExecutionTime: 'N/A',
          nextExecutionTime: 'On Completion',
          recordsProcessed: 0,
          pendingRecords: 2500,
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'job-1', target: 'job-2', type: 'smoothstep' },
      { id: 'e2-3', source: 'job-2', target: 'job-3', type: 'smoothstep' },
    ],
  },
  Flow3: {
    name: 'Fraud Detection Flow',
    description: 'Monitors and detects fraudulent activities',
    status: 'maintenance',
    totalJobs: 6,
    nodes: [
      {
        id: 'job-1',
        type: 'jobNode',
        position: { x: 50, y: 50 },
        data: {
          name: 'Pattern Analysis',
          status: 'success',
          lastExecutionTime: '2025-07-01 06:00',
          nextExecutionTime: '2025-07-01 07:00',
          recordsProcessed: 5000,
          pendingRecords: 0,
        },
      },
      {
        id: 'job-2',
        type: 'jobNode',
        position: { x: 350, y: 50 },
        data: {
          name: 'Risk Scoring',
          status: 'running',
          lastExecutionTime: '2025-07-01 06:30',
          nextExecutionTime: '2025-07-01 07:30',
          recordsProcessed: 4500,
          pendingRecords: 500,
        },
      },
      {
        id: 'job-3',
        type: 'jobNode',
        position: { x: 50, y: 200 },
        data: {
          name: 'Alert Generation',
          status: 'pending',
          lastExecutionTime: 'N/A',
          nextExecutionTime: 'On Completion',
          recordsProcessed: 0,
          pendingRecords: 5000,
        },
      },
      {
        id: 'job-4',
        type: 'jobNode',
        position: { x: 350, y: 200 },
        data: {
          name: 'Case Management',
          status: 'pending',
          lastExecutionTime: 'N/A',
          nextExecutionTime: 'On Completion',
          recordsProcessed: 0,
          pendingRecords: 0,
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'job-1', target: 'job-2', type: 'smoothstep', animated: true },
      { id: 'e1-3', source: 'job-1', target: 'job-3', type: 'smoothstep' },
      { id: 'e2-4', source: 'job-2', target: 'job-4', type: 'smoothstep' },
      { id: 'e3-4', source: 'job-3', target: 'job-4', type: 'smoothstep' },
    ],
  },
};

const JobsFlowPage = () => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, , onEdgesChange] = useEdgesState([]);

  const handleFlowSelect = (flowKey: string) => {
    setSelectedFlow(flowKey);
    const flowData = flowsData[flowKey as keyof typeof flowsData];
    // Update nodes and edges for the selected flow
    onNodesChange([]);
    onEdgesChange([]);
    // Set new nodes and edges
    setTimeout(() => {
      onNodesChange(flowData.nodes.map(node => ({ ...node, selected: false })));
      onEdgesChange(flowData.edges);
    }, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">
          {selectedFlow ? `${flowsData[selectedFlow as keyof typeof flowsData].name}` : 'Job Flows'}
        </h1>
        <div className="flex items-center gap-2">
          {selectedFlow && (
            <Button variant="outline" onClick={() => setSelectedFlow(null)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Flows
            </Button>
          )}
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Dashboard
            </Button>
          </Link>
          <Link to="/" aria-label="Go to Dashboard">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {!selectedFlow ? (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Available Job Flows</h2>
              <p className="text-gray-600">Select a flow to view its jobs and execution details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(flowsData).map(([key, flow]) => (
                <Card 
                  key={key} 
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => handleFlowSelect(key)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{flow.name}</CardTitle>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(flow.status)}`}>
                        {getStatusIcon(flow.status)}
                        {flow.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{flow.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Total Jobs:</span>
                      <span className="font-semibold">{flow.totalJobs}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default JobsFlowPage;
