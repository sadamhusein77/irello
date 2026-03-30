import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from '../../molecules/KanbanColumn';
import { KanbanCard } from '../../molecules/KanbanCard';
import { ColumnModal } from '../../molecules/ColumnModal';
import { CardModal } from '../../molecules/CardModal';
import { CardDetailModal } from '../../molecules/CardDetailModal';
import type { KanbanBoardProps, KanbanColumnData } from './KanbanBoard.types';
import type { KanbanCardProps } from '../../molecules/KanbanCard/KanbanCard.types';

export const KanbanBoard = ({
  columns: initialColumns,
  searchQuery = '',
  onCardMove,
  onCardClick,
  onAddColumn,
  onEditColumn,
  onDeleteColumn,
  onAddCard,
  className = '',
  style,
}: KanbanBoardProps) => {
  const [columns, setColumns] = useState<KanbanColumnData[]>(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColumn, setEditingColumn] = useState<KanbanColumnData | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardModalColumnId, setCardModalColumnId] = useState<string | null>(null);

  // Sync columns when initialColumns prop changes (e.g., when org changes)
  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);
  const [selectedCard, setSelectedCard] = useState<KanbanCardProps | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCardEditModalOpen, setIsCardEditModalOpen] = useState(false);

  // Handle adding new column
  const handleAddColumn = useCallback((columnData: { title: string; color: string }) => {
    const newColumn: KanbanColumnData = {
      id: `col-${Date.now()}`,
      title: columnData.title,
      color: columnData.color,
      cards: [],
    };
    setColumns((prev) => [...prev, newColumn]);
    onAddColumn?.(columnData);
  }, [onAddColumn]);

  // Handle editing a column - open modal with column data
  const handleEditColumn = useCallback((columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      setEditingColumn(column);
      setIsModalOpen(true);
    }
  }, [columns]);

  // Handle saving edited column
  const handleSaveColumn = useCallback((columnData: { title: string; color: string }) => {
    if (editingColumn) {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === editingColumn.id
            ? { ...col, title: columnData.title, color: columnData.color }
            : col
        )
      );
      onEditColumn?.(editingColumn.id);
    } else {
      handleAddColumn(columnData);
    }
    setEditingColumn(null);
  }, [editingColumn, handleAddColumn, onEditColumn]);

  // Close modal and reset editing state
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingColumn(null);
  }, []);

  // Open card modal for a specific column
  const handleOpenCardModal = useCallback((columnId: string) => {
    setCardModalColumnId(columnId);
    setIsCardModalOpen(true);
  }, []);

  // Handle adding/editing card to a column
  const handleSaveCard = useCallback((cardData: { title: string; description?: string; priority?: 'low' | 'medium' | 'high' }) => {
    if (selectedCard) {
      // Editing existing card
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          cards: col.cards.map((card) =>
            card.id === selectedCard.id
              ? { ...card, ...cardData }
              : card
          ),
        }))
      );
    } else if (cardModalColumnId) {
      // Adding new card
      const newCard = {
        id: `card-${Date.now()}`,
        title: cardData.title,
        description: cardData.description,
        priority: cardData.priority,
      };
      setColumns((prev) =>
        prev.map((col) =>
          col.id === cardModalColumnId
            ? { ...col, cards: [...col.cards, newCard] }
            : col
        )
      );
      onAddCard?.(cardModalColumnId);
    }
    setCardModalColumnId(null);
    setSelectedCard(null);
  }, [selectedCard, cardModalColumnId, onAddCard]);

  // Close card modal
  const handleCloseCardModal = useCallback(() => {
    setIsCardModalOpen(false);
    setIsCardEditModalOpen(false);
    setCardModalColumnId(null);
    setSelectedCard(null);
  }, []);

  // Open card edit modal
  const handleEditCard = useCallback((card: KanbanCardProps) => {
    setSelectedCard(card);
    setIsCardEditModalOpen(true);
  }, []);

  // Open card detail modal
  const handleViewCardDetails = useCallback((card: KanbanCardProps) => {
    setSelectedCard(card);
    setIsDetailModalOpen(true);
  }, []);

  // Close card detail modal
  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedCard(null);
  }, []);

  // Filter columns and cards based on search query
  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim()) return columns;

    const query = searchQuery.toLowerCase().trim();
    return columns
      .map((column) => ({
        ...column,
        cards: column.cards.filter(
          (card) =>
            card.title.toLowerCase().includes(query) ||
            card.description?.toLowerCase().includes(query)
        ),
      }))
      .filter((column) => column.cards.length > 0);
  }, [columns, searchQuery]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumn = useCallback(
    (id: string) => {
      // First check if the id is a column id itself (handles empty columns)
      const columnById = columns.find((col) => col.id === id);
      if (columnById) return columnById;
      // Then check if it's a card id
      return columns.find((col) => col.cards.some((card) => card.id === id));
    },
    [columns]
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setColumns((prev) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((item) => item.id === activeId);
      const overIndex = overItems.findIndex((item) => item.id === overId);

      let newIndex;
      if (overItems.some((item) => item.id === overId)) {
        newIndex = overItems.length + 1;
      } else {
        newIndex = overIndex >= 0 ? overIndex : overItems.length;
      }

      return prev.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            cards: col.cards.filter((item) => item.id !== activeId),
          };
        }
        if (col.id === overColumn.id) {
          const movedCard = activeItems[activeIndex];
          const newCards = [...col.cards];
          newCards.splice(newIndex, 0, movedCard);
          return {
            ...col,
            cards: newCards,
          };
        }
        return col;
      });
    });
  }, [findColumn]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeColumn = findColumn(activeId);
      const overColumn = findColumn(overId);

      if (!activeColumn || !overColumn) return;

      if (activeColumn.id === overColumn.id) {
        const column = columns.find((col) => col.id === activeColumn.id);
        if (!column) return;

        const activeIndex = column.cards.findIndex((item) => item.id === activeId);
        const overIndex = column.cards.findIndex((item) => item.id === overId);

        if (activeIndex !== overIndex && overIndex !== -1) {
          setColumns((prev) =>
            prev.map((col) => {
              if (col.id === activeColumn.id) {
                return {
                  ...col,
                  cards: arrayMove(col.cards, activeIndex, overIndex),
                };
              }
              return col;
            })
          );

          onCardMove?.(activeId, activeColumn.id, overColumn.id, overIndex);
        }
      } else {
        onCardMove?.(activeId, activeColumn.id, overColumn.id, 0);
      }
    },
    [columns, findColumn, onCardMove]
  );

  const activeCard = activeId
    ? columns.flatMap((col) => col.cards).find((card) => card.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`
          flex gap-4 p-4 overflow-x-auto
          bg-slate-50 dark:bg-slate-950
          min-h-screen
          ${className}
        `}
        style={style}
      >
        {filteredColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            cards={column.cards}
            cardCount={column.cards.length}
            onCardClick={(cardId) => onCardClick?.(cardId, column.id)}
            onAddCard={() => handleOpenCardModal(column.id)}
            onEditColumn={() => handleEditColumn(column.id)}
            onDeleteColumn={onDeleteColumn ? () => onDeleteColumn(column.id) : undefined}
            onViewCardDetails={handleViewCardDetails}
            onEditCard={handleEditCard}
          />
        ))}

        {onAddColumn && (
          <button
            onClick={() => { setEditingColumn(null); setIsModalOpen(true); }}
            className="
              flex items-center justify-center
              w-72 min-w-72 h-12
              border-2 border-dashed border-slate-300 dark:border-slate-700
              rounded-lg text-slate-500 dark:text-slate-400
              hover:border-slate-400 dark:hover:border-slate-600
              hover:text-slate-600 dark:hover:text-slate-300
              transition-colors
            "
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Column
          </button>
        )}
      </div>

      <ColumnModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveColumn}
        initialData={editingColumn ? { title: editingColumn.title, color: editingColumn.color || '#3B82F6' } : undefined}
        title={editingColumn ? 'Edit Column' : 'Add Column'}
      />

      <CardModal
        isOpen={isCardModalOpen}
        onClose={handleCloseCardModal}
        onSubmit={handleSaveCard}
      />

      <CardModal
        isOpen={isCardEditModalOpen}
        onClose={handleCloseCardModal}
        onSubmit={handleSaveCard}
        initialData={selectedCard ? { title: selectedCard.title, description: selectedCard.description, priority: selectedCard.priority } : undefined}
        title="Edit Card"
      />

      <CardDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        card={selectedCard}
      />

      <DragOverlay>
        {activeCard ? (
          <div className="opacity-90">
            <KanbanCard {...activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
