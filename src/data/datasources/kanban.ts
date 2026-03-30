// Data Layer - Kanban Mock Data

import type { KanbanColumnData } from '../../presentation/components/organisms/KanbanBoard/KanbanBoard.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockColumns: KanbanColumnData[] = [
    {
      id: 'col-1',
      title: 'Backlog',
      color: '#6B7280',
      cards: [
        {
          id: 'card-1',
          title: 'Research user requirements',
          description: 'Conduct user interviews and analyze competitors',
          tags: [{ label: 'Research', color: '#8B5CF6' }],
          priority: 'medium',
          assignee: { id: '1', name: 'Alice' },
          commentCount: 3,
          dueDate: 'Mar 30',
        },
        {
          id: 'card-2',
          title: 'Design system setup',
          description: 'Create design tokens and component library',
          tags: [{ label: 'Design', color: '#EC4899' }],
          priority: 'low',
          assignee: { id: '2', name: 'Bob' },
          commentCount: 1,
          dueDate: 'Apr 5',
        },
      ],
    },
    {
      id: 'col-2',
      title: 'To Do',
      color: '#3B82F6',
      cards: [
        {
          id: 'card-3',
          title: 'Setup project infrastructure',
          description: 'Initialize repo, CI/CD, and development environment',
          tags: [{ label: 'DevOps', color: '#F59E0B' }],
          priority: 'high',
          assignee: { id: '1', name: 'Alice' },
          commentCount: 5,
          dueDate: 'Mar 25',
        },
        {
          id: 'card-4',
          title: 'Implement authentication',
          description: 'Login, register, and password reset functionality',
          tags: [
            { label: 'Feature', color: '#10B981' },
            { label: 'Security', color: '#EF4444' },
          ],
          priority: 'high',
          assignee: { id: '3', name: 'Charlie' },
          commentCount: 8,
          dueDate: 'Mar 28',
        },
      ],
    },
    {
      id: 'col-3',
      title: 'In Progress',
      color: '#F59E0B',
      cards: [
        {
          id: 'card-5',
          title: 'Build dashboard UI',
          description: 'Create main dashboard with charts and metrics',
          tags: [{ label: 'Frontend', color: '#3B82F6' }],
          priority: 'medium',
          assignee: { id: '2', name: 'Bob' },
          commentCount: 2,
          dueDate: 'Mar 27',
        },
      ],
    },
    {
      id: 'col-4',
      title: 'Review',
      color: '#8B5CF6',
      cards: [
        {
          id: 'card-6',
          title: 'API integration',
          description: 'Connect frontend with backend APIs',
          tags: [
            { label: 'Backend', color: '#6366F1' },
            { label: 'API', color: '#14B8A6' },
          ],
          priority: 'high',
          assignee: { id: '3', name: 'Charlie' },
          commentCount: 12,
        },
      ],
    },
    {
      id: 'col-5',
      title: 'Done',
      color: '#10B981',
      cards: [
        {
          id: 'card-7',
          title: 'Project kickoff',
          description: 'Initial planning and team alignment meeting',
          tags: [{ label: 'Meeting', color: '#F97316' }],
          priority: 'low',
          assignee: { id: '1', name: 'Alice' },
          commentCount: 0,
        },
        {
          id: 'card-8',
          title: 'Create wireframes',
          description: 'Design low-fidelity wireframes for all pages',
          tags: [{ label: 'Design', color: '#EC4899' }],
          priority: 'medium',
          assignee: { id: '2', name: 'Bob' },
          commentCount: 4,
        },
      ],
    },
  ];

// Simulates API call with latency
export const fetchKanbanBoard = async (): Promise<KanbanColumnData[]> => {
  await delay(500);
  return mockColumns;
};

export const fetchKanbanBoardWithError = async (): Promise<KanbanColumnData[]> => {
  await delay(500);
  throw new Error('Failed to fetch kanban board');
};
