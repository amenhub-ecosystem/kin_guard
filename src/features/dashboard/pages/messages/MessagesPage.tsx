// pages/MessagesPage.tsx
import React, { useState } from 'react';

// TODO: Verify exact icon names from your existing icon library.
import {
  Plus,             // Attachment icon in input
  FaceSmile,        // Emoji icon in input
  Bolt,             // Send button lightning icon
  EllipsisVertical, // Menu button in chat header
  Check,            // Read receipt checkmark
} from '@/components/common/icons';

// --- Types & Interfaces ---

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isActive: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  isRead?: boolean;
}

// --- Mock Data ---

const contacts: Contact[] = [
  { id: '1', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100', lastMessage: "I'll be there by 4:00 PM today...", timestamp: '4m ago', isActive: true },
  { id: '2', name: 'David Miller', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', lastMessage: 'Did mom take her heart meds yet?', timestamp: '2h ago', isActive: false },
  { id: '3', name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', lastMessage: 'The appointment was rescheduled.', timestamp: 'Yesterday', unreadCount: 2, isActive: false },
  { id: '4', name: 'Mark Stevens', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100', lastMessage: 'Thanks for the update, James.', timestamp: 'Oct 20', isActive: false },
  { id: '5', name: 'Linda White', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100', lastMessage: "I'll call you later to discuss the plan.", timestamp: 'Oct 18', isActive: false },
];

const activeChatMessages: Message[] = [
  { id: '1', senderId: '1', text: 'Hi James! I just finished the morning exercise routine with Mary. She was in great spirits today and walked 500 steps!', timestamp: '09:15 AM', isSent: false },
  { id: '2', senderId: 'me', text: "That's wonderful news! Did she manage to take her morning vitamin? I noticed a reminder in the dashboard earlier.", timestamp: '09:22 AM', isSent: true, isRead: true },
  { id: '3', senderId: '1', text: "Yes, she took it right after breakfast. I've logged it in the system already.", timestamp: '09:25 AM', isSent: false },
  { id: '4', senderId: '1', text: "I'll be there by 4:00 PM today for the physical therapy session. Do you need me to bring any extra supplies?", timestamp: '4m ago', isSent: false },
];

// --- Sub-components ---

const ChatSidebar: React.FC = () => {
  return (
    <aside className="w-[380px] h-full flex flex-col border-r border-gray-100 bg-white shrink-0">
      {/* Header */}
      <div className="flex flex-col gap-6 p-6 pb-2">
        <h2 className="text-[20px] font-bold text-[#001F3F]">Messages</h2>
        
        {/* Tabs */}
        <div className="flex flex-row items-center gap-6 overflow-x-auto">
          <button className="pb-3 text-[14px] font-semibold text-[#001F3F] border-b-2 border-[#001F3F]">
            Family
          </button>
          <button className="pb-3 text-[14px] font-normal text-[#9CA3AF] hover:text-gray-500 transition-colors">
            Caregivers
          </button>
          <button className="pb-3 text-[14px] font-normal text-[#9CA3AF] hover:text-gray-500 transition-colors">
            WhatsApp
          </button>
          <button className="pb-3 text-[14px] font-normal text-[#9CA3AF] hover:text-gray-500 transition-colors">
            System
          </button>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex flex-row items-center gap-4 px-6 py-4 cursor-pointer ${
              contact.isActive ? 'bg-[#F9FAFB] border-l-4 border-[#FE706D]' : 'border-l-4 border-transparent'
            }`}
          >
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-12 h-12 rounded-full border border-gray-200 object-cover shrink-0"
            />
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex flex-row justify-between items-center mb-1">
                <span className="text-[14px] font-bold text-[#001F3F] truncate tracking-[0.0029em]">
                  {contact.name}
                </span>
                <span className="text-[10px] font-medium text-[#9CA3AF] shrink-0 ml-2">
                  {contact.timestamp}
                </span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="text-[12px] font-medium text-[#001F3F] truncate max-w-[200px]">
                  {contact.lastMessage}
                </span>
                {contact.unreadCount && (
                  <span className="bg-[#FE706D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

const ChatMessage: React.FC<{ message: Message; avatar: string }> = ({ message, avatar }) => {
  return (
    <div className={`flex flex-row items-start gap-4 ${message.isSent ? 'justify-end' : ''}`}>
      {!message.isSent && (
        <img
          src={avatar}
          alt="Sender"
          className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
        />
      )}

      <div className={`flex flex-col gap-1 max-w-[540px] ${message.isSent ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-4 text-[14px] leading-[23px] ${
            message.isSent
              ? 'bg-[#001F3F] text-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'
              : 'bg-white border border-[#F3F4F6] text-[#4B5563] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm'
          }`}
        >
          {message.text}
        </div>
        <div className={`flex flex-row items-center gap-1 text-[10px] text-[#9CA3AF] ${message.isSent ? 'flex-row-reverse' : ''}`}>
          <span>{message.timestamp}</span>
          {message.isSent && message.isRead && (
            <div className="flex items-center justify-center">
              <Check size={12} color="#009688" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatInput: React.FC = () => {
  return (
    <div className="bg-white border-t border-[#F3F4F6] p-8 shrink-0">
      <div className="flex flex-row items-center gap-4 bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl p-3 pr-2 shadow-inner">
        <button className="p-2 text-[#9CA3AF] hover:text-gray-600 transition-colors">
          <Plus size={18} color="#9CA3AF" />
        </button>
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 bg-transparent border-none outline-none text-[14px] placeholder:text-[#9CA3AF] text-[#1B2A4A] leading-[17px]"
        />
        <div className="flex flex-row items-center gap-2">
          <button className="p-2 text-[#9CA3AF] hover:text-gray-600 transition-colors">
            <FaceSmile size={18} color="#9CA3AF" />
          </button>
          <button className="w-10 h-10 bg-[#FE706D] rounded-xl flex items-center justify-center shadow-md hover:bg-[#ff5a57] transition-colors">
            <Bolt size={18} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const MessagesPage: React.FC = () => {
  const activeContact = contacts[0]; // Sarah Jenkins is active

  return (
    <div className="w-full h-full flex flex-row bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
      
      {/* Left Panel: Contact List */}
      <ChatSidebar />

      {/* Right Panel: Active Chat View */}
      <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
        
        {/* Chat Header */}
        <div className="bg-white px-8 py-4 border-b border-[#F3F4F6] flex flex-row justify-between items-center shrink-0 min-h-[72px]">
          <div className="flex flex-row items-center gap-4">
            <img
              src={activeContact.avatar}
              alt={activeContact.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
            />
            <div className="flex flex-col">
              <h3 className="text-[16px] font-bold text-[#001F3F] tracking-[0.0029em]">
                {activeContact.name}
              </h3>
              <div className="flex flex-row items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-[12px] font-medium text-[#9CA3AF] tracking-[0.006em]">Online</span>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 border border-[#F3F4F6] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
            <EllipsisVertical size={20} color="#9CA3AF" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
          {/* Date Pill */}
          <div className="w-full flex justify-center pb-2">
            <div className="bg-white shadow-sm px-4 py-1.5 rounded-full">
              <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#9CA3AF]">
                Today
              </span>
            </div>
          </div>

          {activeChatMessages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              avatar={activeContact.avatar}
            />
          ))}
        </div>

        {/* Chat Input */}
        <ChatInput />

      </div>
    </div>
  );
};