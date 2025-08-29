import { X, MessageCircle } from "lucide-react";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatToggleButton({
  isOpen,
  onClick,
}: ChatToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50
        w-12 h-12 lg:w-16 lg:h-16
        bg-gradient-to-br from-emerald-600 to-emerald-700
        hover:from-emerald-700 hover:to-emerald-800
        text-white rounded-full 
        shadow-xl hover:shadow-2xl
        transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95
        flex items-center justify-center
        ${isOpen ? "rotate-45" : "rotate-0"}
      `}
      aria-label="Wildlife-friendly shopping assistant"
    >
      {isOpen ? (
        <X className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
      ) : (
        <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
      )}
    </button>
  );
}
