import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, ChevronDown, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { JobExecutionChart } from '@/components/job-details/JobExecutionChart';
import { JobStepsTable } from '@/components/job-details/JobStepsTable';
import { JobRecordsTable } from '@/components/job-details/JobRecordsTable';
import { fetchJobDetails, fetchJobHistory } from '@/services/mockDataService';
import type { JobDetails, JobHistory } from '@/services/mockDataService';

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [jobHistory, setJobHistory] = useState<JobHistory[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string>('');
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails(jobId).then(setJobDetails);
      fetchJobHistory(jobId).then((history) => {
        setJobHistory(history);
        if (history.length > 0) {
          setSelectedHistoryId(history[0].id);
        }
      });
    }
  }, [jobId]);

  const selectedHistory = jobHistory.find(h => h.id === selectedHistoryId);

  if (!jobDetails) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Job Details: {jobDetails.name}</h1>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Job History */}
        <div className="w-80 border-r bg-card p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Job History</h2>
          <div className="space-y-2">
            {jobHistory.map((history, index) => (
              <Card 
                key={history.id}
                className={`cursor-pointer transition-colors ${
                  selectedHistoryId === history.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedHistoryId(history.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Run #{index + 1}</span>
                      {history.status === 'success' ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : history.status === 'failure' ? (
                        <XCircle size={14} className="text-red-500" />
                      ) : (
                        <Clock size={14} className="text-blue-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {history.startTime}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Duration: {history.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col">
          {/* Upper Panel - Job Execution Chart */}
          <div className="flex-1 p-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-foreground">Job Execution Flow</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                {selectedHistory && (
                  <JobExecutionChart jobHistory={selectedHistory} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Lower Panel - Collapsible Tables */}
          <Collapsible 
            open={isBottomPanelOpen} 
            onOpenChange={setIsBottomPanelOpen}
            className="border-t"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-4 h-auto border-b"
              >
                <span className="text-lg font-semibold text-foreground">Detailed Metrics</span>
                {isBottomPanelOpen ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="h-80">
              <div className="flex h-full">
                {/* Left Table - Job Steps */}
                <div className="w-1/2 border-r">
                  <div className="p-4 border-b bg-muted/30">
                    <h3 className="font-semibold text-foreground">Step Timing</h3>
                  </div>
                  <div className="h-[calc(100%-60px)] overflow-y-auto">
                    {selectedHistory && (
                      <JobStepsTable jobHistory={selectedHistory} />
                    )}
                  </div>
                </div>

                {/* Right Table - Records Processing */}
                <div className="w-1/2">
                  <div className="p-4 border-b bg-muted/30">
                    <h3 className="font-semibold text-foreground">Records Processing</h3>
                  </div>
                  <div className="h-[calc(100%-60px)] overflow-y-auto">
                    {selectedHistory && (
                      <JobRecordsTable jobHistory={selectedHistory} />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;