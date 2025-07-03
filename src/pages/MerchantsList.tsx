import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Merchant {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  category: string;
  joinDate: string;
  totalTransactions: number;
  revenue: number;
  phone: string;
  address: string;
  businessType: string;
  description: string;
}

const mockMerchants: Merchant[] = [
  {
    id: 'M001',
    name: 'TechStore Pro',
    email: 'contact@techstore.com',
    status: 'active',
    category: 'Electronics',
    joinDate: '2023-01-15',
    totalTransactions: 1250,
    revenue: 450000,
    phone: '+1-555-0123',
    address: '123 Tech Street, Silicon Valley, CA 94088',
    businessType: 'Retail',
    description: 'Leading electronics retailer specializing in cutting-edge technology products and accessories.'
  },
  {
    id: 'M002',
    name: 'Fashion Hub',
    email: 'info@fashionhub.com',
    status: 'active',
    category: 'Fashion',
    joinDate: '2023-02-20',
    totalTransactions: 890,
    revenue: 320000,
    phone: '+1-555-0456',
    address: '456 Fashion Ave, New York, NY 10001',
    businessType: 'E-commerce',
    description: 'Trendy fashion boutique offering latest styles and seasonal collections for all ages.'
  },
  {
    id: 'M003',
    name: 'Gourmet Delights',
    email: 'orders@gourmetdelights.com',
    status: 'pending',
    category: 'Food & Beverage',
    joinDate: '2023-03-10',
    totalTransactions: 567,
    revenue: 180000,
    phone: '+1-555-0789',
    address: '789 Culinary Blvd, Chicago, IL 60601',
    businessType: 'Restaurant',
    description: 'Premium restaurant offering exquisite dining experiences with locally sourced ingredients.'
  },
  {
    id: 'M004',
    name: 'Home & Garden Plus',
    email: 'support@homegardenplus.com',
    status: 'inactive',
    category: 'Home Improvement',
    joinDate: '2022-11-05',
    totalTransactions: 345,
    revenue: 95000,
    phone: '+1-555-0321',
    address: '321 Garden Way, Austin, TX 73301',
    businessType: 'Retail',
    description: 'Complete home and garden solutions provider with expert consultation services.'
  }
];

const MerchantRow: React.FC<{ merchant: Merchant }> = ({ merchant }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleViewAnalytics = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/?merchant=${merchant.id}`);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-muted/50">
          <TableCell className="w-12">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </TableCell>
          <TableCell>{merchant.id}</TableCell>
          <TableCell className="font-medium">{merchant.name}</TableCell>
          <TableCell>{merchant.email}</TableCell>
          <TableCell>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(merchant.status)}`}>
              {merchant.status}
            </span>
          </TableCell>
          <TableCell>{merchant.category}</TableCell>
          <TableCell>{merchant.joinDate}</TableCell>
          <TableCell className="text-right">{merchant.totalTransactions.toLocaleString()}</TableCell>
          <TableCell className="text-right">${merchant.revenue.toLocaleString()}</TableCell>
          <TableCell>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleViewAnalytics}
              className="flex items-center gap-1"
            >
              <BarChart3 className="h-3 w-3" />
              Analytics
            </Button>
          </TableCell>
        </TableRow>
      </CollapsibleTrigger>
      <CollapsibleContent asChild>
        <TableRow>
          <TableCell colSpan={10} className="bg-muted/30">
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Contact Information</h4>
                  <p className="text-sm">Phone: {merchant.phone}</p>
                  <p className="text-sm">Email: {merchant.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Business Details</h4>
                  <p className="text-sm">Type: {merchant.businessType}</p>
                  <p className="text-sm">Category: {merchant.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Performance</h4>
                  <p className="text-sm">Transactions: {merchant.totalTransactions.toLocaleString()}</p>
                  <p className="text-sm">Revenue: ${merchant.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Address</h4>
                <p className="text-sm">{merchant.address}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{merchant.description}</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    </Collapsible>
  );
};

const MerchantsList = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Merchants List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Transactions</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMerchants.map((merchant) => (
                  <MerchantRow key={merchant.id} merchant={merchant} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantsList;