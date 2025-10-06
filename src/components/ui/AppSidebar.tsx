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
  FileText,
  CreditCard
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: BarChart3 },
  { title: 'Home', url: '/old-index', icon: Home },
  { title: 'Pipeline Designer', url: '/pipeline-designer', icon: GitBranch },
  { title: 'Pipeline Data', url: '/pipeline-data', icon: BarChart3 },
  { title: 'Jobs', url: '/jobs', icon: Briefcase },
  { title: 'Transaction Flow', url: '/transaction-flow', icon: ArrowRightLeft },
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'Payments Overview', url: '/payments-overview', icon: CreditCard },
  { title: 'Merchants', url: '/merchants', icon: Building2 },
  { title: 'Login', url: '/login', icon: LogIn },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full justify-center p-3 transition-colors";
    return isActive(path) 
      ? `${baseClasses} bg-primary text-primary-foreground` 
      : `${baseClasses} hover:bg-muted`;
  };

  return (
    <Sidebar className="w-[5%] min-w-[60px] border-r bg-background">
      <SidebarContent className="flex-1 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                      title={item.title}
                    >
                      <item.icon className="h-5 w-5" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}