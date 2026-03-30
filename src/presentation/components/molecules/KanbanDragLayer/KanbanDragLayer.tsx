import type { KanbanDragLayerProps } from './KanbanDragLayer.types';

export const KanbanDragLayer = ({
  children,
  className = '',
  style,
}: KanbanDragLayerProps) => {
  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};
