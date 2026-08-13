// components/InviteMember/InviteMemberFooter.tsx
import React from 'react';

// TODO: Verify exact icon names from your existing icon library.
// If your library exports it as "ChevronRight" or "ChevronRightIcon", update the import accordingly.
import { ChevronRight } from '@/components/common/icons';

interface InviteMemberFooterProps {
  onCancel?: () => void;
  onSend?: () => void;
}

export const InviteMemberFooter: React.FC<InviteMemberFooterProps> = ({
  onCancel,
  onSend,
}) => {
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

        {/* Send Invitation Button */}
        <button
          type="submit"
          onClick={onSend}
          className="flex flex-row items-center gap-2 px-10 py-[14px] bg-[#003665] text-white text-[16px] font-bold rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-[#002a52] transition-colors"
        >
          Send Invitation
          <ChevronRight size={16} color="#FFFFFF" />
        </button>
        
      </div>
    </footer>
  );
};
