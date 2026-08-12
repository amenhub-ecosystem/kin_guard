// pages/CaregiverDashboardPage.tsx
import React from 'react';

// TODO: Verify exact icon names from your existing icon library.
import {
  Pills,               // Medication Icon
  Gear,                // Mark as Taken / Success Gear
  Check,               // Remind Me Later
  XIcon,                   // Unable to Take
  PaperPlane,          // Family Updated
  Alert, // Emergency / Need help
} from '@/components/common/icons';

export const CaregiverDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full pb-8 mx-auto max-w-[1160px]">
      
      {/* --- Left Column: Medication Action Card --- */}
      <section className="flex flex-col items-start p-10 gap-8 bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex-1 min-w-[320px]">
        
        {/* Header & Status Badge */}
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-[30px] font-bold text-[#003665] tracking-[0.0009em]">
              Afternoon Medication
            </h1>
            <p className="text-[18px] text-[#64748B] tracking-[0.005em]">
              Due at 2:00 PM
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 px-4 py-2 bg-[#FEFCE8] border border-[#FEF08A] rounded-full">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D89A2E]" />
            <span className="text-[14px] font-bold uppercase text-[#D89A2E] tracking-wide">
              Pending
            </span>
          </div>
        </div>

        {/* Medication Details Card */}
        <div className="w-full p-8 flex flex-col gap-6 bg-[#F9FAFB] border border-[#F3F4F6] rounded-3xl">
          <div className="flex flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
              <Pills size={40} color="#003665" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[36px] font-bold text-[#1B2A4A] leading-[40px] tracking-[0.0019em]">
                Amlodipine
              </h2>
              <p className="text-[20px] text-[#64748B] tracking-[-0.005em]">
                5 mg · Tablet (1 tablet)
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-[#E5E7EB]" />

          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-[#64748B]">
              Instructions
            </span>
            <p className="text-[20px] text-[#1B2A4A] leading-[32px]">
              Take after lunch.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full pt-2">
          <button className="flex flex-row items-center justify-center gap-3 w-full py-6 bg-[#3F8358] rounded-2xl shadow-[0_10px_15px_-3px_rgba(63,131,88,0.2),0_4px_6px_-4px_rgba(63,131,88,0.2)] hover:bg-[#357048] transition-colors">
            <Gear size={24} color="#FFFFFF" />
            <span className="text-[20px] font-bold text-white">
              Mark as Taken
            </span>
          </button>

          <div className="flex flex-row gap-4 w-full">
            <button className="flex flex-1 flex-row items-center justify-center gap-2 py-4 bg-white border-2 border-[#E5E7EB] rounded-2xl hover:bg-gray-50 transition-colors">
              <Check size={16} color="#64748B" />
              <span className="text-[16px] font-bold text-[#1B2A4A] tracking-[0.0029em]">
                Remind Me Later
              </span>
            </button>
            <button className="flex flex-1 flex-row items-center justify-center gap-2 py-4 bg-white border-2 border-[#E5E7EB] rounded-2xl hover:bg-gray-50 transition-colors">
              <XIcon size={16} color="#D6483F" />
              <span className="text-[16px] font-bold text-[#D6483F] tracking-[0.0009em]">
                Unable to Take
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* --- Right Column: Status Summary --- */}
      <aside className="flex flex-col gap-6 w-full xl:w-[438px] shrink-0">
        
        {/* Top Card: Success State */}
        <div className="relative p-8 flex flex-col bg-[#ECFDF5] border border-[#D1FAE5] rounded-2xl shadow-sm overflow-hidden">
          {/* Faint Background Gear */}
          <div className="absolute -top-4 -right-4 opacity-[0.05] pointer-events-none">
            <Gear size={128} color="#059669" />
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            {/* Success Icon */}
            <div className="w-14 h-14 rounded-full bg-[#10B981] flex items-center justify-center">
              <Gear size={24} color="#1B2A4A" />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-[24px] font-bold text-[#064E3B] tracking-[0.0019em]">
                Medication recorded
              </h3>
              <p className="text-[16px] font-medium text-[#059669]">
                Successfully logged for Mama Grace
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-white/60 border border-[#D1FAE5] rounded-xl p-5 flex flex-col gap-4 mt-2">
              <div className="flex flex-row justify-between items-center">
                <span className="text-[14px] font-bold text-[#064E3B] tracking-[0.005em]">
                  Amlodipine · 5 mg
                </span>
                <span className="text-[14px] font-bold text-[#059669] tracking-[0.018em]">
                  8:20 AM
                </span>
              </div>
              <div className="flex flex-row items-center gap-3">
                <PaperPlane size={20} color="#10B981" />
                <span className="text-[14px] font-semibold text-[#047857] tracking-[0.0019em]">
                  Family has been updated.
                </span>
              </div>
            </div>

            {/* Done Button */}
            <button className="w-full py-4 bg-[#065F46] rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] hover:bg-[#044d39] transition-colors mt-2">
              <span className="text-[16px] font-bold text-white tracking-[0.021em]">
                Done
              </span>
            </button>
          </div>
        </div>

        {/* Middle Card: Profile Info */}
        <div className="flex flex-row items-center gap-4 p-6 bg-white border border-[#F3F4F6] shadow-sm rounded-2xl">
          {/* TODO: Replace with actual exported image asset */}
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
            alt="Mama Grace"
            className="w-14 h-14 rounded-full border-2 border-[#ECFDF5] object-cover shrink-0"
          />
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-[#001F3F] tracking-[0.0009em]">
              Mama Grace
            </h3>
            <p className="text-[14px] text-[#64748B]">
              Primary Care Circle
            </p>
          </div>
        </div>

        {/* Bottom Card: Emergency Contact */}
        <div className="flex flex-row items-center gap-4 p-6 bg-[#FEF2F2] border border-[#FEE2E2] rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#EF4444] flex items-center justify-center shrink-0">
            <Alert size={20} color="#1B2A4A" />
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#DC2626] tracking-[0.007em]">
              Need help?
            </span>
            <span className="text-[12px] text-[rgba(220,38,38,0.7)]">
              Access emergency medical contacts
            </span>
          </div>
        </div>

      </aside>
    </div>
  );
};