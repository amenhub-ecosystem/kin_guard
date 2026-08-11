// components/Dashboard/DashboardSidebar.tsx
import React from 'react';
import { DashboardNavItem } from './DashboardNavItem';
import { LogoWithTextNoBg } from '@/components/common/LogoWithTextNoBg';

// TODO: Verify exact icon names and imports from your existing icon library.
// I've used the names you provided in your example snippet, but adjusted to valid component names.
import {
  House,      // Dashboard
  Users,      // Care Circle
  Pills,      // Medication
  CheckCircle,// Check-ins
  Chart,      // Insights
  Chat,       // Messages
  Alert,      // Emergency Center
  Gear,       // Settings
} from '@/components/common/icons';

export const DashboardSidebar: React.FC = () => {
  const mainNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <House size={18} color="#FFFFFFB2" />, end: true },
    { to: '/dashboard/care-circle', label: 'Care Circle', icon: <Users size={18} color="#FFFFFFB2" /> },
    { to: '/dashboard/medication', label: 'Medication', icon: <Pills size={18} color="#FFFFFFB2" /> },
    { to: '/dashboard/check-ins', label: 'Check-ins', icon: <CheckCircle size={18} color="#FFFFFFB2" /> },
    { to: '/dashboard/insights', label: 'Insights', icon: <Chart size={18} color="#FFFFFFB2" /> },
    { to: '/dashboard/messages', label: 'Messages', icon: <Chat size={18} color="#FFFFFFB2" /> },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex flex-col justify-between w-[280px] h-screen bg-[#003665] p-6 overflow-hidden">
      
      {/* Top Section: Logo & Main Navigation */}
      <div className="flex flex-col gap-10 w-full">
        {/* Logo Area using the existing project component */}
        <div className="mb-10">
          <LogoWithTextNoBg variant="light" />
        </div>

        {/* Main Nav List */}
        <nav className="flex flex-col gap-1 w-full">
          {mainNavItems.map((item) => (
            <DashboardNavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              end={item.end}
            />
          ))}
        </nav>
      </div>

      {/* Bottom Section: Emergency & Settings */}
      <div className="flex flex-col gap-1 w-full pt-6 border-t border-white/10">
        <DashboardNavItem
          to="/dashboard/emergency-center"
          label="Emergency Center"
          // Custom icon color and text color for the emergency item
          icon={<Alert size={18} color="#FE706D" />}
          className="text-[#FE706D] hover:text-[#FE706D]/80"
        />
        <DashboardNavItem
          to="/dashboard/settings"
          label="Settings"
          icon={<Gear size={18} />}
        />
      </div>
      
    </aside>
  );
};