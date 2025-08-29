import { ChatMessage } from "./interface";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 lg:p-4 xl:p-6 space-y-3 lg:space-y-4 bg-gray-50/30">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          } animate-fadeIn`}
        >
          <div
            className={`
              max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4 rounded-2xl
              ${
                message.type === "user"
                  ? "bg-emerald-600 text-white rounded-br-md"
                  : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md"
              }
            `}
          >
            {message.type === "bot" ? (
              <div
                className="prose prose-xs lg:prose-sm xl:prose-base max-w-none"
                style={{
                  fontSize: "inherit",
                  lineHeight: "inherit",
                }}
                dangerouslySetInnerHTML={{ __html: message.content }}
              />
            ) : (
              <p className="text-xs lg:text-sm xl:text-base leading-relaxed">
                {message.content}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-start animate-fadeIn">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-3 py-2 lg:px-4 lg:py-3">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <div
                className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
