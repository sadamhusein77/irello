import type { KanbanCardProps } from '../../molecules/KanbanCard/KanbanCard.types';

export interface KanbanColumnData {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCardProps[];
}

export interface KanbanBoardProps {
  columns: KanbanColumnData[];
  searchQuery?: string;
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string, newIndex: number) => void;
  onCardClick?: (cardId: string, columnId: string) => void;
  onAddColumn?: (columnData: { title: string; color: string }) => void;
  onEditColumn?: (columnId: string) => void;
  onDeleteColumn?: (columnId: string) => void;
  onAddCard?: (columnId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
