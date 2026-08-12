// pages/LovedOneStatusScreenPage.tsx
import React from 'react';

// Exact exports from your icon library list
import {
  PaperPlane,     // Wellness check-in
  Cog6Tooth,      // Medication progress
  Chart,          // Activity chart
  Check,          // Checkmark for Check-ins
  Bell,           // Emergency header
  Phone,          // Call button
  Warning,        // Emergency Alert (Exclamation Triangle)
  User,           // Mobility exercise
  File,           // Nutrition guide
  Stetoscope,     // Doctor's notes
  Plus,           // Add Care Note button
  ChevronRight,   // Manage caret
  Clock,          // Last updated time
} from '@/components/common/icons';

// --- Sub-components ---

interface StateCardProps {
  icon: React.ReactNode;
  badgeText: string;
  title: string;
  subtitle: React.ReactNode; // support flex content + icon
  iconBg: string;
}

const StateCard: React.FC<StateCardProps> = ({ icon, badgeText, title, subtitle, iconBg }) => {
  return (
    <div className="flex flex-col gap-2 p-6 bg-white border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex-1 min-w-[200px]">
      <div className="flex flex-row justify-between items-start w-full">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <span className="bg-[#F3F4F6] text-[#64748B] text-[11px] font-bold px-3 py-1 rounded-full tracking-[0.011em]">
          {badgeText}
        </span>
      </div>
      <h3 className="pt-2 text-[24px] font-bold text-[#1B2A4A] leading-[32px]">
        {title}
      </h3>
      <div className="flex flex-row items-center gap-2 text-[14px] text-[#64748B]">
        {subtitle}
      </div>
    </div>
  );
};

interface CareNoteProps {
  name: string;
  avatar: string;
  timestamp: string;
  content: string;
}

const CareNote: React.FC<CareNoteProps> = ({ name, avatar, timestamp, content }) => {
  return (
    <div className="flex flex-row items-start gap-4 p-0">
      {/* TODO: Replace with actual exported image assets */}
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover shrink-0" />
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row justify-between items-center">
          <span className="text-[16px] font-bold text-[#1B2A4A]">{name}</span>
          <span className="text-[12px] text-[#64748B] tracking-[0.0029em]">{timestamp}</span>
        </div>
        <div className="bg-[#F8FAFC] rounded-xl p-4 w-full">
          <p className="text-[16px] italic leading-[26px] text-[#1B2A4A]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const LovedOneStatusScreenPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1160px] mx-auto">
      
      {/* --- Section 1: Current Care State --- */}
      <section className="flex flex-col gap-6">
        <h2 className="text-[20px] font-bold text-[#001F3F] tracking-[0.0009em]">
          Current Care State
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Wellness */}
          <StateCard
            icon={<PaperPlane size={24} color="#10B981" />}
            iconBg="bg-[#ECFDF5]"
            badgeText="Wellness"
            title="😊 Feeling good"
            subtitle={
              <>
                <Check size={12} color="#64748B" />
                <span>Checked in 8:14 AM</span>
              </>
            }
          />
          {/* Card 2: Medication */}
          <StateCard
            icon={<Cog6Tooth size={24} color="#3B82F6" />}
            iconBg="bg-[#EFF6FF]"
            badgeText="Medication"
            title="2 / 3 completed"
            subtitle={
              <span className="text-[#3B82F6] font-medium">
                Next: 2:00 PM (BP Meds)
              </span>
            }
          />
          {/* Card 3: Activity */}
          <StateCard
            icon={<Chart size={20} color="#D89A2E" />}
            iconBg="bg-[#FFF7ED]"
            badgeText="Activity"
            title="Stable Movement"
            subtitle={
              <>
                <Clock size={12} color="#64748B" />
                <span>Last updated 10 mins ago</span>
              </>
            }
          />
        </div>
      </section>

      {/* --- Section 2: Care Notes + Right Sidebar --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* --- Left Column: Care Notes --- */}
        <div className="flex flex-col gap-6 xl:col-span-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-[20px] font-bold text-[#001F3F] tracking-[0.0009em]">
              Care Notes
            </h2>
            <button className="flex flex-row items-center gap-2 bg-[#003665] text-white text-[14px] font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-[#002a52] transition-colors">
              <Plus size={12} color="#FFFFFF" />
              Add Care Note
            </button>
          </div>

          <div className="flex flex-col bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
            {/* Note 1 */}
            <div className="p-6 border-b border-[#E5E7EB]">
              <CareNote
                name="Mary Johnson"
                // TODO: Replace with avatar-1.jpg
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                timestamp="Today · 10:30 AM"
                content={`"Had breakfast and is resting. She drank all her orange juice and seems very relaxed this morning."`}
              />
            </div>
            {/* Note 2 */}
            <div className="p-6 border-b border-[#E5E7EB]">
              <CareNote
                name="Israel Adeyemi"
                // TODO: Replace with avatar-2.jpg
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                timestamp="Yesterday · 8:15 PM"
                content={`Completed evening routine. Mama fell asleep quickly after her tea. No issues reported during the day.`}
              />
            </div>
            {/* Footer */}
            <button className="w-full py-4 bg-[#F9FAFB] border-t border-[#F3F4F6] text-[#003665] text-[14px] font-bold hover:underline">
              View All Historical Notes
            </button>
          </div>
        </div>

        {/* --- Right Column: Aside --- */}
        <div className="flex flex-col gap-6 xl:col-span-4">
          
          {/* 1. Emergency Contacts */}
          <div className="flex flex-col gap-4 p-6 bg-white border border-[#FEE2E2] shadow-sm rounded-2xl">
            <div className="flex flex-row items-center gap-2">
              <Bell size={20} color="#D6483F" />
              <h3 className="text-[18px] font-bold text-[#D6483F] tracking-[0.0009em]">
                Emergency Contacts
              </h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Contact 1 */}
              <div className="flex flex-row justify-between items-center p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl">
                <div className="flex flex-row items-center gap-3">
                  {/* TODO: Replace with avatar-2.jpg */}
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Israel" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#1B2A4A] tracking-[0.003em]">Family Admin</span>
                    <span className="text-[11px] font-medium text-[#D6483F] tracking-[0.005em]">Israel Adeyemi</span>
                  </div>
                </div>
                <button className="w-10 h-10 bg-white border border-[#FEE2E2] rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                  <Phone size={16} color="#D6483F" />
                </button>
              </div>

              {/* Contact 2 */}
              <div className="flex flex-row justify-between items-center p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#FEE2E2] flex items-center justify-center">
                    <User size={14} color="#D6483F" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#1B2A4A] tracking-[0.0009em]">Emergency Contact</span>
                    <span className="text-[11px] font-medium text-[#D6483F]">Primary Physician</span>
                  </div>
                </div>
                <button className="w-10 h-10 bg-white border border-[#FEE2E2] rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                  <Phone size={16} color="#D6483F" />
                </button>
              </div>
            </div>

            <button className="flex flex-row justify-center items-center gap-3 w-full py-3 bg-[#D6483F] rounded-xl shadow-[0_10px_15px_-3px_#FEE2E2,0_4px_6px_-4px_#FEE2E2] hover:bg-[#bf3d35] transition-colors">
              <Warning size={16} color="#FFFFFF" />
              <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-white">
                Trigger Emergency Alert
              </span>
            </button>
          </div>

          {/* 2. Care Resources */}
          <div className="relative flex flex-col gap-4 p-6 bg-[#003665] rounded-2xl overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
            <h3 className="text-[18px] font-bold text-white">Care Resources</h3>
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex flex-row items-center gap-3 text-white/80 text-[14px]">
                <User size={16} color="rgba(255,255,255,0.8)" />
                <span>Daily Mobility Exercises</span>
              </div>
              <div className="flex flex-row items-center gap-3 text-white/80 text-[14px]">
                <File size={12} color="rgba(255,255,255,0.8)" />
                <span>Nutrition Guide: Fiber Plus</span>
              </div>
              <div className="flex flex-row items-center gap-3 text-white/80 text-[14px]">
                <Stetoscope size={12} color="rgba(255,255,255,0.8)" />
                <span>Primary Doctor's Notes</span>
              </div>
            </div>
          </div>

          {/* 3. Care Circle */}
          <div className="flex flex-col gap-4 p-6 bg-white border border-[#E5E7EB] shadow-sm rounded-2xl">
            <div className="flex flex-row justify-between items-center">
              <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-[#64748B]">
                Care Circle
              </span>
              <button className="flex flex-row items-center gap-1 text-[#003665] text-[12px] font-bold hover:underline">
                Manage
                <ChevronRight size={6} color="#003665" />
              </button>
            </div>
            
            <div className="flex flex-row items-center pl-1">
              {/* TODO: Replace all avatar-* sources with actual exported assets */}
              <img className="w-10 h-10 rounded-full border-2 border-white -ml-3 first:ml-0 relative z-40 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar 1" />
              <img className="w-10 h-10 rounded-full border-2 border-white -ml-3 relative z-30 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar 2" />
              <img className="w-10 h-10 rounded-full border-2 border-white -ml-3 relative z-20 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar 3" />
              <img className="w-10 h-10 rounded-full border-2 border-white -ml-3 relative z-10 object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar 4" />
              <div className="w-10 h-10 rounded-full bg-[#F1F4F6] border-2 border-white -ml-3 relative z-0 shadow-sm flex items-center justify-center text-[12px] font-bold text-[#64748B] tracking-[0.043em]">
                +2
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};