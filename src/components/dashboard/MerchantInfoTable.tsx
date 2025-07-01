
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Phone, Mail, Calendar, CreditCard } from 'lucide-react';

interface MerchantInfo {
  merchantId: string;
  merchantName: string;
  businessType: string;
  status: 'Active' | 'Inactive' | 'Pending';
  location: string;
  phoneNumber: string;
  email: string;
  registrationDate: string;
  lastTransaction: string;
  totalTransactions: number;
  monthlyVolume: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

interface MerchantInfoTableProps {
  merchantId: string;
}

const MerchantInfoTable: React.FC<MerchantInfoTableProps> = ({ merchantId }) => {
  // Generate mock merchant data based on merchant ID
  const generateMerchantInfo = (id: string): MerchantInfo => {
    const merchantVariant = parseInt(id.replace(/\D/g, '')) % 3;
    
    const merchantNames = ['TechCorp Solutions', 'Global Trade Ltd', 'Innovation Hub Inc'];
    const businessTypes = ['Technology', 'Retail', 'Manufacturing'];
    const locations = ['New York, USA', 'London, UK', 'Tokyo, Japan'];
    const statuses: ('Active' | 'Inactive' | 'Pending')[] = ['Active', 'Active', 'Pending'];
    const riskLevels: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
    
    return {
      merchantId: id,
      merchantName: merchantNames[merchantVariant],
      businessType: businessTypes[merchantVariant],
      status: statuses[merchantVariant],
      location: locations[merchantVariant],
      phoneNumber: `+${merchantVariant + 1}-555-${String(1000 + merchantVariant * 111).padStart(4, '0')}`,
      email: `contact@${merchantNames[merchantVariant].toLowerCase().replace(/[^a-z]/g, '')}.com`,
      registrationDate: `2023-0${merchantVariant + 1}-15`,
      lastTransaction: new Date(Date.now() - merchantVariant * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalTransactions: 1250 + merchantVariant * 500,
      monthlyVolume: `$${(50000 + merchantVariant * 25000).toLocaleString()}`,
      riskLevel: riskLevels[merchantVariant]
    };
  };

  const merchantInfo = generateMerchantInfo(merchantId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const merchantDetails = [
    { icon: Building2, label: 'Merchant Name', value: merchantInfo.merchantName },
    { icon: Building2, label: 'Business Type', value: merchantInfo.businessType },
    { icon: MapPin, label: 'Location', value: merchantInfo.location },
    { icon: Phone, label: 'Phone', value: merchantInfo.phoneNumber },
    { icon: Mail, label: 'Email', value: merchantInfo.email },
    { icon: Calendar, label: 'Registration Date', value: merchantInfo.registrationDate },
    { icon: Calendar, label: 'Last Transaction', value: merchantInfo.lastTransaction },
    { icon: CreditCard, label: 'Total Transactions', value: merchantInfo.totalTransactions.toLocaleString() },
    { icon: CreditCard, label: 'Monthly Volume', value: merchantInfo.monthlyVolume }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Merchant Information - {merchantInfo.merchantId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info Table */}
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Field</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchantDetails.slice(0, 5).map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <detail.icon className="h-4 w-4 text-gray-500" />
                        {detail.label}
                      </div>
                    </TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Transaction Info Table */}
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Field</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchantDetails.slice(5).map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <detail.icon className="h-4 w-4 text-gray-500" />
                        {detail.label}
                      </div>
                    </TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
                {/* Status and Risk Level */}
                <TableRow>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(merchantInfo.status)}>
                      {merchantInfo.status}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Risk Level</TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(merchantInfo.riskLevel)}>
                      {merchantInfo.riskLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchantInfoTable;
