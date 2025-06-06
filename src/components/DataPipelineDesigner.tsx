
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
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const DataPipelineDesigner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle incoming pipeline data from navigation
  useEffect(() => {
    if (location.state?.pipelineData) {
      const pipelineData = location.state.pipelineData;
      updateNodesWithData(pipelineData);
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
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Data Table
        </Button>
        <h1 className="text-xl font-semibold">Pipeline Designer</h1>
        <div></div>
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
