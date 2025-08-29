import { RefreshCw, AlertCircle } from "lucide-react";
import { CONSERVATION_ACTIONS_CONTENT } from "@/constants/content";
import { ErrorStateProps } from "./interface";

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[#FDF2F2] to-[#FDF2F2]/80 border-2 border-[#EF6C00]/20 rounded-3xl">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[#EF6C00]/20 rounded-full flex items-center justify-center mr-4">
          <AlertCircle className="w-6 h-6 text-[#EF6C00]" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-[#C62828] font-light">
            {CONSERVATION_ACTIONS_CONTENT.error.title}
          </h3>
          <p className="font-serif text-sm text-[#C62828]/70 font-light">
            {CONSERVATION_ACTIONS_CONTENT.error.subtitle}
          </p>
        </div>
      </div>
      <p className="font-serif text-base text-[#2F3E34]/80 mb-6 leading-relaxed font-light">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="bg-[#0F3D2E] hover:bg-[#033222] text-[#F5F5DC] px-8 py-4 rounded-full transition-colors duration-200 font-serif font-light"
      >
        <RefreshCw className="w-5 h-5 mr-2 inline" />
        {CONSERVATION_ACTIONS_CONTENT.error.retryButton}
      </button>
    </div>
  );
}
