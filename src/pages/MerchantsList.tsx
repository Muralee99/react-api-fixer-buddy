import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

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

const MerchantDetailCard: React.FC<{ merchant: Merchant }> = ({ merchant }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Merchant Details - {merchant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground border-b pb-1">Contact Information</h4>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-medium">Phone:</span> {merchant.phone}</p>
              <p className="text-sm"><span className="font-medium">Email:</span> {merchant.email}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground border-b pb-1">Business Details</h4>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-medium">Type:</span> {merchant.businessType}</p>
              <p className="text-sm"><span className="font-medium">Category:</span> {merchant.category}</p>
              <p className="text-sm"><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(merchant.status)}`}>
                  {merchant.status}
                </span>
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground border-b pb-1">Performance Metrics</h4>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-medium">Transactions:</span> {merchant.totalTransactions.toLocaleString()}</p>
              <p className="text-sm"><span className="font-medium">Revenue:</span> ${merchant.revenue.toLocaleString()}</p>
              <p className="text-sm"><span className="font-medium">Join Date:</span> {merchant.joinDate}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground border-b pb-1">Business Address</h4>
          <p className="text-sm">{merchant.address}</p>
        </div>
        
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground border-b pb-1">Business Description</h4>
          <p className="text-sm text-muted-foreground">{merchant.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-100';
    case 'inactive': return 'text-red-600 bg-red-100';
    case 'pending': return 'text-yellow-600 bg-yellow-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const MerchantsList = () => {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [filters, setFilters] = useState<{ id: string; name: string; country: string; status: 'all' | 'active' | 'inactive' }>({
    id: '',
    name: '',
    country: '',
    status: 'all',
  });
  const navigate = useNavigate();

  const handleRowClick = (merchant: Merchant) => {
    setSelectedMerchant(selectedMerchant?.id === merchant.id ? null : merchant);
  };

  const handleViewAnalytics = (e: React.MouseEvent, merchantId: string) => {
    e.stopPropagation();
    navigate(`/?merchant=${merchantId}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = filters.id.trim().toLowerCase();
    const name = filters.name.trim().toLowerCase();
    const country = filters.country.trim().toLowerCase();
    const filtered = mockMerchants.filter((m) => {
      const matchId = !id || m.id.toLowerCase().includes(id);
      const matchName = !name || m.name.toLowerCase().includes(name);
      const matchCountry = !country || m.address.toLowerCase().includes(country);
      const matchStatus = filters.status === 'all' ? true : m.status === filters.status;
      return matchId && matchName && matchCountry && matchStatus;
    });
    setMerchants(filtered);
    if (selectedMerchant && !filtered.find((m) => m.id === selectedMerchant.id)) {
      setSelectedMerchant(null);
    }
  };

  const handleReset = () => {
    setFilters({ id: '', name: '', country: '', status: 'all' });
    setMerchants(mockMerchants);
    setSelectedMerchant(null);
  };

  return (
    <div className="min-h-screen bg-background p-2">
      <div className="container mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Merchants List</h1>
            <p className="text-lg text-muted-foreground mt-2">View and manage merchant information</p>
          </div>
          <div className="flex gap-4">
            <Link to="/old-index">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Merchants */}
        <Card className="mb-6">
          <CardContent>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="merchantId">Merchant ID</Label>
                <Input
                  id="merchantId"
                  placeholder="Search by ID"
                  value={filters.id}
                  onChange={(e) => setFilters({ ...filters, id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchantName">Name</Label>
                <Input
                  id="merchantName"
                  placeholder="Search by name"
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Search by country"
                  value={filters.country}
                  onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={filters.status} onValueChange={(val) => setFilters({ ...filters, status: val as 'all' | 'active' | 'inactive' })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Not Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button type="submit" className="w-full">Search</Button>
                <Button type="button" variant="outline" onClick={handleReset} className="w-full">Reset</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Main Merchants Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">All Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
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
                {merchants.map((merchant) => (
                  <TableRow
                    key={merchant.id}
                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedMerchant?.id === merchant.id ? 'bg-muted/30 border-l-4 border-primary' : ''
                    }`}
                    onClick={() => handleRowClick(merchant)}
                  >
                    <TableCell className="font-medium">{merchant.id}</TableCell>
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
                        onClick={(e) => handleViewAnalytics(e, merchant.id)}
                        className="flex items-center gap-1"
                      >
                        <BarChart3 className="h-3 w-3" />
                        Analytics
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detailed Merchant Information */}
        {selectedMerchant && (
          <MerchantDetailCard merchant={selectedMerchant} />
        )}
      </div>
    </div>
  );
};

export default MerchantsList;