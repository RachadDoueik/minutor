interface DividerWithTextProps { children : string }; 

const DividerWithText = ({ children } : DividerWithTextProps) => (
    <div className="relative my-6 flex items-center bg-transparent">
      <div className="flex-1 border-t border-gray-300" />
      <span className="bg-transparent px-4 text-sm text-gray-500">{children}</span>
      <div className="flex-1 border-t border-gray-300" />
    </div>
  );

export default DividerWithText