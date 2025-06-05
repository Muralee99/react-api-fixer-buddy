
import React from 'react';
import { Database, Settings, Server } from 'lucide-react';

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Pipeline Components</h2>
      
      <div className="space-y-3">
        <div
          className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-grab hover:bg-blue-100 transition-colors"
          draggable
          onDragStart={(event) => onDragStart(event, 'sourceNode')}
        >
          <Database className="mr-3 text-blue-600" size={20} />
          <div>
            <div className="font-medium text-blue-800">Data Source</div>
            <div className="text-xs text-blue-600">Input data from various sources</div>
          </div>
        </div>

        <div
          className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg cursor-grab hover:bg-green-100 transition-colors"
          draggable
          onDragStart={(event) => onDragStart(event, 'transformNode')}
        >
          <Settings className="mr-3 text-green-600" size={20} />
          <div>
            <div className="font-medium text-green-800">Transform</div>
            <div className="text-xs text-green-600">Process and modify data</div>
          </div>
        </div>

        <div
          className="flex items-center p-3 bg-purple-50 border border-purple-200 rounded-lg cursor-grab hover:bg-purple-100 transition-colors"
          draggable
          onDragStart={(event) => onDragStart(event, 'destinationNode')}
        >
          <Server className="mr-3 text-purple-600" size={20} />
          <div>
            <div className="font-medium text-purple-800">Destination</div>
            <div className="text-xs text-purple-600">Output data to destinations</div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">Instructions</h3>
        <p className="text-xs text-gray-600">
          Drag components from this panel onto the canvas to build your data pipeline. 
          Connect nodes by dragging from output handles to input handles.
        </p>
      </div>
    </div>
  );
};
