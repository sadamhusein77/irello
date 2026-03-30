// Data Layer - Kanban Repository
// Service layer with mock/real API switching

import type { KanbanColumnData } from '../../presentation/components/organisms/KanbanBoard/KanbanBoard.types';
import { fetchKanbanBoard, fetchKanbanBoardWithError } from '../datasources/kanban';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export interface KanbanRepository {
  getBoard(): Promise<KanbanColumnData[]>;
}

class KanbanRepositoryImpl implements KanbanRepository {
  async getBoard(): Promise<KanbanColumnData[]> {
    if (useMock) {
      return fetchKanbanBoard();
    }
    // Placeholder for real API - would fetch from actual backend
    return fetchKanbanBoard();
  }
}

// Singleton instance
export const kanbanRepository: KanbanRepository = new KanbanRepositoryImpl();

// Error simulation for testing (can be triggered via URL param or dev tools)
export const fetchKanbanBoardWithSimulatedError = async (): Promise<KanbanColumnData[]> => {
  await fetchKanbanBoardWithError();
  return [];
};
