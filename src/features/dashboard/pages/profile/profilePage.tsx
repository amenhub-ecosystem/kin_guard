// pages/ProfilePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Camera,
  House,
  Phone,
  Calendar,
  Check,
  Gear,
  Lock,
  Shield,
  ChevronRight,
} from '@/components/common/icons';

interface AccountRowProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const AccountRow: React.FC<AccountRowProps> = ({ icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[14px] font-semibold text-[#001F3F]">{label}</span>
    </div>
    <ChevronRight size={18} color="#9CA3AF" />
  </button>
);

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[680px] mx-auto">
      {/* Avatar + Name */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-3">
        <div className="relative w-24 h-24">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
            alt="Sarah Adeyemi"
            className="w-full h-full rounded-2xl object-cover"
          />
          <button
            type="button"
            className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-[#FE706D] flex items-center justify-center border-2 border-white"
          >
            <Camera size={14} color="#FFFFFF" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <h2 className="text-[20px] font-bold text-[#001F3F]">Sarah Adeyemi</h2>
          <span className="text-[13px] text-gray-500">Family Member</span>
        </div>
      </div>

      {/* Care Circle */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide px-1">
          Care Circle
        </h3>
        <button
          type="button"
          onClick={() => navigate('/dashboard/care-circle')}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E0F2F1] flex items-center justify-center">
              <House size={16} color="#009688" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-bold text-[#001F3F]">Adeyemi Family</p>
              <p className="text-[13px] text-gray-500">
                Connected to <span className="text-[#FE706D] font-semibold">Mama Grace</span>
              </p>
            </div>
          </div>
          <ChevronRight size={18} color="#9CA3AF" />
        </button>
      </div>

      {/* Preferences */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide px-1">
          Preferences
        </h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Phone size={16} color="#6B7280" />
              </div>
              <span className="text-[14px] font-semibold text-[#001F3F]">Notifications</span>
            </div>
            <div className="w-10 h-6 rounded-full bg-[#22C55E] flex items-center px-0.5">
              <div className="w-5 h-5 rounded-full bg-white ml-auto" />
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Calendar size={16} color="#6B7280" />
              </div>
              <span className="text-[14px] font-semibold text-[#001F3F]">WhatsApp connection</span>
            </div>
            <Check size={18} color="#22C55E" />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Check size={16} color="#6B7280" />
              </div>
              <span className="text-[14px] font-semibold text-[#001F3F]">Quiet hours</span>
            </div>
            <span className="text-[13px] text-gray-400">22:00 - 07:00</span>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide px-1">
          Account
        </h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <AccountRow icon={<Gear size={16} color="#6B7280" />} label="Personal information" />
          <AccountRow icon={<Lock size={16} color="#6B7280" />} label="Password & Security" />
          <AccountRow icon={<Shield size={16} color="#6B7280" />} label="Privacy" />
        </div>
      </div>

      {/* Leave Care Circle */}
      <button
        type="button"
        className="w-full border border-red-200 text-red-500 font-semibold text-[14px] py-3.5 rounded-2xl hover:bg-red-50 transition-colors"
      >
        Leave Care Circle
      </button>
    </div>
  );
};