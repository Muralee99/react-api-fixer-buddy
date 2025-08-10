import React, { useEffect, useMemo } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { JobNode } from '@/components/jobs/JobNode';

const nodeTypes = { jobNode: JobNode } as const;

const JobRelations: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const decodedId = decodeURIComponent(jobId || '');

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

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Job Relations</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/jobs')}>Back to Jobs</Button>
        </div>
      </header>
      <main className="flex-1">
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
      </main>
    </div>
  );
};

export default JobRelations;
