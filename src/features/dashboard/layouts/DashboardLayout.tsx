// components/Dashboard/DashboardLayout.tsx
import React from 'react';

// Exact imports as requested
import { DashboardSidebar } from "@/features/dashboard/components/navigation/DashboardSidebar";
import { DashboardTopbar } from "@/features/dashboard/components/navigation/DashboardTopbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
      
      {/* Left Sidebar - Fixed width */}
      <DashboardSidebar />
      
      {/* Main Content Area (offset by sidebar width) */}
      <div className="flex-1 flex flex-col ml-[280px] h-full">
        
        {/* Top Navigation Bar */}
        <DashboardTopbar />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
        
      </div>
    </div>
  );
};