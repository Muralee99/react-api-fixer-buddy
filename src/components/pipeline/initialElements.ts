
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'source-1',
    type: 'sourceNode',
    position: { x: 100, y: 100 },
    data: { label: 'Database Source' },
  },
  {
    id: 'transform-1',
    type: 'transformNode',
    position: { x: 400, y: 100 },
    data: { label: 'Data Transform' },
  },
  {
    id: 'destination-1',
    type: 'destinationNode',
    position: { x: 700, y: 100 },
    data: { label: 'Data Warehouse' },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'source-1',
    target: 'transform-1',
    animated: true,
  },
  {
    id: 'e2-3',
    source: 'transform-1',
    target: 'destination-1',
    animated: true,
  },
];
