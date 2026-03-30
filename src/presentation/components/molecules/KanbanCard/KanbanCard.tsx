import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { KanbanCardProps } from './KanbanCard.types';
import { priorityColors } from './KanbanCard.types';

export const KanbanCard = ({
  id,
  title,
  description,
  tags = [],
  assignee,
  priority,
  dueDate,
  commentCount = 0,
  onClick,
  className = '',
}: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={sortableStyle}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={`
        bg-white dark:bg-slate-800
        rounded-lg shadow-sm border border-slate-200 dark:border-slate-700
        p-3 cursor-grab active:cursor-grabbing
        transition-all duration-150
        hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600
        ${isDragging ? 'opacity-50 shadow-lg rotate-2 z-50' : ''}
        ${className}
      `}
    >
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs font-medium rounded-full"
              style={{ backgroundColor: tag.color + '20', color: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}

      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h4>

      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
          {description}
        </p>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {priority && (
            <span className={`px-2 py-0.5 text-xs rounded ${(priorityColors as Record<string, string>)[priority]}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          )}
          {dueDate && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {dueDate}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {commentCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {commentCount}
            </span>
          )}
          {assignee && (
            <div
              className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300"
              title={assignee.name}
            >
              {assignee.avatar ? (
                <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full" />
              ) : (
                assignee.name.charAt(0).toUpperCase()
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
