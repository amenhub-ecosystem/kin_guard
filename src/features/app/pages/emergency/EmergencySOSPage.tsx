// pages/EmergencySosPage.tsx
import React from 'react';

// Exact exports from your provided icon library list
import {
  Alert,           // Important Note / Warning icon
  Check,           // Progress checkmarks
  ChevronRight,    // "Open in Maps" and action chevrons
  Clock,           // "Active for 4 minutes" timer
  EmergencySos,    // Emergency Services / Map pulse
  MapPin,          // Location pin
  Phone,           // Call buttons
  Plus,            // Add member to Care Circle
  Users,           // Family Admin action
  Warning,         // Important Note warning
} from '@/components/common/icons';

// --- Sub-components ---

interface TimelineStepProps {
  status: 'done' | 'pending';
  title: string;
  subtitle: string;
  isLast?: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ status, title, subtitle, isLast }) => {
  return (
    <div className="flex flex-row items-start gap-6 pb-8 last:pb-0 relative">
      {/* Vertical Connecting Line (only render if not last to avoid hanging line) */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-[#E5E7EB]" />
      )}
      {/* Highlighted Green Line (overrides the grey line for first steps) */}
      {status === 'done' && !isLast && (
        <div className="absolute left-[19px] top-10 bottom-2 w-0.5 bg-[#3F8358] z-10" />
      )}

      {/* Status Dot */}
      <div className="relative z-20 flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-white border border-[#E5E7EB]">
        {status === 'done' ? (
          <div className="w-10 h-10 rounded-full bg-[#3F8358] flex items-center justify-center">
            <Check size={14} color="#FFFFFF" />
          </div>
        ) : (
          <div className="w-3 h-3 rounded-full bg-[#D89A2E]" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col pt-1">
        <h4 className="text-[16px] font-bold text-[#1B2A4A] leading-6">
          {title}
        </h4>
        <p className="text-[14px] text-[#64748B] leading-5 mt-0.5">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bgClass?: string;
  borderClass?: string;
  textColor?: string;
  iconBg?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  subtitle,
  bgClass = 'bg-[#F1F4F6]',
  borderClass = 'border-transparent',
  textColor = 'text-[#1B2A4A]',
  iconBg = 'bg-white',
}) => {
  return (
    <button className={`flex flex-row justify-between items-center p-5 rounded-2xl w-full ${bgClass} border ${borderClass} hover:shadow-md transition-shadow`}>
      <div className="flex flex-row items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${iconBg}`}>
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className={`text-[16px] font-bold leading-6 ${textColor}`}>
            {title}
          </span>
          <span className="text-[14px] text-[#64748B] leading-5">
            {subtitle}
          </span>
        </div>
      </div>
      <ChevronRight size={6} color="#64748B" />
    </button>
  );
};

// --- Main Page Component ---

export const EmergencySOSPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full pb-8 mx-auto max-w-[1160px]">
      
      {/* --- Top Red Banner --- */}
      <section className="relative w-full bg-[#D6483F] rounded-2xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-row justify-between items-center">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none bg-gradient-radial from-white/10 to-transparent opacity-40" />
        
        <div className="relative z-10 flex flex-row items-center gap-8">
          <div className="relative w-[104px] h-[104px] shrink-0">
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            {/* TODO: Replace with actual exported image asset (avatar-5.jpg) */}
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Mama Grace"
              className="relative w-[96px] h-[96px] m-1 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[36px] font-bold text-white leading-[40px]">
              Mama Grace needs help
            </h1>
            <div className="flex flex-row items-center gap-4">
              <span className="px-4 py-1 bg-white/20 text-white text-[14px] font-bold uppercase tracking-[0.7px] rounded-full">
                High Priority
              </span>
              <div className="flex flex-row items-center gap-2 text-white/80">
                <Clock size={16} color="rgba(255,255,255,0.8)" />
                <span className="text-[16px] font-medium tracking-[0.003em]">
                  Active for 4 minutes
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-end gap-2">
          <button className="px-8 py-3 bg-white text-[#D6483F] text-[18px] font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors">
            I'm responding
          </button>
          <span className="text-[14px] text-white/70 text-right">
            Will notify entire Care Circle
          </span>
        </div>
      </section>

      {/* --- Main 2-Column Grid --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* --- Left Column: Alert Progress + Live Location --- */}
        <div className="flex flex-col gap-8 xl:col-span-7">
          
          {/* 1. Alert Progress */}
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm flex flex-col gap-6">
            <h2 className="text-[20px] font-bold text-[#001F3F] tracking-[0.0009em]">
              Alert Progress
            </h2>
            <div className="flex flex-col relative pl-1">
              <TimelineStep
                status="done"
                title="SOS triggered"
                subtitle="3:42 PM • Automatic detection"
              />
              <TimelineStep
                status="done"
                title="Caregiver notified"
                subtitle="3:42 PM • Mary Johnson (You)"
              />
              <TimelineStep
                status="done"
                title="Family notified"
                subtitle="3:43 PM • 4 members reached"
              />
              <TimelineStep
                status="pending"
                title="Response pending"
                subtitle="Waiting for caregiver arrival"
                isLast
              />
            </div>
          </section>

          {/* 2. Live Location */}
          <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm flex flex-col overflow-hidden">
            <div className="flex flex-row justify-between items-center p-6">
              <h2 className="text-[18px] font-bold text-[#001F3F] tracking-[0.0029em]">
                Live Location
              </h2>
              <button className="flex flex-row items-center gap-2 text-[#003665] text-[14px] font-bold hover:underline">
                Open in Maps
                <ChevronRight size={6} color="#003665" />
              </button>
            </div>

            {/* Map Area */}
            <div className="relative w-full h-[256px] bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
              {/* TODO: Replace with actual exported map image asset */}
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=124+Garden+Grove+Ave,+Brooklyn&zoom=15&size=600x256&key=YOUR_API_KEY')] bg-cover bg-center opacity-60" />
              
              {/* Emergency Pulse Icon */}
              <div className="absolute flex items-center justify-center">
                <div className="absolute w-40 h-40 rounded-full bg-red-500/20 animate-ping" />
                <div className="absolute w-32 h-32 rounded-full bg-red-500/30 blur-xl" />
                <div className="relative w-28 h-28 rounded-full bg-[#D6483F] flex items-center justify-center border-4 border-white/80 shadow-2xl z-10">
                  <EmergencySos size={48} color="#FFFFFF" />
                </div>
              </div>
            </div>

            {/* Location Info Overlay */}
            <div className="p-4 bg-white/95 border-t border-[#E5E7EB] shadow-sm m-4 rounded-xl -mt-8 relative z-20">
              <div className="flex flex-row items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#003665] flex items-center justify-center shrink-0">
                  <MapPin size={14} color="#FFFFFF" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#1B2A4A]">
                    124 Garden Grove Ave, Brooklyn
                  </span>
                  <span className="text-[11px] text-[#64748B] tracking-[0.005em]">
                    Primary Residence • Inside
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- Right Column: Immediate Actions, Care Circle, Important Note --- */}
        <div className="flex flex-col gap-6 xl:col-span-5">
          
          {/* 1. Immediate Actions */}
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-[20px] font-bold text-[#001F3F] tracking-[0.0009em]">
              Immediate Actions
            </h2>
            <div className="flex flex-col gap-4">
              <ActionCard
                icon={<Phone size={20} color="#D6483F" />}
                iconBg="bg-white"
                title="Call Mama Grace"
                subtitle="Immediate bedside speaker"
              />
              <ActionCard
                icon={<Users size={20} color="#003665" />}
                iconBg="bg-white"
                title="Call Family Admin"
                subtitle="Israel Adeyemi"
              />
              <ActionCard
                icon={<Alert size={20} color="#FFFFFF" />}
                iconBg="bg-[#3F8358]"
                bgClass="bg-[#ECFDF5]"
                borderClass="border-[#D1FAE5]"
                textColor="text-[#064E3B]"
                title="Emergency Services"
                subtitle="Dispatch 911"
              />
            </div>
          </section>

          {/* 2. Active Care Circle */}
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-[18px] font-bold text-[#001F3F] tracking-[0.0029em]">
                Active Care Circle
              </h2>
              <button className="text-[#9CA3AF] hover:text-[#64748B] transition-colors">
                <Plus size={16} color="#9CA3AF" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Member 1 */}
              <div className="flex flex-row items-center gap-4 p-3 bg-[#F1F4F6] rounded-xl w-full">
                {/* TODO: Replace with avatar-2.jpg */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Israel Adeyemi"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="flex-1 flex flex-col">
                  <span className="text-[14px] font-bold text-[#1B2A4A]">
                    Israel Adeyemi
                  </span>
                  <span className="text-[11px] font-bold text-[#3F8358] tracking-wide">
                    ● ONLINE & NOTIFIED
                  </span>
                </div>
                <Users size={16} color="#003665" />
              </div>

              {/* Member 2 */}
              <div className="flex flex-row items-center gap-4 p-3 rounded-xl w-full">
                {/* TODO: Replace with avatar-3.jpg */}
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Dr. James Wilson"
                  className="w-10 h-10 rounded-full border border-[#F3F4F6] object-cover"
                />
                <div className="flex-1 flex flex-col">
                  <span className="text-[14px] font-bold text-[#1B2A4A]">
                    Dr. James Wilson
                  </span>
                  <span className="text-[11px] text-[#64748B] tracking-wide">
                    NOTIFIED VIA SMS
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Important Note */}
          <section className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-6 shadow-sm flex flex-row gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D89A2E] flex items-center justify-center shrink-0">
              <Warning size={20} color="#1B2A4A" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[16px] font-bold text-[#92400E] tracking-[0.0009em]">
                Important Note
              </h3>
              <p className="text-[14px] leading-[20px] text-[rgba(146,64,14,0.8)]">
                Mama Grace has a heart condition. Keep her calm and check if she has her medication nearby.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};