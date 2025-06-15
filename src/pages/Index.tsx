
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Welcome to the Data Pipeline Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-8">
            Manage and visualize your pipeline and transactional data with our powerful tools.
          </p>
          <Link to="/pipeline-data">
            <Button size="lg">Go to Data Management</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
