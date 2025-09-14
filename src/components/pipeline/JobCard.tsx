
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, FileText, AlertCircle, CheckCircle, Loader, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Job } from '@/services/mockDataService';

interface JobCardProps {
  job: Job;
}

const statusIcons = {
  success: <CheckCircle className="text-green-500" size={16} />,
  failure: <AlertCircle className="text-red-500" size={16} />,
  running: <Loader className="text-blue-500 animate-spin" size={16} />,
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/job-details/${job.id}`);
  };

  return (
    <Card className="mb-4 shadow-md bg-white">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-semibold text-gray-800 flex items-center justify-between">
          <span>{job.name}</span>
          <div className="flex items-center gap-2">
            {job.status && statusIcons[job.status]}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewDetails}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <Info size={14} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-xs text-gray-600 space-y-2">
        <div className="flex items-center">
          <Clock size={14} className="mr-2" />
          <span>Last run: {job.lastExecution}</span>
        </div>
        <div className="flex items-center">
          <FileText size={14} className="mr-2" />
          <span>Processed: {job.recordsProcessed} | Pending: {job.pendingRecords}</span>
        </div>
        {job.exception && (
          <div className="flex items-start text-red-600">
            <AlertCircle size={14} className="mr-2 mt-0.5" />
            <span className="break-all">Exception: {job.exception}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
