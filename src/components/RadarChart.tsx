import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const data = [
  { subject: 'Systems & Integration', A: 95, fullMark: 100 },
  { subject: 'Automation & AI', A: 90, fullMark: 100 },
  { subject: 'Leadership', A: 85, fullMark: 100 },
  { subject: 'Full-Stack Dev', A: 88, fullMark: 100 },
  { subject: 'Platforms', A: 92, fullMark: 100 },
  { subject: 'Monitoring', A: 85, fullMark: 100 },
];

export function RadarChart() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#00f0ff', fontSize: 12, fontFamily: 'monospace' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#00f0ff"
            fill="#3b82f6"
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#050811', 
              border: '1px solid #00f0ff',
              borderRadius: '8px',
              color: '#f4f4f6' 
            }} 
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
