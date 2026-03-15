import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import type { SidebarProps } from "../Sidebar/Sidebar";

export interface DashboardLayoutProps extends SidebarProps {
  /** Additional className for the main content area */
  mainClassName?: string;
}

const DashboardLayout = ({
  mainClassName = "",
  ...sidebarProps
}: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar {...sidebarProps} />
      <main className={`ml-16 flex-1 ${mainClassName}`.trim()}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
