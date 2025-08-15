import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MiniMap,
  Edge,
  Node,
  NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { JobNode } from '@/components/jobs/JobNode';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp } from 'lucide-react';

const nodeTypes = { jobNode: JobNode } as const;

const JobRelations: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const decodedId = decodeURIComponent(jobId || '');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isJobTableOpen, setIsJobTableOpen] = useState(false);

  useEffect(() => {
    document.title = `Job Relations - ${decodedId}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', `Related jobs and dependencies for ${decodedId}.`);
  }, [decodedId]);

  const { initialNodes, initialEdges } = useMemo(() => {
    const center: Node = {
      id: 'center',
      type: 'jobNode',
      position: { x: 300, y: 120 },
      data: {
        name: decodedId.replace(/^[^a-zA-Z0-9]+/, '') || 'Selected Job',
        status: 'running',
        lastExecutionTime: '2025-07-01 09:00',
        nextExecutionTime: '2025-07-01 10:00',
        recordsProcessed: 1200,
        pendingRecords: 200,
      },
    };

    const neighbors: Node[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `n-${i + 1}`,
      type: 'jobNode',
      position: { x: 40 + i * 160, y: i % 2 === 0 ? 10 : 250 },
      data: {
        name: `Related Job ${i + 1}`,
        status: (['success', 'failure', 'pending', 'running'] as const)[i % 4],
        lastExecutionTime: '2025-07-01 08:30',
        nextExecutionTime: '2025-07-01 09:30',
        recordsProcessed: 400 + i * 120,
        pendingRecords: i % 2 === 0 ? 0 : 50,
      },
    }));

    const edges: Edge[] = neighbors.map((n, idx) => ({ id: `e-${idx}`, source: 'center', target: n.id, type: 'smoothstep', animated: idx % 2 === 0 }));

    return { initialNodes: [center, ...neighbors], initialEdges: edges };
  }, [decodedId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick: NodeMouseHandler = (event, node) => {
    setSelectedJob(node.data);
    setIsJobTableOpen(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Job Relations</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/jobs')}>Back to Jobs</Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
        
        {selectedJob && (
          <div className="bg-white border-t">
            <Collapsible open={isJobTableOpen} onOpenChange={setIsJobTableOpen}>
              <CollapsibleTrigger asChild>
                <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                  <h3 className="text-lg font-semibold">Job Details: {selectedJob.name}</h3>
                  {isJobTableOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <div className="space-y-4">
                  {/* Job Data Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Data Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Job Name</TableCell>
                            <TableCell>{selectedJob.name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Status</TableCell>
                            <TableCell>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                selectedJob.status === 'success' ? 'bg-green-100 text-green-800' :
                                selectedJob.status === 'failure' ? 'bg-red-100 text-red-800' :
                                selectedJob.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {selectedJob.status}
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Last Execution</TableCell>
                            <TableCell>{selectedJob.lastExecutionTime}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Next Execution</TableCell>
                            <TableCell>{selectedJob.nextExecutionTime}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Records Processed</TableCell>
                            <TableCell>{selectedJob.recordsProcessed?.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pending Records</TableCell>
                            <TableCell>{selectedJob.pendingRecords?.toLocaleString()}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Business Data Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Data Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Transaction Volume</TableCell>
                            <TableCell>$2,485,320.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Processing Rate</TableCell>
                            <TableCell>98.5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Error Rate</TableCell>
                            <TableCell>1.5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Average Processing Time</TableCell>
                            <TableCell>2.3 seconds</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Business Unit</TableCell>
                            <TableCell>Payment Processing</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Priority Level</TableCell>
                            <TableCell>
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                                High
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">SLA Compliance</TableCell>
                            <TableCell>99.2%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobRelations;
