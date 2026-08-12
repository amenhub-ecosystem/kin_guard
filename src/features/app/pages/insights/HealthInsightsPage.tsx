// pages/HealthInsightsPage.tsx
import React from 'react';

// TODO: Verify exact icon names from your existing icon library.
import {
  PdfFile, // Download PDF icon
  CheckCircle,       // Medication Milestone
  ChatBubbleLeftRight, // Social Engagement
  Alert, // Action Needed
  HeartThrob,             // Physical Activity
  PdfFileHollow,      // Archive file icon
  ChevronRight,      // Archive chevron
} from '@/components/common/icons';

// --- Chart Sub-components (Self-contained SVG) ---

const MedicationAdherenceChart: React.FC = () => {
  // Mock Data: Mon -> Sun (0 to 100 scale)
  const data = [
    { day: 'Mon', value: 98 },
    { day: 'Tue', value: 92 },
    { day: 'Wed', value: 80 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 100 },
    { day: 'Sat', value: 90 },
    { day: 'Sun', value: 75 },
  ];

  // SVG ViewBox: 0 0 450 200
  const width = 450;
  const height = 200;
  const padding = { top: 10, bottom: 25, left: 25, right: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 100;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.value / maxValue) * chartHeight;
    return `${x},${y}`;
  });

  const pathD = points.join(' ');
  
  // For the area fill
  const fillD = `M ${points[0]} L ${points.join(' L ')} L ${padding.left + chartWidth},${padding.top + chartHeight} L ${padding.left},${padding.top + chartHeight} Z`;

  return (
    <div className="w-full h-[250px] flex items-end justify-center relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Area Fill */}
        <path d={fillD} fill="#F0FDF4" opacity="0.8" />
        
        {/* Y-Axis grid lines and labels */}
        <text x={padding.left - 5} y={padding.top + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">100</text>
        <line x1={padding.left} y1={padding.top} x2={padding.left + chartWidth} y2={padding.top} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.2 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">80</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.2} x2={padding.left + chartWidth} y2={padding.top + chartHeight * 0.2} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.4 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">60</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.4} x2={padding.left + chartWidth} y2={padding.top + chartHeight * 0.4} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.6 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">40</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.6} x2={padding.left + chartWidth} y2={padding.top + chartHeight * 0.6} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.8 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">20</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.8} x2={padding.left + chartWidth} y2={padding.top + chartHeight * 0.8} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">0</text>
        <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth} y2={padding.top + chartHeight} stroke="#E5E7EB" strokeWidth="1" />

        {/* Line Path */}
        <path d={`M ${pathD}`} fill="none" stroke="#009688" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* Data Points */}
        {points.map((pt, i) => {
          const [x, y] = pt.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="4" fill="#001F3F" />;
        })}

        {/* X-Axis Labels */}
        {data.map((d, i) => {
          const x = padding.left + (i / (data.length - 1)) * chartWidth;
          return (
            <text key={i} x={x} y={padding.top + chartHeight + 20} textAnchor="middle" fontSize="10" fill="#9CA3AF">
              {d.day}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const CheckInConsistencyChart: React.FC = () => {
  // Mock Data: Week 1-4 (0 to 30 scale)
  const data = [
    { week: 'Week 1', value: 28 },
    { week: 'Week 2', value: 26 },
    { week: 'Week 3', value: 30 },
    { week: 'Week 4', value: 26 },
  ];

  const width = 450;
  const height = 250;
  const padding = { top: 10, bottom: 25, left: 25, right: 10 };
  const chartWidth = width - padding.left - padding.right - 40;
  const chartHeight = height - padding.top - padding.bottom - 10;
  const maxValue = 30;

  return (
    <div className="w-full h-[250px] flex items-end justify-center relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Y-Axis grid lines and labels */}
        <text x={padding.left - 5} y={padding.top + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">30</text>
        <line x1={padding.left} y1={padding.top} x2={padding.left + chartWidth + 40} y2={padding.top} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.66 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">20</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.66} x2={padding.left + chartWidth + 40} y2={padding.top + chartHeight * 0.66} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.33 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">10</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.33} x2={padding.left + chartWidth + 40} y2={padding.top + chartHeight * 0.33} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">0</text>
        <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth + 40} y2={padding.top + chartHeight} stroke="#E5E7EB" strokeWidth="1" />

        {/* Bars */}
        {data.map((d, i) => {
          const barWidth = (chartWidth / data.length) * 0.6;
          const spacing = (chartWidth / data.length);
          const x = padding.left + spacing * i + (spacing - barWidth) / 2;
          const barHeight = (d.value / maxValue) * chartHeight;
          const y = padding.top + chartHeight - barHeight;

          return (
            <rect key={i} x={x} y={y} width={barWidth} height={barHeight} fill="#FE706D" rx="4" />
          );
        })}

        {/* X-Axis Labels */}
        {data.map((d, i) => {
          const spacing = (chartWidth / data.length);
          const x = padding.left + spacing * i + spacing / 2;
          return (
            <text key={i} x={x} y={padding.top + chartHeight + 20} textAnchor="middle" fontSize="10" fill="#9CA3AF">
              {d.week}
            </text>
          );
        })}

        {/* Y-Axis Title */}
        <text x="-130" y="10" transform="rotate(-90)" fontSize="10" fill="#444" textAnchor="middle">Logs</text>
      </svg>
    </div>
  );
};

const WellnessTrendsChart: React.FC = () => {
  // Activity data: [60, 65, 80, 75, 85, 90, 88] (0 to 100)
  // Mood data: [70, 72, 65, 80, 78, 85, 92]
  const activityData = [60, 65, 80, 75, 85, 90, 88];
  const moodData = [70, 72, 65, 80, 78, 85, 92];
  const dates = ['Oct 01', 'Oct 05', 'Oct 10', 'Oct 15', 'Oct 20', 'Oct 25', 'Oct 30'];

  const width = 1000;
  const height = 300;
  const padding = { top: 20, bottom: 30, left: 40, right: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 100;

  const getPoints = (data: number[]) => 
    data.map((val, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - (val / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

  const activityPath = getPoints(activityData);
  const moodPath = getPoints(moodData);

  return (
    <div className="w-full h-[300px] flex items-end justify-center relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Y-Axis grid lines */}
        <text x={padding.left - 5} y={padding.top + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">90</text>
        <line x1={padding.left} y1={padding.top} x2={padding.left + chartWidth} y2={padding.top} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.25 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">80</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.25} x2={padding.left + chartWidth} y2={padding.top + chartHeight * 0.25} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.5 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">70</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.5} x2={padding.left + chartWidth} y2={padding.top + chartHeight * 0.5} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight * 0.75 + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">60</text>
        <line x1={padding.left} y1={padding.top + chartHeight * 0.75} x2={padding.left + chartWidth} y2={padding.top + chartHeight * 0.75} stroke="#F3F4F6" strokeWidth="1" />
        
        <text x={padding.left - 5} y={padding.top + chartHeight + 2} textAnchor="end" fontSize="10" fill="#9CA3AF">60</text>
        <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth} y2={padding.top + chartHeight} stroke="#E5E7EB" strokeWidth="1" />

        {/* Activity Line */}
        <path d={`M ${activityPath}`} fill="none" stroke="#001F3F" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {activityPath.split(' ').map((pt, i) => {
          const [x, y] = pt.split(',').map(Number);
          return <circle key={`a-${i}`} cx={x} cy={y} r="4" fill="#001F3F" />;
        })}

        {/* Mood Line */}
        <path d={`M ${moodPath}`} fill="none" stroke="#FE706D" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {moodPath.split(' ').map((pt, i) => {
          const [x, y] = pt.split(',').map(Number);
          return <circle key={`m-${i}`} cx={x} cy={y} r="4" fill="#FE706D" />;
        })}

        {/* X-Axis Labels */}
        {dates.map((d, i) => {
          const x = padding.left + (i / (dates.length - 1)) * chartWidth;
          return (
            <text key={i} x={x} y={padding.top + chartHeight + 20} textAnchor="middle" fontSize="10" fill="#9CA3AF">
              {d}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// --- Main Page Component ---

export const HealthInsightsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full pb-8 max-w-[1080px] mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-[24px] font-bold text-[#001F3F] tracking-[-0.0009em]">
            Health Insights
          </h2>
          <p className="text-[16px] text-[#6B7280]">
            Comprehensive view of Mary's wellness metrics for October.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#FE706D] text-white font-semibold text-[16px] px-6 py-2.5 rounded-full shadow-md hover:bg-[#ff5d5a] transition-colors">
          <PdfFile size={16} color="#FFFFFF" />
          Download PDF
        </button>
      </div>

      {/* Top Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Medication Adherence */}
        <div className="bg-white border border-[#F9FAFB] shadow-sm rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-[18px] font-bold text-[#001F3F] tracking-[0.0009em]">
              Medication Adherence
            </h3>
            <span className="bg-[#E0F2F1] text-[#00796B] text-[12px] font-bold px-3 py-1 rounded">
              88.5% Week Avg
            </span>
          </div>
          <MedicationAdherenceChart />
        </div>

        {/* Card 2: Check-in Consistency */}
        <div className="bg-white border border-[#F9FAFB] shadow-sm rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-[18px] font-bold text-[#001F3F] tracking-[-0.0029em]">
              Check-in Consistency
            </h3>
            <span className="bg-[rgba(254,112,109,0.08)] text-[#FE706D] text-[12px] font-bold px-3 py-1 rounded">
              94% Reliable
            </span>
          </div>
          <CheckInConsistencyChart />
        </div>

      </div>

      {/* Middle Row: Wellness Trends */}
      <div className="bg-white border border-[#F9FAFB] shadow-sm rounded-3xl p-8 flex flex-col gap-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-bold text-[#001F3F] tracking-[0.003em]">
              Wellness Trends
            </h3>
            <p className="text-[12px] text-[#6B7280] tracking-[-0.0009em]">
              Tracking mood and activity levels over the past 30 days
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#001F3F]" />
              <span className="text-[12px] font-medium text-[#001F3F] tracking-[0.003em]">Activity</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FE706D]" />
              <span className="text-[12px] font-medium text-[#001F3F] tracking-[0.034em]">Mood</span>
            </div>
          </div>
        </div>
        <WellnessTrendsChart />
      </div>

      {/* Bottom Row: Summary & Archive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Weekly Summary Highlights */}
        <div className="lg:col-span-8 bg-white border border-[#F9FAFB] shadow-sm rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="text-[18px] font-bold text-[#001F3F]">
            Weekly Summary Highlights
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* 1. Medication Milestone */}
            <div className="flex flex-row items-start gap-4 p-4 bg-[#F9FAFB] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#E0F2F1] flex items-center justify-center shrink-0">
                <CheckCircle size={16} color="#009688" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#001F3F] tracking-[0.0009em]">Medication Milestone</span>
                <span className="text-[12px] leading-[16px] text-[#6B7280]">
                  Mary completed 100% of morning doses for 12 consecutive days.
                </span>
              </div>
            </div>

            {/* 2. Social Engagement */}
            <div className="flex flex-row items-start gap-4 p-4 bg-[#F9FAFB] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                <ChatBubbleLeftRight size={16} color="#001F3F" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#001F3F] tracking-[0.0009em]">Social Engagement</span>
                <span className="text-[12px] leading-[16px] text-[#6B7280]">
                  3 group video calls recorded. Participation was high.
                </span>
              </div>
            </div>

            {/* 3. Action Needed */}
            <div className="flex flex-row items-start gap-4 p-4 bg-[#F9FAFB] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0">
                <Alert size={16} color="#001F3F" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#001F3F] tracking-[0.003em]">Action Needed</span>
                <span className="text-[12px] leading-[16px] text-[#6B7280]">
                  Multivitamin stock is low. Refill recommended before Monday.
                </span>
              </div>
            </div>

            {/* 4. Physical Activity */}
            <div className="flex flex-row items-start gap-4 p-4 bg-[rgba(254,112,109,0.1)] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[rgba(254,112,109,0.2)] flex items-center justify-center shrink-0">
                <HeartThrob size={16} color="#FE706D" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#001F3F] tracking-[0.003em]">Physical Activity</span>
                <span className="text-[12px] leading-[16px] text-[#6B7280]">
                  Daily steps increased by 15% compared to last week.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Archive */}
        <div className="lg:col-span-4 bg-white border border-[#F9FAFB] shadow-sm rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="text-[18px] font-bold text-[#001F3F]">
            Archive
          </h3>
          <div className="flex flex-col gap-3">
            {['September 2024', 'August 2024', 'July 2024'].map((month, idx) => (
              <button
                key={idx}
                className="flex flex-row justify-between items-center p-4 border border-[#F3F4F6] rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-row items-center gap-3">
                  <PdfFileHollow size={16} color="#9CA3AF" />
                  <span className="text-[14px] font-medium text-[#001F3F] tracking-[0.0009em]">
                    {month}
                  </span>
                </div>
                <ChevronRight size={16} color="#001F3F" />
              </button>
            ))}
          </div>
          <button className="w-full text-[14px] font-bold text-[#001F3F] underline py-2 hover:text-[#003665] transition-colors">
            View Older Archives
          </button>
        </div>

      </div>
    </div>
  );
};