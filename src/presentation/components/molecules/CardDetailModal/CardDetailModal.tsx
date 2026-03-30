// Card Detail Modal Component

import { useEffect } from 'react';
import type { KanbanCardProps } from '../KanbanCard/KanbanCard.types';
import { priorityColors } from '../KanbanCard/KanbanCard.types';

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: KanbanCardProps | null;
}

export const CardDetailModal = ({
  isOpen,
  onClose,
  card,
}: CardDetailModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-slate-900 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {card.title}
              </h2>
              {card.priority && (
                <span className={`inline-block px-2 py-0.5 text-xs rounded ${(priorityColors as Record<string, string>)[card.priority]}`}>
                  {card.priority.charAt(0).toUpperCase() + card.priority.slice(1)} Priority
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          {card.description && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {card.dueDate && (
              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Due Date
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {card.dueDate}
                </p>
              </div>
            )}
            {card.commentCount !== undefined && card.commentCount > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Comments
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {card.commentCount}
                </p>
              </div>
            )}
          </div>

          {/* Assignee */}
          {card.assignee && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Assignee
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300">
                  {card.assignee.avatar ? (
                    <img src={card.assignee.avatar} alt={card.assignee.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    card.assignee.name.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {card.assignee.name}
                </span>
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
