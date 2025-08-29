import { Leaf } from "lucide-react";
import { CloseButton } from "./buttons";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 lg:p-6 xl:p-8 rounded-t-3xl">
      <div className="flex items-center space-x-3 lg:space-x-4">
        <div className="w-8 h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-emerald-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Leaf className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base lg:text-lg xl:text-xl leading-tight">
            Wildlife-Friendly
          </h3>
          <p className="text-emerald-100 text-xs lg:text-sm xl:text-base mt-0.5">
            Shopping Assistant
          </p>
        </div>
      </div>

      {/* Close button */}
      <CloseButton onClick={onClose} />
    </div>
  );
}
