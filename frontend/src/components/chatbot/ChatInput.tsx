import { useRef } from "react";
import { SendButton } from "./buttons";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export default function ChatInput({
  inputValue,
  setInputValue,
  isLoading,
  onSend,
  onKeyPress,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3 lg:p-4 xl:p-6 border-t border-gray-100 bg-white rounded-b-3xl">
      <div className="flex items-end gap-2 lg:gap-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Ask about wildlife-friendly alternatives..."
            className="
              w-full px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4
              pr-12 lg:pr-14 xl:pr-16
              rounded-2xl border border-gray-200 
              bg-gray-50 text-gray-700 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white
              text-xs lg:text-sm xl:text-base
              transition-all duration-200
              resize-none
            "
            disabled={isLoading}
          />
          <SendButton
            isLoading={isLoading}
            disabled={isLoading || !inputValue.trim()}
            onClick={onSend}
          />
        </div>
      </div>
    </div>
  );
}
