// pages/CaregiverProfilePage.tsx
import React from 'react';

// TODO: Verify exact icon names from your existing icon library.
// The following imports are placeholders. Replace with your actual export names.
import {
  Check,              // Profile badge
  House,               // Personal Information
  Bell,               // Notifications
  Cog6Tooth,          // Password & Security
  Users,              // WhatsApp Connection (User/Group icon)
  Plus,               // Care Circle Access
  ChevronRight,       // Menu chevron
  Alert,// Leave Care Circle
} from '@/components/common/icons';

// --- Sub-components ---

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  icon,
  title,
  description,
  rightElement,
  showChevron = true,
}) => {
  return (
    <div className="flex flex-row justify-between items-center p-5 bg-white border border-[#E5E7EB] rounded-2xl hover:shadow-sm transition-shadow w-full">
      <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#EFF6FF]">
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[16px] font-bold text-[#1B2A4A] tracking-[0.0019em] truncate">
            {title}
          </span>
          <span className="text-[12px] text-[#64748B] truncate">
            {description}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 shrink-0 ml-4">
        {rightElement}
        {showChevron && <ChevronRight size={6} color="#64748B" />}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const CaregiverProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-[896px] mx-auto py-8 px-4 gap-8">
      
      {/* --- Profile Header --- */}
      <section className="flex flex-row items-center gap-8 p-8 bg-white border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl w-full">
        <div className="relative w-32 h-32 shrink-0">
          {/* TODO: Replace with actual exported image asset (avatar-1.jpg) */}
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200&h=200"
            alt="Mary Adeyemi"
            className="w-full h-full rounded-full border-4 border-[#F1F4F6] object-cover"
          />
          <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#003665] border-2 border-white flex items-center justify-center">
            <Check size={12} color="#FFFFFF" />
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-[30px] font-bold text-[#001F3F] tracking-[0.0019em]">
            Mary Adeyemi
          </h2>
          <div className="flex flex-row items-center flex-wrap gap-3">
            <span className="px-3 py-1 bg-[#ECFDF5] text-[#3F8358] text-[12px] font-bold uppercase tracking-[0.0009em] rounded-full">
              Primary Caregiver
            </span>
            <div className="flex flex-row items-center gap-2 text-[14px] text-[#64748B]">
              <Users size={16} color="#64748B" />
              <span>Assigned to: <span className="font-medium text-[#1B2A4A]">Mama Grace</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Settings Menu List --- */}
      <section className="flex flex-col gap-4 w-full">
        
        <SettingsMenuItem
          icon={<House size={16} color="#003665" />}
          title="Personal Information"
          description="Email, Phone, and Address"
        />

        <SettingsMenuItem
          icon={<Bell size={16} color="#D89A2E" />}
          title="Notifications"
          description="Alerts and activity summaries"
        />

        <SettingsMenuItem
          icon={<Cog6Tooth size={16} color="#64748B" />}
          title="Password & Security"
          description="2FA and login history"
        />

        <SettingsMenuItem
          icon={<Users size={16} color="#10B981" />}
          title="WhatsApp Connection"
          description="Connected for instant alerts"
          showChevron={false}
          rightElement={
            <span className="bg-[#D1FAE5] text-[#10B981] text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-[0.0019em]">
              Connected
            </span>
          }
        />

      </section>

      {/* --- Care Circle Access --- */}
      <section className="flex flex-col p-8 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl w-full gap-5">
        <div className="flex flex-row items-start gap-4 w-full">
          <div className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
            <Plus size={14} color="#64748B" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h4 className="text-[16px] font-bold text-[#1B2A4A] tracking-[0.0019em]">
              Care Circle Access
            </h4>
            <p className="text-[14px] leading-[23px] text-[#64748B]">
              Your Care Circle access is managed by the Family Administrator. You currently have caregiver permissions for Mama Grace's profile.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-[#E5E7EB] my-1" />

        <div className="flex flex-row justify-end w-full pt-1">
          <button className="flex flex-row items-center gap-2 px-6 py-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl hover:bg-[#FEE2E2] transition-colors">
            <Alert size={12} color="#D6483F" />
            <span className="text-[14px] font-bold text-[#D6483F] tracking-[0.0019em]">
              Leave Care Circle
            </span>
          </button>
        </div>
      </section>

    </div>
  );
};