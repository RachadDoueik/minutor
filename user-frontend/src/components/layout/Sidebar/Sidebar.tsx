import { Link, useLocation } from "react-router-dom";
import UserProfile from "../../dashboard/UserProfile/UserProfile";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import logoImage from "../../../assets/images/logo-white-bg.png";

export interface SideBarProps {
  username: string;
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
    icon: <VideocamOutlinedIcon />,
    path: "/home/meetings",
    label: "Meetings",
  },
  {
    icon: <AssignmentTurnedInOutlinedIcon />,
    path: "/home/assignments",
    label: "Assignments",
  },
  {
    icon: <CalendarMonthOutlinedIcon />,
    path: "/home/calendar",
    label: "Calendar",
  },
];

const Sidebar = ({ username, avatarUrl, onProfileClick }: SideBarProps) => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center border-r border-gray-200 bg-white py-4 justify-between">
      {/* Logo */}
      <Link to="/home" className="mb-8">
        <img src={logoImage} alt="Minutor" className="h-10 w-auto" />
      </Link>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col items-center gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 ${
                isActive ? "bg-gray-100 text-black" : "text-gray-600"
              }`}
              title={item.label}
            >
              {item.icon}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-4">
        {/* Notifications Icon */}
        <NotificationsNoneOutlinedIcon className="flex h-10 text-gray-500 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100" />

        {/* User Profile Icon*/}
        <UserProfile
          username={username}
          avatarUrl={avatarUrl}
          onClick={onProfileClick}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
