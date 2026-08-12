// pages/FamilyMemberCareCirclePage.tsx
import React from 'react';

// Exact exports from your provided icon library list
import {
  EllipsisVertical, // More menu icon
  Envelope,         // Email icon
  Phone,            // Phone icon
  MapPin,           // Check-in / Location icon
} from '@/components/common/icons';

// --- Types & Interfaces ---

interface CareCircleMember {
  id: string;
  name: string;
  role: string;
  badgeType: 'admin' | 'standard'; // Controls badge colors
  email: string;
  phone: string;
  avatar: string;
  statusType: 'online' | 'offline' | 'check-in' | 'last-contact';
  statusText: string;
}

// --- Sub-components ---

interface MemberCardProps {
  member: CareCircleMember;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const isAdmin = member.badgeType === 'admin';
  const isOnline = member.statusType === 'online' || member.statusType === 'check-in';

  return (
    <div className="flex flex-col gap-6 p-6 bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl w-full max-w-[528px]">
      
      {/* Header: Avatar, Name, Badge & Menu */}
      <div className="flex flex-row justify-between items-start w-full">
        <div className="flex flex-row items-center gap-4 relative">
          <div className="relative w-16 h-16 shrink-0">
            {/* TODO: Replace with actual exported image asset */}
            <img
              src={member.avatar}
              alt={member.name}
              className={`w-full h-full rounded-full object-cover border-2 ${
                isOnline ? 'border-[#009688]' : 'border-white'
              }`}
            />
            {/* Status Dot */}
            {member.statusType !== 'last-contact' && (
              <div
                className={`absolute -right-0.5 bottom-0.5 w-4 h-4 rounded-full border-2 border-white ${
                  isOnline ? 'bg-[#009688]' : 'bg-[#D1D5DB]'
                }`}
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-bold text-[#001F3F] tracking-[0.0019em]">
              {member.name}
            </h3>
            <span
              className={`px-2.5 py-0.5 text-[12px] font-semibold rounded ${
                isAdmin
                  ? 'bg-[#E0F2F1] text-[#009688]'
                  : 'bg-[#E6E9EF] text-[#001F3F]'
              }`}
            >
              {member.role}
            </span>
          </div>
        </div>

        <button className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors pt-1">
          <EllipsisVertical size={20} color="#9CA3AF" />
        </button>
      </div>

      {/* Contact Details */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3 text-[14px] text-[#6B7280]">
          <Envelope size={16} color="#6B7280" />
          <span>{member.email}</span>
        </div>
        <div className="flex flex-row items-center gap-3 text-[14px] text-[#6B7280]">
          <Phone size={16} color="#6B7280" />
          <span>{member.phone}</span>
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex flex-row items-center gap-2 pt-2">
        {member.statusType === 'online' && (
          <>
            <div className="w-2 h-2 rounded-full bg-[#009688]" />
            <span className="text-[12px] font-medium text-[#009688] tracking-[0.0009em]">
              {member.statusText}
            </span>
          </>
        )}

        {member.statusType === 'offline' && (
          <>
            <div className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
            <span className="text-[12px] font-medium text-[#6B7280] tracking-[0.0009em]">
              {member.statusText}
            </span>
          </>
        )}

        {member.statusType === 'check-in' && (
          <div className="flex flex-row items-center gap-2">
            <MapPin size={10} color="#009688" />
            <span className="text-[12px] font-bold text-[#009688] tracking-[0.0029em]">
              {member.statusText}
            </span>
          </div>
        )}

        {member.statusType === 'last-contact' && (
          <span className="text-[12px] font-medium text-[#6B7280]">
            {member.statusText}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const FamilyMemberCareCirclePage: React.FC = () => {
  // Mock Data matching the exact screenshot
  const members: CareCircleMember[] = [
    {
      id: '1',
      name: 'Israel Harrison',
      role: 'Administrator',
      badgeType: 'admin',
      email: 'israel.h@kinguard.com',
      phone: '+1 (555) 012-3456',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
      statusType: 'online',
      statusText: 'Online Now',
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      role: 'Daughter',
      badgeType: 'standard',
      email: 'sarah.j@family.com',
      phone: '+1 (555) 098-7654',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
      statusType: 'offline',
      statusText: 'Last seen 2h ago',
    },
    {
      id: '3',
      name: 'Mary Elder',
      role: 'Caregiver',
      badgeType: 'standard',
      email: 'mary.care@services.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
      statusType: 'check-in',
      statusText: 'Currently checked in',
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      role: 'Healthcare Provider',
      badgeType: 'standard',
      email: 'dr.j.wilson@hospital.org',
      phone: '+1 (555) 888-0000',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      statusType: 'last-contact',
      statusText: 'Last contact: Oct 20, 2024',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1080px] mx-auto pt-6">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[40px] font-bold text-[#001F3F] tracking-[-0.01em]">
          Care Circle
        </h2>
        <p className="text-[16px] text-[#6B7280]">
          Welcome to the family circle for Mama Grace.
        </p>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
      
    </div>
  );
};