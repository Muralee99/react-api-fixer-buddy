
import { Node, Edge } from '@xyflow/react';
import { TransactionNodeData } from './TransactionNode';

export const initialNodes: Node<TransactionNodeData>[] = [
  {
    id: '1',
    type: 'transactionNode',
    position: { x: 50, y: 150 },
    data: { name: 'Create' },
  },
  {
    id: '2',
    type: 'transactionNode',
    position: { x: 300, y: 150 },
    data: { name: 'Payment' },
  },
  {
    id: '3',
    type: 'transactionNode',
    position: { x: 550, y: 150 },
    data: { name: 'Refund' },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];
