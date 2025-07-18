import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: window.location.pathname === "/dashboard"
    },
    {
      title: "Plans",
      icon: Star,
      href: "/plans",
      active: window.location.pathname === "/plans"
    },
    {
      title: "Available Surveys",
      icon: FileText,
      href: "/surveys",
      badge: "12",
      active: window.location.pathname === "/surveys"
    },
    {
      title: "My Earnings",
      icon: DollarSign,
      href: "/earnings",
      active: window.location.pathname === "/earnings"
    },
    {
      title: "Referrals",
      icon: Users,
      href: "/referrals",
      badge: "3",
      active: window.location.pathname === "/referrals"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      active: window.location.pathname === "/settings"
    }
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">
                SurveyEarn
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-muted"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border bg-gradient-secondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
              SJ
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
          </div>
          <div className="mt-3 p-2 bg-card/50 rounded-lg">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">This Month</span>
              <span className="font-semibold text-primary">KSh 2,450</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  item.active && "bg-gradient-primary text-white shadow-soft",
                  isCollapsed && "justify-center px-0"
                )}
                onClick={() => window.location.href = item.href}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;