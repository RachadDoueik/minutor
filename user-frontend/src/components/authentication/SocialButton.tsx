import type { ReactNode } from "react";
import { memo } from "react";

interface SocialButtonProps {
    icon: ReactNode,
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
};

const SocialButton = memo(({ icon, label, onClick } : SocialButtonProps) => (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      aria-label={label}
    >
      {icon}
    </button>
  ));

export default SocialButton;