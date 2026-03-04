//ButtonProps type (interface)
export interface ButtonProps {
    text: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
  }

const Button = ({ text, onClick, className = '', type = 'button', disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={` ${className} rounded-lg bg-black px-5 py-2.5 text-md font-medium text-white transition-colors hover:bg-gray-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;