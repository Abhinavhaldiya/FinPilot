import { useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Receipt, 
  CheckCircle, 
  DollarSign, 
  Settings, 
  Bell, 
  User,
  Menu,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/custom/Button";
import { Badge } from "@/components/custom/Badge";

// Mock user roles for role switching
const userRoles = [
  { id: 'employee', name: 'Employee', color: 'bg-accent' },
  { id: 'manager', name: 'Manager', color: 'bg-warning' },
  { id: 'finance', name: 'Finance', color: 'bg-success' },
];

interface NavItem {
  title: string;
  url: string;
  icon: any;
  badge?: number;
}

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentRole, setCurrentRole] = useState(userRoles[0]);
  const location = useLocation();

  // Navigation items based on current role
  const getNavItems = (): NavItem[] => {
    const baseItems = [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Claims", url: "/claims", icon: Receipt, badge: 3 },
    ];

    if (currentRole.id === 'manager') {
      baseItems.push(
        { title: "Approvals", url: "/approvals", icon: CheckCircle, badge: 5 }
      );
    }

    if (currentRole.id === 'finance') {
      baseItems.push(
        { title: "Payments", url: "/payments", icon: DollarSign, badge: 2 }
      );
    }

    baseItems.push({ title: "Settings", url: "/settings", icon: Settings });
    return baseItems;
  };

  const navItems = getNavItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-card border-r border-border transition-smooth flex flex-col`}
      >
        {/* Logo & Brand */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-xl font-bold gradient-bg bg-clip-text text-transparent">
                  FinPilot
                </h1>
                <p className="text-xs text-muted-foreground">Enterprise Finance</p>
              </div>
            )}
          </div>
        </div>

        {/* Role Selector */}
        {isSidebarOpen && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
              <div className={`w-2 h-2 rounded-full ${currentRole.color}`} />
              <span className="text-sm">{currentRole.name}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.url}>
                  <NavLink
                    to={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth ${
                      isActive(item.url)
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {isSidebarOpen && (
                      <>
                        <span className="text-sm font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div>
              <h2 className="text-lg font-semibold">Good morning, Alex</h2>
              <p className="text-sm text-muted-foreground">
                {currentRole.name} Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm">Alex Johnson</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;