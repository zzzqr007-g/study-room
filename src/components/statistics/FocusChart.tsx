import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStatisticsStore } from '@/stores/statisticsStore';

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="glass px-3 py-2 text-sm" style={{ borderRadius: '0.75rem' }}>
        <p className="text-secondary text-xs">{label}</p>
        <p className="text-primary font-semibold">{payload[0].value} 分钟</p>
      </div>
    );
  }
  return null;
}

export function FocusChart() {
  const getWeeklyData = useStatisticsStore((s) => s.getWeeklyData);
  const data = getWeeklyData();

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--border-light)' }} />
          <Bar
            dataKey="minutes"
            fill="var(--accent)"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
