import { Link, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Avatar } from "@mui/material";
import logoImage from "../../../assets/images/logo-white-bg.png";

export interface AdminSidebarProps {
  adminName?: string;
  avatarUrl?: string;
  onProfileClick?: () => void;
}

export interface NavItem {
  icon: React.ReactNode;
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  {
    icon: <DashboardOutlinedIcon />,
    path: "/admin",
    label: "Dashboard",
  },
  {
    icon: <PeopleOutlinedIcon />,
    path: "/admin/users",
    label: "Users",
  },
  {
    icon: <AssignmentOutlinedIcon />,
    path: "/admin/assignments",
    label: "Assignments",
  },
  {
    icon: <EventOutlinedIcon />,
    path: "/admin/meetings",
    label: "Meetings",
  },
  {
    icon: <BarChartOutlinedIcon />,
    path: "/admin/analytics",
    label: "Analytics",
  },
];

const bottomNavItems: NavItem[] = [
  {
    icon: <SettingsOutlinedIcon />,
    path: "/admin/settings",
    label: "Settings",
  },
];

const AdminSidebar = ({ adminName = "Admin", avatarUrl, onProfileClick }: AdminSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center border-r border-gray-200 bg-white py-4 justify-between">
      {/* Logo */}
      <Link to="/admin" className="mb-8">
        <img src={logoImage} alt="Minutor Admin" className="h-10 w-auto" />
      </Link>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col items-center gap-4">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 ${
                active ? "bg-gray-100 text-black" : "text-gray-600"
              }`}
              title={item.label}
            >
              {item.icon}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-4">
        {/* Bottom Nav Items */}
        {bottomNavItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 ${
                active ? "bg-gray-100 text-black" : "text-gray-600"
              }`}
              title={item.label}
            >
              {item.icon}
            </Link>
          );
        })}

        {/* Notifications Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 text-gray-500 cursor-pointer">
          <NotificationsNoneOutlinedIcon />
        </div>

        {/* Admin Profile Avatar */}
        <button
          onClick={onProfileClick}
          className="focus:outline-none"
          title={adminName}
        >
          <Avatar
            src={avatarUrl}
            alt={adminName}
            sx={{ width: 36, height: 36, cursor: "pointer" }}
          >
            {adminName.charAt(0)}
          </Avatar>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
