import { Download, RefreshCw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Reports = () => {
  const reportCategories = [
    {
      title: 'Inventory Reports',
      description: 'Stock levels and valuation',
      reports: [
        { title: 'Stock Valuation Report', desc: 'Current inventory value by category' },
        { title: 'Low Stock Report', desc: 'Items below minimum threshold' },
        { title: 'Stock Movement Report', desc: 'All inventory transactions' },
        { title: 'Aging Report', desc: 'Inventory age analysis' },
      ],
    },
    {
      title: 'Operations Reports',
      description: 'Receipts and deliveries',
      reports: [
        { title: 'Receipt Summary', desc: 'Incoming shipments overview' },
        { title: 'Delivery Summary', desc: 'Outgoing shipments overview' },
        { title: 'Vendor Performance', desc: 'Supplier reliability metrics' },
        { title: 'Customer Orders', desc: 'Order fulfillment analysis' },
      ],
    },
    {
      title: 'Financial Reports',
      description: 'Cost and revenue analysis',
      reports: [
        { title: 'Cost Analysis', desc: 'Inventory cost breakdown' },
        { title: 'Profit Margins', desc: 'Product profitability' },
        { title: 'Purchase Order Report', desc: 'PO summary and status' },
        { title: 'Sales Order Report', desc: 'SO summary and revenue' },
      ],
    },
  ];

  const topProducts = [
    { rank: 1, name: 'Finished Product Alpha', sku: 'FIN-ALPHA-01', category: 'Finished Goods', units: 450, revenue: '$67,500', trend: '+25%' },
    { rank: 2, name: 'Widget A Pro', sku: 'WID-A-001', category: 'Electronics', units: 380, revenue: '$17,100', trend: '+18%' },
    { rank: 3, name: 'Component Beta', sku: 'CMP-BETA-007', category: 'Components', units: 320, revenue: '$9,600', trend: '+12%' },
    { rank: 4, name: 'Packaging Box Standard', sku: 'PKG-BOX-STD', category: 'Packaging', units: 280, revenue: '$5,600', trend: '0%' },
    { rank: 5, name: 'Electronic Board V2', sku: 'PCB-V2-034', category: 'Electronics', units: 240, revenue: '$14,400', trend: '+8%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Inventory insights and performance metrics</p>
        </div>
        <Button>
          <Download className="w-4 h-4" />
          Export All Reports
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Select className="w-48">
          <option value="month">This Month</option>
          <option value="week">This Week</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </Select>
        <Input type="date" className="w-44" defaultValue="2025-11-01" />
        <span className="text-gray-500">to</span>
        <Input type="date" className="w-44" defaultValue="2025-11-22" />
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reportCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.reports.map((report, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{report.title}</p>
                    <p className="text-sm text-gray-500">{report.desc}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Summary - November 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#73A97F]">$456,789</p>
              <p className="text-sm text-gray-500 mt-1">Total Inventory Value</p>
              <Badge variant="success" className="mt-2">+8.2%</Badge>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#73A97F]">1,234</p>
              <p className="text-sm text-gray-500 mt-1">Total Products</p>
              <Badge variant="success" className="mt-2">+12%</Badge>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#D98C73]">156</p>
              <p className="text-sm text-gray-500 mt-1">Receipts Processed</p>
              <Badge variant="warning" className="mt-2">+5%</Badge>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#D98C73]">234</p>
              <p className="text-sm text-gray-500 mt-1">Deliveries Completed</p>
              <Badge variant="success" className="mt-2">+18%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Moving Products - This Month</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Rank</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Units Moved</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Revenue</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.rank} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-6 font-bold">#{product.rank}</td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sku}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{product.category}</td>
                    <td className="py-4 px-6 font-semibold">{product.units} units</td>
                    <td className="py-4 px-6 font-semibold">{product.revenue}</td>
                    <td className="py-4 px-6">
                      <Badge variant={product.trend.includes('+') ? 'success' : 'warning'}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {product.trend}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
