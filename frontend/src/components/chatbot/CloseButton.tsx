import { X } from "lucide-react";

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 lg:top-4 lg:right-4 xl:top-6 xl:right-6 w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
    >
      <X className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
    </button>
  );
}
