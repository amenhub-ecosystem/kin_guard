// pages/EmergencyCenterPage.tsx
import React, { useState } from 'react';

// TODO: Verify exact icon names from your existing icon library.
import {
  Alert, // Main banner & Modal alert icon
  MapPin,               // Location icon
  HeartThrob,                // Last Activity icon
  Check,                // Check-in & Selection icons
  DevicePhoneMobile,    // GPS / Device icon
  Users,                // Family Circle
  User,                 // Primary Caregiver & Doctor
  Truck,                // EMS (Ambulance)
  Stetoscope,          // Personal Doctor
} from '@/components/common/icons';

// --- Sub-components ---

interface SelectionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isSelected: boolean;
  onClick: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  icon,
  title,
  subtitle,
  isSelected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-row justify-between items-center p-4 rounded-2xl border-2 transition-all ${
        isSelected
          ? 'bg-[#FEF2F2] border-[#EF4444]'
          : 'bg-white border-[#E5E7EB] hover:border-gray-300'
      }`}
    >
      <div className="flex flex-row items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isSelected ? 'bg-white shadow-sm' : 'bg-[#F8FAFC]'
          }`}
        >
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[16px] font-bold text-[#1B2A4A]">{title}</span>
          <span
            className={`text-[12px] ${
              isSelected ? 'text-[rgba(239,68,68,0.7)]' : 'text-[#64748B]'
            }`}
          >
            {subtitle}
          </span>
        </div>
      </div>
      {isSelected ? (
        <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center">
          <Check size={14} color="#FFFFFF" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full border-2 border-[#E5E7EB]" />
      )}
    </button>
  );
};

interface ProgressItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  label: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  icon,
  isActive = false,
  isCompleted = false,
  label,
}) => {
  return (
    <div
      className={`flex flex-row items-center gap-4 ${
        !isActive && !isCompleted ? 'opacity-30' : ''
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isCompleted
            ? 'bg-[#009688]'
            : isActive
            ? 'bg-transparent border-2 border-[#CBD5E1]'
            : 'bg-transparent border-2 border-[#CBD5E1]'
        }`}
      >
        {isCompleted ? (
          <Check size={14} color="#FFFFFF" />
        ) : (
          <span className="text-[#94A3B8]">{icon}</span>
        )}
      </div>
      <span
        className={`text-[16px] font-medium ${
          isCompleted
            ? 'text-[#009688]'
            : isActive
            ? 'text-[#64748B]'
            : 'text-[#64748B]'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

// --- Modal Component ---

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001F3F]/60 backdrop-blur-sm">
      <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
        
        {/* Top Red Section */}
        <div className="bg-[#FEF2F2] p-8 flex flex-col items-center gap-4">
          <div className="relative w-20 h-20 rounded-full bg-white border-4 border-[#EF4444] flex items-center justify-center shadow-sm">
            <Alert size={40} color="#EF4444" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-[28px] font-black text-[#1B2A4A] tracking-[-0.015em]">
              Confirm SOS Alert?
            </h2>
            <span className="text-[14px] font-bold text-[#EF4444] uppercase tracking-[0.35px]">
              Critical Action Required
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col items-center gap-6">
          <p className="text-center text-[16px] leading-[26px] text-[#64748B]">
            By confirming, an emergency alert will be broadcast to all selected
            recipients via <span className="font-semibold">Push, Call, and WhatsApp</span>.
            This action cannot be undone.
          </p>

          <div className="w-full flex flex-col gap-4">
            <button
              onClick={onConfirm}
              className="w-full py-5 bg-[#EF4444] text-white text-[18px] font-black rounded-2xl shadow-[0_10px_15px_-3px_#FECACA,0_4px_6px_-4px_#FECACA] hover:bg-[#dc2626] transition-colors"
            >
              SEND ALERT NOW
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 text-[16px] font-semibold text-[#64748B] hover:text-[#1B2A4A] transition-colors"
            >
              Cancel - Go Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8FAFC] border-t border-gray-200 py-4 px-8 flex justify-center">
          <span className="text-[12px] text-[#9CA3AF]">
            A safety log will be created for this event.
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const EmergencyCenterPage: React.FC = () => {
  // State for emergency selection
  const [selections, setSelections] = useState({
    family: true,
    caregivers: true,
    ems: false,
    doctor: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSelection = (key: keyof typeof selections) => {
    setSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSendAlert = () => {
    setIsModalOpen(false);
    // TODO: Implement actual API call to trigger emergency protocol
    console.log('🚨 Emergency SOS Activated with selections:', selections);
    alert('🚨 Emergency SOS has been activated!');
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1096px] mx-auto">
      
      {/* --- Emergency Header Banner --- */}
      <section className="relative w-full bg-[#EF4444] rounded-3xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-4 h-4 bg-white/30 rounded-full animate-ping" />
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <h1 className="text-[32px] font-bold text-white tracking-[-0.8px]">
                🚨 Emergency SOS Control
              </h1>
            </div>
            <p className="text-[18px] text-white/80 tracking-[-0.0009em]">
              Initiate a critical alert for Mama Grace. All contacts will be notified instantly.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl">
            <span className="text-[14px] font-medium text-white tracking-[0.0029em]">
              Status: Monitoring
            </span>
          </div>
        </div>
      </section>

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Loved One Status & Map (Span 4) */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          
          {/* Status Card */}
          <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
            <h2 className="text-[18px] font-bold text-[#1B2A4A]">Loved One Status</h2>
            
            <div className="flex flex-row items-center gap-4 pb-4 border-b border-[#F1F5F9]">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                 {/* TODO: Replace with actual exported image asset */}
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Mama Grace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] font-bold text-[#1B2A4A]">Mama Grace</span>
                <span className="text-[14px] text-[#64748B]">82 years old • High Priority</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Location */}
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <MapPin size={16} color="#EF4444" />
                  <span className="text-[14px] text-[#64748B] tracking-[0.005em]">Current Location</span>
                </div>
                <span className="text-[14px] font-semibold text-[#1B2A4A] tracking-[0.0019em]">128 West Park St.</span>
              </div>
              {/* Last Activity */}
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <HeartThrob size={16} color="#009688" />
                  <span className="text-[14px] text-[#64748B] tracking-[0.0009em]">Last Activity</span>
                </div>
                <span className="text-[14px] font-semibold text-[#1B2A4A] tracking-[0.0009em]">8 mins ago (Vitals)</span>
              </div>
              {/* Last Check-in */}
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <Check size={16} color="#003665" />
                  <span className="text-[14px] text-[#64748B] tracking-[0.0029em]">Last Check-in</span>
                </div>
                <span className="text-[14px] font-semibold text-[#1B2A4A] tracking-[0.0009em]">Today, 10:45 AM</span>
              </div>
            </div>
          </section>

          {/* Map Card */}
          <section className="relative w-full h-[280px] bg-[#E2E8F0] border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center">
            {/* TODO: Replace with actual exported map image asset */}
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=128+West+Park+St&zoom=15&size=600x300&key=YOUR_API_KEY')] bg-cover bg-center opacity-80" />
            
            {/* Pulse Circle Overlay */}
            <div className="absolute w-20 h-20 rounded-full border-4 border-[#EF4444] bg-white/10 backdrop-blur-[1px] flex items-center justify-center animate-pulse shadow-[0_0_0_4px_rgba(239,68,68,0.2)]">
              <Alert size={32} color="#EF4444" />
            </div>

            {/* Device Status Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-white rounded-xl p-3 shadow-lg">
              <div className="flex flex-row items-center gap-2">
                <DevicePhoneMobile size={18} color="#009688" />
                <span className="text-[12px] font-medium text-[#1B2A4A]">
                  Device: 78% Battery • GPS Active
                </span>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Alert Controls & Progress (Span 8) */}
        <div className="flex flex-col gap-8 lg:col-span-8">
          
          {/* Send Emergency Alert Section */}
          <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] font-bold text-[#1B2A4A]">Send Emergency Alert</h2>
              <p className="text-[16px] text-[#64748B] leading-[24px]">
                Select recipients to notify immediately. Default selections are based on the emergency
                protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectionCard
                icon={<Users size={24} color="#EF4444" />}
                title="Family Circle"
                subtitle="5 contacts • Direct Call"
                isSelected={selections.family}
                onClick={() => toggleSelection('family')}
              />
              <SelectionCard
                icon={<User size={24} color="#EF4444" />}
                title="Primary Caregivers"
                subtitle="2 contacts • Push Alert"
                isSelected={selections.caregivers}
                onClick={() => toggleSelection('caregivers')}
              />
              <SelectionCard
                icon={<Truck size={24} color="#64748B" />}
                title="Local Emergency EMS"
                subtitle="Dispatch 911"
                isSelected={selections.ems}
                onClick={() => toggleSelection('ems')}
              />
              <SelectionCard
                icon={<Stetoscope size={24} color="#64748B" />}
                title="Personal Doctor"
                subtitle="Dr. Aris • Office line"
                isSelected={selections.doctor}
                onClick={() => toggleSelection('doctor')}
              />
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#EF4444] text-white text-[24px] font-black uppercase tracking-[2.4px] py-6 rounded-3xl shadow-[0_20px_25px_-5px_#FECACA,0_8px_10px_-6px_#FECACA] hover:bg-[#dc2626] transition-all transform hover:scale-[1.02]"
              >
                Activate Emergency SOS
              </button>
            </div>
          </section>

          {/* Live Progress Section */}
          <section className="bg-[#F8FAFC] border-2 border-dashed border-[#E5E7EB] rounded-3xl p-8 flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.003em]">Live Progress</h3>
              <span className="text-[12px] text-[#9CA3AF]">ACTIVITY_LOG: READY</span>
            </div>
            
            <div className="flex flex-col gap-5">
              <ProgressItem
                icon={<Check size={16} color="#FFFFFF" />}
                isCompleted
                label="KinGuard Server: Active & Monitoring"
              />
              <ProgressItem
                icon={<Alert size={16} color="#94A3B8" />}
                isActive
                label="Awaiting activation signal..."
              />
              <ProgressItem
                icon={<Users size={16} color="#94A3B8" />}
                label="Family notification pending"
              />
              <ProgressItem
                icon={<DevicePhoneMobile size={16} color="#94A3B8" />}
                label="WhatsApp delivery pending"
              />
            </div>
          </section>

        </div>
      </div>

      {/* --- Confirmation Modal Overlay --- */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSendAlert}
      />
    </div>
  );
};