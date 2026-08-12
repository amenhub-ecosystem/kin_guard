// pages/CareCirclePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Users,
  Plus,
  Mail,
  Phone,
  BuildingStorefront,
  Shield,
  Stetoscope,
  ChatBubbleLeftRight,
  EllipsisVertical,
  HeartThrob,
} from '@/components/common/icons';

// --- Sub-components ---

interface MemberCardProps {
  name: string;
  role: string;
  roleBadgeColor: string;
  roleTextColor: string;
  email?: string;
  phone?: string;
  iconColor?: string;
  status: 'online' | 'offline';
  statusMessage?: string;
  location?: string;
  lastContact?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  roleBadgeColor,
  roleTextColor,
  email,
  phone,
  iconColor = '#6B7280',
  status,
  statusMessage,
  location,
  lastContact,
}) => {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-start">
        {/* Avatar & Header */}
        <div className="flex flex-row items-center gap-4 relative">
          <div className="relative w-16 h-16 shrink-0">
            {/* TODO: Replace with actual exported image assets */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
              alt={name}
              className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div
              className={`absolute -right-0.5 bottom-0.5 w-4 h-4 rounded-full border-2 border-white ${
                status === 'online' ? 'bg-[#009688]' : 'bg-gray-300'
              }`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-bold text-[#001F3F] tracking-[0.0019em]">
              {name}
            </h3>
            <div
              className={`inline-flex px-3 py-0.5 rounded ${roleBadgeColor}`}
            >
              <span
                className={`text-[12px] font-semibold tracking-[0.0019em] ${roleTextColor}`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <EllipsisVertical size={20} color="#9CA3AF" />
        </button>
      </div>

      {/* Contact Details */}
      <div className="flex flex-col gap-2 mt-2">
        {email && (
          <div className="flex flex-row items-center gap-3">
            <Mail size={16} color={iconColor} />
            <span className="text-[14px] text-gray-500">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex flex-row items-center gap-3">
            <Phone size={16} color={iconColor} />
            <span className="text-[14px] text-gray-500">{phone}</span>
          </div>
        )}
        {location && (
          <div className="flex flex-row items-center gap-3">
            <BuildingStorefront size={16} color={iconColor} />
            <span className="text-[14px] text-gray-500">{location}</span>
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="flex flex-row items-center gap-2 pt-2 mt-auto">
        {statusMessage || lastContact ? (
          <>
            <div
              className={`w-2 h-2 rounded-full ${
                status === 'online' ? 'bg-[#009688]' : 'bg-[#D1D5DB]'
              }`}
            />
            <span className="text-[12px] font-medium text-[#6B7280]">
              {statusMessage || lastContact}
            </span>
          </>
        ) : null}
      </div>
    </article>
  );
};

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-row items-start gap-4 p-4 border border-dashed border-gray-200 rounded-xl w-full">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[16px] font-bold text-[#001F3F] tracking-[-0.0019em]">
          {title}
        </span>
        <span className="text-[14px] text-gray-500">{description}</span>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  avatar?: string;
  icon?: React.ReactNode; // Fallback system icon
  text: string;
  timestamp: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  avatar,
  icon,
  text,
  timestamp,
}) => {
  return (
    <div className="flex flex-row items-start gap-4">
      <div className="w-8 h-8 shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#001F3F] flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[12px] font-bold text-[#001F3F] tracking-[0.0019em]">
          {text}
        </span>
        <span className="text-[10px] text-gray-400 tracking-[0.006em]">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const CareCirclePage: React.FC = () => {
  const navigate = useNavigate();

  // Mock Data
  const members: MemberCardProps[] = [
    {
      name: 'Israel Harrison',
      role: 'Administrator',
      roleBadgeColor: 'bg-[#E0F2F1]',
      roleTextColor: 'text-[#009688]',
      email: 'israel.h@kinguard.com',
      phone: '+1 (555) 012-3456',
      status: 'online',
      statusMessage: 'Online Now',
      iconColor: '#6B7280',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Daughter',
      roleBadgeColor: 'bg-[#E6E9EF]',
      roleTextColor: 'text-[#001F3F]',
      email: 'sarah.j@family.com',
      phone: '+1 (555) 098-7654',
      status: 'offline',
      statusMessage: 'Last seen 2h ago',
      iconColor: '#6B7280',
    },
    {
      name: 'Mary Elder',
      role: 'Caregiver',
      roleBadgeColor: 'bg-[#E6E9EF]',
      roleTextColor: 'text-[#001F3F]',
      email: 'mary.care@services.com',
      phone: '+1 (555) 234-5678',
      status: 'online',
      statusMessage: 'Currently checked in',
      iconColor: '#6B7280',
    },
    {
      name: 'Dr. James Wilson',
      role: 'Healthcare Provider',
      roleBadgeColor: 'bg-[#E6E9EF]',
      roleTextColor: 'text-[#1A3B66]',
      phone: '+1 (555) 888-0000',
      location: "St. Mary's Geriatrics",
      status: 'offline',
      lastContact: 'Last contact: Oct 20, 2024',
      iconColor: '#6B7280',
    },
  ];

  const roles: RoleCardProps[] = [
    {
      icon: <Shield size={20} color="#001F3F" />,
      title: 'Administrator',
      description: 'Full access to health data, medication management, billing, and member invites.',
    },
    {
      icon: <Users size={20} color="#009688" />,
      title: 'Family Member',
      description: 'View health reports, receive check-in alerts, and message the caregiver.',
    },
    {
      icon: <Stetoscope size={20} color="#EF4444" />,
      title: 'Caregiver / Healthcare',
      description: 'Daily logging, medication marking, and emergency status updates.',
    },
  ];

  const activities: ActivityItemProps[] = [
    {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
      text: 'Mary Elder checked in',
      timestamp: '8:14 AM Today',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
      text: 'Sarah Jenkins joined the circle',
      timestamp: 'Yesterday, 5:30 PM',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
      text: "Israel Harrison updated Dr. James' contact info",
      timestamp: 'Oct 20, 11:20 AM',
    },
    {
      icon: <HeartThrob size={14} color="#FFFFFF" />,
      text: 'System Care plan updated',
      timestamp: 'Oct 18, 9:00 AM',
    },
  ];

  return (
    <div className="flex flex-col gap-10 w-full pb-8 max-w-[1080px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[40px] font-bold text-[#001F3F] tracking-[-0.01em]">
            Care Circle
          </h1>
          <p className="text-gray-500 text-[16px]">
            Manage the team caring for Mama Grace.
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/loved-one')}
          className="bg-[#FE706D] text-white font-bold text-[16px] px-6 py-3 rounded-full shadow-md hover:bg-[#fe5a56] transition-colors">
            Loved One Profile 
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/care-circle/invite')}
            className="bg-[#001F3F] text-white font-bold text-[16px] px-6 py-3 rounded-full shadow-md flex items-center gap-2 hover:bg-[#001533] transition-colors"
          >
            <Plus size={16} color="#FFFFFF" />
            Invite Member
          </button>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member, idx) => (
          <MemberCard key={idx} {...member} />
        ))}
      </div>

      {/* Roles & Permissions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Roles & Permissions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
          <h3 className="text-[20px] font-bold text-[#001F3F]">Roles & Permissions</h3>
          <div className="flex flex-col gap-4">
            {roles.map((role, idx) => (
              <RoleCard key={idx} {...role} />
            ))}
          </div>
        </div>

        {/* Right Column - Recent Circle Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
          <h3 className="text-[18px] font-bold text-[#001F3F]">Recent Circle Activity</h3>
          <div className="flex flex-col gap-6 mb-2">
            {activities.map((activity, idx) => (
              <ActivityItem key={idx} {...activity} />
            ))}
          </div>
          <button className="w-full bg-[#F9FAFB] text-[#001F3F] text-[12px] font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
            View Audit Log
          </button>
        </div>

      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-[#001F3F] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <ChatBubbleLeftRight size={20} color="#FFFFFF" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[16px] font-bold text-white tracking-[0.0029em]">
              Pro Tip: Communication is key
            </span>
            <span className="text-[14px] text-white/70 tracking-[-0.0019em]">
              Use the group chat feature to coordinate daily tasks with the whole circle.
            </span>
          </div>
        </div>
        <button className="bg-[#009688] text-white text-[16px] font-bold px-6 py-3 rounded-full shadow-sm hover:bg-[#007d71] transition-colors shrink-0">
          Open Group Chat
        </button>
      </div>
    </div>
  );
};