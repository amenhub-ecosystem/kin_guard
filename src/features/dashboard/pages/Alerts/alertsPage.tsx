// pages/AlertsPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Phone,
  CareGiver,
  Pills,
  CheckCircle,
  House,
} from '@/components/common/icons';

interface UpdateItemProps {
  icon?: React.ReactNode;
  iconTone?: string;
  title: string;
  detail: string;
  time: string;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ icon, iconTone, title, detail, time }) => (
  <div className="flex flex-row items-start gap-3 px-5 py-4 border-b border-gray-50 last:border-0">
    {icon ? (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconTone}`}>
        {icon}
      </div>
    ) : (
      <span className="w-2.5 h-2.5 rounded-full bg-gray-300 mt-2.5 shrink-0" />
    )}
    <div className="flex-1">
      <p className="text-[14px] font-semibold text-[#001F3F]">{title}</p>
      <p className="text-[13px] text-gray-500">{detail}</p>
    </div>
    <span className="text-[12px] text-gray-400 whitespace-nowrap">{time}</span>
  </div>
);

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();

  const updates: UpdateItemProps[] = [
    {
      icon: <Pills size={16} color="#009688" />,
      iconTone: 'bg-[#E0F2F1]',
      title: 'Medication taken',
      detail: 'Lisinopril 10mg — Confirmed by system',
      time: '2:05 PM',
    },
    {
      icon: <CheckCircle size={16} color="#009688" />,
      iconTone: 'bg-[#E0F2F1]',
      title: 'Check-in completed',
      detail: '"I\'m feeling good today 😊" — Mama Grace',
      time: '8:14 AM',
    },
    {
      icon: <House size={16} color="#1A3B66" />,
      iconTone: 'bg-[#E6E9EF]',
      title: 'Caregiver update',
      detail: 'David completed evening wellness check',
      time: 'Yesterday',
    },
    {
      title: 'Battery status',
      detail: "Mama Grace's watch is at 85%",
      time: 'Yesterday',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1080px] mx-auto">
      {/* Attention Required */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#001F3F]">Attention Required</h2>
          <span className="bg-red-50 text-red-500 text-[12px] font-semibold px-3 py-1 rounded-full">
            1 ACTIVE
          </span>
        </div>

        <div className="border border-red-200 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <Phone size={20} color="#EF4444" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-[#001F3F]">Check-in missed</h3>
                <span className="text-[12px] text-gray-400">45 mins ago</span>
              </div>
              <p className="text-[14px] text-gray-500 mt-1">
                Mama Grace hasn't responded to her scheduled 10:00 AM check-in. This may require immediate follow-up.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="bg-[#FE706D] text-white font-semibold text-[14px] px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#fe5a56] transition-colors"
            >
              <Phone size={16} color="#FFFFFF" />
              Call Mama Grace
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/care-circle')}
              className="bg-[#001F3F] text-white font-semibold text-[14px] px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#001533] transition-colors"
            >
              <CareGiver size={16} color="#FFFFFF" />
              Notify Caregiver
            </button>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-[16px] font-bold text-[#001F3F]">Recent Updates</h3>
          <button type="button" className="text-[13px] font-semibold text-[#009688]">
            View All
          </button>
        </div>
        <div className="flex flex-col">
          {updates.map((update, idx) => (
            <UpdateItem key={idx} {...update} />
          ))}
        </div>
      </div>

      {/* All caught up */}
      <div className="border border-dashed border-gray-200 rounded-2xl py-10 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={20} color="#22C55E" />
        </div>
        <p className="text-[15px] font-bold text-[#001F3F]">You're all caught up</p>
        <p className="text-[13px] text-gray-400 text-center max-w-xs">
          No other urgent matters. We'll let you know if something needs your attention.
        </p>
      </div>
    </div>
  );
};