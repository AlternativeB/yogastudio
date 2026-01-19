import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  UserCheck,
  ClipboardList,
  UserPlus,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Attendance", href: "/attendance", icon: ClipboardList },
  { name: "Instructors", href: "/instructors", icon: UserCheck },
  { name: "Trial Clients", href: "/trials", icon: UserPlus },
  { name: "Aggregators", href: "/aggregators", icon: Building2 },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-sage flex items-center justify-center">
            <span className="text-xl">🧘</span>
          </div>
          <div>
            <h1 className="font-serif text-lg font-medium text-sidebar-foreground">
              Serenity
            </h1>
            <p className="text-xs text-muted-foreground">Yoga Studio</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn("nav-item", isActive && "nav-item-active")}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn("nav-item", isActive && "nav-item-active")}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
        <button className="nav-item w-full text-destructive hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Admin User
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
