
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DollarSign, Briefcase, TrendingUp, BarChart3, FileBarChart } from 'lucide-react';
const Index = () => {
  return (
    <div className="w-full px-4 py-2 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Dashboard</CardTitle>
                <BarChart3 className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View analytics and insights with interactive charts and filters.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to="/" className="w-full">
                  <Button className="w-full">View Dashboard</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Pipeline Data</CardTitle>
                <TrendingUp className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Visualize and manage your pipeline and transactional data.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to="/pipeline-data" className="w-full">
                  <Button className="w-full">View Pipeline Data</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Jobs Execution</CardTitle>
                <Briefcase className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor and manage job executions and their statuses.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to="/jobs" className="w-full">
                  <Button className="w-full">View Jobs</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Transaction Flow</CardTitle>
                <DollarSign className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track transactions from creation to payment and refunds.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to="/transaction-flow" className="w-full">
                  <Button className="w-full">View Transaction Flow</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Merchants List</CardTitle>
                <DollarSign className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View and manage merchant details and information.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to="/merchants" className="w-full">
                  <Button className="w-full">View Merchants</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">Reports & Analytics</CardTitle>
                <FileBarChart className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate comprehensive reports and analyze business metrics.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to="/reports" className="w-full">
                  <Button className="w-full">View Reports</Button>
                </Link>
              </CardFooter>
            </Card>
        </div>
      </div>
  );
};

export default Index;
