// pages/UpdateCareStatusPage.tsx
import React, { useState } from 'react';

// Exact exports from your provided icon library list
import {
  Shield,           // Header logo
  X,                // Close button
  PaperPlane,       // Doing Well
  Chart,            // Needs Attention
  Warning,          // Immediate Help
  Check,            // Textarea checkmark & Checkboxes
  Bell,             // Needs family attention icon
} from '@/components/common/icons';

// --- Sub-components ---

interface StateOptionProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  borderColor: string;
  bgColor: string;
  iconBg: string;
  selectedTextColor: string;
}

const StateOption: React.FC<StateOptionProps> = ({
  label,
  icon,
  selected,
  onClick,
  borderColor,
  bgColor,
  iconBg,
  selectedTextColor,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 gap-3 py-4 rounded-2xl border-2 transition-all ${
        selected ? bgColor : 'bg-white border-[#E5E7EB]'
      } ${selected ? `border-[${borderColor}]` : 'border-[#E5E7EB]'}`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selected ? 'bg-white shadow-sm' : iconBg}`}>
        {icon}
      </div>
      <span
        className={`text-[14px] font-bold tracking-[0.7px] ${selected ? selectedTextColor : 'text-[#64748B]'}`}
      >
        {label}
      </span>
    </button>
  );
};

interface ActionCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  rightIcon?: React.ReactNode;
}

const ActionCheckbox: React.FC<ActionCheckboxProps> = ({ label, checked, onToggle, rightIcon }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex flex-row items-center justify-between w-full p-3 rounded-xl border border-[#E5E7EB] ${
        checked ? 'bg-[#F8FAFC]' : 'bg-white'
      }`}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
            checked ? 'bg-[#3B82F6]' : 'bg-white border-2 border-[#E5E7EB]'
          }`}
        >
          {checked && <Check size={14} color="#FFFFFF" />}
        </div>
        <span className="text-[14px] font-medium text-[#1B2A4A]">{label}</span>
      </div>
      {rightIcon && <div className="shrink-0">{rightIcon}</div>}
    </button>
  );
};

// --- Floating Footer Component ---

interface CheckInFooterProps {
  onCancel?: () => void;
  onSend?: () => void;
}

const CheckInFooter: React.FC<CheckInFooterProps> = ({ onCancel, onSend }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-40" style={{ width: 'calc(100% - 280px)', marginLeft: '280px' }}>
      <div className="h-[100px] flex flex-row justify-between items-center px-8 py-6">
        {/* Left Side: Recipient Info */}
        <div className="flex flex-row items-center gap-4">
          {/* Avatar Stack */}
          <div className="flex flex-row items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Caregiver 1"
              className="w-8 h-8 rounded-full border-2 border-white object-cover relative z-20"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Caregiver 2"
              className="w-8 h-8 rounded-full border-2 border-white object-cover relative z-10 -ml-3"
            />
          </div>
          <span className="text-[13px] text-[#64748B] tracking-[0.0009em]">
            Will be sent to{' '}
            <span className="font-bold text-[#1B2A4A]">Mama Grace</span> and{' '}
            <span className="font-bold text-[#1B2A4A]">2 caregivers</span>.
          </span>
        </div>

        {/* Right Side: Actions */}
        <div className="flex flex-row items-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 text-[16px] font-semibold text-[#64748B] hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSend}
            className="flex flex-row items-center gap-3 px-12 py-3 bg-[#003665] text-white text-[16px] font-bold rounded-2xl shadow-[0_10px_15px_-3px_rgba(30,58,138,0.2),0_4px_6px_-4px_rgba(30,58,138,0.2)] hover:bg-[#002a52] transition-colors"
          >
            <PaperPlane size={16} color="#FFFFFF" />
            Send Check-in
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const UpdateCareStatusPage: React.FC = () => {
  const [state, setState] = useState<'well' | 'attention' | 'help'>('well');
  const [observation, setObservation] = useState('');
  const [actions, setActions] = useState({
    ate: true,
    medication: true,
    water: true,
    rested: true,
    attention: false,
  });

  const toggleAction = (key: keyof typeof actions) => {
    setActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Status updated:', { state, observation, actions });
    // TODO: Connect to API to update status
    alert('Care update saved!');
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // TODO: Navigate back or close modal
  };

  const handleSend = handleSave;

  return (
    <>
      <div className="w-full max-w-[552px] mx-auto flex flex-col bg-white border border-[#E5E7EB] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden mt-8 pb-[120px]">
      
      {/* --- Header --- */}
      <div className="flex flex-row justify-between items-center px-6 py-6 bg-[#F9FAFB] border-b border-[#F1F4F6]">
        <div className="flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#003665] flex items-center justify-center shrink-0">
            <Shield size={24} color="#FFFFFF" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[20px] font-bold text-[#003665] tracking-[0.0009em]">
              How is Mama Grace doing?
            </h1>
            <p className="text-[14px] text-[#64748B] tracking-[0.0019em]">
              Recording status for Today · 2:45 PM
            </p>
          </div>
        </div>
        <button className="text-[#64748B] hover:text-[#1B2A4A] transition-colors p-1">
          <X size={24} color="#64748B" />
        </button>
      </div>

      {/* --- Body --- */}
      <div className="flex flex-col gap-8 p-6">
        
        {/* 1. Current State */}
        <div className="flex flex-col gap-4">
          <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-[#64748B]">
            Current State
          </span>
          <div className="flex flex-row gap-4 w-full">
            <StateOption
              label="Doing Well"
              icon={<PaperPlane size={24} color="#10B981" />}
              selected={state === 'well'}
              onClick={() => setState('well')}
              borderColor="#10B981"
              bgColor="bg-[#ECFDF5]"
              iconBg="bg-[#FFF7ED]"
              selectedTextColor="text-[#3F8358]"
            />
            <StateOption
              label="Needs Attention"
              icon={<Chart size={20} color="#D89A2E" />}
              selected={state === 'attention'}
              onClick={() => setState('attention')}
              borderColor="#D89A2E"
              bgColor="bg-[#FFF7ED]"
              iconBg="bg-[#FFF7ED]"
              selectedTextColor="text-[#64748B]"
            />
            <StateOption
              label="Immediate Help"
              icon={<Warning size={24} color="#D6483F" />}
              selected={state === 'help'}
              onClick={() => setState('help')}
              borderColor="#D6483F"
              bgColor="bg-[#FEE2E2]"
              iconBg="bg-[#FEE2E2]"
              selectedTextColor="text-[#64748B]"
            />
          </div>
        </div>

        {/* 2. Optional Observation */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-[#64748B]">
            Optional Observation
          </span>
          <div className="relative w-full">
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="e.g., 'Feeling tired after lunch.'"
              className="w-full min-h-[100px] bg-[#F1F4F6] border border-[#E5E7EB] rounded-xl p-4 text-[16px] text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#003665]/20 focus:border-[#003665] transition-all resize-none pb-10"
            />
            <div className="absolute right-4 bottom-4 pointer-events-none">
              <Check size={16} color="#64748B" />
            </div>
          </div>
        </div>

        {/* 3. Optional Care Actions */}
        <div className="flex flex-col gap-4">
          <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-[#64748B]">
            Optional Care Actions
          </span>
          <div className="grid grid-cols-2 gap-3">
            <ActionCheckbox
              label="Ate meal"
              checked={actions.ate}
              onToggle={() => toggleAction('ate')}
            />
            <ActionCheckbox
              label="Took medication"
              checked={actions.medication}
              onToggle={() => toggleAction('medication')}
            />
            <ActionCheckbox
              label="Had water"
              checked={actions.water}
              onToggle={() => toggleAction('water')}
            />
            <ActionCheckbox
              label="Rested"
              checked={actions.rested}
              onToggle={() => toggleAction('rested')}
            />
            <ActionCheckbox
              label="Needs family attention"
              checked={actions.attention}
              onToggle={() => toggleAction('attention')}
              rightIcon={<Bell size={16} color="#000000" />}
            />
          </div>
        </div>
      </div>
    </div>
    <CheckInFooter onCancel={handleCancel} onSend={handleSend} />
    </>
  );
};