// pages/NotificationCenterPage.tsx
import React, { useState } from 'react';

// TODO: Verify exact icon names from your existing icon library.
import {
  Alert, // Emergency Alert
  Pills,               // Medication Reminder
  ChatBubbleLeftRight, // New Message
  CheckCircle,         // Daily Check-in
  UserPlus,            // Invitation Accepted
  Chart,            // Weekly Health Insight
  Envelope,            // Mark as Read
  Trash,               // Clear All
  EllipsisVertical,    // More Options
} from '@/components/common/icons';

// --- Types & Interfaces ---

interface NotificationItem {
  id: string;
  type: 'alert' | 'medication' | 'message' | 'checkin' | 'invitation' | 'insight';
  title: string;
  description: string;
  timestamp: string;
  iconBg: string;
  iconColor: string;
  unreadColor?: string; // If undefined, no unread dot is shown
}

// --- Mock Data ---

const notifications: NotificationItem[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Emergency Alert: Fall Detected',
    description: 'A potential fall was detected in the living room for Mary. Sensor ID: LR-229. Emergency protocols initiated.',
    timestamp: '09:12 AM',
    iconBg: 'bg-[#FEF2F2]',
    iconColor: '#EF4444',
    unreadColor: '#EF4444',
  },
  {
    id: '2',
    type: 'medication',
    title: 'Medication Reminder: Lisinopril',
    description: "Mary's morning dose of 10mg Lisinopril is due now. Please verify once administered.",
    timestamp: '08:00 AM',
    iconBg: 'bg-[#FFF1F0]',
    iconColor: '#FE706D',
    unreadColor: '#FE706D',
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message from Sarah Jenkins',
    description: '"I\'ll be there by 4:00 PM today for the physical therapy session. Mary is doing great!"',
    timestamp: '4m ago',
    iconBg: 'bg-[#EEF2FF]',
    iconColor: '#4F46E5',
    unreadColor: '#6366F1',
  },
  {
    id: '4',
    type: 'checkin',
    title: 'Daily Check-in Completed',
    description: 'Sarah J. logged a visit. "Mom was in great spirits. We went for a short walk in the garden."',
    timestamp: '06:45 PM',
    iconBg: 'bg-[#F0FDFA]',
    iconColor: '#009688',
  },
  {
    id: '5',
    type: 'invitation',
    title: 'Invitation Accepted',
    description: 'Mark Stevens has joined the Family Circle for Mary.',
    timestamp: '02:30 PM',
    iconBg: 'bg-[#FFFBEB]',
    iconColor: '#F59E0B',
  },
  {
    id: '6',
    type: 'insight',
    title: 'Weekly Health Insight Ready',
    description: "Mary's adherence score improved by 12% this week! View the full report in Health Insights.",
    timestamp: 'Oct 20',
    iconBg: 'bg-[#EFF6FF]',
    iconColor: '#001F3F',
  },
];

// --- Sub-components ---

interface FilterTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterTab: React.FC<FilterTabProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 text-[14px] font-semibold rounded-xl transition-colors ${
        active
          ? 'bg-[#001F3F] text-white'
          : 'text-[#6B7280] hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
};

interface NotificationCardProps {
  item: NotificationItem;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ item }) => {
  // Map specific notification types to their respective icons
  const renderIcon = () => {
    const props = { size: 24, color: item.iconColor };
    switch (item.type) {
      case 'alert': return <Alert {...props} />;
      case 'medication': return <Pills {...props} />;
      case 'message': return <ChatBubbleLeftRight {...props} />;
      case 'checkin': return <CheckCircle {...props} />;
      case 'invitation': return <UserPlus {...props} />;
      case 'insight': return <Chart {...props} />;
      default: return <Alert {...props} />;
    }
  };

  return (
    <div className="flex flex-row items-center gap-5 px-6 py-5 bg-white border border-[#F9FAFB] rounded-3xl shadow-sm w-full transition-shadow hover:shadow-md">
      {/* Icon Wrapper */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
        {renderIcon()}
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex flex-row justify-between items-start gap-4">
          <h4 className="text-[16px] font-bold text-[#001F3F] tracking-[-0.0019em] truncate">
            {item.title}
          </h4>
          <span className="text-[11px] font-bold text-[#9CA3AF] tracking-[0.008em] shrink-0 pt-0.5">
            {item.timestamp}
          </span>
        </div>
        <p className="text-[14px] leading-[23px] text-[#6B7280] truncate">
          {item.description}
        </p>
      </div>

      {/* Actions Wrapper */}
      <div className="flex flex-row items-center gap-3 shrink-0">
        <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <EllipsisVertical size={16} color="#9CA3AF" />
        </button>
        {item.unreadColor && (
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: item.unreadColor }}
          />
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const NotificationCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Medication', 'Emergency', 'Invitations', 'Messages', 'Check-ins'];

  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1152px] mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[30px] font-bold text-[#001F3F]">
            Notification Center
          </h1>
          <p className="text-[14px] text-[#6B7280] tracking-[0.0009em]">
            Stay updated with your family's health and activity logs.
          </p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#001F3F] text-[14px] font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Envelope size={14} color="#001F3F" />
            Mark as Read
          </button>
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#001F3F] text-[14px] font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Trash size={14} color="#001F3F" />
            Clear All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-[#F9FAFB] shadow-sm rounded-2xl p-1.5 flex flex-wrap gap-1 self-start">
        {tabs.map((tab) => (
          <FilterTab
            key={tab}
            label={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-10">
        
        {/* Section: Today */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-[1.2px] shrink-0">
              Today
            </span>
            <div className="flex-1 h-px bg-[#F3F4F6]" />
          </div>
          <div className="flex flex-col gap-3">
            {notifications.slice(0, 3).map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Section: Yesterday */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-[1.2px] shrink-0">
              Yesterday
            </span>
            <div className="flex-1 h-px bg-[#F3F4F6]" />
          </div>
          <div className="flex flex-col gap-3">
            {notifications.slice(3, 5).map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Section: Earlier this week */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-[1.2px] shrink-0">
              Earlier this week
            </span>
            <div className="flex-1 h-px bg-[#F3F4F6]" />
          </div>
          <div className="flex flex-col gap-3">
            {notifications.slice(5, 6).map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};