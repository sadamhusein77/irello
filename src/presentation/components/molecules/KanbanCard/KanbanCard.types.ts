export interface KanbanCardProps {
  id: string;
  title: string;
  description?: string;
  tags?: Array<{
    label: string;
    color: string;
  }>;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  commentCount?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  draggableProps?: Record<string, unknown>;
  isDragging?: boolean;
}

export const priorityColors = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};
