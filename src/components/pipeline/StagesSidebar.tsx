import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Shield, CreditCard, CheckCircle, Settings } from 'lucide-react';

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  nodeIds: string[];
  status: 'completed' | 'in-progress' | 'pending';
}

interface StagesSidebarProps {
  stages: PipelineStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
  onShowAll: () => void;
}

const StagesSidebar: React.FC<StagesSidebarProps> = ({
  stages,
  activeStageId,
  onStageSelect,
  onShowAll,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Settings className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'pending':
        return <div className="h-4 w-4 rounded-full border-2 border-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Pipeline Stages</h2>
        <Button
          variant={activeStageId === null ? "default" : "outline"}
          onClick={onShowAll}
          className="w-full justify-start"
        >
          Show All Stages
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {stages.map((stage, index) => {
          const IconComponent = stage.icon;
          const isActive = activeStageId === stage.id;
          
          return (
            <Card
              key={stage.id}
              className={`cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'ring-2 ring-primary bg-primary/5 shadow-md'
                  : 'hover:shadow-md hover:bg-gray-50'
              }`}
              onClick={() => onStageSelect(stage.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-500">
                          Stage {index + 1}
                        </span>
                        {getStatusIcon(stage.status)}
                      </div>
                      <CardTitle className="text-sm font-semibold">
                        {stage.name}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge className={getStatusColor(stage.status)}>
                    {stage.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 mb-2">{stage.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {stage.nodeIds.length} node{stage.nodeIds.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="p-4 border-t bg-gray-50">
        <div className="text-xs text-gray-600">
          <p className="font-medium mb-1">Navigation Tips:</p>
          <ul className="space-y-1">
            <li>• Click a stage to focus on its nodes</li>
            <li>• Use "Show All" to view complete flow</li>
            <li>• Stages show process sequence</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StagesSidebar;