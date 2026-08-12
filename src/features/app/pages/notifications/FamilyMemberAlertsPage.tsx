// pages/FamilyMemberAlertsPage.tsx
import React from 'react';

// Exact exports from your provided icon library list
import {
  Phone,
  User,
  Pills,
  Check,
  ChatBubbleLeftRight,
  DevicePhoneMobile,
  Alert,
} from '@/components/common/icons';

// --- Sub-components ---

interface UpdateItemProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  timestamp: string;
  description: string;
  avatar?: string; // optional avatar for specific items
}

const UpdateItem: React.FC<UpdateItemProps> = ({
  icon,
  iconBg,
  iconColor,
  title,
  timestamp,
  description,
  avatar,
}) => {
  return (
    <div className="flex flex-row items-center gap-5 p-5 bg-white border border-[#F1F5F9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl w-full">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        {React.cloneElement(icon as React.ReactElement, { size: 20, color: iconColor } as any)}
      </div>

      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        {/* Title & Timestamp */}
        <div className="flex flex-row justify-between items-start w-full gap-4">
          <span className="text-[16px] font-bold text-[#1B2A4A] tracking-[0.0019em] truncate">
            {title}
          </span>
          <span className="text-[10px] font-bold uppercase text-[#94A3B8] tracking-[0.006em] shrink-0">
            {timestamp}
          </span>
        </div>
        {/* Description & Avatar */}
        <div className="flex flex-row items-center gap-2 w-full">
          {avatar && (
            // TODO: Replace with actual exported image asset
            <img
              src={avatar}
              alt="Avatar"
              className="w-4 h-4 rounded-full object-cover shrink-0"
            />
          )}
          <span className="text-[14px] text-[#64748B] truncate">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const FamilyMemberAlertsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full pb-10 max-w-[1160px] mx-auto px-6 xl:px-10">
      
      {/* --- Section 1: Attention Required --- */}
      <section className="flex flex-col gap-6 w-full">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[20px] font-bold text-[#1B2A4A] tracking-[0.0009em]">
            Attention Required
          </h2>
          <span className="px-3 py-1.5 bg-[rgba(224,122,95,0.1)] text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.5px] rounded-lg">
            1 Active
          </span>
        </div>

        {/* Alert Card */}
        <div className="flex flex-col gap-6 p-8 bg-white border-[1.5px] border-[#FE706D] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[32px] w-full">
          <div className="flex flex-row items-start gap-6 w-full flex-wrap">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[rgba(254,112,109,0.1)] flex items-center justify-center shrink-0">
              <Alert size={32} color="#FE706D" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-1 min-w-[250px]">
              <div className="flex flex-row justify-between items-start flex-wrap gap-2">
                <h3 className="text-[24px] font-bold text-[#1B2A4A] tracking-[0.0009em]">
                  Check-in missed
                </h3>
                <span className="text-[12px] font-bold text-[#94A3B8] tracking-[0.0019em] shrink-0">
                  45 mins ago
                </span>
              </div>
              <p className="text-[18px] leading-[29px] text-[#475569] max-w-[672px]">
                Mama Grace hasn&apos;t responded to her scheduled 10:00 AM check-in. This may require immediate follow-up.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row flex-wrap items-center gap-4 mt-2">
            <button className="flex flex-row items-center gap-3 px-8 py-4 bg-[#FE706D] rounded-2xl shadow-[0_10px_15px_-3px_rgba(224,122,95,0.2)] hover:bg-[#e55a57] transition-colors">
              <Phone size={16} color="#FFFFFF" />
              <span className="text-[16px] font-bold text-white tracking-[0.003em]">
                Call Mama Grace
              </span>
            </button>
            <button className="flex flex-row items-center gap-3 px-8 py-4 bg-[#003665] rounded-2xl shadow-[0_10px_15px_-3px_rgba(27,42,74,0.2)] hover:bg-[#002a52] transition-colors">
              <User size={16} color="#FFFFFF" />
              <span className="text-[16px] font-bold text-white tracking-[0.0029em]">
                Notify Caregiver
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* --- Section 2: Recent Updates --- */}
      <section className="flex flex-col gap-6 w-full">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[20px] font-bold text-[#1B2A4A] tracking-[0.0019em]">
            Recent Updates
          </h2>
          <button className="text-[14px] font-bold text-[#3D85C6] hover:underline">
            View All
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* Update 1 */}
          <UpdateItem
            icon={<Pills />}
            iconBg="bg-[rgba(34,197,94,0.1)]"
            iconColor="#22C55E"
            title="Medication taken"
            timestamp="2:05 PM"
            description="Lisinopril 10mg — Confirmed by system"
          />
          {/* Update 2 */}
          <UpdateItem
            icon={<Check />}
            iconBg="bg-[rgba(34,197,94,0.1)]"
            iconColor="#22C55E"
            title="Check-in completed"
            timestamp="8:14 AM"
            description="I'm feeling good today ☺️ — Mama Grace"
          />
          {/* Update 3 */}
          <UpdateItem
            icon={<ChatBubbleLeftRight />}
            iconBg="bg-[rgba(61,133,198,0.1)]"
            iconColor="#3D85C6"
            title="Caregiver update"
            timestamp="Yesterday"
            description="David completed evening wellness check"
            // TODO: Replace with actual exported image asset
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
          />
          {/* Update 4 (Faded/Old) */}
          <UpdateItem
            icon={<DevicePhoneMobile />}
            iconBg="bg-[rgba(148,163,184,0.1)]"
            iconColor="#94A3B8"
            title="Battery status"
            timestamp="Yesterday"
            description="Mama Grace's watch is at 85%"
          />
        </div>
      </section>

      {/* --- Section 3: Empty State (Caught Up) --- */}
      <section className="flex flex-col items-center justify-center gap-6 py-12 w-full bg-[#F4F6F8] border-2 border-dashed border-[#E2E8F0] rounded-[32px]">
        <div className="w-20 h-20 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center">
          <Check size={32} color="#22C55E" className="opacity-20" />
        </div>
        <div className="flex flex-col items-center gap-2 max-w-[384px] text-center">
          <h3 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.0029em]">
            You&apos;re all caught up
          </h3>
          <p className="text-[14px] leading-[20px] text-[#64748B] tracking-[0.0009em]">
            No other urgent matters. We&apos;ll let you know if something needs your attention.
          </p>
        </div>
      </section>
      
    </div>
  );
};