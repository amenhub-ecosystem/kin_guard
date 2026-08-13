// components/AddMedication/AddMedicationFooter.tsx
import React from 'react';

interface AddMedicationFooterProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export const AddMedicationFooter: React.FC<AddMedicationFooterProps> = ({ onCancel, onSave }) => {
  return (
    <footer className="flex flex-row justify-end items-center px-8 w-full h-[100px] bg-white border-t border-[#E5E7EB] shadow-[0_-4px_10px_rgba(0,0,0,0.02)] shrink-0">
      <div className="flex flex-row items-center gap-4">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-[14px] text-[16px] font-semibold text-[#64748B] hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>

        {/* Save Medication Button */}
        <button
          type="submit"
          onClick={onSave}
          className="w-[211px] px-10 py-[14px] bg-[#003665] text-white text-[16px] font-bold rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-[#002a52] transition-colors"
        >
          Save Medication
        </button>
      </div>
    </footer>
  );
};
