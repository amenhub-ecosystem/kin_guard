// pages/MedicationsPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/lib/apiClient';

// TODO: Verify exact icon names from your existing icon library.
// Updated to use the explicit size & color props as requested.
import {
  MoonIcon,
  Clock,
  Pills,
  Plus,
  Calendar,
  CheckCircle,
  Download,
  BuildingStorefront, // or Pharmacy icon depending on your library
} from '@/components/common/icons';

// --- Sub-components ---

interface Medication {
  id: string;
  lovedOneId?: string | null;
  name: string;
  dose?: string | null;
  schedule?: string | null;
  notes?: string | null;
  active?: boolean;
}

const DailyScheduleCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#001F3F] tracking-[0.0048em]">Daily Schedule</h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar size={14} color="#6B7280" />
          <span>Today, Oct 24</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Morning */}
        <div className="flex flex-row items-stretch gap-6">
          <div className="flex flex-col items-end pt-4 w-20 shrink-0">
            <span className="text-sm font-bold text-[#001F3F] tracking-[0.008em]">Morning</span>
            <span className="text-[10px] text-gray-400 uppercase">8:00 AM</span>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {/* Item 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 relative flex flex-row justify-between items-start pl-8">
              <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#009688] rounded-l-2xl" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <CheckCircle size={16} color="#009688" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#001F3F]">Lisinopril 10mg</span>
                    <span className="text-xs text-gray-500">Blood Pressure • Taken at 8:05 AM</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <CheckCircle size={16} color="#009688" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#001F3F]">Multivitamin</span>
                    <span className="text-xs text-gray-500">Daily Supplement • Taken at 8:05 AM</span>
                  </div>
                </div>
              </div>
              <span className="bg-[#009688] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.013em]">
                Done
              </span>
            </div>
          </div>
        </div>

        {/* Afternoon */}
        <div className="flex flex-row items-stretch gap-6">
          <div className="flex flex-col items-end pt-4 w-20 shrink-0">
            <span className="text-sm font-bold text-[#001F3F] tracking-[0.0019em]">Afternoon</span>
            <span className="text-[10px] text-gray-400 uppercase">2:00 PM</span>
          </div>
          <div className="flex-1">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 relative flex flex-row justify-between items-start pl-8">
              <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#001F3F] rounded-l-2xl" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Clock size={16} color="#001F3F" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#001F3F]">Metformin 500mg</span>
                    <span className="text-xs text-gray-500">Diabetes • Scheduled for 2:00 PM</span>
                  </div>
                </div>
              </div>
              <span className="bg-[#001F3F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.013em]">
                Upcoming
              </span>
            </div>
          </div>
        </div>

        {/* Night */}
        <div className="flex flex-row items-stretch gap-6 opacity-60">
          <div className="flex flex-col items-end pt-4 w-20 shrink-0">
            <span className="text-sm font-bold text-[#001F3F] tracking-[0.014em]">Night</span>
            <span className="text-[10px] text-gray-400 uppercase">9:00 PM</span>
          </div>
          <div className="flex-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 relative flex flex-row justify-between items-start pl-8">
              <div className="absolute left-0 top-1 bottom-1 w-1 bg-gray-400 rounded-l-2xl" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <MoonIcon size={16} color="#9CA3AF" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#001F3F]">Aspirin 81mg</span>
                    <span className="text-xs text-gray-500">Heart Health • Scheduled for 9:00 PM</span>
                  </div>
                </div>
              </div>
              <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeatmapCard: React.FC = () => {
  // Dummy data representing the screenshot blocks
  const days = [
    'green', 'green', 'green', 'yellow', 'green', 'green', 'green', 'red', 'green', 'green',
    'green', 'green', 'green', 'green', 'green', 'green', 'green', 'yellow', 'green', 'green',
    'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',
    'green'
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,31,63,0.08)] p-8 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-[#001F3F] tracking-[0.0009em]">30-Day Adherence Heatmap</h3>
          <p className="text-sm text-gray-500">Visual compliance tracking for all medications</p>
        </div>
        <div className="flex flex-row items-center gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500" />
            <span>Taken</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-500" />
            <span>Late</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-red-500" />
            <span>Missed</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-[repeat(31,minmax(0,1fr))] gap-1.5 w-full py-2">
        {days.map((color, i) => (
          <div
            key={i}
            className={`w-full aspect-square rounded-[3px] ${
              color === 'green' ? 'bg-emerald-500' :
              color === 'yellow' ? 'bg-amber-500' :
              'bg-red-500'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-row justify-between items-center pt-6 border-t border-gray-50">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#001F3F]">94%</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.009em]">Monthly Avg</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#001F3F]">28</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[-0.001em]">Streak (Days)</span>
          </div>
        </div>
        <button className="flex items-center gap-2 text-[#00796B] text-sm font-bold hover:underline">
          Download Report
          <Download size={14} color="#00796B" />
        </button>
      </div>
    </div>
  );
};

const CareCircleNotificationsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-row items-center gap-6">
      {/* Avatar Stack */}
      <div className="flex -space-x-3 shrink-0">
        {/* TODO: Replace with actual exported image assets */}
        <img className="w-10 h-10 rounded-full border-2 border-white relative z-30 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Member" />
        <img className="w-10 h-10 rounded-full border-2 border-white relative z-20 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" alt="Member" />
        <img className="w-10 h-10 rounded-full border-2 border-white relative z-10 object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" alt="Member" />
        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-[#001F3F] relative z-0 shadow-sm">+2</div>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <span className="text-sm font-bold text-[#001F3F] tracking-[0.0019em]">Care Circle Notifications</span>
        <span className="text-xs text-gray-500">All members are notified when a dose is missed for more than 30 minutes.</span>
      </div>

      <button className="text-[#009688] text-sm font-bold hover:underline shrink-0">
        Configure Alerts
      </button>
    </div>
  );
};

const RefillAlertsCard: React.FC = () => {
  return (
    <div className="bg-[#003665] rounded-2xl shadow-lg p-6 relative overflow-hidden flex flex-col gap-4">
      <div className="absolute w-32 h-32 bg-white/5 blur-2xl rounded-full -right-8 -bottom-8 pointer-events-none" />
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Pills size={16} color="#FFFFFF" />
        </div>
        <h3 className="text-white text-base font-bold">Refill Alerts</h3>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {/* Item 1 */}
        <div className="bg-white/10 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-bold tracking-[0.007em]">Lisinopril</span>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">LOW</span>
          </div>
          <span className="text-white/60 text-xs">4 tablets remaining (2 days)</span>
          <button className="w-full bg-[#FE706D] text-white text-xs font-bold py-2 rounded-lg mt-1 hover:bg-[#fe5a56] transition-colors">
            Order Refill
          </button>
        </div>

        {/* Item 2 */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-bold tracking-[0.004em]">Metformin</span>
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">5 DAYS</span>
          </div>
          <span className="text-white/60 text-xs">15 tablets remaining</span>
        </div>
      </div>
    </div>
  );
};


const ActiveInventoryCard: React.FC<{ medications: Medication[]; onDelete: (id: string) => Promise<void> }> = ({ medications, onDelete }) => {
  const inventory = medications.map((m) => ({
    name: m.name,
    dosage: m.dose || '',
    id: m.id,
    barColor: 'bg-emerald-500',
    barWidth: 'w-1/3',
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-[#001F3F]">Active Inventory</h3>
        <button className="text-gray-500 hover:text-gray-700">
          {/* Vertical Ellipsis icon placeholder */}
          <div className="flex flex-col gap-0.5 items-center">
            <div className="w-1 h-1 rounded-full bg-gray-500" />
            <div className="w-1 h-1 rounded-full bg-gray-500" />
            <div className="w-1 h-1 rounded-full bg-gray-500" />
          </div>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {inventory.map((item) => (
          <div key={item.id} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#001F3F] tracking-[0.007em]">{item.name}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.002em]">{item.dosage}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onDelete(item.id)} className="text-xs text-red-500 font-bold">Delete</button>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
              <div className={`h-full rounded-full ${item.barColor} ${item.barWidth}`} />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full border-2 border-dashed border-gray-200 text-gray-400 text-sm font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors">
        + View History
      </button>
    </div>
  );
};

const PreferredPharmacyCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-[#001F3F]">Preferred Pharmacy</h3>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
          <BuildingStorefront size={20} color="#00796B" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-[#001F3F] tracking-[0.0019em]">Walgreens Health</span>
          <span className="text-xs text-gray-500">852 Oak St, Chicago, IL</span>
          <span className="text-xs font-bold text-[#009688]">(555) 012-3456</span>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export const MedicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiClient.get('/medications').then((j: any) => setMedications(j?.medications ?? [])).catch((e: any) => { console.error(e); setError('Failed to load medications'); setMedications([]); }).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiClient.del(`/medications/${encodeURIComponent(id)}`);
      setMedications((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error(e);
      setError('Failed to delete medication');
    }
  };

  if (loading) {
    return <div className="p-8">Loading medications…</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-8 w-full pb-8">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-[#001F3F] tracking-[0.0019em]">Medications</h1>
          <p className="text-gray-500 text-base">Manage Mama Grace's daily schedule and supply.</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-[#001F3F] font-bold text-sm px-5 py-3 rounded-full hover:bg-gray-50 transition-colors">
            <Pills size={16} color="#001F3F" />
            Log Dose
          </button>
          <button onClick={() => navigate('/app/medication/add')} className="flex items-center gap-2 bg-[#003665] text-white font-bold text-sm px-5 py-3 rounded-full shadow-md hover:bg-[#002a52] transition-colors">
            <Plus size={16} color="#FFFFFF" />
            Add Medication
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="flex flex-col gap-8 xl:col-span-8">
          <DailyScheduleCard />
          <HeatmapCard />
          <CareCircleNotificationsCard />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8 xl:col-span-4">
          <RefillAlertsCard />
          <ActiveInventoryCard medications={medications} onDelete={handleDelete} />
          <PreferredPharmacyCard />
        </div>

      </div>
    </div>
  );
};