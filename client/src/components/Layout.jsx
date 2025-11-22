import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Inbox, 
  Send, 
  TrendingUp, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/receipts', icon: Inbox, label: 'Receipts' },
    { path: '/deliveries', icon: Send, label: 'Deliveries' },
    { path: '/reports', icon: TrendingUp, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-[260px] bg-white border-r h-screen fixed left-0 top-0 overflow-y-auto" style={{ borderColor: 'var(--border-color)' }}>
      <div className="p-8 pb-6">
        <div className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          <Package className="w-6 h-6" style={{ color: 'var(--accent-green)' }} />
          StockMaster
        </div>
      </div>
      
      <nav className="px-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path === '/dashboard' && location.pathname === '/');
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-medium ${
                    isActive
                      ? 'font-semibold'
                      : ''
                  }`}
                  style={isActive ? {
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  } : {
                    color: 'var(--text-secondary)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

const Layout = () => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main className="flex-1 ml-[260px] p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
