// pages/Dashboard.tsx
import React from 'react';

// Icons - exact exports from "@/components/common/icons"
import {
  Pills,
  UserPlus,
  PaperPlane,
  EmergencySos,
  CheckCircle,
  ChevronRight,
  Plus,
  Chart,
} from "@/components/common/icons";

// --- Sub-components ---

const GreetingHeader: React.FC = () => {
  return (
    <header className="flex flex-col gap-1 mb-8">
      <h1 className="text-[30px] font-bold text-[#1B2A4A] leading-9 tracking-[-0.0078em]">
        Good Morning, Miracle 👋
      </h1>
      <p className="text-base text-slate-500 flex flex-wrap gap-2">
        <span>Here's today's update for Mama Grace.</span>
        <span className="font-medium text-[#003665]">Tuesday, Oct 24</span>
      </p>
    </header>
  );
};

const HeroCard: React.FC = () => {
  return (
    <section className="relative col-span-12 lg:col-span-8 rounded-3xl bg-[#003665] shadow-xl overflow-hidden p-8 flex flex-col justify-between gap-8 min-h-[400px]">
      {/* Radial Gradient Overlay */}
      <div
        className="absolute -right-20 -top-20 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(70.71% 70.71% at 50% 50%, rgba(254, 112, 109, 0.2) 0%, rgba(254, 112, 109, 0) 70%)",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Profile & Status */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 p-1">
            {/* TODO: Replace with actual exported image asset for Mama Grace */}
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Mama Grace"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white tracking-[0.0029em]">
              Mama Grace
            </h2>
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Checked in today at 8:14 AM</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-4 w-full max-w-[260px]">
          <p className="text-white/90 text-lg italic tracking-[-0.001em]">
            “I'm feeling good today 😊”
          </p>
        </div>
      </div>

      {/* Stats & Reminders */}
      <div className="relative z-10 flex flex-col gap-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wellness Stat */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col gap-1">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.5px]">
              Wellness
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold">95%</span>
              <span className="text-green-400 text-[10px] font-bold">+2%</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mt-1">
              <div className="w-[95%] h-full bg-green-400 rounded-full" />
            </div>
          </div>

          {/* Medications Stat */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col gap-1">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.5px]">
              Medications
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold tracking-[0.014em]">
                2/3
              </span>
              <span className="text-white/60 text-[10px] font-medium">taken</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mt-1">
              <div className="w-[66%] h-full bg-green-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Next Reminder */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FE706D] rounded-lg flex items-center justify-center">
              <Pills className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.011em]">
                Next Reminder
              </span>
              <span className="text-white text-xs font-semibold tracking-[0.006em]">
                2:00 PM • Vitamins
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </div>
      </div>
    </section>
  );
};

const WellnessSnapshot: React.FC = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#001F3F] tracking-[0.0009em]">
          Wellness Snapshot
        </h3>
        <span className="bg-teal-50 text-teal-700 text-xs font-bold px-2 py-1 rounded">
          Last 7 Days
        </span>
      </div>

      {/* Emoji Days */}
      <div className="flex justify-between bg-gray-50 rounded-xl p-4 px-2">
        {days.map((day) => (
          <div key={day} className="flex flex-col items-center gap-1">
            <span className="text-2xl">😊</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.5em]">
              {day[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Adherence Card */}
      <div className="bg-[#001F3F] rounded-xl p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.0009em]">
            Overall Adherence
          </span>
          <span className="text-white text-xl font-bold">95%</span>
        </div>
        <div className="bg-white/10 rounded-lg p-2">
          <Chart className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Status Alert */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-teal-700" />
        </div>
        <div className="flex flex-col">
          <span className="text-teal-700 text-sm font-bold tracking-[0.003em]">
            Status: All Clear
          </span>
          <span className="text-teal-700/80 text-xs">
            Everything looks good today.
          </span>
        </div>
      </div>
    </section>
  );
};

const QuickActionGrid: React.FC = () => {
  const actions = [
    {
      label: "Add Medication",
      icon: <Pills className="w-6 h-6 text-[#003665]" />,
      bg: "bg-blue-50",
    },
    {
      label: "Invite Member",
      icon: <UserPlus className="w-6 h-6 text-[#003665]" />,
      bg: "bg-purple-50",
    },
    {
      label: "Send Check-in",
      icon: <PaperPlane className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
    },
    {
      label: "Emergency SOS",
      icon: <EmergencySos className="w-6 h-6 text-white" />,
      bg: "bg-red-500",
      cardBg: "bg-red-50",
      border: "border-red-200",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl shadow-sm transition-all hover:scale-[1.02] ${
            action.cardBg || "bg-white border border-gray-100"
          } ${action.border || ""}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              action.bg
            }`}
          >
            {action.icon}
          </div>
          <span
            className={`text-sm font-bold text-center ${
              action.textColor || "text-[#1B2A4A]"
            }`}
          >
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const ActivityTimeline: React.FC = () => {
  const activities = [
    {
      title: "Morning Medication Confirmed",
      description: "System automatically confirmed dose taken",
      time: "8:02 AM",
      status: "completed",
      iconColor: "border-green-500",
      dotColor: "bg-green-500",
    },
    {
      title: "Daily Check-in Completed",
      description: '"Feeling good today, looking forward to the walk"',
      time: "8:14 AM",
      status: "completed",
      iconColor: "border-blue-500",
      dotColor: "bg-blue-500",
    },
    {
      title: "Scheduled: Caregiver Arrival",
      description: "Mary is scheduled for 10:30 AM visit",
      time: "10:30 AM",
      status: "pending",
      iconColor: "border-gray-300",
      dotColor: "bg-gray-300",
    },
  ];

  return (
    <section className="flex flex-col gap-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#1B2A4A]">Today's Activity</h3>
        <button className="text-[#003665] text-sm font-semibold hover:underline">
          View History
        </button>
      </div>

      <div className="relative flex flex-col gap-8 pl-8">
        {/* Vertical Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200" />

        {activities.map((item, index) => (
          <div key={index} className="relative flex justify-between items-start">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-8 top-1 w-6 h-6 rounded-full border-2 bg-white ${item.iconColor} flex items-center justify-center`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`} />
            </div>

            <div className="flex flex-col">
              <h4 className="text-base font-bold text-[#1B2A4A]">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
            <span className="bg-gray-50 text-slate-500 text-xs font-bold px-2 py-1 rounded">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const MedicationSchedule: React.FC = () => {
  const medications = [
    {
      name: "Morning Dose",
      meds: "Metformin, Vitamin D",
      time: "8:00 AM",
      status: "Completed",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      iconBg: "bg-emerald-500",
      statusBg: "bg-emerald-200",
      statusText: "text-emerald-700",
      textColor: "text-emerald-900",
      subTextColor: "text-emerald-700",
      timeColor: "text-emerald-800",
    },
    {
      name: "Afternoon Dose",
      meds: "BP Meds (Losartan)",
      time: "2:00 PM",
      status: "Upcoming",
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-[#003665]",
      statusBg: "bg-blue-200",
      statusText: "text-[#003665]",
      textColor: "text-[#1B2A4A]",
      subTextColor: "text-slate-500",
      timeColor: "text-[#1B2A4A]",
    },
    {
      name: "Night Dose",
      meds: "Melatonin (If needed)",
      time: "9:00 PM",
      status: "Pending",
      bg: "bg-gray-50",
      border: "border-gray-200",
      iconBg: "bg-gray-400",
      statusBg: "bg-gray-200",
      statusText: "text-gray-600",
      textColor: "text-gray-700",
      subTextColor: "text-gray-500",
      timeColor: "text-gray-600",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold text-[#1B2A4A]">Medication Schedule</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {medications.map((med) => (
          <div
            key={med.name}
            className={`flex flex-col p-6 gap-3 rounded-3xl border ${med.bg} ${med.border}`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${med.iconBg}`}
              >
                <Pills className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-[10px] font-extrabold uppercase tracking-[0.01em] px-2 py-1 rounded-full ${med.statusBg} ${med.statusText}`}
              >
                {med.status}
              </span>
            </div>
            <div className="flex flex-col pt-2">
              <h4 className={`text-base font-bold ${med.textColor}`}>
                {med.name}
              </h4>
              <span className={`text-xs ${med.subTextColor}`}>{med.meds}</span>
            </div>
            <span className={`text-sm font-bold pt-2 ${med.timeColor}`}>
              {med.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CareCircle: React.FC = () => {
  const members = [
    {
      name: "Israel Adeyemi",
      role: "Primary Admin • Family",
      status: "online",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Sarah Adeyemi",
      role: "Daughter • Family",
      status: "offline",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Mary Johnson",
      role: "Caregiver • Pro",
      status: "online",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Dr. James Wilson",
      role: "PCP • Professional",
      status: "offline",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
    },
  ];

  return (
    <section className="col-span-12 lg:col-span-4 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#1B2A4A] tracking-[-0.001em]">
          Care Circle
        </h3>
        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Plus className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {members.map((member) => (
          <li
            key={member.name}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {/* TODO: Replace with actual exported image assets */}
            <img
              src={member.image}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1 flex flex-col">
              <span className="text-sm font-bold text-[#1B2A4A]">
                {member.name}
              </span>
              <span className="text-xs text-slate-500">{member.role}</span>
            </div>
            <div
              className={`w-2 h-2 rounded-full ${
                member.status === "online" ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </li>
        ))}
      </ul>

      {/* Upcoming Appointment */}
      <div className="mt-2 border-t border-gray-100 pt-6">
        <div className="bg-blue-50 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[#003665] text-[10px] font-bold uppercase tracking-[0.6px]">
            Upcoming Appointment
          </span>
          <h4 className="text-sm font-bold text-[#1B2A4A]">General Check-up</h4>
          <span className="text-xs text-slate-500 pb-2">
            Tomorrow at 10:00 AM
          </span>
          <button className="w-full bg-[#003665] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#002a52] transition-colors">
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Main Dashboard Component ---

export const DashboardLayout: React.FC = () => {
  return (
    <main className="w-full max-w-7xl mx-auto p-8 flex flex-col gap-8">
      <GreetingHeader />

      {/* Top Row: Hero + Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <HeroCard />
        <WellnessSnapshot />
      </div>

      {/* Quick Actions */}
      <QuickActionGrid />

      {/* Bottom Row: Activity/Medication + Care Circle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <ActivityTimeline />
          <MedicationSchedule />
        </div>
        <CareCircle />
      </div>
    </main>
  );
};

// --- Usage Example inside a page wrapper ---
export default DashboardLayout;