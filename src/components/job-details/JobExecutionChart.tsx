import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import type { JobHistory } from '@/services/mockDataService';

interface JobExecutionChartProps {
  jobHistory: JobHistory;
}

export const JobExecutionChart: React.FC<JobExecutionChartProps> = ({ jobHistory }) => {
  return (
    <div className="h-full p-4 bg-background">
      <h3 className="text-lg font-semibold mb-4">Job Execution Timeline</h3>
      
      {/* Horizontal Timeline */}
      <div className="space-y-6">
        {/* Row 1: Job Start */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 min-w-[120px]">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="font-semibold text-sm">Job Start</span>
          </div>
          <ArrowRight className="text-muted-foreground" size={16} />
          <Card className="flex-1 bg-primary/5 border-primary/20">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Start Time</div>
                  <div className="text-xs text-muted-foreground">{jobHistory.startTime}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Records to Process</div>
                  <div className="text-xs text-primary font-semibold">{jobHistory.totalRecords.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Steps */}
        {jobHistory.steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 min-w-[120px]">
              {step.status === 'success' ? (
                <CheckCircle className="text-green-500" size={16} />
              ) : (
                <XCircle className="text-red-500" size={16} />
              )}
              <span className="font-semibold text-sm">{step.name}</span>
            </div>
            <ArrowRight className="text-muted-foreground" size={16} />
            <Card className={`flex-1 ${
              step.status === 'success' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <CardContent className="p-3">
                <div className="grid grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="font-medium">Start Time</div>
                    <div className="text-muted-foreground">{step.startTime}</div>
                  </div>
                  <div>
                    <div className="font-medium">Records Processed</div>
                    <div className="text-blue-600 font-semibold">{step.recordsProcessed.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="font-medium">Success</div>
                    <div className="text-green-600 font-semibold">{(step.recordsProcessed - step.recordsFailed).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="font-medium">Failed</div>
                    <div className="text-red-600 font-semibold">{step.recordsFailed.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <div>
                    <span className="font-medium">Duration: </span>
                    <span className="text-muted-foreground">{step.duration}</span>
                  </div>
                  <Badge variant={step.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                    {step.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Row 3: Job End */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 min-w-[120px]">
            {jobHistory.status === 'success' ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <XCircle className="text-red-500" size={16} />
            )}
            <span className="font-semibold text-sm">Job End</span>
          </div>
          <ArrowRight className="text-muted-foreground" size={16} />
          <Card className={`flex-1 ${
            jobHistory.status === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <CardContent className="p-3">
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="font-medium">End Time</div>
                  <div className="text-muted-foreground">{jobHistory.endTime}</div>
                </div>
                <div>
                  <div className="font-medium">Total Success</div>
                  <div className="text-green-600 font-semibold">{jobHistory.successRecords.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium">Total Failed</div>
                  <div className="text-red-600 font-semibold">{jobHistory.failedRecords.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium">Total Duration</div>
                  <div className="text-primary font-semibold">{jobHistory.duration}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};