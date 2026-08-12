// pages/FamilyMemberDashboardPage.tsx
import React from 'react';

// Exact exports from your provided icon library list
import {
  Pills,           // Meds
  Check,           // Check-in, No active alerts
  User,            // Caregiver
  ChevronRight,    // View details
} from '@/components/common/icons';

// --- Reusable Components ---

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white border border-[#F1F5F9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex-1 min-w-[120px]">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50/70">
        {icon}
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[12px] font-bold uppercase tracking-[-0.3px] text-[#94A3B8]">
          {label}
        </span>
        <span className="text-[18px] font-bold text-[#1A2B4B] tracking-[0.004em]">
          {value}
        </span>
      </div>
    </div>
  );
};

interface UpdateItemProps {
  dotColor: string;
  title: string;
  subtitle: string;
  time: string;
  isFirst?: boolean;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ dotColor, title, subtitle, time }) => {
  return (
    <div className="flex flex-row items-center gap-4 w-full p-4 pr-8 bg-white border border-[#F4F6F8] rounded-2xl shadow-sm">
      {/* Timeline dot */}
      <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full border-4 border-white shrink-0" style={{ backgroundColor: dotColor }}>
        {/* Inner hollow effect from CSS */}
      </div>
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-[14px] font-bold text-[#1A2B4B] tracking-[0.0009em] truncate">
            {title}
          </span>
          <span className="text-[10px] font-bold uppercase text-[#94A3B8] tracking-[0.012em] shrink-0 ml-4">
            {time}
          </span>
        </div>
        <span className="text-[12px] text-[#64748B] truncate">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const FamilyMemberDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1152px] mx-auto">
      
      {/* --- Section 1: Profile & Status Header --- */}
      <section className="relative w-full bg-[#003665] rounded-[32px] p-8 shadow-[0_25px_50px_-12px_rgba(26,43,75,0.2)] overflow-hidden flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {/* Profile */}
          <div className="flex flex-row items-center gap-6">
            <div className="relative w-20 h-20 shrink-0">
              {/* TODO: Replace with actual exported image asset */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
                alt="Mama Grace"
                className="w-full h-full rounded-full border-4 border-white/20 object-cover"
              />
              <div className="absolute -right-0.5 bottom-0.5 w-5 h-5 rounded-full bg-[#22C55E] border-[3px] border-[#003665]" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[30px] font-bold text-white tracking-[0.0009em]">
                Mama Grace
              </h2>
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-[16px] font-medium text-white/80 tracking-[0.005em]">
                  Doing well
                </span>
              </div>
            </div>
          </div>

          {/* Quote box */}
          <div className="flex flex-col gap-1 p-6 bg-white/10 border border-white/10 backdrop-blur-[6px] rounded-2xl w-full max-w-[672px]">
            <span className="text-[24px] font-medium text-white">
              &quot;I&apos;m feeling good today 😊&quot;
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-white/60">
              Last checked in at 8:14 AM
            </span>
          </div>
        </div>

        {/* Stats and View Details */}
        <div className="flex flex-row justify-between items-end mt-2">
          <div className="flex flex-row items-start gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                Heart Rate
              </span>
              <span className="text-[20px] font-bold text-white tracking-[0.005em]">
                74 BPM
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[1px] text-white/50">
                Rest Rate
              </span>
              <span className="text-[20px] font-bold text-white tracking-[0.008em]">
                Good
              </span>
            </div>
          </div>
          <button className="flex flex-row items-center gap-2 text-white/90 text-[16px] font-bold hover:text-white transition-colors">
            View details
            <ChevronRight size={10} className="text-white/90" />
          </button>
        </div>
      </section>

      {/* --- Section 2: Today's Care --- */}
      <section className="flex flex-col gap-6">
        <h3 className="text-[20px] font-bold text-[#1A2B4B] tracking-[0.0009em]">
          Today&apos;s Care
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MetricCard
            icon={<Pills size={24} color="#000000" />}
            label="Meds"
            value="2 of 3 done"
          />
          <MetricCard
            icon={<Check size={20} color="#000000" />}
            label="Check-in"
            value="8:14 AM"
          />
          <MetricCard
            icon={<User size={16} color="#1A2B4B" />}
            label="Caregiver"
            value="Active today"
          />
        </div>
      </section>

      {/* --- Section 3: Recent Updates & Alerts --- */}
      <section className="flex flex-col gap-6 w-full bg-white border border-[#F1F5F9] rounded-3xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-[20px] font-bold text-[#1A2B4B] tracking-[0.0019em]">
            Recent Updates
          </h3>
          <button className="text-[12px] font-bold uppercase tracking-[0.6px] text-[rgba(26,43,75,0.5)] hover:text-[#1A2B4B] transition-colors">
            View All
          </button>
        </div>

        {/* Timeline items container - single vertical divider is handled by the items themselves */}
        <div className="flex flex-col gap-4 mt-2 relative">
          {/* Vertical divider behind dots */}
          <div className="absolute left-[2.75rem] top-4 bottom-4 w-0.5 bg-[#F1F5F9] z-0" />

          {/* Item 1 */}
          <UpdateItem
            dotColor="#22C55E"
            title="Mama Grace checked in"
            subtitle="Manual check-in from tablet"
            time="8:14 AM"
            isFirst
          />
          {/* Item 2 */}
          <UpdateItem
            dotColor="#FF7F50"
            title="Morning medication"
            subtitle="Lisinopril 10mg confirmed"
            time="8:20 AM"
          />
          {/* Item 3 */}
          <UpdateItem
            dotColor="#1A2B4B"
            title="Caregiver updated note"
            subtitle='"Shared a healthy lunch together"'
            time="10:30 AM"
          />
        </div>

        {/* No active alerts banner */}
        <div className="flex flex-row justify-center items-center gap-3 mt-4 py-4 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-2xl">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#22C55E]">
            <Check size={12} color="#FFFFFF" />
          </div>
          <span className="text-[14px] font-bold text-[#22C55E]">
            No active alerts
          </span>
        </div>
      </section>
      
    </div>
  );
};