import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import type { JobHistory } from '@/services/mockDataService';

interface JobExecutionChartProps {
  jobHistory: JobHistory;
}

export const JobExecutionChart: React.FC<JobExecutionChartProps> = ({ jobHistory }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'failure':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-blue-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'failure':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      {/* Job Timeline */}
      <div className="space-y-8">
        {/* Job Start */}
        <div className="flex items-center justify-between">
          <Card className="w-48 bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-semibold text-sm">Job Start</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {jobHistory.startTime}
              </div>
            </CardContent>
          </Card>
          <div className="text-sm text-muted-foreground">
            Records to Process: {jobHistory.totalRecords}
          </div>
        </div>

        {/* Steps Flow */}
        <div className="relative">
          <div className="flex items-center justify-between space-x-4">
            {jobHistory.steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {index > 0 && (
                  <ArrowRight className="text-muted-foreground mx-2" size={16} />
                )}
                <Card className="w-48 bg-card border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(step.status)}
                      <span className="font-semibold text-sm">{step.name}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>Duration: {step.duration}</div>
                      <div>Processed: {step.recordsProcessed}</div>
                      {step.recordsFailed > 0 && (
                        <div className="text-red-500">Failed: {step.recordsFailed}</div>
                      )}
                    </div>
                    <Badge 
                      variant={step.status === 'success' ? 'default' : 'destructive'}
                      className="mt-2"
                    >
                      {step.status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(jobHistory.status)}`}
              style={{ 
                width: `${(jobHistory.successRecords / jobHistory.totalRecords) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Job End */}
        <div className="flex items-center justify-between">
          <Card className={`w-48 ${
            jobHistory.status === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(jobHistory.status)}
                <span className="font-semibold text-sm">Job End</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {jobHistory.endTime}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Duration: {jobHistory.duration}
              </div>
            </CardContent>
          </Card>
          <div className="text-sm space-y-1">
            <div className="text-green-600">
              Success: {jobHistory.successRecords}
            </div>
            <div className="text-red-600">
              Failed: {jobHistory.failedRecords}
            </div>
            <div className="text-muted-foreground">
              Total: {jobHistory.totalRecords}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};