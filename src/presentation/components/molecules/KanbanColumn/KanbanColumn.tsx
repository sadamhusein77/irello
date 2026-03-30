import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from '../KanbanCard';
import type { KanbanColumnProps } from './KanbanColumn.types';

export const KanbanColumn = ({
  id,
  title,
  cards,
  color = '#3B82F6',
  cardCount,
  onCardClick,
  onAddCard,
  onEditColumn,
  onDeleteColumn,
  className = '',
  style,
}: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const cardIds = cards.map((card) => card.id);
  const isEmpty = cards.length === 0;

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col w-72 min-w-72
        bg-slate-100 dark:bg-slate-900
        rounded-lg
        ${isOver ? 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}
        ${className}
      `}
      style={style}
    >
      <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">
            {title}
          </h3>
          {cardCount !== undefined && (
            <span className="px-2 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
              {cardCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {onAddCard && (
            <button
              onClick={onAddCard}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
              aria-label="Add card"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
          {(onEditColumn || onDeleteColumn) && (
            <div className="relative group">
              <button
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                aria-label="Column options"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {onEditColumn && (
                  <button
                    onClick={onEditColumn}
                    className="w-full px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Edit
                  </button>
                )}
                {onDeleteColumn && (
                  <button
                    onClick={onDeleteColumn}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              {...card}
              onClick={onCardClick ? () => onCardClick(card.id) : card.onClick}
            />
          ))}
          {isEmpty && (
            <div className={`
              flex items-center justify-center h-20 text-sm text-slate-400
              border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg
              ${isOver ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}
            `}>
              Drop cards here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};
