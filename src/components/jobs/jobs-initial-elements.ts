
import { Node, Edge } from '@xyflow/react';
import type { JobNodeData } from './JobNode';

const jobData: JobNodeData[] = [
  {
    name: 'Data Ingestion',
    status: 'success',
    lastExecutionTime: '2025-06-15 08:00',
    nextExecutionTime: '2025-06-16 08:00',
    recordsProcessed: 15234,
    pendingRecords: 0,
  },
  {
    name: 'Initial Validation',
    status: 'success',
    lastExecutionTime: '2025-06-15 08:05',
    nextExecutionTime: '2025-06-16 08:05',
    recordsProcessed: 15234,
    pendingRecords: 0,
  },
  {
    name: 'Data Cleansing',
    status: 'failure',
    lastExecutionTime: '2025-06-15 08:10',
    nextExecutionTime: '2025-06-16 08:10',
    recordsProcessed: 14000,
    pendingRecords: 1234,
  },
  {
    name: 'Enrichment Service 1',
    status: 'running',
    lastExecutionTime: '2025-06-15 07:15',
    nextExecutionTime: '2025-06-15 08:15',
    recordsProcessed: 13500,
    pendingRecords: 500,
  },
  {
    name: 'Enrichment Service 2',
    status: 'pending',
    lastExecutionTime: 'N/A',
    nextExecutionTime: 'On Completion',
    recordsProcessed: 0,
    pendingRecords: 14000,
  },
  {
    name: 'Data Transformation',
    status: 'pending',
    lastExecutionTime: 'N/A',
    nextExecutionTime: 'On Completion',
    recordsProcessed: 0,
    pendingRecords: 0,
  },
  {
    name: 'Aggregation Layer',
    status: 'pending',
    lastExecutionTime: 'N/A',
    nextExecutionTime: 'On Completion',
    recordsProcessed: 0,
    pendingRecords: 0,
  },
  {
    name: 'Staging Load',
    status: 'pending',
    lastExecutionTime: 'N/A',
    nextExecutionTime: 'On Completion',
    recordsProcessed: 0,
    pendingRecords: 0,
  },
  {
    name: 'Final Validation',
    status: 'pending',
    lastExecutionTime: 'N/A',
    nextExecutionTime: 'On Completion',
    recordsProcessed: 0,
    pendingRecords: 0,
  },
  {
    name: 'Data Warehouse Load',
    status: 'pending',
    lastExecutionTime: 'N/A',
    nextExecutionTime: 'On Completion',
    recordsProcessed: 0,
    pendingRecords: 0,
  },
];

export const initialNodes: Node<JobNodeData>[] = jobData.map((job, i) => ({
  id: `job-${i + 1}`,
  type: 'jobNode',
  position: { x: (i % 2) * 350 + 50, y: Math.floor(i / 2) * 200 + 50 },
  data: job,
}));

export const initialEdges: Edge[] = [];
for (let i = 0; i < jobData.length - 1; i++) {
  initialEdges.push({
    id: `e-${i + 1}-${i + 2}`,
    source: `job-${i + 1}`,
    target: `job-${i + 2}`,
    type: 'smoothstep',
    animated: jobData[i+1].status === 'running' || jobData[i].status === 'running',
    style: { strokeWidth: 2 }
  });
}
