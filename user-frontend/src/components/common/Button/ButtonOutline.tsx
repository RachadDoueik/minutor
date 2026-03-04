//ButtonProps type (interface)
export interface ButtonOutlineProps {
    text: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
  }

const ButtonOutline = ({ text, onClick, className = '', type = 'button', disabled = false }: ButtonOutlineProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={` ${className} rounded-lg border-2 border-gray-800 px-5 py-2.5 text-md font-medium text-gray-800 transition-colors hover:bg-gray-100 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonOutline;