
import React, { useCallback, useState } from 'react';
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
import { FilterForm } from './pipeline/FilterForm';
import { fetchPipelineData, PipelineData } from '@/services/mockDataService';

const DataPipelineDesigner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isLoading, setIsLoading] = useState(false);

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

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 40,
      };

      // Create appropriate data based on node type
      let nodeData: any = { label: `${type} node` };
      if (type === 'paymentLegNode') {
        nodeData = { label: 'New Payment', type: Math.random() > 0.5 ? 'debit' : 'credit' };
      } else if (type === 'fundRecordNode') {
        nodeData = { label: 'New Fund Record', type: 'initial' };
      }

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );

  const handleFormSubmit = async (filters: {
    fromDate: string;
    toDate: string;
    merchantId: string;
  }) => {
    setIsLoading(true);
    console.log('Form submitted with filters:', filters);

    try {
      const data = await fetchPipelineData(filters);
      updateNodesWithData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNodesWithData = (data: PipelineData) => {
    setNodes((nds) => 
      nds.map((node) => {
        switch (node.id) {
          case 'deal-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: data.dealBooking,
              },
            };
          case 'payment-debit-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: data.paymentDebit,
              },
            };
          case 'payment-credit-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: data.paymentCredit,
              },
            };
          case 'fund-initial-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: data.fundInitial,
              },
            };
          case 'fund-funding-1':
            return {
              ...node,
              data: {
                ...node.data,
                pipelineData: data.fundFunding,
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
      <div className="p-4 bg-white border-b">
        <FilterForm onSubmit={handleFormSubmit} />
        {isLoading && (
          <div className="text-center text-blue-600 mt-2">
            Loading pipeline data...
          </div>
        )}
      </div>
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
          >
            <Controls />
            <MiniMap nodeClassName={nodeClassName} />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default DataPipelineDesigner;
