import React from 'react';
import { Database, Settings, Server, CreditCard, TrendingDown, TrendingUp, FileText, Wallet } from 'lucide-react';

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Configurable Pipeline Components</h2>
      
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-600 mb-2">Deal Processing</div>
        
        <div
          className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg cursor-grab hover:bg-orange-100 transition-colors"
          draggable
          onDragStart={(event) => onDragStart(event, 'dealBookingNode')}
        >
          <CreditCard className="mr-3 text-orange-600" size={20} />
          <div>
            <div className="font-medium text-orange-800">Deal Booking Card</div>
            <div className="text-xs text-orange-600">Configurable amounts and job details</div>
          </div>
        </div>

        <div className="text-sm font-medium text-gray-600 mb-2 mt-4">Payment Legs</div>

        <div
          className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg cursor-grab hover:bg-red-100 transition-colors"
          draggable
          onDragStart={(event) => onDragStart(event, 'paymentLegNode')}
        >
          <TrendingDown className="mr-3 text-red-600" size={20} />
          <div>
            <div className="font-medium text-red-800">Payment Leg</div>
            <div className="text-xs text-red-600">Configurable debit/credit processing</div>
          </div>
        </div>

        <div className="text-sm font-medium text-gray-600 mb-2 mt-4">Fund Management</div>

        <div
          className="flex items-center p-3 bg-teal-50 border border-teal-200 rounded-lg cursor-grab hover:bg-teal-100 transition-colors"
          draggable
          onDragStart={(event) => onDragStart(event, 'fundRecordNode')}
        >
          <FileText className="mr-3 text-teal-600" size={20} />
          <div>
            <div className="font-medium text-teal-800">Fund Record</div>
            <div className="text-xs text-teal-600">Configurable fund management</div>
          </div>
        </div>

        <div className="text-sm font-medium text-gray-600 mb-2 mt-4">Generic Components</div>

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
        <h3 className="font-medium text-gray-700 mb-2">Universal Node System</h3>
        <p className="text-xs text-gray-600">
          All nodes are now configurable at runtime. Drag components to build your pipeline, 
          and they will automatically configure based on your data and node type.
        </p>
      </div>
    </div>
  );
};
