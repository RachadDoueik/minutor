import { memo } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type?: "info" | "warning" | "success" | "error";
  isRead?: boolean;
}

export interface NotificationItemProps {
  notification: Notification;
  onClick?: (notification: Notification) => void;
}

const NotificationItem = memo(({ notification, onClick }: NotificationItemProps) => {
  const typeStyles = {
    info: "border-l-blue-500",
    warning: "border-l-yellow-500",
    success: "border-l-green-500",
    error: "border-l-red-500",
  };

  return (
    <div
      onClick={() => onClick?.(notification)}
      className={`cursor-pointer rounded-lg border border-gray-200 border-l-4 bg-gray-50 p-3 transition-colors hover:bg-gray-100 ${
        typeStyles[notification.type || "info"]
      } ${notification.isRead ? "opacity-60" : ""}`}
    >
      <h4 className="font-medium text-gray-900">{notification.title}</h4>
      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
        {notification.message}
      </p>
      <p className="mt-1 text-xs text-gray-400">{notification.timestamp}</p>
    </div>
  );
});

NotificationItem.displayName = "NotificationItem";

export interface NotificationsProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  isLoading?: boolean;
}

const Notifications = ({
  notifications = [],
  onNotificationClick,
  isLoading = false,
}: NotificationsProps) => {
  if (isLoading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <span className="text-sm text-gray-500">Loading notifications...</span>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center rounded-lg bg-gray-50">
        <span className="text-sm text-gray-500">No notifications</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={onNotificationClick}
        />
      ))}
    </div>
  );
};

export default Notifications;
