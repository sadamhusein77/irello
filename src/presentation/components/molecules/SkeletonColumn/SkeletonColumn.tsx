// Skeleton Column Component

import { SkeletonCard } from '../SkeletonCard';

interface SkeletonColumnProps {
  count?: number;
}

export const SkeletonColumn = ({ count = 3 }: SkeletonColumnProps) => {
  return (
    <div className="flex flex-col w-72 min-w-72 bg-slate-100 dark:bg-slate-900 rounded-lg">
      {/* Header skeleton */}
      <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
          <div className="h-4 w-20 bg-slate-300 dark:bg-slate-700 rounded" />
          <div className="h-5 w-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};
