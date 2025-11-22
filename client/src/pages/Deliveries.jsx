import { Plus, Search, Download, Settings, RefreshCw, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Deliveries = () => {
  const kpiData = [
    { label: 'Total Deliveries', value: '234', subtitle: 'This month' },
    { label: 'Ready to Ship', value: '18', badge: 'warning', badgeText: 'Awaiting pickup' },
    { label: 'In Transit', value: '32', badge: 'info', badgeText: 'On the way' },
    { label: 'Delivered Today', value: '15', badge: 'success', badgeText: '+5 from yesterday' },
  ];

  const deliveries = [
    { id: 'DEL-2145', customer: 'Tech Solutions Inc.', email: 'tech@solutions.com', date: 'Nov 23, 2025', created: 'Nov 22, 2025', products: 4, qty: 180, status: 'ready' },
    { id: 'DEL-2144', customer: 'Global Manufacturing Ltd.', email: 'orders@globalman.com', date: 'Nov 22, 2025', created: 'Nov 21, 2025', products: 6, qty: 320, status: 'shipped' },
    { id: 'DEL-2143', customer: 'Retail Stores Corp.', email: 'purchasing@retail.com', date: 'Nov 21, 2025', created: 'Nov 21, 2025', products: 3, qty: 95, status: 'delivered' },
    { id: 'DEL-2142', customer: 'Industrial Parts Co.', email: 'sales@indparts.com', date: 'Nov 24, 2025', created: 'Nov 20, 2025', products: 8, qty: 450, status: 'draft' },
  ];

  const getStatusBadge = (status) => {
    const variants = { delivered: 'success', shipped: 'info', ready: 'warning', draft: 'draft' };
    return <Badge variant={variants[status]}>{status === 'ready' ? 'Ready to Ship' : status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deliveries</h1>
          <p className="text-gray-500 mt-1">Manage outgoing shipments and customer orders</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Create Delivery
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search by reference or customer..." className="pl-10" />
          </div>
          <Select className="w-44">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="ready">Ready to Ship</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
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
          <CardTitle>All Deliveries</CardTitle>
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
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Customer</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Ship Date</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Products</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Total Qty</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{delivery.id}</p>
                      <p className="text-sm text-gray-500">Created: {delivery.created}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{delivery.customer}</p>
                      <p className="text-sm text-gray-500">{delivery.email}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{delivery.date}</td>
                    <td className="py-4 px-6 text-gray-600">{delivery.products} items</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold">{delivery.qty}</span> units
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(delivery.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        {delivery.status === 'ready' && <Button size="sm">Ship</Button>}
                        {delivery.status === 'shipped' && <Button variant="outline" size="sm">Track</Button>}
                        {delivery.status === 'draft' && <Button variant="outline" size="sm">Edit</Button>}
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
          <p className="text-sm text-gray-500">Showing 1-4 of 234 deliveries</p>
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

export default Deliveries;
