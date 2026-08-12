// pages/FamilyMemberProfilePage.tsx
import React from 'react';

// Exact exports from your provided icon library list
import {
  Camera,          // Profile badge
  House,           // Care Circle
  Users,           // Care Circle Right Icon
  Bell,            // Notifications
  WhatsApp,        // WhatsApp connection
  Check,           // Quiet hours / WhatsApp connection status
  Cog6Tooth,       // Personal information
  Shield,          // Password & Security
  Lock,            // Privacy
  ChevronRight,    // Right arrows for Account menu
  ArrowRight,      // Leave Care Circle button
} from '@/components/common/icons';

// --- Sub-components ---

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  rightContent?: React.ReactNode;
  hideBorder?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, subtitle, rightContent, hideBorder }) => {
  return (
    <div className={`flex flex-row items-center justify-between px-6 py-5 ${!hideBorder ? 'border-b border-[#F1F5F9]' : ''} last:border-b-0`}>
      <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[16px] font-bold text-[#1B2A4A] truncate">
            {title}
          </span>
          {subtitle && (
            <span className="text-[14px] text-[#94A3B8] truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <div className="shrink-0 ml-4">
        {rightContent}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const FamilyMemberProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1080px] mx-auto">
      
      {/* --- Profile Header --- */}
      <section className="flex flex-col items-center p-10 bg-white border border-[#F1F5F9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[32px] w-full">
        <div className="relative w-32 h-32 mb-4">
          {/* TODO: Replace with actual exported image asset */}
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200&h=200"
            alt="Sarah Adeyemi"
            className="w-full h-full rounded-[40px] border-[6px] border-[#F4F6F8] object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-[#E07A5F] border-4 border-white flex items-center justify-center shadow-sm">
            <Camera size={14} color="#1B2A4A" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-[30px] font-bold text-[#1B2A4A] tracking-[0.0019em]">
            Sarah Adeyemi
          </h2>
          <span className="text-[16px] font-medium text-[#94A3B8] tracking-[0.0029em]">
            Family Member
          </span>
        </div>
      </section>

      {/* --- Sections Container --- */}
      <div className="flex flex-col gap-8 w-full">
        
        {/* 1. CARE CIRCLE */}
        <section className="flex flex-col gap-4 w-full">
          <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#94A3B8]">
            Care Circle
          </h3>
          <div className="bg-white border border-[#F1F5F9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden w-full">
            <MenuItem
              icon={<House size={32} color="#3D85C6" />}
              title="Adeyemi Family"
              subtitle={
                <span>
                  Connected to: <span className="text-[#FE706D]">Mama Grace</span>
                </span>
              }
              rightContent={<Users size={24} color="#1B2A4A" />}
            />
          </div>
        </section>

        {/* 2. PREFERENCES */}
        <section className="flex flex-col gap-4 w-full">
          <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#94A3B8]">
            Preferences
          </h3>
          <div className="bg-white border border-[#F1F5F9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden w-full">
            <MenuItem
              icon={<Bell size={20} color="#1B2A4A" />}
              title="Notifications"
            />
            <MenuItem
              icon={<WhatsApp size={16} color="#1B2A4A" />}
              title="WhatsApp connection"
              rightContent={<Check size={16} color="#1B2A4A" />}
            />
            <MenuItem
              icon={<Check size={20} color="#1B2A4A" />}
              title="Quiet hours"
              rightContent={<span className="text-[14px] font-bold text-[#94A3B8]">22:00 - 07:00</span>}
              hideBorder
            />
          </div>
        </section>

        {/* 3. ACCOUNT */}
        <section className="flex flex-col gap-4 w-full">
          <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#94A3B8]">
            Account
          </h3>
          <div className="bg-white border border-[#F1F5F9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden w-full">
            <MenuItem
              icon={<Cog6Tooth size={20} color="#1B2A4A" />}
              title="Personal information"
              rightContent={<ChevronRight size={16} color="#1B2A4A" />}
            />
            <MenuItem
              icon={<Shield size={20} color="#1B2A4A" />}
              title="Password & Security"
              rightContent={<ChevronRight size={16} color="#1B2A4A" />}
            />
            <MenuItem
              icon={<Lock size={20} color="#1B2A4A" />}
              title="Privacy"
              rightContent={<ChevronRight size={16} color="#1B2A4A" />}
              hideBorder
            />
          </div>
        </section>

        {/* 4. Leave Care Circle Button */}
        <button className="w-full flex flex-row justify-center items-center gap-3 py-4 bg-white border-2 border-[#FE706D] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl hover:bg-[#FFF5F5] transition-colors">
          <ArrowRight size={16} color="#1B2A4A" />
          <span className="text-[18px] font-bold text-[#FE706D] tracking-[0.0009em]">
            Leave Care Circle
          </span>
        </button>

      </div>
    </div>
  );
};