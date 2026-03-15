import { Link, useLocation } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export interface NavItem {
  icon: React.ReactNode;
  path: string;
  label: string;
}

export interface SidebarProps {
  /** Main navigation items shown in the center */
  navItems: NavItem[];
  /** Optional navigation items pinned to the bottom (e.g. Settings) */
  bottomNavItems?: NavItem[];
  /** Logo image source */
  logoSrc: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Where the logo links to */
  homePath?: string;
  /** Display name for the profile button */
  displayName?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Callback when profile is clicked */
  onProfileClick?: () => void;
  /** Custom profile render — overrides the default avatar */
  renderProfile?: () => React.ReactNode;
  /** Whether to show notification icon (default: true) */
  showNotifications?: boolean;
  /** Callback when notification icon is clicked */
  onNotificationsClick?: () => void;
  /**
   * Custom active-path matching function.
   * Defaults to exact match for homePath, startsWith for others.
   */
  isActive?: (path: string, currentPath: string) => boolean;
}

const Sidebar = ({
  navItems,
  bottomNavItems = [],
  logoSrc,
  logoAlt = "Logo",
  homePath = "/",
  displayName = "User",
  avatarUrl,
  onProfileClick,
  renderProfile,
  showNotifications = true,
  onNotificationsClick,
  isActive: isActiveProp,
}: SidebarProps) => {
  const location = useLocation();

  const defaultIsActive = (path: string, currentPath: string) => {
    if (path === homePath) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const checkActive = isActiveProp || defaultIsActive;

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center border-r border-gray-200 bg-white py-4 justify-between">
      {/* Logo */}
      <Link to={homePath} className="mb-8">
        <img src={logoSrc} alt={logoAlt} className="h-10 w-auto" />
      </Link>

      {/* Main Navigation Items */}
      <nav className="flex flex-1 flex-col items-center gap-4">
        {navItems.map((item) => {
          const active = checkActive(item.path, location.pathname);
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

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-4">
        {/* Bottom Nav Items (e.g. Settings) */}
        {bottomNavItems.map((item) => {
          const active = checkActive(item.path, location.pathname);
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
        {showNotifications && (
          <button
            onClick={onNotificationsClick}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 text-gray-500 cursor-pointer"
            title="Notifications"
          >
            <NotificationsNoneOutlinedIcon />
          </button>
        )}

        {/* Profile */}
        {renderProfile ? (
          renderProfile()
        ) : (
          <button
            onClick={onProfileClick}
            className="focus:outline-none"
            title={displayName}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
