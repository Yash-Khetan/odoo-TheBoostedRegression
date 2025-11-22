import { useState, useEffect } from 'react';
import { Package, Warehouse, AlertTriangle, TrendingUp, Search, Filter, Download, Plus, History, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import StockAdjustmentModal from '@/components/StockAdjustmentModal';
import StockMovementModal from '@/components/StockMovementModal';
import axios from 'axios';

const Stocks = () => {
  const [stockData, setStockData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedWarehouse, selectedCategory, selectedStatus]);

  const fetchInitialData = async () => {
    try {
      const [warehousesRes, productsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/warehouses'),
        axios.get('http://localhost:5000/api/products')
      ]);
      
      setWarehouses(warehousesRes.data);
      
      // Extract unique categories from products
      const uniqueCategories = [...new Set(productsRes.data.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedWarehouse) params.warehouse_id = selectedWarehouse;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedStatus) params.status = selectedStatus;

      const [stockRes, statsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/inventory', { params }),
        axios.get('http://localhost:5000/api/inventory/statistics')
      ]);

      setStockData(stockRes.data);
      setStatistics(statsRes.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      out_of_stock: { variant: 'danger', label: 'Out of Stock' },
      low_stock: { variant: 'warning', label: 'Low Stock' },
      in_stock: { variant: 'success', label: 'In Stock' }
    };
    const { variant, label } = variants[status] || variants.in_stock;
    return <Badge variant={variant}>{label}</Badge>;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const filteredStock = stockData.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdjustment = (product) => {
    setSelectedProduct(product);
    setShowAdjustmentModal(true);
  };

  const handleViewMovements = (product) => {
    setSelectedProduct(product);
    setShowMovementModal(true);
  };

  const handleExport = () => {
    // Convert filtered stock data to CSV
    const csvData = filteredStock.map(item => ({
      'Product Name': item.product_name,
      'SKU': item.sku,
      'Category': item.category,
      'Warehouse': item.warehouse_name,
      'Location': item.location,
      'On Hand': item.quantity,
      'Reserved': item.reserved_quantity,
      'Available': item.available_quantity,
      'Reorder Level': item.reorder_level,
      'Unit': item.uom,
      'Unit Price': item.unit_price,
      'Stock Value': item.stock_value,
      'Status': item.stock_status === 'out_of_stock' ? 'Out of Stock' : 
                item.stock_status === 'low_stock' ? 'Low Stock' : 'In Stock',
      'Last Updated': new Date(item.last_updated).toLocaleString('en-IN')
    }));

    // Create CSV content
    const headers = Object.keys(csvData[0] || {});
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in values
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `stock_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Levels</h1>
          <p className="text-gray-500 mt-1">Monitor and manage inventory across all warehouses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Stock Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(statistics.total_stock_value || 0)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">In Stock</p>
                  <p className="text-2xl font-bold text-green-600">
                    {statistics.in_stock_count || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Products</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Low Stock</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {statistics.low_stock_count || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Need Reorder</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">
                    {statistics.out_of_stock_count || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Urgent Action</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <Warehouse className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by product name or SKU..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="w-full lg:w-48"
            >
              <option value="">All Warehouses</option>
              {warehouses.map(warehouse => (
                <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </Select>

            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full lg:w-48"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>

            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full lg:w-48"
            >
              <option value="">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </Select>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExport}
              disabled={filteredStock.length === 0}
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">SKU</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Warehouse</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">On Hand</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Reserved</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Available</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Reorder Level</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Value</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-8 text-gray-500">
                      No stock data found
                    </td>
                  </tr>
                ) : (
                  filteredStock.map((item) => (
                    <tr key={`${item.product_id}-${item.warehouse_id}`} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{item.product_name}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{item.warehouse_name}</p>
                          <p className="text-xs text-gray-500">{item.location}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900">{item.quantity}</span>
                        <span className="text-gray-500 text-sm"> {item.uom}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600">{item.reserved_quantity}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-blue-600">{item.available_quantity}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{item.reorder_level}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {formatCurrency(item.stock_value || 0)}
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(item.stock_status)}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAdjustment(item)}
                          >
                            Adjust
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewMovements(item)}
                          >
                            <History className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <StockAdjustmentModal
        isOpen={showAdjustmentModal}
        onClose={() => setShowAdjustmentModal(false)}
        product={selectedProduct}
        onSuccess={fetchData}
      />

      <StockMovementModal
        isOpen={showMovementModal}
        onClose={() => setShowMovementModal(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Stocks;
