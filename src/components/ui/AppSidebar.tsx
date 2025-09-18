import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  GitBranch, 
  Briefcase, 
  ArrowRightLeft, 
  Building2, 
  LogIn,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: BarChart3 },
  { title: 'Home', url: '/old-index', icon: Home },
  { title: 'Pipeline Designer', url: '/pipeline-designer', icon: GitBranch },
  { title: 'Pipeline Data', url: '/pipeline-data', icon: BarChart3 },
  { title: 'Jobs', url: '/jobs', icon: Briefcase },
  { title: 'Transaction Flow', url: '/transaction-flow', icon: ArrowRightLeft },
  { title: 'Merchants', url: '/merchants', icon: Building2 },
  { title: 'Login', url: '/login', icon: LogIn },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full justify-start transition-colors";
    return isActive(path) 
      ? `${baseClasses} bg-primary text-primary-foreground` 
      : `${baseClasses} hover:bg-muted`;
  };

  return (
    <Sidebar
      className={`border-r bg-background transition-all duration-300 ${
        collapsed ? 'w-14' : 'w-[10%] min-w-[200px]'
      }`}
      collapsible="icon"
    >
      <div className="flex h-full flex-col">
        {/* Header with toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={getNavClassName(item.url)}
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="ml-3 truncate">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}