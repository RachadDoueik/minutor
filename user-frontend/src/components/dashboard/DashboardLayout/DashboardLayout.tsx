import Sidebar from "../../layout/Sidebar";
import { Outlet } from "react-router-dom";

export interface DashboardLayoutProps {
  username: string;
  avatarUrl?: string;
  onProfileClick?: () => void;
}

const DashboardLayout = ({
  username,
  avatarUrl,
  onProfileClick,
}: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        username={username}
        avatarUrl={avatarUrl}
        onProfileClick={onProfileClick}
      />
      {/* Page Content - ml-16 for fixed sidebar width */}
      <main className="ml-16 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
