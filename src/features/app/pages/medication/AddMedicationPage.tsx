// pages/AddMedicationPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/lib/apiClient';

// TODO: Verify exact icon names from your existing icon library.
import {
  ArrowLeft,
  Pills,
  Clock,
  Bell,
  Note,
  Plus,
  X,
  Check,
  Calendar, // For the date picker icon if required
} from '@/components/common/icons';

// --- Reusable Components for this page ---

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col gap-8 ${className}`}>
      <div className="flex flex-row items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h2 className="text-[18px] font-bold text-[#1B2A4A] tracking-[0.0019em]">{title}</h2>
      </div>
      {children}
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, id, placeholder, type = 'text', required = false, value, onChange 
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-semibold text-[#1B2A4A]">
        {label} {!required && <span className="text-gray-400 font-normal">(Optional)</span>}
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

const SelectField: React.FC<{ label: string; id: string; value: string; options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ label, id, value, options, onChange }) => {
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
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
};

const DateInput: React.FC<{ label: string; id: string; required?: boolean }> = ({ label, id, required = false }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-semibold text-[#1B2A4A]">
        {label} {!required && <span className="text-gray-400 font-normal">(Optional)</span>}
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id={id}
          placeholder="mm/dd/yyyy"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003665]/20 focus:border-[#003665] transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <Calendar size={18} />
        </div>
      </div>
    </div>
  );
};

const TimeChip: React.FC<{ time: string; onRemove: () => void }> = ({ time, onRemove }) => {
  return (
    <div className="flex flex-row items-center gap-3 bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3">
      <span className="text-[14px] font-medium text-black">{time}</span>
      <button 
        type="button" 
        onClick={onRemove} 
        className="flex items-center justify-center hover:bg-gray-200 rounded-full p-1 transition-colors"
      >
        <X size={14} color="#9CA3AF" />
      </button>
    </div>
  );
};

const ReminderMethodButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-3 rounded-xl text-[13px] font-medium tracking-[0.012em] transition-all ${
        active 
          ? 'bg-[#EFF6FF] border-2 border-[#003665] text-[#003665]' 
          : 'bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
};

// --- Footer Component ---

interface AddMedicationFooterProps {
  onCancel?: () => void;
  onSave?: () => void;
}

const AddMedicationFooter: React.FC<AddMedicationFooterProps> = ({ onCancel, onSave }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-40" style={{ width: 'calc(100% - 280px)', marginLeft: '280px' }}>
      <div className="h-[100px] flex flex-row justify-end items-center gap-4 px-8 py-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 text-[16px] font-semibold text-[#64748B] hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-10 py-3 bg-[#003665] text-white text-[16px] font-bold rounded-xl shadow-lg hover:bg-[#002a52] transition-colors"
        >
          Save Medication
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const AddMedicationPage: React.FC = () => {
  // Form State
  const [form, setForm] = useState({
    medicationName: '',
    genericName: '',
    strength: '',
    form: 'Select Form',
    doseAmount: '',
    frequency: 'Once daily',
    remindTimes: ['08:00 AM', '02:00 PM'],
    startDate: '',
    endDate: '',
    notifyLovedOne: true,
    notifyFamily: false,
    notifyCaregiver: false,
    reminderMethod: 'App', // 'App' | 'WhatsApp' | 'Both'
    notes: '',
  });

  const toggleRemindTime = () => {
    // Placeholder for adding a time. In production, this would open a TimePicker
    const newTime = prompt('Enter new time (e.g., 09:00 PM)');
    if (newTime) {
      setForm(prev => ({ ...prev, remindTimes: [...prev.remindTimes, newTime] }));
    }
  };

  const removeRemindTime = (index: number) => {
    setForm(prev => ({ 
      ...prev, 
      remindTimes: prev.remindTimes.filter((_, i) => i !== index) 
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const body = {
          name: form.medicationName,
          dose: `${form.strength} ${form.doseAmount}`.trim(),
          schedule: form.frequency,
          notes: form.notes,
        };
        await apiClient.post('/medications', body);
        alert('Medication saved successfully!');
        navigate('/dashboard/medication');
      } catch (err) {
        console.error(err);
        alert('Failed to save medication');
      }
    })();
  };

  const handleCancel = () => {
    navigate('/dashboard/medication');
  };

  const handleSave = () => {
    const form = document.querySelector('form');
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8 pb-[140px]">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-[30px] font-bold text-[#1B2A4A] tracking-[0.0009em]">Add Medication</h1>
            <p className="text-gray-500 text-[16px]">Create a medication schedule to help your loved one stay on track.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm text-[#003665] font-semibold text-[16px] px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} color="#003665" />
            Back to Dashboard
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Section 1: Medication Information */}
        <FormSection title="Medication Information" icon={<Pills size={22} color="#003665" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Medication Name" 
              id="medicationName" 
              placeholder="e.g. Metformin" 
              required 
              value={form.medicationName}
              onChange={(e) => setForm({ ...form, medicationName: e.target.value })}
            />
            <InputField 
              label="Generic Name" 
              id="genericName" 
              placeholder="e.g. Glucophage" 
              value={form.genericName}
              onChange={(e) => setForm({ ...form, genericName: e.target.value })}
            />
            <InputField 
              label="Strength" 
              id="strength" 
              placeholder="e.g. 500 mg" 
              required 
              value={form.strength}
              onChange={(e) => setForm({ ...form, strength: e.target.value })}
            />
            <SelectField 
              label="Form" 
              id="form" 
              value={form.form} 
              options={['Select Form', 'Tablet', 'Capsule', 'Liquid', 'Injection']}
              onChange={(e) => setForm({ ...form, form: e.target.value })}
            />
          </div>
        </FormSection>

        {/* Section 2: Dosage & Schedule */}
        <FormSection title="Dosage & Schedule" icon={<Clock size={22} color="#003665" />}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Dose Amount" 
                id="doseAmount" 
                placeholder="e.g. 1 Tablet" 
                required 
                value={form.doseAmount}
                onChange={(e) => setForm({ ...form, doseAmount: e.target.value })}
              />
              <SelectField 
                label="Frequency" 
                id="frequency" 
                value={form.frequency} 
                options={['Once daily', 'Twice daily', 'Three times daily', 'As needed']}
                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              />
            </div>

            {/* Remind Times */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#1B2A4A]">Remind Times</label>
              <div className="flex flex-wrap gap-3">
                {form.remindTimes.map((time, index) => (
                  <TimeChip key={index} time={time} onRemove={() => removeRemindTime(index)} />
                ))}
                <button 
                  type="button" 
                  onClick={toggleRemindTime}
                  className="flex flex-row items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} color="#64748B" />
                  <span className="text-[16px] font-medium text-gray-500 tracking-[0.005em]">Add Time</span>
                </button>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DateInput label="Start Date" id="startDate" required />
              <DateInput label="End Date" id="endDate" />
            </div>
          </div>
        </FormSection>

        {/* Section 3: Reminder Settings & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Reminder Settings */}
          <FormSection title="Reminder Settings" icon={<Bell size={22} color="#003665" />} className="h-full">
            <div className="flex flex-col gap-6">
              
              {/* Notifications checkboxes */}
              <div className="flex flex-col gap-3">
                <label className="text-[14px] font-semibold text-[#1B2A4A]">Who should be notified?</label>
                
                <label className="flex flex-row items-center gap-3 cursor-pointer select-none">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={form.notifyLovedOne} 
                      onChange={() => setForm({ ...form, notifyLovedOne: !form.notifyLovedOne })}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-200 transition-all checked:border-[#003665] checked:bg-[#003665] hover:border-[#003665]"
                    />
                    <Check size={12} color="#FFFFFF" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[14px] text-[#1B2A4A]">Loved One (Mama Grace)</span>
                </label>

                <label className="flex flex-row items-center gap-3 cursor-pointer select-none">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={form.notifyFamily} 
                      onChange={() => setForm({ ...form, notifyFamily: !form.notifyFamily })}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-200 transition-all checked:border-[#003665] checked:bg-[#003665] hover:border-[#003665]"
                    />
                    <Check size={12} color="#FFFFFF" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[14px] text-[#1B2A4A]">Family Members</span>
                </label>

                <label className="flex flex-row items-center gap-3 cursor-pointer select-none">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={form.notifyCaregiver} 
                      onChange={() => setForm({ ...form, notifyCaregiver: !form.notifyCaregiver })}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-200 transition-all checked:border-[#003665] checked:bg-[#003665] hover:border-[#003665]"
                    />
                    <Check size={12} color="#FFFFFF" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[14px] text-[#1B2A4A]">Caregiver (Mary Johnson)</span>
                </label>
              </div>

              {/* Reminder Method */}
              <div className="flex flex-col gap-3">
                <label className="text-[14px] font-semibold text-[#1B2A4A]">Reminder Method</label>
                <div className="flex flex-row gap-3">
                  <ReminderMethodButton 
                    label="App" 
                    active={form.reminderMethod === 'App'} 
                    onClick={() => setForm({ ...form, reminderMethod: 'App' })} 
                  />
                  <ReminderMethodButton 
                    label="WhatsApp" 
                    active={form.reminderMethod === 'WhatsApp'} 
                    onClick={() => setForm({ ...form, reminderMethod: 'WhatsApp' })} 
                  />
                  <ReminderMethodButton 
                    label="Both" 
                    active={form.reminderMethod === 'Both'} 
                    onClick={() => setForm({ ...form, reminderMethod: 'Both' })} 
                  />
                </div>
              </div>

            </div>
          </FormSection>

          {/* Right Column: Notes */}
          <FormSection title="Notes" icon={<Note size={22} color="#003665" />} className="h-full">
            <div className="flex flex-col gap-2 h-full">
              <label htmlFor="notes" className="text-[14px] font-semibold text-[#1B2A4A]">
                Additional Instructions
              </label>
              <textarea
                id="notes"
                placeholder="e.g. Take after breakfast. Avoid grapefruit juice."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full min-h-[200px] flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003665]/20 focus:border-[#003665] transition-all resize-none"
              />
            </div>
          </FormSection>

        </div>
      </form>
      </div>
      <AddMedicationFooter onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
};