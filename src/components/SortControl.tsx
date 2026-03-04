import type { SortBy, SortDir } from '@/types';
import { GEM_COLORS } from '@/types';

interface SortControlProps {
  sortBy: SortBy;
  sortDir: SortDir;
  onSortChange: (sort: SortBy) => void;
}

const OPTIONS: { label: string; value: SortBy; color?: string }[] = [
  { label: 'Name', value: 'name' },
  { label: 'R#', value: 'red', color: GEM_COLORS.red },
  { label: 'G#', value: 'green', color: GEM_COLORS.green },
  { label: 'B#', value: 'blue', color: GEM_COLORS.blue },
];

export function SortControl({ sortBy, sortDir, onSortChange }: SortControlProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((o) => {
        const isActive = sortBy === o.value;
        const arrow = isActive ? (sortDir === 'asc' ? ' \u2191' : ' \u2193') : '';

        let style: React.CSSProperties | undefined;
        if (isActive) {
          style = o.color
            ? { backgroundColor: o.color, color: 'white' }
            : { backgroundColor: '#8b7a2e', color: '#e8e4d8' };
        } else if (o.color) {
          style = { color: o.color };
        }

        return (
          <button
            type="button"
            key={o.value}
            onClick={() => onSortChange(o.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] ${
              !isActive && !o.color ? 'text-muted-foreground hover:text-foreground' : ''
            }`}
            style={style}
          >
            {o.label}
            {arrow}
          </button>
        );
      })}
    </div>
  );
}
