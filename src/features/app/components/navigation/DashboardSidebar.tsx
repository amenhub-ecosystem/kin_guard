// components/Dashboard/DashboardSidebar.tsx
import React from 'react';
import { DashboardNavItem } from './DashboardNavItem';
import { LogoWithTextNoBg } from '@/components/common/LogoWithTextNoBg';
import { useMockUser } from '@/features/app/rbac/MockUserContext';
import { getSidebarNavigationForRole } from '@/features/app/rbac/sidebar';
import {
  House,
  Users,
  Pills,
  CheckCircle,
  Chart,
  Chat,
  Alert,
  Gear,
  HeartThrob,
  User,
} from '@/components/common/icons';

const iconMap: Record<string, React.ComponentType<{ size?: number | string; color?: string }>> = {
  House,
  Users,
  Pills,
  CheckCircle,
  Chart,
  Chat,
  Alert,
  Gear,
  HeartThrob,
  User,
};

export const DashboardSidebar: React.FC = () => {
  const { user } = useMockUser();
  const sidebarItems = getSidebarNavigationForRole(user.role);
  const mainItems = sidebarItems.filter((item) => item.section !== 'bottom');
  const bottomItems = sidebarItems.filter((item) => item.section === 'bottom');

  const renderIcon = (iconKey: string, isEmergency: boolean) => {
    const IconComponent = iconMap[iconKey] ?? House;
    return <IconComponent size={18} color={isEmergency ? '#FE706D' : '#FFFFFFB2'} />;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex flex-col justify-between w-[280px] h-screen bg-[#003665] p-6 overflow-hidden">
      <div className="flex flex-col gap-10 w-full flex-1">
        <div className="mb-10">
          <LogoWithTextNoBg variant="light" />
        </div>

        <nav className="flex flex-col gap-1 w-full">
          {mainItems.map((item) => {
            const isEmergency = item.label === 'Emergency Center';
            return (
              <DashboardNavItem
                key={item.path}
                to={item.path}
                label={item.label}
                icon={renderIcon(item.icon, isEmergency)}
                end={item.path === '/dashboard'}
                className={isEmergency ? 'text-[#FE706D] hover:text-[#FE706D] hover:bg-transparent' : undefined}
              />
            );
          })}
        </nav>
      </div>

      {bottomItems.length > 0 && (
        <div className="w-full border-t border-white/20 pt-6">
          <nav className="flex flex-col gap-1 w-full">
            {bottomItems.map((item) => {
              const isEmergency = item.label === 'Emergency Center';
              const isSettings = item.label === 'Settings';

              return (
                <DashboardNavItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={renderIcon(item.icon, isEmergency)}
                  end={item.path === '/dashboard'}
                  className={isEmergency ? 'text-[#FE706D] hover:text-[#FE706D] hover:bg-transparent' : isSettings ? 'text-white/70 hover:text-white' : undefined}
                />
              );
            })}
          </nav>
        </div>
      )}
    </aside>
  );
};
