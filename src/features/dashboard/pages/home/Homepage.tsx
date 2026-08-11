// pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Pills,
  CheckCircle,
  CareGiver,
  CircleCheck,
} from '@/components/common/icons';

interface CareStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}

const CareStatCard: React.FC<CareStatCardProps> = ({ icon, label, value, tone }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-2">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tone}`}>
      {icon}
    </div>
    <span className="text-[12px] font-semibold text-gray-400 tracking-[0.0019em] uppercase">
      {label}
    </span>
    <span className="text-[16px] font-bold text-[#001F3F]">{value}</span>
  </div>
);

interface UpdateItemProps {
  color: string;
  title: string;
  detail: string;
  time: string;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ color, title, detail, time }) => (
  <div className="flex flex-row items-start gap-3 px-5 py-4 border-b border-gray-50 last:border-0">
    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 ${color}`} />
    <div className="flex-1">
      <p className="text-[14px] font-semibold text-[#001F3F]">{title}</p>
      <p className="text-[13px] text-gray-500">{detail}</p>
    </div>
    <span className="text-[12px] text-gray-400 whitespace-nowrap">{time}</span>
  </div>
);

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const careStats: CareStatCardProps[] = [
    {
      icon: <Pills size={20} color="#EA580C" />,
      label: 'Meds',
      value: '2 of 3 done',
      tone: 'bg-orange-50',
    },
    {
      icon: <CheckCircle size={20} color="#009688" />,
      label: 'Check-in',
      value: '8:14 AM',
      tone: 'bg-[#E0F2F1]',
    },
    {
      icon: <CareGiver size={20} color="#1A3B66" />,
      label: 'Caregiver',
      value: 'Active today',
      tone: 'bg-[#E6E9EF]',
    },
  ];

  const updates: UpdateItemProps[] = [
    {
      color: 'bg-[#009688]',
      title: 'Mama Grace checked in',
      detail: 'Manual check-in from tablet',
      time: '8:14 AM',
    },
    {
      color: 'bg-orange-400',
      title: 'Morning medication',
      detail: 'Lisinopril 10mg confirmed',
      time: '8:20 AM',
    },
    {
      color: 'bg-gray-300',
      title: 'Caregiver updated note',
      detail: '"Shared a healthy lunch together"',
      time: '10:30 AM',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1080px] mx-auto">
      {/* Loved One Card */}
      <div className="bg-[#001F3F] rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
            alt="Mama Grace"
            className="w-14 h-14 rounded-full object-cover border-2 border-white"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-bold text-white">Mama Grace</h2>
            <span className="flex items-center gap-1.5 text-[13px] text-[#4ADE80]">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
              Doing well
            </span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <p className="italic text-white mb-1">"I'm feeling good today 😊"</p>
          <p className="text-[11px] uppercase tracking-wide text-white/60">
            Last checked in at 8:14 AM
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-[11px] uppercase text-white/60 mb-1">Heart Rate</p>
              <p className="text-[18px] font-bold text-white">74 BPM</p>
            </div>
            <div>
              <p className="text-[11px] uppercase text-white/60 mb-1">Rest Rate</p>
              <p className="text-[18px] font-bold text-white">Good</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/dashboard/loved-one')}
            className="text-[14px] font-semibold text-white hover:underline"
          >
            View details →
          </button>
        </div>
      </div>

      {/* Today's Care */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] font-bold text-[#001F3F]">Today's Care</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {careStats.map((stat, idx) => (
            <CareStatCard key={idx} {...stat} />
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-[16px] font-bold text-[#001F3F]">Recent Updates</h3>
          <button
            type="button"
            className="text-[13px] font-semibold text-[#009688]"
          >
            View All
          </button>
        </div>
        <div className="flex flex-col">
          {updates.map((update, idx) => (
            <UpdateItem key={idx} {...update} />
          ))}
        </div>
      </div>

      {/* No active alerts */}
      <div className="flex items-center justify-center gap-2 bg-[#E0F2F1] text-[#009688] text-[14px] font-semibold rounded-xl py-3">
        <CircleCheck size={18} color="#009688" />
        No active alerts
      </div>
    </div>
  );
};