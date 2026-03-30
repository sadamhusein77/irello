// Domain Layer - Kanban Entities

export type Priority = 'low' | 'medium' | 'high';

export interface KanbanTag {
  label: string;
  color: string;
}

export interface KanbanAssignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tags: KanbanTag[];
  assignee?: KanbanAssignee;
  priority?: Priority;
  dueDate?: string;
  commentCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cardIds: string[];
}

export interface KanbanBoard {
  id: string;
  title: string;
  columns: KanbanColumn[];
  cards: Record<string, KanbanCard>;
}
