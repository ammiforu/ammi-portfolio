import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Users, Eye, Clock, Activity, Calendar } from 'lucide-react';

interface DataPoint {
  date: string;
  subscribers: number;
  total_views: number;
  weekly_views: number;
  weekly_watch_hours: number;
  displayDate: string;
}

type MetricType = 'total_views' | 'subscribers' | 'weekly_views' | 'weekly_watch_hours';

const METRICS: {
  key: MetricType;
  label: string;
  shortLabel: string;
  unit: string;
  color: string;
  gradientId: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'total_views',
    label: 'Total Views Growth',
    shortLabel: 'Total Views',
    unit: 'views',
    color: '#e2c392',
    gradientId: 'viewsGrad',
    icon: <Eye className="w-3.5 h-3.5" />,
  },
  {
    key: 'subscribers',
    label: 'Subscriber Acquisition',
    shortLabel: 'Subscribers',
    unit: 'subs',
    color: '#00f0ff',
    gradientId: 'subsGrad',
    icon: <Users className="w-3.5 h-3.5" />,
  },
  {
    key: 'weekly_views',
    label: '7-Day View Velocity',
    shortLabel: 'Weekly Velocity',
    unit: 'views/wk',
    color: '#10b981',
    gradientId: 'velocityGrad',
    icon: <TrendingUp className="w-3.5 h-3.5" />,
  },
  {
    key: 'weekly_watch_hours',
    label: 'Watch Time (Hours)',
    shortLabel: 'Watch Hours',
    unit: 'hrs/wk',
    color: '#a855f7',
    gradientId: 'watchGrad',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
  return num.toLocaleString();
};

export const YouTubeAnalyticsChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('total_views');
  const [updatedAt, setUpdatedAt] = useState<string>('');

  useEffect(() => {
    fetch('/analytics/youtube_timeseries.json')
      .then((res) => res.json())
      .then((json) => {
        if (json.history && Array.isArray(json.history)) {
          setData(json.history);
          setUpdatedAt(json.updated_at || '');
        }
      })
      .catch((err) => console.error('Error loading timeseries analytics:', err));
  }, []);

  if (!data || data.length === 0) {
    return null;
  }

  const activeConfig = METRICS.find((m) => m.key === selectedMetric) || METRICS[0];

  const firstPoint = data[0];
  const lastPoint = data[data.length - 1];
  const initialVal = firstPoint ? firstPoint[selectedMetric] : 0;
  const currentVal = lastPoint ? lastPoint[selectedMetric] : 0;
  const netGain = currentVal - initialVal;
  const percentGain = initialVal > 0 ? ((netGain / initialVal) * 100).toFixed(1) : '0';

  return (
    <div className="rounded-3xl glass-panel editorial-border p-6 md:p-8 space-y-6 relative overflow-hidden bg-[#0c0d14]/90 backdrop-blur-md">
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeConfig.color }}
      />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-white/8 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#e2c392]">
            <Activity className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
            <span>REAL-TIME PIPELINE ANALYTICS</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Synced via Google Drive JSON
            </span>
          </div>
          <h3 className="text-2xl font-bold font-syne text-white mt-1">
            {activeConfig.label}
          </h3>
          <p className="text-xs font-mono text-[#9496a8] mt-0.5">
            43 daily telemetry snapshots tracked continuously across the automation pipeline
          </p>
        </div>

        {/* Current Metric Highlight */}
        <div className="flex items-center gap-6">
          <div className="text-left lg:text-right">
            <div className="text-[10px] font-mono uppercase text-[#9496a8]">Current Metric</div>
            <div className="text-2xl md:text-3xl font-bold font-syne text-white tracking-tight" style={{ color: activeConfig.color }}>
              {currentVal.toLocaleString()}{' '}
              <span className="text-xs font-mono font-normal text-white/60">{activeConfig.unit}</span>
            </div>
            {netGain !== 0 && (
              <div className="text-[11px] font-mono text-emerald-400 flex items-center lg:justify-end gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>
                  +{netGain.toLocaleString()} ({percentGain}%) over {data.length} days
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {METRICS.map((m) => {
          const isSelected = selectedMetric === m.key;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setSelectedMetric(m.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                isSelected
                  ? 'bg-white/10 text-white border border-white/20 shadow-md font-semibold'
                  : 'bg-[#12131c] text-[#9496a8] border border-white/5 hover:border-white/15 hover:text-white'
              }`}
            >
              <span style={{ color: isSelected ? m.color : '#9496a8' }}>{m.icon}</span>
              <span>{m.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Area Chart Container */}
      <div className="w-full h-72 md:h-80 pt-2 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={activeConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeConfig.color} stopOpacity={0.45} />
                <stop offset="95%" stopColor={activeConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />

            <XAxis
              dataKey="displayDate"
              stroke="#9496a8"
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: '#ffffff15' }}
              minTickGap={25}
            />

            <YAxis
              stroke="#9496a8"
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={{ stroke: '#ffffff15' }}
              tickFormatter={formatNumber}
              domain={['auto', 'auto']}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pData = payload[0].payload as DataPoint;
                  return (
                    <div className="p-3 rounded-xl bg-[#0f1018]/95 border border-white/15 shadow-2xl backdrop-blur-md space-y-1.5 min-w-[160px]">
                      <div className="text-[11px] font-mono text-[#9496a8] flex items-center gap-1.5 pb-1 border-b border-white/10">
                        <Calendar className="w-3 h-3 text-[#e2c392]" />
                        <span>{pData.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9496a8] capitalize">{activeConfig.shortLabel}:</span>
                        <span className="font-bold font-syne text-white ml-2" style={{ color: activeConfig.color }}>
                          {Number(pData[selectedMetric]).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#9496a8]/70 pt-0.5">
                        Weekly: {pData.weekly_views.toLocaleString()} views · {pData.weekly_watch_hours}h
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={activeConfig.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${activeConfig.gradientId})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: activeConfig.color,
                stroke: '#08080a',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info & Verification */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9496a8]/70 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Data Source: YouTube Cloud Analytics API & Automated Pipeline</span>
        </div>
        {updatedAt && (
          <div>
            Snapshot Range: {firstPoint?.displayDate} — {lastPoint?.displayDate} (Daily Active Telemetry)
          </div>
        )}
      </div>
    </div>
  );
};
