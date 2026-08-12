// pages/CaregiverAlertsPage.tsx
import React from 'react';

// TODO: Verify exact icon names from your existing icon library.
// The following imports are placeholders. Replace with your actual export names.
import {
  Alert, // Emergency / Alert
  Pills,               // Medication
  Clock,               // Time
  MapPin,              // Location
  CheckCircle,         // Completed / Verified
  Plus,                // Manage Circle / Filter
} from '@/components/common/icons';

// --- Types & Interfaces ---

interface ActiveAlertCardProps {
  type: 'emergency' | 'medication';
  title: string;
  titleColor?: string;
  badge: string;
  description: string;
  time: string;
  location?: string;
  primaryActionLabel: string;
  primaryActionColor: string;
  secondaryActionLabel?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  borderColor: string;
}

interface ResolvedAlertCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
}

interface CareCircleAlertCardProps {
  avatars: string[];
  title: string;
  subtitle: string;
}

// --- Sub-components ---

const ActiveAlertCard: React.FC<ActiveAlertCardProps> = ({
  type,
  title,
  titleColor = '#1B2A4A',
  badge,
  description,
  time,
  location,
  primaryActionLabel,
  primaryActionColor,
  secondaryActionLabel,
  icon,
  iconBg,
  borderColor,
}) => {
  return (
    <div
      className="flex flex-row justify-between items-start p-6 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl w-full border-l-[6px]"
      style={{ borderColor: borderColor }}
    >
      <div className="flex flex-row gap-5 flex-1 min-w-0">
        {/* Icon Box */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex flex-row items-center gap-3 flex-wrap">
            <h3
              className="text-[18px] font-bold tracking-[0.0019em]"
              style={{ color: titleColor }}
            >
              {title}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-opacity-10 shrink-0" style={{ backgroundColor: type === 'emergency' ? '#D6483F' : '#D89A2E', color: type === 'emergency' ? '#D6483F' : '#D89A2E' }}>
              {badge}
            </span>
          </div>
          <p className="text-[16px] font-medium text-[#1B2A4A] truncate">
            {description}
          </p>
          <div className="flex flex-row items-center gap-3 mt-1 flex-wrap text-[14px] text-[#64748B]">
            <div className="flex flex-row items-center gap-2">
              <Clock size={14} color="#64748B" />
              <span>{time}</span>
            </div>
            {location && (
              <>
                <span className="text-[#64748B]">•</span>
                <div className="flex flex-row items-center gap-2">
                  <MapPin size={12} color="#64748B" />
                  <span>{location}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 shrink-0 ml-6">
        <button
          className="px-6 py-2.5 text-[16px] font-bold text-white rounded-xl shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          style={{ backgroundColor: primaryActionColor }}
        >
          {primaryActionLabel}
        </button>
        {secondaryActionLabel && (
          <button className="px-6 py-2.5 text-[16px] font-bold text-[#1B2A4A] bg-white border border-[#E5E7EB] rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap">
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

const ResolvedAlertCard: React.FC<ResolvedAlertCardProps> = ({
  icon,
  iconBg,
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-row justify-between items-center p-5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl w-full opacity-75">
      <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
        >
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="text-[16px] font-bold text-[#1B2A4A] tracking-[0.0009em] truncate">
            {title}
          </h4>
          <p className="text-[12px] text-[#64748B] truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 shrink-0 ml-4">
        <CheckCircle size={14} color="#3F8358" />
        <span className="text-[14px] font-bold text-[#3F8358] tracking-[0.003em]">
          Completed
        </span>
      </div>
    </div>
  );
};

const CareCircleAlertCard: React.FC<CareCircleAlertCardProps> = ({
  avatars,
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-row justify-between items-center p-6 bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl w-full">
      <div className="flex flex-row items-center gap-5 flex-1 min-w-0">
        {/* Avatar Stack */}
        <div className="flex -space-x-3 overflow-hidden shrink-0">
          {avatars.map((src, idx) => (
            // TODO: Replace with actual exported image assets
            <img
              key={idx}
              src={src}
              alt="Member"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="text-[16px] font-bold text-[#001F3F] tracking-[0.0019em] truncate">
            {title}
          </h4>
          <p className="text-[14px] text-[#64748B] truncate">{subtitle}</p>
        </div>
      </div>
      <button className="flex flex-row items-center gap-2 px-4 py-2 bg-[#F3F4F6] rounded-lg text-[14px] font-bold text-[#1B2A4A] hover:bg-gray-200 transition-colors shrink-0 ml-4">
        <Plus size={14} color="#64748B" />
        Manage Circle
      </button>
    </div>
  );
};

// --- Main Page Component ---

export const CaregiverAlertsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1160px] mx-auto">
      
      {/* --- Active Alerts Section --- */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <h2 className="text-[20px] font-bold text-[#001F3F] tracking-[0.0009em]">
              Active Alerts
            </h2>
            <span className="bg-[#D6483F] text-white text-[12px] font-bold px-2.5 py-1 rounded-full">
              2 New
            </span>
          </div>
          <button className="text-[14px] font-semibold text-[#003665] hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Alert 1: Emergency */}
          <ActiveAlertCard
            type="emergency"
            title="Emergency SOS Triggered"
            titleColor="#D6483F"
            badge="Urgent"
            description="Mama Grace triggered an SOS signal from her wearable device."
            time="Today at 3:42 PM"
            location="Main Bedroom"
            primaryActionLabel="View Emergency"
            primaryActionColor="#D6483F"
            secondaryActionLabel="Dismiss"
            icon={<Alert size={24} color="#D6483F" />}
            iconBg="bg-[#FEF2F2]"
            iconColor="#D6483F"
            borderColor="#D6483F"
          />

          {/* Alert 2: Medication */}
          <ActiveAlertCard
            type="medication"
            title="Medication Pending"
            titleColor="#001F3F"
            badge="Due Now"
            description="Afternoon medication (Losartan, 50mg) is due for administration."
            time="Scheduled for 2:00 PM"
            location={undefined}
            primaryActionLabel="Mark as Taken"
            primaryActionColor="#003665"
            secondaryActionLabel="Snooze 15m"
            icon={<Pills size={28} color="#D89A2E" />}
            iconBg="bg-[#FFFBEB]"
            iconColor="#D89A2E"
            borderColor="#D89A2E"
          />
        </div>
      </section>

      {/* --- Resolved Alerts Section --- */}
      <section className="flex flex-col gap-6">
        <h2 className="text-[20px] font-bold text-[#64748B] tracking-[0.0009em]">
          Resolved Alerts
        </h2>

        <div className="flex flex-col gap-4">
          <ResolvedAlertCard
            icon={<Pills size={20} color="#10B981" />}
            iconBg="bg-[#ECFDF5]"
            title="Morning Medication"
            subtitle="Confirmed by Mary at 8:20 AM"
          />
          <ResolvedAlertCard
            icon={<CheckCircle size={20} color="#0EA5E9" />}
            iconBg="bg-[#F0F9FF]"
            title="Daily Wellness Check-in"
            subtitle="Confirmed at 8:14 AM"
          />

          <CareCircleAlertCard
            avatars={[
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', // avatar-2.jpg
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', // avatar-3.jpg
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100', // avatar-4.jpg
            ]}
            title="Care Circle Informed"
            subtitle="All family members are currently receiving alert notifications."
          />
        </div>
      </section>
    </div>
  );
};