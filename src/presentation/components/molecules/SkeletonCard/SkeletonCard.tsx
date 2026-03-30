// Skeleton Card Component

export const SkeletonCard = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-lg shadow-sm border border-slate-200 dark:border-slate-700
        p-3 animate-pulse
        ${className}
      `}
    >
      {/* Tags skeleton */}
      <div className="flex gap-1 mb-2">
        <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Title skeleton */}
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />

      {/* Description skeleton */}
      <div className="space-y-1 mb-3">
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-12 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-10 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};
