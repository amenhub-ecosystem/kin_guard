// pages/SettingsPage.tsx
import React from 'react';

// TODO: Verify exact icon names from your existing icon library.
import {
  User,               // Account
  Users,              // Care Circle
  Bell,               // Notifications
  Shield,             // Security
  Lock,               // Privacy
  CreditCard,         // Subscription
  BillCard,           // Billing
  PuzzlePiece,        // Connected Apps
  Alert,              // Danger Zone
  Camera,             // Edit Profile Picture Icon
} from '@/components/common/icons';

// --- Sub-components ---

interface SidebarNavItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  danger?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ label, icon, active = false, danger = false }) => {
  return (
    <button
      className={`flex flex-row items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
        active
          ? 'bg-white border border-[#F9FAFB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
          : 'bg-transparent border border-transparent hover:bg-gray-50'
      }`}
    >
      <span className="flex items-center justify-center w-5 h-5 shrink-0">
        {icon}
      </span>
      <span
        className={`text-[16px] leading-6 ${
          active ? 'font-bold text-[#001F3F]' : 'font-normal text-[#6B7280]'
        } ${danger ? '!font-bold !text-[#FE706D]' : ''}`}
      >
        {label}
      </span>
    </button>
  );
};

interface SettingsInputProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  prefix?: string;
}

const SettingsInput: React.FC<SettingsInputProps> = ({ label, value, type = 'text', placeholder, prefix }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[12px] font-bold uppercase tracking-[0.6px] text-[#9CA3AF]">
        {label}
      </label>
      <div className="relative w-full">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#9CA3AF]">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={`w-full bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-[16px] font-medium text-[#001F3F] outline-none focus:ring-2 focus:ring-[#001F3F]/10 focus:border-[#001F3F]/30 transition-all py-3 ${
            prefix ? 'pl-10 pr-4' : 'px-4'
          }`}
        />
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const SettingsPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full pb-8 max-w-[1152px] mx-auto">
      
      {/* Left Column: Sidebar Navigation */}
      <nav className="flex flex-col w-full lg:w-[256px] shrink-0">
        {/* Heading */}
        <div className="pb-4 px-4">
          <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#9CA3AF]">
            Settings
          </span>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <SidebarNavItem label="Account" icon={<User size={16} color="#001F3F" />} active />
          <SidebarNavItem label="Care Circle" icon={<Users size={20} color="#6B7280" />} />
          <SidebarNavItem label="Notifications" icon={<Bell size={14} color="#6B7280" />} />
          <SidebarNavItem label="Security" icon={<Shield size={16} color="#6B7280" />} />
          <SidebarNavItem label="Privacy" icon={<Lock size={14} color="#6B7280" />} />
        </div>

        <div className="mt-4 pt-4 border-t border-[#F3F4F6] flex flex-col gap-1 w-full">
          <SidebarNavItem label="Subscription" icon={<CreditCard size={18} color="#6B7280" />} />
          <SidebarNavItem label="Billing" icon={<BillCard size={12} color="#6B7280" />} />
          <SidebarNavItem label="Connected Apps" icon={<PuzzlePiece size={16} color="#6B7280" />} />
        </div>

        <div className="mt-4 pt-4 border-t border-[#F3F4F6] flex flex-col gap-1 w-full">
          <SidebarNavItem
            label="Danger Zone"
            icon={<Alert size={16} color="#FE706D" />}
            danger
          />
        </div>
      </nav>

      {/* Right Column: Main Form Content */}
      <main className="flex-1 flex flex-col gap-8 max-w-[768px] w-full">
        
        {/* Section 1: Account Settings */}
        <section className="bg-white rounded-3xl border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-10">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-[24px] font-bold text-[#001F3F] tracking-[-0.0029em]">
                Account Settings
              </h3>
              <p className="text-[14px] text-[#6B7280]">
                Manage your personal profile and contact information.
              </p>
            </div>
            <button className="bg-[#001F3F] text-white text-[14px] font-bold px-6 py-2.5 rounded-xl shadow-lg hover:bg-[#001533] transition-colors">
              Save Changes
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-row items-start gap-6">
            <div className="relative w-24 h-24 shrink-0">
              {/* TODO: Replace with actual exported image asset */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
                alt="Profile"
                className="w-full h-full rounded-3xl object-cover border-4 border-[#E0F2F1]"
              />
              <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-white border border-[#F3F4F6] shadow-sm rounded-full flex items-center justify-center">
                <Camera size={12} color="#001F3F" />
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <h4 className="text-[16px] font-bold text-[#001F3F] tracking-[0.0019em]">
                Profile Picture
              </h4>
              <p className="text-[12px] text-[#9CA3AF]">
                JPG, GIF or PNG. Max size of 800K
              </p>
              <div className="flex flex-row items-center gap-3 mt-1">
                <button className="bg-[#F9FAFB] text-[#001F3F] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                  Upload New
                </button>
                <button className="bg-[rgba(254,242,242,0.5)] text-[#FE706D] text-[12px] font-bold px-4 py-1.5 rounded-lg hover:bg-[rgba(254,242,242,0.8)] transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SettingsInput label="Full Name" value="James Harrison" />
            <SettingsInput label="Email Address" value="james.harrison@gmail.com" />
            <SettingsInput label="Phone Number" value="(555) 000-1234" prefix="+1" />
            <SettingsInput label="Timezone" value="Eastern Standard Time (EST)" />
          </div>
        </section>

        {/* Section 2: Change Password */}
        <section className="bg-white rounded-3xl border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-[20px] font-bold text-[#001F3F]">
              Change Password
            </h3>
            <p className="text-[14px] text-[#6B7280]">
              Update your password to keep your account secure.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full md:w-[448px]">
              <SettingsInput label="Current Password" type="password" value="••••••••" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SettingsInput label="New Password" type="password" value="••••••••" />
              <SettingsInput label="Confirm Password" type="password" value="••••••••" />
            </div>
            <div className="pt-2">
              <button className="bg-transparent border border-[#B2DFDB] text-[#009688] text-[14px] font-bold px-6 py-2.5 rounded-xl hover:bg-[#F0FDFA] transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Danger Zone */}
        <section className="bg-[rgba(254,242,242,0.3)] border border-[rgba(254,112,109,0.2)] rounded-3xl p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-[20px] font-bold text-[#FE706D] tracking-[0.004em]">
              Danger Zone
            </h3>
            <p className="text-[14px] text-[#6B7280]">
              Irreversible actions concerning your KinGuard account.
            </p>
          </div>

          <div className="pt-8 border-t border-[#FEE2E2] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-1 max-w-[448px]">
              <h4 className="text-[16px] font-bold text-[#001F3F] tracking-[0.0009em]">
                Delete Account
              </h4>
              <p className="text-[14px] text-[#6B7280] leading-[20px]">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
            <button className="bg-[#FE706D] text-white text-[14px] font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-[#fe5a56] transition-colors shrink-0">
              Delete Account
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};