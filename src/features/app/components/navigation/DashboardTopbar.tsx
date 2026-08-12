// components/Dashboard/DashboardTopbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMockUser } from '@/features/app/rbac/MockUserContext';
import { ROLE_LABELS } from '@/features/app/rbac/roles';

import { Search, Bell } from '@/components/common/icons';

export const DashboardTopbar: React.FC = () => {
  const { user } = useMockUser();

  return (
    <header className="flex w-full flex-row items-center justify-between bg-white px-8 py-5 h-20 sticky top-0 z-30">
      
      {/* Left side: Search Input */}
      <div className="relative flex items-center w-full max-w-[384px]">
        <div className="absolute left-4 pointer-events-none text-gray-400">
          <Search size={16} color="#6B7280" />
        </div>
        <input
          type="text"
          placeholder="Search care records, members..."
          className="w-full bg-[#F8FAFC] rounded-xl py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003665]/20 transition-shadow"
        />
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Notification Bell */}
        <Link
          to="/dashboard/notifications"
          className="relative flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} color='#6B7280' />
          {/* Notification Dot */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </Link>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-gray-200" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-[#001F3F] tracking-[0.0058em]">
              {user.name}
            </span>
            <span className="text-xs text-gray-500 text-right">
              {ROLE_LABELS[user.role] ?? user.role}
            </span>
          </div>
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#009688] shrink-0"
          />
        </div>

      </div>
    </header>
  );
};