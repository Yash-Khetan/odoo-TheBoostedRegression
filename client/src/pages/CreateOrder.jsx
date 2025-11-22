import { ArrowLeft, Plus, Save, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const CreateOrder = () => {
  return (
    <div className="space-y-6">
      <Link to="/receipts" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Receipts
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Receipt</h1>
          <p className="text-gray-500 mt-1">Record incoming inventory from vendor</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="outline">Save as Draft</Button>
          <Button>Validate & Complete</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type *</label>
              <Select defaultValue="receipt">
                <option value="">Select operation type...</option>
                <option value="receipt">Receipt (Incoming)</option>
                <option value="delivery">Delivery (Outgoing)</option>
                <option value="internal">Internal Transfer</option>
                <option value="adjustment">Stock Adjustment</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reference Code *</label>
              <Input defaultValue="REC-1046" placeholder="e.g., REC-1046" />
              <p className="text-sm text-gray-500 mt-1">Auto-generated if left empty</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vendor / Partner *</label>
              <Select>
                <option value="">Select vendor...</option>
                <option value="acme">Acme Supplies Co.</option>
                <option value="global">Global Electronics Ltd.</option>
                <option value="premium">Premium Parts Inc.</option>
                <option value="industrial">Industrial Components Co.</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date *</label>
              <Input type="date" defaultValue="2025-11-25" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Location *</label>
              <Select defaultValue="main">
                <option value="">Select warehouse...</option>
                <option value="main">Main Warehouse</option>
                <option value="distribution">Distribution Center</option>
                <option value="retail1">Retail Store #1</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select defaultValue="draft">
                <option value="draft">Draft</option>
                <option value="ready">Ready</option>
                <option value="done">Done</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea 
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[#73A97F]"
              rows={3}
              placeholder="Add any additional notes or special instructions..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order Lines</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4" />
            Add Line
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Quantity</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Unit Price</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Subtotal</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6">
                    <Select defaultValue="wid-a-001">
                      <option value="">Select product...</option>
                      <option value="wid-a-001">Widget A Pro (WID-A-001)</option>
                      <option value="cmp-xyz-045">Component XYZ (CMP-XYZ-045)</option>
                      <option value="raw-123">Raw Material 123 (RAW-123)</option>
                    </Select>
                  </td>
                  <td className="py-4 px-6">
                    <Input type="number" defaultValue="50" min="1" className="w-24" />
                  </td>
                  <td className="py-4 px-6">
                    <Input type="number" defaultValue="45.00" step="0.01" className="w-28" />
                  </td>
                  <td className="py-4 px-6 font-semibold">$2,250.00</td>
                  <td className="py-4 px-6">
                    <Button variant="outline" size="sm" className="text-red-600">Remove</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">
                    <Select defaultValue="cmp-xyz-045">
                      <option value="">Select product...</option>
                      <option value="wid-a-001">Widget A Pro (WID-A-001)</option>
                      <option value="cmp-xyz-045">Component XYZ (CMP-XYZ-045)</option>
                      <option value="raw-123">Raw Material 123 (RAW-123)</option>
                    </Select>
                  </td>
                  <td className="py-4 px-6">
                    <Input type="number" defaultValue="100" min="1" className="w-24" />
                  </td>
                  <td className="py-4 px-6">
                    <Input type="number" defaultValue="12.50" step="0.01" className="w-28" />
                  </td>
                  <td className="py-4 px-6 font-semibold">$1,250.00</td>
                  <td className="py-4 px-6">
                    <Button variant="outline" size="sm" className="text-red-600">Remove</Button>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan="5" className="py-6 text-center">
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                      Add Another Product Line
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="space-y-2 min-w-[300px]">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Items:</span>
              <strong>2</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Quantity:</span>
              <strong>150 units</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal:</span>
              <strong>$3,500.00</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax (10%):</span>
              <strong>$350.00</strong>
            </div>
            <div className="flex justify-between pt-3 border-t-2">
              <span className="text-lg font-semibold">Total:</span>
              <strong className="text-2xl text-[#73A97F]">$3,850.00</strong>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" size="lg">Cancel</Button>
        <Button variant="outline" size="lg">
          <Save className="w-4 h-4" />
          Save as Draft
        </Button>
        <Button size="lg">
          <Check className="w-4 h-4" />
          Validate & Complete
        </Button>
      </div>

      <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900">Note:</p>
          <p className="text-sm text-blue-800">
            When you validate and complete this receipt, the inventory levels will be automatically updated for all products in the order lines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
