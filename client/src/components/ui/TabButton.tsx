import { formatNumber } from "@/utils";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  count: number;
}

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  label,
  count,
}) => (
  <button
    className={`relative px-4 py-2 flex items-center space-x-1 ${
      isActive ? "border-b-2 border-blue-500" : ""
    }`}
    onClick={onClick}
  >
    <span>{label}</span>
    <span className="">{formatNumber(count)}</span>
  </button>
);

export default TabButton;
