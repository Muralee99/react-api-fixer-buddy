import { Node, Edge } from '@xyflow/react';
import { TransactionNodeData } from './TransactionNode';

// Mock data for Transaction Initiation stage
export const initiationNodes: Node<TransactionNodeData>[] = [
  {
    id: '1',
    type: 'transactionNode',
    position: { x: 100, y: 150 },
    data: { 
      name: 'Create',
      time: '2025-06-15 10:00:00 UTC',
      state: 'Initiated',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '1a',
    type: 'transactionNode',
    position: { x: 400, y: 50 },
    data: { 
      name: 'Create',
      time: '2025-06-15 10:00:15 UTC',
      state: 'Validation',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '1b',
    type: 'transactionNode',
    position: { x: 400, y: 250 },
    data: { 
      name: 'Create',
      time: '2025-06-15 10:00:30 UTC',
      state: 'Authorization',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
];

export const initiationEdges: Edge[] = [
  { id: 'e1-1a', source: '1', target: '1a', animated: true },
  { id: 'e1-1b', source: '1', target: '1b', animated: true },
];

// Mock data for Payment Processing stage
export const paymentNodes: Node<TransactionNodeData>[] = [
  {
    id: '2',
    type: 'transactionNode',
    position: { x: 100, y: 150 },
    data: { 
      name: 'Payment',
      time: '2025-06-15 10:01:30 UTC',
      state: 'Processing',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '2a',
    type: 'transactionNode',
    position: { x: 400, y: 80 },
    data: { 
      name: 'Payment',
      time: '2025-06-15 10:01:45 UTC',
      state: 'Bank Auth',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '2b',
    type: 'transactionNode',
    position: { x: 400, y: 220 },
    data: { 
      name: 'Payment',
      time: '2025-06-15 10:02:00 UTC',
      state: 'Settlement',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '2c',
    type: 'transactionNode',
    position: { x: 700, y: 150 },
    data: { 
      name: 'Payment',
      time: '2025-06-15 10:02:15 UTC',
      state: 'Completed',
      amount: '1000.00',
      currency: 'USD',
      country: 'USA'
    },
  },
];

export const paymentEdges: Edge[] = [
  { id: 'e2-2a', source: '2', target: '2a', animated: true },
  { id: 'e2-2b', source: '2', target: '2b', animated: true },
  { id: 'e2a-2c', source: '2a', target: '2c', animated: true },
  { id: 'e2b-2c', source: '2b', target: '2c', animated: true },
];

// Mock data for Refund Processing stage
export const refundNodes: Node<TransactionNodeData>[] = [
  {
    id: '3',
    type: 'transactionNode',
    position: { x: 100, y: 100 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 11:05:00 UTC',
      state: 'Initiated',
      amount: '200.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '4',
    type: 'transactionNode',
    position: { x: 100, y: 250 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 12:30:15 UTC',
      state: 'Initiated',
      amount: '300.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '3a',
    type: 'transactionNode',
    position: { x: 400, y: 100 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 11:05:30 UTC',
      state: 'Processing',
      amount: '200.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '4a',
    type: 'transactionNode',
    position: { x: 400, y: 250 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 12:30:45 UTC',
      state: 'Processing',
      amount: '300.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '3b',
    type: 'transactionNode',
    position: { x: 700, y: 100 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 11:06:00 UTC',
      state: 'Completed',
      amount: '200.00',
      currency: 'USD',
      country: 'USA'
    },
  },
  {
    id: '4b',
    type: 'transactionNode',
    position: { x: 700, y: 250 },
    data: { 
      name: 'Partial Refund',
      time: '2025-06-15 12:31:15 UTC',
      state: 'Completed',
      amount: '300.00',
      currency: 'USD',
      country: 'USA'
    },
  },
];

export const refundEdges: Edge[] = [
  { id: 'e3-3a', source: '3', target: '3a', animated: true },
  { id: 'e4-4a', source: '4', target: '4a', animated: true },
  { id: 'e3a-3b', source: '3a', target: '3b', animated: true },
  { id: 'e4a-4b', source: '4a', target: '4b', animated: true },
];

// Combined data for all stages view
export const allStagesNodes: Node<TransactionNodeData>[] = [
  ...initiationNodes,
  ...paymentNodes,
  ...refundNodes,
];

export const allStagesEdges: Edge[] = [
  ...initiationEdges,
  ...paymentEdges,
  ...refundEdges,
  // Connections between stages
  { id: 'e1b-2', source: '1b', target: '2', animated: true },
  { id: 'e2c-3', source: '2c', target: '3', animated: true },
  { id: 'e2c-4', source: '2c', target: '4', animated: true },
];