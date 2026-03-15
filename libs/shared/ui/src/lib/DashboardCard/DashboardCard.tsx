import { memo, type ReactNode } from "react";

export interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  variant?: "default" | "accent";
}

const DashboardCard = memo(
  ({
    title,
    children,
    className = "",
    headerAction
  }: DashboardCardProps) => {
    return (
      <div
        className={`rounded-lg bg-white border border-gray-200 ${className}`}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>

        {/* Card Content */}
        <div className="p-4">{children}</div>
      </div>
    );
  }
);

DashboardCard.displayName = "DashboardCard";

export default DashboardCard;
