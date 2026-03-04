import { useState, useCallback } from 'react';

interface CursorDepthBackgroundProps {
  children: React.ReactNode;
  className?: string;
  /** Element to render as (default: "div") */
  as?: 'div' | 'section';
}

const CursorDepthBackground = ({
  children,
  className = '',
  as: Component = 'div',
}: CursorDepthBackgroundProps) => {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPos(null);
  }, []);

  return (
    <Component
      className={`relative overflow-hidden ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor-following black gradient */}
      {cursorPos && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle 280px at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,0.08), transparent 70%)`,
          }}
          aria-hidden
        />
      )}
      {/* Soft background shapes for depth */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gray-200/60 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-gray-300/40 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gray-200/50 blur-3xl" />
      </div>
      {children}
    </Component>
  );
};

export default CursorDepthBackground;
