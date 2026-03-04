import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export interface AdminLayoutProps {
  adminName?: string;
  avatarUrl?: string;
}

const AdminLayout = ({ adminName = "Admin User", avatarUrl }: AdminLayoutProps) => {
  const handleProfileClick = () => {
    // Navigate to settings or show profile menu
    console.log("Profile clicked");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        adminName={adminName}
        avatarUrl={avatarUrl}
        onProfileClick={handleProfileClick}
      />

      {/* Main Content */}
      <main className="ml-16 flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

