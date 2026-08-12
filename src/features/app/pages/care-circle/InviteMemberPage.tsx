// pages/InviteMemberPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: Verify exact icon names from your existing icon library.
import {
  ArrowLeft,
  Users,
  CareGiver,
  Pills,
  WhatsApp, // Placeholder if 'WhatsApp' or specific brand icon isn't available in library
  WandSparkles, // Or a 'Mixer' or 'Sliders' icon for the "Let them decide" card
  PaperPlane,
  Check,
} from '@/components/common/icons';

// --- Reusable Components for this page ---

interface StepHeaderProps {
  number: number;
  title: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ number, title }) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#003665] flex items-center justify-center shrink-0">
        <span className="text-white text-[14px] font-bold">{number}</span>
      </div>
      <h2 className="text-[18px] font-bold text-[#1B2A4A] tracking-[-0.0019em]">
        {title}
      </h2>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  placeholder,
  type = 'text',
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-semibold text-[#1B2A4A]">
        {label}{' '}
        {!required && (
          <span className="text-gray-400 font-normal">(Optional)</span>
        )}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003665]/20 focus:border-[#003665] transition-all"
      />
    </div>
  );
};

const SelectField: React.FC<{
  label: string;
  id: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, id, value, options, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-semibold text-[#1B2A4A]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003665]/20 focus:border-[#003665] transition-all appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: `right 1rem center`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `1.5em 1.5em`,
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

interface SelectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  type: 'who' | 'how';
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  icon,
  title,
  description,
  selected,
  onClick,
  type,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-row items-start gap-4 p-6 rounded-3xl border-2 transition-all w-full text-left ${
        selected
          ? 'border-[#003665] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-[16px] font-bold text-[#1B2A4A]">{title}</span>
        <span className="text-[14px] leading-[23px] text-gray-500">
          {description}
        </span>
      </div>

      {/* Render specific selection marker based on type */}
      <div className="shrink-0 pt-1">
        {type === 'who' ? (
          selected ? (
            <div className="w-6 h-6 rounded-full bg-[#003665] flex items-center justify-center">
              <Check size={14} color="#FFFFFF" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
          )
        ) : (
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              selected ? 'border-[#003665] border-[6px]' : 'border-gray-200'
            }`}
          />
        )}
      </div>
    </button>
  );
};

// --- Main Page Component ---

export const InviteMemberPage: React.FC = () => {
  const navigate = useNavigate();
  // Form State
  const [inviteType, setInviteType] = useState<'family' | 'caregiver'>('family');
  const [formData, setFormData] = useState({
    fullName: '',
    relationship: 'Select Relationship',
    phone: '',
    email: '',
  });
  const [participation, setParticipation] = useState<'app' | 'whatsapp' | 'decide'>('whatsapp');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual API call to send the invite
    console.log('Invite submitted:', {
      type: inviteType,
      ...formData,
      participation,
    });
    alert('Invite sent successfully!');
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-8 mx-auto max-w-[1000px]">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-[30px] font-bold text-[#1B2A4A]">
            Invite Someone
          </h1>
          <p className="text-gray-500 text-[16px]">
            Bring trusted people into your Care Circle.
          </p>
        </div>
        <button
          type="button"
            onClick={() => navigate('/dashboard/care-circle')}
          className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm text-[#003665] font-semibold text-[16px] px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} color="#003665" />
          Back to Care Circle
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Step 1: Who are you inviting? */}
        <div className="flex flex-col gap-6">
          <StepHeader number={1} title="Who are you inviting?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectionCard
              icon={<Users size={24} color="#003665" />}
              title="Family Member"
              description="Spouse, children, or siblings who will help monitor and provide care."
              selected={inviteType === 'family'}
              onClick={() => setInviteType('family')}
              type="who"
            />
            <SelectionCard
              icon={<CareGiver size={24} color="#64748B" />}
              title="Caregiver"
              description="Professional caregivers or friends who assist with daily medical tasks."
              selected={inviteType === 'caregiver'}
              onClick={() => setInviteType('caregiver')}
              type="who"
            />
          </div>
        </div>

        {/* Step 2: Details */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
          <StepHeader number={2} title="Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              id="fullName"
              placeholder="e.g. Jane Smith"
              required
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <SelectField
              label="Relationship"
              id="relationship"
              value={formData.relationship}
              options={[
                'Select Relationship',
                'Spouse',
                'Child',
                'Sibling',
                'Parent',
                'Friend',
                'Professional Caregiver',
              ]}
              onChange={handleInputChange}
            />
            <InputField
              label="Phone Number"
              id="phone"
              placeholder="+1 (555) 000-0000"
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
            <InputField
              label="Email"
              id="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Step 3: Preferred Participation */}
        <div className="flex flex-col gap-6">
          <StepHeader number={3} title="Preferred Participation" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SelectionCard
              icon={<Pills size={20} color="#003665" />}
              title="KinGuard App"
              description="Full dashboard and tracking features."
              selected={participation === 'app'}
              onClick={() => setParticipation('app')}
              type="how"
            />
            <SelectionCard
              icon={<WhatsApp size={20} color="#25D366" />}
              title="WhatsApp"
              description="Receive updates and respond via chat."
              selected={participation === 'whatsapp'}
              onClick={() => setParticipation('whatsapp')}
              type="how"
            />
            <SelectionCard
              icon={<WandSparkles size={20} color="#6B7280" />}
              title="Let them decide"
              description="They will choose during the onboarding."
              selected={participation === 'decide'}
              onClick={() => setParticipation('decide')}
              type="how"
            />
          </div>
        </div>

        {/* Info Box: What happens next? */}
        <div className="bg-[#EFF6FF] border border-[rgba(0,54,101,0.1)] rounded-3xl p-6 flex flex-row gap-5 items-start">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
            <PaperPlane size={18} color="#003665" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-bold text-[#003665] tracking-[-0.0009em]">
              What happens next?
            </h3>
            <p className="text-[14px] leading-[23px] text-[rgba(0,54,101,0.8)]">
              We'll send an invitation message to their phone and email. Once
              they accept, they'll be added to the Care Circle and can start
              viewing Mama Grace's medication schedule and health updates.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};