import { useState, useEffect } from 'react';
import { X, Package, TrendingUp, TrendingDown, RefreshCw, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

const StockMovementModal = ({ isOpen, onClose, product }) => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isOpen && product) {
      fetchMovements();
    }
  }, [isOpen, product, filter]);

  const fetchMovements = async () => {
    setLoading(true);
    try {
      const params = {
        product_id: product.product_id,
        warehouse_id: product.warehouse_id,
        limit: 50
      };
      if (filter !== 'all') {
        params.movement_type = filter;
      }

      const response = await axios.get('http://localhost:5000/api/inventory/movements', { params });
      setMovements(response.data);
    } catch (error) {
      console.error('Error fetching movements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  const getMovementIcon = (type, change) => {
    if (type === 'receipt' || change > 0) {
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    }
    return <TrendingDown className="w-5 h-5 text-red-600" />;
  };

  const getMovementBadge = (type) => {
    const badges = {
      receipt: { variant: 'success', label: 'Receipt' },
      delivery: { variant: 'danger', label: 'Delivery' },
      adjustment: { variant: 'warning', label: 'Adjustment' },
      transfer: { variant: 'default', label: 'Transfer' }
    };
    const { variant, label } = badges[type] || badges.adjustment;
    return <Badge variant={variant}>{label}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Stock Movement History</h2>
              <p className="text-sm text-gray-500 mt-1">
                {product.product_name} - {product.warehouse_name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Stock Info */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Current Stock</p>
              <p className="font-semibold text-gray-900 text-lg">{product.quantity} {product.uom}</p>
            </div>
            <div>
              <p className="text-gray-500">Reserved</p>
              <p className="font-semibold text-gray-900 text-lg">{product.reserved_quantity}</p>
            </div>
            <div>
              <p className="text-gray-500">Available</p>
              <p className="font-semibold text-blue-600 text-lg">{product.available_quantity}</p>
            </div>
            <div>
              <p className="text-gray-500">Stock Value</p>
              <p className="font-semibold text-gray-900 text-lg">
                ₹{(product.stock_value || 0).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 border-b bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('receipt')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === 'receipt'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Receipts
            </button>
            <button
              onClick={() => setFilter('delivery')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === 'delivery'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Deliveries
            </button>
            <button
              onClick={() => setFilter('adjustment')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === 'adjustment'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Adjustments
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchMovements}
              className="ml-auto"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Movements List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : movements.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No movements found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {movements.map((movement, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getMovementIcon(movement.movement_type, movement.quantity_change)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getMovementBadge(movement.movement_type)}
                        {movement.reference_number && (
                          <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {movement.reference_number}
                          </code>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <div>
                          <p className="text-sm text-gray-500">Quantity Change</p>
                          <p className={`font-semibold ${
                            movement.quantity_change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {movement.quantity_change > 0 ? '+' : ''}
                            {movement.quantity_change} {product.uom}
                          </p>
                        </div>
                        
                        {movement.party_name && (
                          <div>
                            <p className="text-sm text-gray-500">
                              {movement.movement_type === 'receipt' ? 'Supplier' : 
                               movement.movement_type === 'delivery' ? 'Customer' : 'Reason'}
                            </p>
                            <p className="font-medium text-gray-900">{movement.party_name}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(movement.transaction_date)}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Warehouse</p>
                          <p className="text-sm font-medium text-gray-900">{movement.warehouse_name}</p>
                        </div>
                      </div>
                      
                      {movement.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                          <p className="font-medium text-gray-700 mb-1">Notes:</p>
                          {movement.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {movements.length} movement{movements.length !== 1 ? 's' : ''}
            </p>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMovementModal;
