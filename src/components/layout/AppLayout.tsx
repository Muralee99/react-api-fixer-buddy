import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/AppSidebar';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  title?: string;
}

export function AppLayout({ children, showSidebar = true, title }: AppLayoutProps) {
  if (!showSidebar) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="h-[15vh]">
          <Header title={title} />
        </div>
        <main className="h-[80vh] overflow-auto">
          {children}
        </main>
        <div className="h-[5vh]">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col ml-3">
          <div className="h-[15vh]">
            <Header title={title} />
          </div>
          <main className="h-[80vh] overflow-auto">
            {children}
          </main>
          <div className="h-[5vh]">
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}