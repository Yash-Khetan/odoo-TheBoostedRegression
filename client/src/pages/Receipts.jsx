import { Plus, Search, Download, Settings, RefreshCw, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Receipts = () => {
  const kpiData = [
    { label: 'Total Receipts', value: '156', subtitle: 'This month' },
    { label: 'Pending', value: '12', badge: 'warning', badgeText: 'Awaiting processing' },
    { label: 'Completed Today', value: '8', badge: 'success', badgeText: '+3 from yesterday' },
    { label: 'Total Value', value: '$89,450', subtitle: 'This month' },
  ];

  const receipts = [
    { id: 'REC-1045', vendor: 'Acme Supplies Co.', email: 'acme@supplies.com', date: 'Nov 25, 2025', created: 'Nov 20, 2025', products: 5, qty: 250, status: 'complete' },
    { id: 'REC-1044', vendor: 'Global Electronics Ltd.', email: 'sales@globalelec.com', date: 'Nov 23, 2025', created: 'Nov 19, 2025', products: 3, qty: 150, status: 'ready' },
    { id: 'REC-1043', vendor: 'Premium Parts Inc.', email: 'orders@premiumparts.com', date: 'Nov 22, 2025', created: 'Nov 18, 2025', products: 8, qty: 420, status: 'complete' },
    { id: 'REC-1042', vendor: 'Industrial Components Co.', email: 'contact@indcomp.com', date: 'Nov 24, 2025', created: 'Nov 18, 2025', products: 2, qty: 75, status: 'draft' },
  ];

  const getStatusBadge = (status) => {
    const variants = { complete: 'success', ready: 'warning', draft: 'draft' };
    return <Badge variant={variants[status]}>{status === 'ready' ? 'Ready' : status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Receipts</h1>
          <p className="text-gray-500 mt-1">Manage incoming shipments and stock receipts</p>
        </div>
        <Link to="/create-order">
          <Button>
            <Plus className="w-4 h-4" />
            Create Receipt
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search by reference or vendor..." className="pl-10" />
          </div>
          <Select className="w-44">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="ready">Ready</option>
            <option value="done">Done</option>
          </Select>
          <Input type="date" className="w-44" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="p-6">
            <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
            {kpi.badge ? (
              <Badge variant={kpi.badge} className="mt-2">{kpi.badgeText}</Badge>
            ) : (
              <p className="text-sm text-gray-500 mt-2">{kpi.subtitle}</p>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Receipts</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Reference</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Vendor</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Scheduled Date</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Products</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Total Qty</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{receipt.id}</p>
                      <p className="text-sm text-gray-500">Created: {receipt.created}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{receipt.vendor}</p>
                      <p className="text-sm text-gray-500">{receipt.email}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{receipt.date}</td>
                    <td className="py-4 px-6 text-gray-600">{receipt.products} items</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold">{receipt.qty}</span> units
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(receipt.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        {receipt.status === 'ready' && <Button size="sm">Process</Button>}
                        {receipt.status === 'draft' && <Button variant="outline" size="sm">Edit</Button>}
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center py-4">
          <p className="text-sm text-gray-500">Showing 1-4 of 156 receipts</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Receipts;
