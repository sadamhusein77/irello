export const organizations = [
  { id: 'org-1', name: 'Acme Corp' },
  { id: 'org-2', name: 'TechStart Inc' },
  { id: 'org-3', name: 'DesignHub' },
];

// Mock data generator based on organization
export const generateMockData = (orgId: string) => {
  const orgData: Record<string, {
    columns: Array<{
      id: string;
      title: string;
      color: string;
      cards: Array<{
        id: string;
        title: string;
        description?: string;
        priority?: 'low' | 'medium' | 'high';
        tags?: Array<{ label: string; color: string }>;
        assignee?: { id: string; name: string; avatar?: string };
        commentCount?: number;
        dueDate?: string;
      }>;
    }>;
  }> = {
    'org-1': {
      columns: [
        {
          id: 'col-1',
          title: 'Backlog',
          color: '#6B7280',
          cards: [
            { id: 'card-1', title: 'Implement user authentication', description: 'Add OAuth2 login flow', priority: 'high', tags: [{ label: 'Security', color: '#EF4444' }], commentCount: 3 },
            { id: 'card-2', title: 'Database optimization', description: 'Improve query performance', priority: 'medium', tags: [{ label: 'Backend', color: '#3B82F6' }], commentCount: 1 },
          ],
        },
        {
          id: 'col-2',
          title: 'In Progress',
          color: '#3B82F6',
          cards: [
            { id: 'card-3', title: 'API rate limiting', description: 'Implement request throttling', priority: 'high', tags: [{ label: 'Backend', color: '#3B82F6' }, { label: 'Security', color: '#EF4444' }], commentCount: 5 },
            { id: 'card-4', title: 'Mobile responsive design', priority: 'medium', tags: [{ label: 'Frontend', color: '#10B981' }], commentCount: 2 },
          ],
        },
        {
          id: 'col-3',
          title: 'Review',
          color: '#F59E0B',
          cards: [
            { id: 'card-5', title: 'Update API documentation', description: 'Add missing endpoints', priority: 'low', commentCount: 0 },
          ],
        },
        {
          id: 'col-4',
          title: 'Done',
          color: '#10B981',
          cards: [
            { id: 'card-6', title: 'Fix login bug', priority: 'high', tags: [{ label: 'Bug', color: '#EF4444' }], commentCount: 4 },
          ],
        },
      ],
    },
    'org-2': {
      columns: [
        {
          id: 'col-1',
          title: 'Ideas',
          color: '#8B5CF6',
          cards: [
            { id: 'card-1', title: 'AI chatbot integration', description: 'Add GPT-4 support', priority: 'medium', tags: [{ label: 'AI', color: '#8B5CF6' }], commentCount: 8 },
            { id: 'card-2', title: 'Real-time notifications', priority: 'low', tags: [{ label: 'Feature', color: '#10B981' }], commentCount: 2 },
          ],
        },
        {
          id: 'col-2',
          title: 'Sprint',
          color: '#3B82F6',
          cards: [
            { id: 'card-3', title: 'Build analytics dashboard', description: 'Charts and metrics', priority: 'high', tags: [{ label: 'Frontend', color: '#10B981' }, { label: 'Backend', color: '#3B82F6' }], commentCount: 6 },
            { id: 'card-4', title: 'Payment gateway', description: 'Stripe integration', priority: 'high', tags: [{ label: 'Finance', color: '#F59E0B' }], commentCount: 3, dueDate: 'Mar 15' },
          ],
        },
        {
          id: 'col-3',
          title: 'Testing',
          color: '#F59E0B',
          cards: [
            { id: 'card-5', title: 'Load testing', description: 'Stress test the API', priority: 'medium', tags: [{ label: 'DevOps', color: '#06B6D4' }], commentCount: 1 },
          ],
        },
        {
          id: 'col-4',
          title: 'Shipped',
          color: '#10B981',
          cards: [
            { id: 'card-6', title: 'User onboarding flow', priority: 'high', tags: [{ label: 'UX', color: '#EC4899' }], commentCount: 12 },
          ],
        },
      ],
    },
    'org-3': {
      columns: [
        {
          id: 'col-1',
          title: 'Concept',
          color: '#EC4899',
          cards: [
            { id: 'card-1', title: 'Brand redesign', description: 'New visual identity', priority: 'high', tags: [{ label: 'Design', color: '#EC4899' }], commentCount: 15 },
          ],
        },
        {
          id: 'col-2',
          title: 'Design',
          color: '#8B5CF6',
          cards: [
            { id: 'card-2', title: 'Homepage mockups', description: '3 layout options', priority: 'high', tags: [{ label: 'UI', color: '#3B82F6' }, { label: 'Design', color: '#EC4899' }], commentCount: 7 },
            { id: 'card-3', title: 'Icon set creation', priority: 'medium', tags: [{ label: 'Assets', color: '#F59E0B' }], commentCount: 3 },
          ],
        },
        {
          id: 'col-3',
          title: 'Prototype',
          color: '#06B6D4',
          cards: [
            { id: 'card-4', title: 'Interactive prototype', description: 'Figma to code', priority: 'medium', tags: [{ label: 'UX', color: '#EC4899' }], commentCount: 5 },
          ],
        },
        {
          id: 'col-4',
          title: 'Approved',
          color: '#10B981',
          cards: [
            { id: 'card-5', title: 'Logo final', priority: 'high', tags: [{ label: 'Branding', color: '#8B5CF6' }], commentCount: 20 },
          ],
        },
      ],
    },
  };

  return orgData[orgId] || orgData['org-1'];
};
