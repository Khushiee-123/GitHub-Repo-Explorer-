import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TransformedRepo } from '../../types/github';
import { getLanguageColor } from '../../utils/languageColors';
import { Code } from '../../utils/icons';

interface LanguageChartProps {
  repos: TransformedRepo[];
}

interface LanguageData {
  name: string;
  value: number;
  color: string;
}

/**
 * Donut chart showing language distribution across repos.
 * Returns null if fewer than 2 distinct languages.
 */
export const LanguageChart: React.FC<LanguageChartProps> = ({ repos }) => {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const repo of repos) {
      const lang = repo.language ?? 'Other';
      counts[lang] = (counts[lang] ?? 0) + 1;
    }

    const sorted = Object.entries(counts)
      .map(([name, value]) => ({ name, value, color: getLanguageColor(name) }))
      .sort((a, b) => b.value - a.value);

    if (sorted.length <= 1) return null;

    // Top 8 + "Other"
    if (sorted.length > 8) {
      const top = sorted.slice(0, 8);
      const otherCount = sorted.slice(8).reduce((sum, item) => sum + item.value, 0);
      top.push({ name: 'Other', value: otherCount, color: getLanguageColor('Other') });
      return top;
    }

    return sorted;
  }, [repos]);

  if (!chartData) return null;

  return (
    <div className="card-base p-5 sm:p-6 animate-fadeSlideIn">
      <div className="flex items-center gap-2 mb-4">
        <Code size={14} className="text-[var(--text-tertiary)]" />
        <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">
          Languages
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
            stroke="var(--bg-surface)"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: 'none' }}
          />
          <Legend
            content={<CustomLegend data={chartData} />}
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ─── Custom Tooltip ─── */
interface TooltipPayload {
  name: string;
  value: number;
  payload: LanguageData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: data.payload.color }}
        />
        <span className="font-body text-xs text-[var(--text-primary)]">{data.name}</span>
      </div>
      <p className="font-mono text-sm text-[var(--text-mono)] mt-0.5">
        {data.value} {data.value === 1 ? 'repo' : 'repos'}
      </p>
    </div>
  );
};

/* ─── Custom Legend ─── */
interface CustomLegendProps {
  data: LanguageData[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-[10px] font-body text-[var(--text-secondary)]">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};
