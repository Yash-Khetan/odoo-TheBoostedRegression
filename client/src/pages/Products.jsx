import { Plus, Search, Download, Settings, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Products = () => {
  const products = [
    { id: '1', name: 'Widget A Pro', sku: 'WID-A-001', category: 'Electronics', stock: 5, min: 20, unit: 'Units', status: 'low' },
    { id: '2', name: 'Component XYZ', sku: 'CMP-XYZ-045', category: 'Components', stock: 0, min: 50, unit: 'Units', status: 'out' },
    { id: '3', name: 'Raw Material 123', sku: 'RAW-123', category: 'Raw Materials', stock: 15, min: 100, unit: 'KG', status: 'low' },
    { id: '4', name: 'Packaging Box Standard', sku: 'PKG-BOX-STD', category: 'Packaging', stock: 450, min: 200, unit: 'Units', status: 'ok' },
    { id: '5', name: 'Finished Product Alpha', sku: 'FIN-ALPHA-01', category: 'Finished Goods', stock: 120, min: 50, unit: 'Units', status: 'ok' },
    { id: '6', name: 'Component Beta', sku: 'CMP-BETA-007', category: 'Components', stock: 89, min: 30, unit: 'Units', status: 'ok' },
    { id: '7', name: 'Spare Parts Kit', sku: 'SPR-KIT-001', category: 'Components', stock: 8, min: 30, unit: 'Kits', status: 'low' },
    { id: '8', name: 'Electronic Board V2', sku: 'PCB-V2-034', category: 'Electronics', stock: 67, min: 40, unit: 'Units', status: 'ok' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'out') return <Badge variant="danger">Out of Stock</Badge>;
    if (status === 'low') return <Badge variant="warning">Low Stock</Badge>;
    return <Badge variant="success">In Stock</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your inventory catalog</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Create Product
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search products by name or SKU..." 
              className="pl-10"
            />
          </div>
          <Select className="w-48">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="components">Components</option>
            <option value="raw-materials">Raw Materials</option>
            <option value="packaging">Packaging</option>
            <option value="finished-goods">Finished Goods</option>
          </Select>
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

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Product Name</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">SKU</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Current Stock</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Unit</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">High-performance widget</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{product.sku}</code>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{product.category}</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold">{product.stock}</span>
                      <span className="text-gray-500"> / {product.min} min</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{product.unit}</td>
                    <td className="py-4 px-6">{getStatusBadge(product.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Link to={`/products/${product.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                        <Button variant="outline" size="sm">Edit</Button>
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
          <p className="text-sm text-gray-500">Showing 1-8 of 234 products</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Products;
