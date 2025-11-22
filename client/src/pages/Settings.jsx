import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic application configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <Input defaultValue="StockMaster Inc." placeholder="Enter company name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
              <Select defaultValue="USD">
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="INR">INR - Indian Rupee (₹)</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <Select defaultValue="EST">
                <option value="UTC">UTC - Coordinated Universal Time</option>
                <option value="EST">EST - Eastern Standard Time</option>
                <option value="PST">PST - Pacific Standard Time</option>
                <option value="IST">IST - Indian Standard Time</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <Select defaultValue="en">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save General Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <Input defaultValue="John Doe" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <Input type="email" defaultValue="john.doe@stockmaster.com" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Input type="tel" defaultValue="+1 (555) 123-4567" placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <Select defaultValue="operations">
                <option value="operations">Operations</option>
                <option value="logistics">Logistics</option>
                <option value="warehouse">Warehouse</option>
                <option value="management">Management</option>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Profile</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Settings</CardTitle>
          <CardDescription>Configure stock management rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Low Stock Threshold (%)</label>
              <Input type="number" defaultValue="20" min="0" max="100" />
              <p className="text-sm text-gray-500 mt-1">Alert when stock falls below this percentage</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Reorder Point</label>
              <Input type="number" defaultValue="25" min="0" />
              <p className="text-sm text-gray-500 mt-1">Default units for reorder trigger</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Lead Time (Days)</label>
              <Input type="number" defaultValue="7" min="0" />
              <p className="text-sm text-gray-500 mt-1">Average supplier delivery time</p>
            </div>
          </div>

          <hr className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700">Enable Low Stock Alerts</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700">Auto-Generate SKU Codes</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700">Track Serial Numbers</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700">Enable Batch/Lot Tracking</span>
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Inventory Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Email Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Low stock alerts</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">New receipt notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Delivery status updates</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Daily summary reports</span>
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">In-App Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">System alerts</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Approval requests</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Task assignments</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Product updates</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Notification Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
          <CardDescription>Manage your security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
            <Input type="password" placeholder="Current password" className="mb-2" />
            <Input type="password" placeholder="New password" className="mb-2" />
            <Input type="password" placeholder="Confirm new password" />
          </div>
          <hr className="my-6" />
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication (2FA)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700">Session Timeout (Auto-logout after 30 minutes)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-700">Login Activity Monitoring</span>
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Login History</Button>
          <Button>Update Security Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
