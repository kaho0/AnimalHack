import { Send, Clock } from "lucide-react";

interface SendButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function SendButton({
  isLoading,
  disabled,
  onClick,
}: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        absolute right-2 lg:right-3 xl:right-4 top-1/2 transform -translate-y-1/2
        w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8
        bg-emerald-500 hover:bg-emerald-600
        disabled:bg-gray-300
        text-white rounded-lg
        flex items-center justify-center
        transition-all duration-200
        transform hover:scale-105 active:scale-95 disabled:scale-100
        disabled:cursor-not-allowed
      "
    >
      {isLoading ? (
        <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
      ) : (
        <Send className="w-3 h-3 lg:w-4 lg:h-4" />
      )}
    </button>
  );
}
