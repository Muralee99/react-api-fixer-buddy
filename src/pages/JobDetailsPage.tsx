import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ArrowLeft, Home, ChevronDown, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { JobExecutionChart } from '@/components/job-details/JobExecutionChart';
import { JobStepsTable } from '@/components/job-details/JobStepsTable';
import { JobRecordsTable } from '@/components/job-details/JobRecordsTable';
import { fetchJobDetails, fetchJobHistory } from '@/services/mockDataService';
import type { JobDetails, JobHistory } from '@/services/mockDataService';

const JobHistorySidebar: React.FC<{
  jobHistory: JobHistory[];
  selectedHistoryId: string;
  onSelectHistory: (id: string) => void;
}> = ({ jobHistory, selectedHistoryId, onSelectHistory }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`h-full border-r bg-card transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`} collapsible="icon">
      <div className="p-2">
        <SidebarTrigger className="mb-2" />
      </div>
      <SidebarContent>
        <div className="p-4">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold mb-4 text-foreground">Job History</h2>
          )}
          <div className="space-y-2">
            {jobHistory.map((history, index) => (
              <Card 
                key={history.id}
                className={`cursor-pointer transition-colors ${
                  selectedHistoryId === history.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onSelectHistory(history.id)}
              >
                <CardContent className={isCollapsed ? "p-2" : "p-3"}>
                  {isCollapsed ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium">#{index + 1}</span>
                      {history.status === 'success' ? (
                        <CheckCircle size={12} className="text-green-500 mt-1" />
                      ) : history.status === 'failure' ? (
                        <XCircle size={12} className="text-red-500 mt-1" />
                      ) : (
                        <Clock size={12} className="text-blue-500 mt-1" />
                      )}
                    </div>
                  ) : (
                    <>
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
                        {new Date(history.startTime).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Duration: {history.duration}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

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
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <header className="border-b bg-card p-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home size={16} />
              Home
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Job Details: {jobDetails.name}</h1>
          </div>
        </header>

        <div className="flex h-[calc(100vh-80px)]">
          <JobHistorySidebar 
            jobHistory={jobHistory}
            selectedHistoryId={selectedHistoryId}
            onSelectHistory={setSelectedHistoryId}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Upper Panel - Job Execution Chart */}
            <div className="flex-1 p-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-foreground">Job Execution Flow</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
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
    </SidebarProvider>
  );
};

export default JobDetailsPage;