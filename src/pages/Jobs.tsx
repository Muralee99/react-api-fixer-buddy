
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ArrowLeft, Home, Play, Clock, CheckCircle, Eye, Minimize, Maximize } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

import { initialNodes, initialEdges } from '@/components/jobs/jobs-initial-elements';
import { JobNode } from '@/components/jobs/JobNode';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const nodeTypes = {
  jobNode: JobNode,
};

// Mock data for different flows
const flowsData = {
  ExecutionFlow: {
    name: 'Jobs Execution Flow',
    description: 'Main jobs execution workflow and monitoring',
    status: 'active',
    totalJobs: 3,
    nodes: initialNodes,
    edges: initialEdges,
  },
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

// Mock job history data
const mockJobHistory = {
  'job-1': [
    { id: 1, timestamp: '2025-07-01 08:00:00', status: 'success', duration: '2m 15s', recordsProcessed: 1500, errors: 0 },
    { id: 2, timestamp: '2025-07-01 07:00:00', status: 'success', duration: '2m 08s', recordsProcessed: 1450, errors: 0 },
    { id: 3, timestamp: '2025-07-01 06:00:00', status: 'success', duration: '2m 22s', recordsProcessed: 1380, errors: 0 },
    { id: 4, timestamp: '2025-07-01 05:00:00', status: 'failure', duration: '45s', recordsProcessed: 120, errors: 15 },
    { id: 5, timestamp: '2025-07-01 04:00:00', status: 'success', duration: '2m 18s', recordsProcessed: 1420, errors: 0 },
  ],
  'job-2': [
    { id: 1, timestamp: '2025-07-01 08:15:00', status: 'running', duration: '1m 30s', recordsProcessed: 1200, errors: 0 },
    { id: 2, timestamp: '2025-07-01 07:15:00', status: 'success', duration: '3m 45s', recordsProcessed: 1600, errors: 2 },
    { id: 3, timestamp: '2025-07-01 06:15:00', status: 'success', duration: '3m 20s', recordsProcessed: 1580, errors: 0 },
    { id: 4, timestamp: '2025-07-01 05:15:00', status: 'success', duration: '3m 55s', recordsProcessed: 1650, errors: 1 },
  ],
  'job-3': [
    { id: 1, timestamp: '2025-06-30 23:45:00', status: 'success', duration: '5m 20s', recordsProcessed: 1500, errors: 0 },
    { id: 2, timestamp: '2025-06-30 22:45:00', status: 'success', duration: '4m 58s', recordsProcessed: 1480, errors: 0 },
    { id: 3, timestamp: '2025-06-30 21:45:00', status: 'failure', duration: '2m 10s', recordsProcessed: 450, errors: 25 },
  ],
};

const JobsPage = () => {
  const [showFlowSelection, setShowFlowSelection] = useState(true);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [flowNodes, setFlowNodes, onFlowNodesChange] = useNodesState([]);
  const [flowEdges, setFlowEdges, onFlowEdgesChange] = useEdgesState([]);
  const [isTableMinimized, setIsTableMinimized] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [funcFilter, setFuncFilter] = useState<string>('all');
  const navigate = useNavigate();

  const handleViewJobs = () => {
    setShowFlowSelection(true);
  };

  const handleFlowSelect = (flowKey: string) => {
    setSelectedFlow(flowKey);
    const flowData = flowsData[flowKey as keyof typeof flowsData];
    setFlowNodes(flowData.nodes);
    setFlowEdges(flowData.edges);
  };

  const handleBackToFlows = () => {
    setSelectedFlow(null);
    setSelectedJob(null);
  };

  const handleNodeClick = (event: any, node: any) => {
    setSelectedJob(node.id);
  };

  const handleJobRowClick = (jobId: string) => {
    setSelectedJob(jobId);
  };

  // Build "All Jobs" list by aggregating nodes from all flows and enriching with type/function
  const allJobs = useMemo(() => {
    const typeMap: Record<string, string> = {
      Payment: 'Sync',
      Settlement: 'Report',
      Data: 'ETL',
      Fraud: 'ETL',
      Alert: 'Report',
    };
    const funcMap: Record<string, string> = {
      Validation: 'Validation',
      Processing: 'Ingestion',
      Settlement: 'Settlement',
      Matching: 'Reconciliation',
      Reconciliation: 'Reconciliation',
      Pattern: 'Fraud',
      Risk: 'Fraud',
      Alert: 'Fraud',
      Case: 'Validation',
      Collection: 'Ingestion',
      Report: 'Reporting',
    };

    const items: Array<{
      id: string;
      name: string;
      status: 'success' | 'failure' | 'running' | 'pending';
      lastExecutionTime: string;
      recordsProcessed: number;
      pendingRecords: number;
      type: string;
      func: string;
    }> = [];

    Object.entries(flowsData).forEach(([flowKey, flow]) => {
      flow.nodes.forEach((n: any, idx: number) => {
        const name: string = n.data.name as string;
        const firstWord = name.split(' ')[0];
        const detectedType = Object.keys(typeMap).find(k => name.includes(k)) || 'Cleanup';
        const detectedFunc = Object.keys(funcMap).find(k => name.includes(k)) || 'Transformation';
        items.push({
          id: `${flowKey}-${n.id}`,
          name,
          status: n.data.status,
          lastExecutionTime: n.data.lastExecutionTime,
          recordsProcessed: n.data.recordsProcessed,
          pendingRecords: n.data.pendingRecords,
          type: typeMap[detectedType] || 'Cleanup',
          func: funcMap[detectedFunc] || 'Transformation',
        });
      });
    });

    return items;
  }, []);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(j =>
      (statusFilter === 'all' || j.status === statusFilter) &&
      (typeFilter === 'all' || j.type === typeFilter) &&
      (funcFilter === 'all' || j.func === funcFilter)
    );
  }, [allJobs, statusFilter, typeFilter, funcFilter]);


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

  const getJobTableData = () => {
    if (!selectedFlow) return [];
    const flowData = flowsData[selectedFlow as keyof typeof flowsData];
    return flowData.nodes.map(node => ({
      id: node.id,
      name: node.data.name,
      status: node.data.status,
      lastExecution: node.data.lastExecutionTime,
      nextExecution: node.data.nextExecutionTime,
      recordsProcessed: node.data.recordsProcessed,
      pendingRecords: node.data.pendingRecords,
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">
          {showAllJobs
            ? 'All Jobs'
            : selectedFlow
              ? `${flowsData[selectedFlow as keyof typeof flowsData].name}`
              : showFlowSelection
                ? 'Job Flows'
                : 'Jobs Execution Flow'}
        </h1>
        <div className="flex items-center gap-2">
          {showAllJobs ? (
            <Button variant="outline" onClick={() => setShowAllJobs(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Flows
            </Button>
          ) : selectedFlow ? (
            <Button variant="outline" onClick={handleBackToFlows}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Flows
            </Button>
          ) : (
            <Button onClick={() => setShowAllJobs(true)}>View All Jobs</Button>
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
        {showAllJobs ? (
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-md border">
              <div className="w-48">
                <label className="block text-sm font-medium mb-1">Job Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failure">Failure</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <label className="block text-sm font-medium mb-1">Job Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ETL">ETL</SelectItem>
                    <SelectItem value="Sync">Sync</SelectItem>
                    <SelectItem value="Report">Report</SelectItem>
                    <SelectItem value="Cleanup">Cleanup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-56">
                <label className="block text-sm font-medium mb-1">Function</label>
                <Select value={funcFilter} onValueChange={setFuncFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Ingestion">Ingestion</SelectItem>
                    <SelectItem value="Validation">Validation</SelectItem>
                    <SelectItem value="Transformation">Transformation</SelectItem>
                    <SelectItem value="Settlement">Settlement</SelectItem>
                    <SelectItem value="Reconciliation">Reconciliation</SelectItem>
                    <SelectItem value="Fraud">Fraud</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/jobs/${encodeURIComponent(job.id)}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{job.name}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {job.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between"><span>Type:</span><span>{job.type}</span></div>
                    <div className="flex justify-between"><span>Function:</span><span>{job.func}</span></div>
                    <div className="flex justify-between"><span>Last run:</span><span>{job.lastExecutionTime}</span></div>
                    <div className="flex justify-between"><span>Processed:</span><span>{job.recordsProcessed.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Pending:</span><span>{job.pendingRecords.toLocaleString()}</span></div>
                  </CardContent>
                </Card>
              ))}
              {filteredJobs.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-10">
                  No jobs found. Adjust filters.
                </div>
              )}
            </div>
          </div>
        ) : (
          <> 
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
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <ResizablePanelGroup direction="vertical" className="h-full">
                <ResizablePanel defaultSize={isTableMinimized ? 90 : 60} minSize={30}>
                  <ReactFlow
                    nodes={flowNodes}
                    edges={flowEdges}
                    onNodesChange={onFlowNodesChange}
                    onEdgesChange={onFlowEdgesChange}
                    onNodeClick={handleNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                  >
                    <Controls />
                    <MiniMap />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                  </ReactFlow>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={isTableMinimized ? 10 : 40} minSize={10}>
                  <div className="h-full bg-white border-t">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Job Information</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsTableMinimized(!isTableMinimized)}
                      >
                        {isTableMinimized ? (
                          <Maximize className="h-4 w-4" />
                        ) : (
                          <Minimize className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    {!isTableMinimized && (
                      <div className="p-4 overflow-auto h-full">
                        <Tabs defaultValue="details" className="w-full h-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">Job Details</TabsTrigger>
                            <TabsTrigger value="history">Job History</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="details" className="mt-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Job Name</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Last Execution</TableHead>
                                  <TableHead>Next Execution</TableHead>
                                  <TableHead>Records Processed</TableHead>
                                  <TableHead>Pending Records</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {getJobTableData().map((job) => (
                                  <TableRow 
                                    key={job.id} 
                                    className="cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleJobRowClick(job.id)}
                                  >
                                    <TableCell className="font-medium">{job.name}</TableCell>
                                    <TableCell>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        job.status === 'success' ? 'bg-green-100 text-green-800' :
                                        job.status === 'failure' ? 'bg-red-100 text-red-800' :
                                        job.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {job.status}
                                      </span>
                                    </TableCell>
                                    <TableCell>{job.lastExecution}</TableCell>
                                    <TableCell>{job.nextExecution}</TableCell>
                                    <TableCell>{job.recordsProcessed.toLocaleString()}</TableCell>
                                    <TableCell>{job.pendingRecords.toLocaleString()}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          
                          <TabsContent value="history" className="mt-4">
                            {selectedJob ? (
                              <div>
                                <h4 className="text-sm font-semibold mb-3">
                                  Execution History for: {flowNodes.find(n => n.id === selectedJob)?.data.name || selectedJob}
                                </h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Timestamp</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Duration</TableHead>
                                      <TableHead>Records Processed</TableHead>
                                      <TableHead>Errors</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {(mockJobHistory[selectedJob as keyof typeof mockJobHistory] || []).map((execution) => (
                                      <TableRow key={execution.id}>
                                        <TableCell className="font-medium">{execution.timestamp}</TableCell>
                                        <TableCell>
                                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            execution.status === 'success' ? 'bg-green-100 text-green-800' :
                                            execution.status === 'failure' ? 'bg-red-100 text-red-800' :
                                            execution.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                          }`}>
                                            {execution.status}
                                          </span>
                                        </TableCell>
                                        <TableCell>{execution.duration}</TableCell>
                                        <TableCell>{execution.recordsProcessed.toLocaleString()}</TableCell>
                                        <TableCell>{execution.errors}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            ) : (
                              <div className="text-center text-gray-500 py-8">
                                <p>Select a job node or job row to view its execution history</p>
                              </div>
                            )}
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default JobsPage;
