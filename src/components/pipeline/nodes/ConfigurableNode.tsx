
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  CreditCard, 
  TrendingDown, 
  TrendingUp, 
  Wallet, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { NodeConfig, FieldConfig } from '@/config/nodeConfig';

interface ConfigurableNodeData {
  label: string;
  nodeConfig: NodeConfig;
  pipelineData?: Record<string, any>;
}

const iconMap = {
  CreditCard,
  TrendingDown,
  TrendingUp,
  Wallet,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
};

const renderFieldValue = (field: FieldConfig, value: any, pipelineData?: Record<string, any>) => {
  if (!value && !pipelineData) return getDefaultValue(field);
  
  const actualValue = value || pipelineData?.[field.key];
  
  switch (field.type) {
    case 'status':
      const isSuccess = pipelineData?.status === 'success';
      const StatusIcon = isSuccess ? CheckCircle : XCircle;
      const statusText = isSuccess ? 'Success' : 'Failed';
      const executionDate = pipelineData?.lastExecution || '2024-01-20';
      return (
        <div className="flex items-center">
          <StatusIcon className="mr-1" size={10} />
          <span>{statusText} ({executionDate})</span>
        </div>
      );
    case 'currency':
      return actualValue || getDefaultValue(field);
    case 'number':
      return actualValue || getDefaultValue(field);
    case 'date':
      return actualValue || getDefaultValue(field);
    default:
      return actualValue || getDefaultValue(field);
  }
};

const getDefaultValue = (field: FieldConfig) => {
  switch (field.type) {
    case 'currency':
      return '$1,000';
    case 'number':
      return '0';
    case 'date':
      return '2024-01-25 09:00';
    case 'status':
      return 'Success';
    default:
      return 'N/A';
  }
};

export const ConfigurableNode = memo(({ data }: { data: ConfigurableNodeData }) => {
  const { nodeConfig, pipelineData } = data;
  const MainIcon = iconMap[nodeConfig.icon as keyof typeof iconMap];

  return (
    <div className={`px-4 py-3 shadow-md rounded-md ${nodeConfig.bgColor} text-white border-2 ${nodeConfig.borderColor} min-w-[240px]`}>
      <div className="flex items-center mb-3">
        {MainIcon && <MainIcon className="mr-2" size={16} />}
        <div className="text-sm font-bold">{nodeConfig.title}</div>
      </div>
      
      {nodeConfig.sections.map((section, sectionIndex) => {
        const SectionIcon = section.icon ? iconMap[section.icon as keyof typeof iconMap] : null;
        
        return (
          <div key={sectionIndex} className={`${nodeConfig.sectionBgColor} rounded p-2 ${sectionIndex < nodeConfig.sections.length - 1 ? 'mb-2' : ''}`}>
            <div className="text-xs font-semibold mb-1 flex items-center">
              {SectionIcon && <SectionIcon className="mr-1" size={10} />}
              {section.title}
            </div>
            <div className="text-xs space-y-1">
              {section.fields.map((field, fieldIndex) => {
                const FieldIcon = field.icon ? iconMap[field.icon as keyof typeof iconMap] : null;
                const fieldValue = renderFieldValue(field, data[field.key as keyof typeof data], pipelineData);
                
                return (
                  <div key={fieldIndex} className={field.icon ? "flex items-center" : ""}>
                    {FieldIcon && <FieldIcon className="mr-1" size={10} />}
                    <span>
                      {field.label && `${field.label}: `}{fieldValue}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {nodeConfig.handles.target && (
        <Handle
          type="target"
          position={Position.Left}
          className={`w-2 h-2 ${nodeConfig.handleColor}`}
        />
      )}
      {nodeConfig.handles.source && (
        <Handle
          type="source"
          position={Position.Right}
          className={`w-2 h-2 ${nodeConfig.handleColor}`}
        />
      )}
    </div>
  );
});

ConfigurableNode.displayName = 'ConfigurableNode';
