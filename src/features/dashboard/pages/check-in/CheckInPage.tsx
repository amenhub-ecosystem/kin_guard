import React, { useState } from 'react';

// TODO: Verify exact icon names from your existing icon library.
import {
  Clock,           // View History icon
  Microphone,       // Textarea voice icon
  Plus,             // Add response option
  DevicePhoneMobile,// KinGuard App icon
  ChatBubbleLeftRight, // WhatsApp icon (use WhatsAppBrand if available)
  Bolt,             // Send Now icon
  CalenderSolid,         // Schedule for later icon
  ArrowLeft,        // Phone header back button
  PaperPlane,    // Phone send button
} from '@/components/common/icons';

// --- Sub-components ---

interface StepHeaderProps {
  number: number;
  title: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ number, title }) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-[#003665] flex items-center justify-center shrink-0">
        <span className="text-white text-[12px] font-bold leading-[18px]">
          {number}
        </span>
      </div>
      <h2 className="text-[17px] font-bold text-[#1B2A4A] tracking-[0.004em]">
        {title}
      </h2>
    </div>
  );
};

interface ResponseOptionProps {
  emoji: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const ResponseOption: React.FC<ResponseOptionProps> = ({
  emoji,
  label,
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-row items-center gap-2.5 px-5 py-3 rounded-full border-[1.5px] transition-all ${
        active
          ? 'bg-[#E6F4EA] border-[#009688]'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <span className="text-[20px] leading-[28px]">{emoji}</span>
      <span
        className={`text-[16px] font-semibold ${
          active ? 'text-[#001F3F]' : 'text-[#64748B]'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

interface DeliveryMethodProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({
  icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-row justify-between items-center px-4 py-3 rounded-xl border transition-all w-full ${
        selected ? 'border-[#003665] bg-[#EFF6FF] bg-opacity-30' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            selected ? 'bg-[#DBEAFE]' : 'bg-gray-50'
          }`}
        >
          {icon}
        </div>
        <span className="text-[16px] font-medium text-[#1B2A4A]">{label}</span>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          selected ? 'border-[#003665] border-[5px]' : 'border-gray-300'
        }`}
      />
    </button>
  );
};

interface ScheduleOptionProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const ScheduleOption: React.FC<ScheduleOptionProps> = ({
  icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-row items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full ${
        selected ? 'border-[#003665] bg-[#EFF6FF] bg-opacity-30' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-center w-5 h-5">
        {icon}
      </div>
      <span className="text-[16px] font-medium text-[#1B2A4A]">{label}</span>
    </button>
  );
};

// --- Main Page Component ---

export const CheckInPage: React.FC = () => {
  // Form State
  const [message, setMessage] = useState<string>("Good morning ❤️ How are you feeling today?");
  const [response, setResponse] = useState<string>("I'm Fine");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("Both");
  const [schedule, setSchedule] = useState<string>("Send Now");

  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1100px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-row justify-between items-start flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[30px] font-bold text-[#1B2A4A] tracking-[-0.0019em]">
            Send Wellness Check-in
          </h1>
          <p className="text-gray-500 text-[16px]">
            Quickly check in with your loved one to see how they are feeling.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-[#64748B] text-[14px] font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          <Clock size={14} color="#64748B" />
          View History
        </button>
      </div>

      {/* Main Layout: Form & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form (Width ~591px) */}
        <div className="flex flex-col gap-8 lg:col-span-7 xl:col-span-6">
          
          {/* Section 1: Check-in Message */}
          <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
            <StepHeader number={1} title="Check-in Message" />
            
            <div className="flex flex-col gap-4">
              <label className="text-[14px] font-medium text-[#64748B]">
                Message to send
              </label>
              <div className="relative w-full">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-h-[100px] bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-4 text-[16px] text-[#1B2A4A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003665]/20 focus:border-[#003665] transition-all resize-none pb-12"
                />
                <button className="absolute bottom-3 right-3 w-[30px] h-[42px] bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Microphone size={16} color="#64748B" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <label className="text-[14px] font-medium text-[#64748B]">
                Response Options for Mama Grace
              </label>
              <div className="flex flex-row flex-wrap items-center gap-3">
                <ResponseOption
                  emoji="😊"
                  label="I'm Fine"
                  active={response === "I'm Fine"}
                  onClick={() => setResponse("I'm Fine")}
                />
                <ResponseOption
                  emoji="😐"
                  label="Not Feeling Well"
                  active={response === "Not Feeling Well"}
                  onClick={() => setResponse("Not Feeling Well")}
                />
                <ResponseOption
                  emoji="🤒"
                  label="Need Help"
                  active={response === "Need Help"}
                  onClick={() => setResponse("Need Help")}
                />
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Plus size={16} color="#9CA3AF" />
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Delivery & Timing */}
          <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
            <StepHeader number={2} title="Delivery & Timing" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Delivery Method */}
              <div className="flex flex-col gap-4">
                <label className="text-[14px] font-medium text-[#64748B]">
                  Delivery Method
                </label>
                <div className="flex flex-col gap-3">
                  <DeliveryMethod
                    icon={<DevicePhoneMobile size={16} color="#003665" />}
                    label="Both (App + WhatsApp)"
                    selected={deliveryMethod === "Both"}
                    onClick={() => setDeliveryMethod("Both")}
                  />
                  <DeliveryMethod
                    icon={<DevicePhoneMobile size={16} color="#003665" />}
                    label="KinGuard App Only"
                    selected={deliveryMethod === "KinGuard App Only"}
                    onClick={() => setDeliveryMethod("KinGuard App Only")}
                  />
                  <DeliveryMethod
                    icon={<ChatBubbleLeftRight size={16} color="#25D366" />}
                    label="WhatsApp Only"
                    selected={deliveryMethod === "WhatsApp Only"}
                    onClick={() => setDeliveryMethod("WhatsApp Only")}
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="flex flex-col gap-4">
                <label className="text-[14px] font-medium text-[#64748B]">
                  Schedule
                </label>
                <div className="flex flex-col gap-3">
                  <ScheduleOption
                    icon={<Bolt size={16} color="#003665" />}
                    label="Send Now"
                    selected={schedule === "Send Now"}
                    onClick={() => setSchedule("Send Now")}
                  />
                  <ScheduleOption
                    icon={<CalenderSolid size={16} color="#64748B" />}
                    label="Schedule for later"
                    selected={schedule === "Schedule for later"}
                    onClick={() => setSchedule("Schedule for later")}
                  />
                </div>
                <p className="text-[12px] italic text-[#9CA3AF] leading-[18px] mt-1">
                  Automated check-ins are currently paused<br />for today.
                </p>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column: Phone Preview (Width ~413px) */}
        <div className="flex flex-col items-center gap-6 lg:col-span-5 xl:col-span-6 pt-4 lg:pt-0">
          <p className="text-[14px] font-medium text-[#64748B] text-center">
            Preview on Mama Grace's Phone
          </p>

          {/* Phone Bezel */}
          <div className="relative w-[300px] h-[600px] bg-[#001F3F] border-[8px] border-[#1B2A4A] rounded-[40px] shadow-2xl shrink-0">
            {/* Top Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[16px] bg-[#1B2A4A] rounded-b-[12px] z-20" />

            {/* Inner Screen */}
            <div className="absolute top-[40px] left-[8px] right-[8px] bottom-[8px] bg-[#E5DDD5] rounded-[24px] overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="bg-[#075E54] px-4 pt-6 pb-3 flex flex-row items-center gap-3 shrink-0">
                <ArrowLeft size={20} color="#FFFFFF" />
                {/* TODO: Replace with actual exported image asset */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Support"
                  className="w-8 h-8 rounded-full border border-white/20 object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white tracking-[-0.0019em]">
                    KinGuard Support
                  </span>
                  <span className="text-[10px] text-white/80">Online</span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {/* Message Bubble */}
                <div className="flex flex-col items-start max-w-[85%] bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg p-3 shadow-sm">
                  <p className="text-[14px] leading-[23px] text-[#1B2A4A] tracking-[0.0009em]">
                    Good morning ❤️ How are<br />you feeling today?
                  </p>
                  <span className="text-[10px] text-[#9CA3AF] tracking-[0.004em] self-end mt-1">
                    10:45 AM
                  </span>
                </div>

                {/* Response Options */}
                <div className="flex flex-col items-center gap-2 mt-2 w-full">
                  <button className="w-full bg-[#EFF6FF] border-[1.5px] border-[#003665] text-[#003665] text-[13px] font-bold py-2 rounded-lg shadow-sm text-center transition-colors hover:bg-blue-100">
                    😊 I'm Fine
                  </button>
                  <button className="w-full bg-white border border-gray-200 text-[#4B5563] text-[13px] font-medium py-2 rounded-lg shadow-sm text-center transition-colors hover:bg-gray-50">
                    😐 Not Feeling Well
                  </button>
                  <button className="w-full bg-white border border-gray-200 text-[#4B5563] text-[13px] font-medium py-2 rounded-lg shadow-sm text-center transition-colors hover:bg-gray-50">
                    🤒 Need Help
                  </button>
                </div>
              </div>

              {/* Chat Input Area */}
              <div className="bg-[#F0F0F0] border-t border-gray-200 p-2 flex flex-row items-center gap-2 shrink-0">
                <div className="flex-1 bg-white rounded-full px-4 py-2.5 text-[12px] text-[#9CA3AF] tracking-[0.009em]">
                  Type a message
                </div>
                <button className="w-9 h-9 bg-[#128C7E] rounded-full flex items-center justify-center shrink-0 hover:bg-[#107a6e] transition-colors">
                  <PaperPlane size={14} color="#FFFFFF" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};