import { memo } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { User4Outlined } from "@lineiconshq/free-icons";

export interface UserProfileProps {
  username: string;
  avatarUrl?: string;
  onClick?: () => void;
}

const UserProfile = memo(({ username, avatarUrl, onClick }: UserProfileProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={username}
          title={username}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white">
          <Lineicons icon={User4Outlined} size={20} color="#374151" />
        </div>
      )}
    </button>
  );
});

UserProfile.displayName = "UserProfile";

export default UserProfile;
