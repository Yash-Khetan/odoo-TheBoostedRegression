import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import axios from 'axios';

const StockAdjustmentModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [formData, setFormData] = useState({
    quantity_change: '',
    reason: 'correction',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const adjustmentData = {
        product_id: product.product_id,
        warehouse_id: product.warehouse_id,
        quantity_change: parseInt(formData.quantity_change),
        reason: formData.reason,
        notes: formData.notes,
        created_by: 1 // TODO: Get from auth context
      };

      await axios.post('http://localhost:5000/api/inventory/adjustment', adjustmentData);
      
      onSuccess && onSuccess();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create adjustment');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ quantity_change: '', reason: 'correction', notes: '' });
    setError('');
    onClose();
  };

  // Handle both quantity and quantity_on_hand (database may use either)
  const currentQuantity = product.quantity_on_hand ?? product.quantity ?? 0;
  const newQuantity = currentQuantity + parseInt(formData.quantity_change || 0);
  const isNegative = newQuantity < 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Stock Adjustment</h2>
            <p className="text-sm text-gray-500 mt-1">
              {product.product_name} - {product.warehouse_name}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Stock Info */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Current Stock</p>
              <p className="font-semibold text-gray-900">{currentQuantity} {product.uom}</p>
            </div>
            <div>
              <p className="text-gray-500">Reserved</p>
              <p className="font-semibold text-gray-900">{product.reserved_quantity || 0}</p>
            </div>
            <div>
              <p className="text-gray-500">Available</p>
              <p className="font-semibold text-blue-600">{product.available_quantity || currentQuantity}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Quantity Change */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Change
              </label>
              <Input
                type="number"
                required
                placeholder="Enter positive or negative value"
                value={formData.quantity_change}
                onChange={(e) => setFormData({ ...formData, quantity_change: e.target.value })}
                className={isNegative ? 'border-red-300' : ''}
              />
              <p className="text-xs text-gray-500 mt-1">
                Use positive numbers to add stock, negative to reduce
              </p>
              {formData.quantity_change && (
                <p className={`text-sm mt-2 font-medium ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
                  New quantity will be: {newQuantity} {product.uom}
                  {isNegative && ' (Invalid - cannot be negative)'}
                </p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <Select
                required
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              >
                <option value="correction">Inventory Correction</option>
                <option value="damaged">Damaged Goods</option>
                <option value="lost">Lost/Stolen</option>
                <option value="found">Found During Audit</option>
                <option value="expired">Expired/Obsolete</option>
                <option value="other">Other</option>
              </Select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any additional details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || isNegative}
            >
              {loading ? 'Processing...' : 'Confirm Adjustment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;
