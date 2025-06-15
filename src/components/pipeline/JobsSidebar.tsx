
import React from 'react';
import JobCard from './JobCard';
import type { Job } from '@/services/mockDataService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface JobsSidebarProps {
  jobs: Job[];
}

const JobsSidebar: React.FC<JobsSidebarProps> = ({ jobs }) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Pipeline Jobs</h2>
      <ScrollArea className="flex-1">
        {jobs.length > 0 ? (
          jobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No jobs found for this pipeline.
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default JobsSidebar;
