import type { SortBy, SortDir } from '@/types';

interface SortControlProps {
  sortBy: SortBy;
  sortDir: SortDir;
  onSortChange: (sort: SortBy) => void;
}

const OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Name', value: 'name' },
  { label: '# Supports', value: 'supports' },
];

export function SortControl({ sortBy, sortDir, onSortChange }: SortControlProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((o) => {
        const isActive = sortBy === o.value;
        const arrow = isActive ? (sortDir === 'asc' ? ' \u2191' : ' \u2193') : '';
        return (
          <button
            type="button"
            key={o.value}
            onClick={() => onSortChange(o.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] ${
              isActive
                ? 'bg-[#8b7a2e] text-[#e8e4d8]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {o.label}
            {arrow}
          </button>
        );
      })}
    </div>
  );
}
