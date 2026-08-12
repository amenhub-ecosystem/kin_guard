// pages/FamilyMembersDesktopLovedOneScreenPage.tsx
import React from 'react';

// Exact exports from your provided icon library list
import {
  MapPin,           // Location
  HeartThrob,       // Pulse
  Pencil,           // Edit
  RotateCw,         // Sync / Refresh
  Pills,            // Medication
  CheckCircle,      // Taken status & Avatar badge
  Bell,             // Next reminder / Emergency contacts header
  Plus,             // Add Care Note
  EllipsisVertical, // More menu
  File,             // View Reports
  PaperPlane,       // Send Check-in
  UserPlus,         // Invite Caregiver
  Phone,            // Call button
} from '@/components/common/icons';

// --- Types & Interfaces ---

interface PillTagProps {
  label: string;
  bgColor: string;
  textColor?: string;
  borderColor?: string;
}

interface MedicationItemProps {
  iconColor: string;
  icon: React.ReactNode;
  name: string;
  dosage: string;
  schedule: string;
  status: 'taken' | 'next';
  statusText: string;
  statusColor: string;
  statusIconColor: string;
  statusIcon: React.ReactNode;
}

interface CareNoteProps {
  title: string;
  timestamp: string;
  content: string;
  borderColor: string;
  authorName: string;
  authorAvatar: string;
}

// --- Sub-components ---

const PillTag: React.FC<PillTagProps> = ({ label, bgColor, textColor = '#1B2A4A', borderColor }) => {
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-[13px] font-medium rounded-lg"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: borderColor ? `1px solid ${borderColor}` : '1px solid #E5E7EB',
      }}
    >
      {label}
    </span>
  );
};

const MedicationItem: React.FC<MedicationItemProps> = ({
  icon,
  name,
  dosage,
  schedule,
  status,
  statusText,
  statusColor,
  statusIconColor,
  statusIcon,
}) => {
  return (
    <div className="flex flex-row justify-between items-center px-4 py-4 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl">
      <div className="flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <span className="text-[16px] font-bold text-[#1B2A4A]">{name}</span>
            <span className="text-[14px] text-[#64748B]">{dosage}</span>
          </div>
          <span className="text-[13px] text-[#64748B] tracking-[0.0009em]">{schedule}</span>
        </div>
      </div>
      <div
        className={`flex flex-row items-center gap-2 bg-white shadow-sm rounded-full px-3 py-1.5 ${
          status === 'taken' ? 'text-[#009688]' : 'text-[#64748B]'
        }`}
        style={{ color: statusColor }}
      >
        <span className="flex items-center justify-center" style={{ color: statusIconColor }}>
          {statusIcon}
        </span>
        <span className="text-[12px] font-bold">{statusText}</span>
      </div>
    </div>
  );
};

const CareNote: React.FC<CareNoteProps> = ({ title, timestamp, content, borderColor, authorName, authorAvatar }) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-[#F8FAFC] rounded-2xl border-l-4" style={{ borderColor }}>
      <div className="flex flex-row justify-between items-center">
        <span className="text-[14px] font-bold text-[#1B2A4A]">{title}</span>
        <span className="text-[12px] text-[#94A3B8] tracking-[0.0039em]">{timestamp}</span>
      </div>
      <p className="text-[14px] leading-[23px] text-[#64748B]">{content}</p>
      <div className="flex flex-row items-center gap-2 mt-1">
        {/* TODO: Replace with actual exported image asset */}
        <img src={authorAvatar} alt={authorName} className="w-5 h-5 rounded-full object-cover" />
        <span className="text-[12px] text-[#64748B] tracking-[0.008em]">By {authorName}</span>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ dotColor: string; title: string; timestamp: string; isLast?: boolean }> = ({
  dotColor,
  title,
  timestamp,
  isLast,
}) => {
  return (
    <div className="relative flex flex-row gap-4 pb-5 last:pb-0">
      {/* Timeline Dot & Line */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-2 h-2 rounded-full z-10" style={{ backgroundColor: dotColor }} />
        {!isLast && <div className="w-0.5 flex-1 bg-[#E5E7EB] mt-1 min-h-[30px]" />}
      </div>
      {/* Content */}
      <div className="flex flex-col pt-0.5">
        <span className="text-[13px] font-medium text-[#1B2A4A] tracking-[0.0009em]">{title}</span>
        <span className="text-[12px] text-[#94A3B8]">{timestamp}</span>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const FamilyMembersDesktopLovedOneScreenPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full pb-8 mx-auto max-w-[1160px] p-8">
      
      {/* --- Section 1: Profile Header --- */}
      <section className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div className="flex flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative w-[120px] h-[120px] shrink-0">
            {/* TODO: Replace with actual exported image asset */}
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Mama Grace"
              className="w-full h-full rounded-[32px] object-cover border-4 border-[#F1F5F9] shadow-lg"
            />
            <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-[#009688] border-4 border-white rounded-full flex items-center justify-center">
              <CheckCircle size={14} color="#FFFFFF" />
            </div>
          </div>
          {/* Text Info */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-3 flex-wrap">
              <h1 className="text-[32px] font-bold text-[#1B2A4A] tracking-[-0.8px]">Mama Grace</h1>
              <span className="bg-[#FEF2F2] border border-[rgba(239,68,68,0.2)] text-[#EF4444] text-[12px] font-bold uppercase tracking-[0.0029em] px-4 py-1 rounded-full">
                High Priority
              </span>
            </div>
            <p className="text-[18px] text-[#64748B]">Primary Loved One • Active since June 2023</p>
            <div className="flex flex-row items-center gap-4 mt-1 flex-wrap">
              {/* Pulse Badge */}
              <div className="flex flex-row items-center gap-2 bg-[#F0FDF4] px-3 py-1.5 rounded-lg">
                <HeartThrob size={14} color="#009688" />
                <span className="text-[14px] font-medium text-[#009688] tracking-[0.009em]">Pulse: 72 BPM</span>
              </div>
              {/* Location Badge */}
              <div className="flex flex-row items-center gap-2 bg-[#F1F5F9] px-3 py-1.5 rounded-lg">
                <MapPin size={14} color="#003665" />
                <span className="text-[14px] font-medium text-[#003665] tracking-[0.003em]">At Home</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 shrink-0 flex-wrap">
          <button className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] text-[#001F3F] font-semibold text-[16px] px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <File size={16} color="#001F3F" />
            View Reports
          </button>
          <button className="flex items-center gap-2 bg-[#003665] text-white font-semibold text-[16px] px-5 py-3 rounded-xl shadow-md hover:bg-[#002a52] transition-colors">
            <PaperPlane size={16} color="#FFFFFF" />
            Send Check-in
          </button>
          <button className="bg-white border border-[#E5E7EB] text-gray-500 p-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center">
            <EllipsisVertical size={20} color="#64748B" />
          </button>
        </div>
      </section>

      {/* --- Section 2: Main Grid Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* === Left Column (8 Cols) === */}
        <div className="flex flex-col gap-8 lg:col-span-8">
          
          {/* 1. Personal Information & Health Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <section className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-bold text-[#1B2A4A]">Personal Information</h2>
                <button className="text-[#9CA3AF] hover:text-[#64748B] transition-colors">
                  <Pencil size={16} color="#9CA3AF" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold uppercase text-[#94A3B8] tracking-wide">Date of Birth</span>
                  <span className="text-[16px] font-medium text-[#1B2A4A]">May 12, 1941 (82 years old)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold uppercase text-[#94A3B8] tracking-wide">Blood Type</span>
                  <span className="text-[18px] font-bold text-[#EF4444]">O Positive</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold uppercase text-[#94A3B8] tracking-wide">Residential Address</span>
                  <span className="text-[16px] font-medium text-[#1B2A4A] leading-[26px]">128 West Park Street, Emerald Hills, CA 90210</span>
                </div>
              </div>
            </section>

            {/* Health Profile */}
            <section className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.0029em]">Health Profile</h2>
                <button className="text-[#009688] hover:text-[#007d71] transition-colors">
                  <RotateCw size={18} color="#009688" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold uppercase text-[#94A3B8] tracking-wide">Medical Conditions</span>
                  <div className="flex flex-wrap gap-2">
                    <PillTag label="Hypertension" bgColor="#F1F5F9" />
                    <PillTag label="Type 2 Diabetes" bgColor="#F1F5F9" />
                    <PillTag label="Arthritis" bgColor="#F1F5F9" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold uppercase text-[#EF4444] tracking-wide">Allergies & Risks</span>
                  <div className="flex flex-wrap gap-2">
                    <PillTag label="Penicillin" bgColor="#FEF2F2" textColor="#DC2626" borderColor="#FECACA" />
                    <PillTag label="Peanuts" bgColor="#FEF2F2" textColor="#DC2626" borderColor="#FECACA" />
                    <PillTag label="Fall Risk" bgColor="#FFF7ED" textColor="#C2410C" borderColor="#FED7AA" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 2. Medication Summary */}
          <section className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-3">
                <h2 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.0019em]">Medication Summary</h2>
                <span className="bg-[#003665] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">4 ACTIVE</span>
              </div>
              <button className="text-[#003665] text-[14px] font-semibold hover:underline">Manage All</button>
            </div>
            <div className="flex flex-col gap-3">
              <MedicationItem
                icon={<Pills size={24} color="#009688" />}
                iconColor="#009688"
                name="Lisinopril"
                dosage="(10mg)"
                schedule="Daily • Morning after breakfast"
                status="taken"
                statusText="TAKEN 08:30 AM"
                statusColor="#009688"
                statusIconColor="#009688"
                statusIcon={<CheckCircle size={12} color="#009688" />}
              />
              <MedicationItem
                icon={<Pills size={24} color="#003665" />}
                iconColor="#003665"
                name="Metformin"
                dosage="(500mg)"
                schedule="Twice Daily • Morning & Evening"
                status="next"
                statusText="NEXT: 07:00 PM"
                statusColor="#64748B"
                statusIconColor="#64748B"
                statusIcon={<Bell size={12} color="#64748B" />}
              />
              <MedicationItem
                icon={<Pills size={24} color="#EF4444" />}
                iconColor="#EF4444"
                name="Aspirin Low Dose"
                dosage="(81mg)"
                schedule="Daily • Evening"
                status="next"
                statusText="NEXT: 08:00 PM"
                statusColor="#64748B"
                statusIconColor="#64748B"
                statusIcon={<Bell size={12} color="#64748B" />}
              />
            </div>
          </section>

          {/* 3. Care Notes */}
          <section className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.0009em]">Care Notes</h2>
              <button className="bg-[#F1F5F9] p-2 rounded-lg text-[#003665] hover:bg-gray-200 transition-colors">
                <Plus size={18} color="#003665" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <CareNote
                borderColor="#009688"
                title="Daily Mobility Note"
                timestamp="Oct 24 • 10:20 AM"
                content="Mama Grace was able to walk to the garden today without using her cane. Her balance seems to be improving with the new physical therapy exercises."
                authorName="Sarah (Nurse)"
                authorAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
              />
              <CareNote
                borderColor="#EF4444"
                title="Dietary Observation"
                timestamp="Oct 22 • 06:45 PM"
                content="Slight loss of appetite noted during dinner. Monitored blood sugar levels, which were slightly elevated (145 mg/dL). Will monitor closely tomorrow."
                authorName="Israel H."
                authorAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
              />
            </div>
          </section>
        </div>

        {/* === Right Column (4 Cols) === */}
        <div className="flex flex-col gap-8 lg:col-span-4">
          
          {/* 1. Emergency Contacts */}
          <section className="bg-[#003665] rounded-3xl shadow-lg p-6 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl -right-10 -bottom-10 w-48 h-48 pointer-events-none" />
            <div className="flex flex-row items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center">
                <Bell size={14} color="#FFFFFF" />
              </div>
              <h2 className="text-[18px] font-bold text-white tracking-[-0.0019em]">Emergency Contacts</h2>
            </div>
            <div className="flex flex-col gap-3 relative z-10">
              <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  {/* TODO: Replace with actual exported image asset */}
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Israel Harrison" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white tracking-[0.005em]">Israel Harrison</span>
                    <span className="text-[12px] text-white/60 tracking-[0.0029em]">Son • 1st Priority</span>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#009688] flex items-center justify-center hover:bg-[#007d71] transition-colors">
                  <Phone size={14} color="#FFFFFF" />
                </button>
              </div>
              <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  {/* TODO: Replace with actual exported image asset */}
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" alt="Dr. Aris Thompson" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white">Dr. Aris Thompson</span>
                    <span className="text-[12px] text-white/60">Physician • Clinical</span>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#009688] flex items-center justify-center hover:bg-[#007d71] transition-colors">
                  <Phone size={14} color="#FFFFFF" />
                </button>
              </div>
            </div>
            <button className="w-full border border-white/20 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors relative z-10 mt-2">
              Manage Emergency Protocol
            </button>
          </section>

          {/* 2. Care Circle */}
          <section className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.0029em]">Care Circle</h2>
              <span className="text-[14px] text-[#64748B] tracking-[0.007em]">4 Members</span>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Sarah Jenkins', role: 'Registered Nurse', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100', online: true },
                { name: 'Mark Wilson', role: 'Evening Caretaker', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', online: false },
                { name: 'Emily Chen', role: 'Family Member', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100', online: true },
                { name: 'Israel Harrison', role: 'Primary Admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', online: true },
              ].map((member, idx) => (
                <div key={idx} className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#1B2A4A] tracking-[0.0029em]">{member.name}</span>
                      <span className="text-[12px] text-[#64748B] tracking-[0.004em]">{member.role}</span>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${member.online ? 'bg-[#009688]' : 'bg-[#94A3B8]'}`} />
                </div>
              ))}
            </div>
            <button className="w-full bg-[#F1F5F9] text-[#003665] text-[14px] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors mt-2">
              <UserPlus size={18} color="#003665" />
              Invite Caregiver
            </button>
          </section>

          {/* 3. Recent Activity */}
          <section className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6">
            <h2 className="text-[18px] font-bold text-[#1B2A4A]">Recent Activity</h2>
            <div className="flex flex-col relative">
              {[
                { dotColor: '#003665', title: 'Device check-in completed', timestamp: 'Today, 11:15 AM' },
                { dotColor: '#009688', title: 'Vitals synced: BP 120/80', timestamp: 'Today, 09:45 AM' },
                { dotColor: '#EF4444', title: 'Low battery alert (Device)', timestamp: 'Yesterday, 10:30 PM' },
              ].map((item, idx, arr) => (
                <ActivityItem
                  key={idx}
                  dotColor={item.dotColor}
                  title={item.title}
                  timestamp={item.timestamp}
                  isLast={idx === arr.length - 1}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};