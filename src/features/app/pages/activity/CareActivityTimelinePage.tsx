// pages/CareActivityTimelinePage.tsx
import React from 'react';

// TODO: Verify exact icon names from your existing icon library.
// The following are placeholders. Replace with your actual export names.
import {
  Plus,
  Check,
  Pencil,
  HeartThrob,
  Gear,
  PaperPlane,
  Note,
  ChevronRight,
} from '@/components/common/icons';

// --- Types & Interfaces ---

interface TimelineItemData {
  id: string;
  type: 'medication' | 'note' | 'wellness';
  title: string;
  timestamp: string;
  description?: string;
  dotColor: string;
  dotIcon: React.ReactNode;
  badge?: {
    icon: React.ReactNode;
    label: string;
    color: string;
  };
  metadata?: {
    heartRate?: string;
    bloodPressure?: string;
    mood?: string;
  };
}

// --- Mock Data ---

const timelineItems: TimelineItemData[] = [
  {
    id: '1',
    type: 'medication',
    title: 'Afternoon Medication Confirmed',
    timestamp: '2:07 PM',
    description: 'Administered Losartan (50mg) as scheduled.',
    dotColor: '#003665',
    dotIcon: <Check size={12} color="#1B2A4A" />,
    badge: {
      icon: <Check size={12} color="#FFFFFF" />, // Placeholder for the user avatar image
      label: 'Verified by Mary J.',
      color: '#3F8358',
    },
  },
  {
    id: '2',
    type: 'note',
    title: 'Care Note Added',
    timestamp: '10:30 AM',
    description:
      '"Had breakfast and is resting. Appetite was good, finished the entire oatmeal bowl and had some fruit. Spirits are high."',
    dotColor: '#D89A2E',
    dotIcon: <Pencil size={14} color="#1B2A4A" />,
  },
  {
    id: '3',
    type: 'medication',
    title: 'Morning Medication Confirmed',
    timestamp: '8:20 AM',
    description: 'Metformin and Vitamin D supplement taken with water.',
    dotColor: '#3F8358',
    dotIcon: <Check size={12} color="#1B2A4A" />,
    badge: {
      icon: <Check size={12} color="#FFFFFF" />,
      label: 'Confirmed on Schedule',
      color: '#059669',
    },
  },
  {
    id: '4',
    type: 'wellness',
    title: 'Wellness Check-in Completed',
    timestamp: '8:14 AM',
    dotColor: '#D6483F',
    dotIcon: <HeartThrob size={14} color="#1B2A4A" />,
    metadata: {
      heartRate: '72',
      bloodPressure: '120/80',
      mood: 'Happy 😊',
    },
  },
];

// --- Sub-components ---

interface TimelineItemProps {
  item: TimelineItemData;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0 flex flex-col gap-2">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-[#E5E7EB]" />
      )}

      {/* Timeline Dot */}
      <div
        className="absolute -left-[5px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10"
        style={{ backgroundColor: item.dotColor }}
      >
        {item.dotIcon}
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-3 p-6 bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl w-full">
        <div className="flex flex-row justify-between items-start w-full">
          <h4 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.0009em]">
            {item.title}
          </h4>
          <span className="text-[14px] font-bold text-[#64748B] shrink-0 ml-4">
            {item.timestamp}
          </span>
        </div>

        {item.description && (
          <p
            className={`text-[14px] ${
              item.type === 'note' ? 'italic' : 'font-normal'
            } text-[#64748B] leading-[20px]`}
          >
            {item.description}
          </p>
        )}

        {/* Badge / Verification */}
        {item.badge && (
          <div className="flex flex-row items-center gap-2 mt-1">
            {/* Verified Avatar Placeholder */}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              {/* TODO: Replace with actual avatar image */}
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-wide"
              style={{ color: item.badge.color }}
            >
              {item.badge.label}
            </span>
          </div>
        )}

        {/* Wellness Metadata Grid */}
        {item.metadata && (
          <div className="grid grid-cols-3 gap-4 mt-2">
            {/* Heart Rate */}
            <div className="flex flex-col gap-1 p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl">
              <span className="text-[10px] font-bold uppercase text-[#64748B]">
                Heart Rate
              </span>
              <span className="text-[20px] font-bold text-[#003665]">
                {item.metadata.heartRate} <span className="text-[12px] font-medium">BPM</span>
              </span>
            </div>
            {/* Blood Pressure */}
            <div className="flex flex-col gap-1 p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl">
              <span className="text-[10px] font-bold uppercase text-[#64748B]">
                Blood Pressure
              </span>
              <span className="text-[20px] font-bold text-[#003665]">
                {item.metadata.bloodPressure}
              </span>
            </div>
            {/* Mood */}
            <div className="flex flex-col gap-1 p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl">
              <span className="text-[10px] font-bold uppercase text-[#64748B]">
                Mood
              </span>
              <span className="text-[20px] font-bold text-[#003665]">
                {item.metadata.mood}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const CareActivityTimelinePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full pb-8 max-w-[1160px] mx-auto">
      
      {/* Top Filter Bar */}
      <div className="flex flex-row justify-between items-center flex-wrap gap-4">
        <div className="flex flex-row items-center p-1 bg-gray-200/50 rounded-xl">
          <button className="px-6 py-2 bg-white shadow-sm text-[#003665] text-[14px] font-semibold rounded-lg">
            Today
          </button>
          <button className="px-6 py-2 text-[#64748B] text-[14px] font-medium hover:text-[#003665] transition-colors rounded-lg">
            Yesterday
          </button>
          <button className="px-6 py-2 text-[#64748B] text-[14px] font-medium hover:text-[#003665] transition-colors rounded-lg">
            This Week
          </button>
        </div>

        <button className="flex flex-row items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-[#003665] text-[14px] font-semibold hover:bg-gray-50 transition-colors">
          <Plus size={14} color="#003665" />
          Filter by Type
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Timeline (col-span-8) */}
        <div className="flex flex-col relative xl:col-span-8 pt-4">
          
          {/* "TODAY" Pill */}
          <div className="absolute -top-0.5 left-0 bg-[#003665] text-white text-[12px] font-bold uppercase tracking-[1.2px] px-4 py-1.5 rounded-full shadow-sm z-20">
            Today
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col w-full">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                isLast={index === timelineItems.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Summary Sidebar (col-span-4) */}
        <div className="flex flex-col gap-6 xl:col-span-4 w-full">
          
          {/* Card 1: Today's Summary */}
          <div className="flex flex-col gap-5 p-6 bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
            <h3 className="text-[18px] font-bold text-[#003665] tracking-[0.0009em]">
              Today's Summary
            </h3>
            
            <div className="flex flex-col gap-3">
              {/* Meds Taken */}
              <div className="flex flex-row justify-between items-center p-4 bg-[#ECFDF5] rounded-2xl">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Gear size={16} color="#059669" />
                  </div>
                  <span className="text-[16px] font-bold text-[#065F46]">Meds Taken</span>
                </div>
                <span className="text-[16px] font-bold text-[#065F46]">2 / 3</span>
              </div>

              {/* Care Vitals */}
              <div className="flex flex-row justify-between items-center p-4 bg-[#EFF6FF] rounded-2xl">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <PaperPlane size={16} color="#003665" />
                  </div>
                  <span className="text-[16px] font-bold text-[#1B2A4A]">Care Vitals</span>
                </div>
                <span className="text-[16px] font-bold text-[#1B2A4A]">Normal</span>
              </div>

              {/* Notes Recorded */}
              <div className="flex flex-row justify-between items-center p-4 bg-[#FFFBEB] rounded-2xl">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Note size={16} color="#D89A2E" />
                  </div>
                  <span className="text-[16px] font-bold text-[#92400E]">Notes Recorded</span>
                </div>
                <span className="text-[16px] font-bold text-[#92400E]">1</span>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-[#E5E7EB] rounded-xl text-[#64748B] text-[14px] font-bold hover:bg-gray-50 transition-colors">
              + Add Historical Event
            </button>
          </div>

          {/* Card 2: Mama Grace Profile */}
          <div className="flex flex-col gap-5 p-6 bg-[#003665] rounded-2xl">
            <div className="flex flex-row items-center gap-4">
              {/* TODO: Replace with actual exported image asset (avatar-5.jpg) */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Mama Grace"
                className="w-14 h-14 rounded-full border-2 border-white/20 object-cover shrink-0"
              />
              <div className="flex flex-col">
                <h4 className="text-[18px] font-bold text-white tracking-[0.0019em]">
                  Mama Grace
                </h4>
                <div className="flex flex-row items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                  <span className="text-[12px] text-white/70 tracking-[-0.0019em]">
                    Current Status: Stable
                  </span>
                </div>
              </div>
            </div>

            <button className="flex flex-row justify-center items-center gap-2 w-full py-3 bg-white/10 rounded-xl text-white text-[14px] font-bold hover:bg-white/20 transition-colors">
              View Full Profile
              <ChevronRight size={6} color="#FFFFFF" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};