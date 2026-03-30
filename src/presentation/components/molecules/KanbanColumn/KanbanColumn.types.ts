import type { KanbanCardProps } from '../KanbanCard/KanbanCard.types';

export interface KanbanColumnProps {
  id: string;
  title: string;
  cards: KanbanCardProps[];
  color?: string;
  cardCount?: number;
  onCardClick?: (cardId: string) => void;
  onAddCard?: () => void;
  onEditColumn?: () => void;
  onDeleteColumn?: () => void;
  onViewCardDetails?: (card: KanbanCardProps) => void;
  onEditCard?: (card: KanbanCardProps) => void;
  className?: string;
  style?: React.CSSProperties;
  droppableProps?: Record<string, unknown>;
  isOver?: boolean;
}
