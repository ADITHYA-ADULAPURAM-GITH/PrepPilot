import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface-hover px-3 py-2 shadow-lg">
      <p className="text-[11.5px] text-text-muted">{label}</p>
      <p className="font-mono text-[13px] font-medium text-text">{payload[0].value}h studied</p>
    </div>
  );
}

export function WeeklyProgressChart({ data }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[15px] font-semibold text-text">Weekly Progress</h2>
        <span className="text-[12.5px] text-text-muted">Hours studied</span>
      </div>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b4fe8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#5b4fe8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8a8a99", fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8a8a99", fontSize: 12 }} width={28} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)" }} />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#5b4fe8"
              strokeWidth={2}
              fill="url(#progressGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
