"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChatMessage } from "./interface";
import { ProductSuggestion } from "./types";

export default function CrueltyFreeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your wildlife-friendly shopping assistant. I can help you find cruelty-free alternatives to products that harm animals, so your choices can help protect biodiversity. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-open when navigating to #chat and via global event
  useEffect(() => {
    if (!mounted) return;

    const maybeOpenFromHash = () => {
      if (window.location.hash === "#chat") {
        setIsOpen(true);
      }
    };

    const handleOpenChat = () => setIsOpen(true);

    // Initial check
    maybeOpenFromHash();

    // Listen for hash changes and global open event
    window.addEventListener("hashchange", maybeOpenFromHash);
    window.addEventListener("open-chat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("hashchange", maybeOpenFromHash);
      window.removeEventListener("open-chat", handleOpenChat as EventListener);
    };
  }, [mounted]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content:
            data.response_html ||
            data.response_markdown ||
            "No response received",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What are wildlife-friendly alternatives to leather handbags?",
    "How do exotic animal skins harm biodiversity?",
    "What are the most affordable cruelty-free alternatives?",
    "How does wool production impact wildlife habitats?",
    "Show me eco-friendly alternatives under $200",
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {mounted && (
        <button
          onClick={() => setIsOpen(!isOpen)}
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
            <span className="text-lg lg:text-xl xl:text-2xl">✕</span>
          ) : (
            <span className="text-lg lg:text-xl xl:text-2xl">💬</span>
          )}
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div
          className={`
          fixed z-40
          bottom-20 right-4 lg:bottom-24 lg:right-6
          w-[calc(100vw-2rem)] max-w-sm
          sm:w-96
          md:w-[28rem] md:max-w-md
          lg:w-[32rem] lg:max-w-lg
          xl:w-[36rem] xl:max-w-xl
          2xl:w-[40rem] 2xl:max-w-2xl
          h-[85vh] max-h-[500px]
          sm:h-[90vh] sm:max-h-[600px]
          lg:h-[85vh] lg:max-h-[700px]
          xl:h-[80vh] xl:max-h-[800px]
          2xl:h-[75vh] 2xl:max-h-[900px]
          bg-white
          rounded-3xl
          shadow-2xl border border-gray-100
          flex flex-col
          transform transition-all duration-300 ease-out
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 lg:p-6 xl:p-8 rounded-t-3xl">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-emerald-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-lg lg:text-xl xl:text-2xl">🌱</span>
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
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 lg:top-4 lg:right-4 xl:top-6 xl:right-6 w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
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

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="
                    flex-shrink-0 px-2 py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5
                    bg-gray-100 hover:bg-emerald-50 
                    text-gray-700 hover:text-emerald-700
                    rounded-lg text-xs lg:text-sm xl:text-base font-medium
                    transition-all duration-200
                    transform hover:scale-105
                    border border-transparent hover:border-emerald-200
                  "
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 lg:p-4 xl:p-6 border-t border-gray-100 bg-white rounded-b-3xl">
            <div className="flex items-end gap-2 lg:gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
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
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
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
                    <span className="text-xs lg:text-sm">⏳</span>
                  ) : (
                    <span className="text-xs lg:text-sm">➤</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Custom prose styles for better responsiveness */
        .prose-xs {
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .prose-xs h1,
        .prose-xs h2,
        .prose-xs h3 {
          font-size: 0.875rem;
          line-height: 1.4;
          margin: 0.5rem 0;
        }

        .prose-xs p {
          margin: 0.5rem 0;
        }

        .prose-xs ul,
        .prose-xs ol {
          margin: 0.5rem 0;
          padding-left: 1rem;
        }

        .prose-xs li {
          margin: 0.25rem 0;
        }

        @media (min-width: 1024px) {
          .prose-sm h1,
          .prose-sm h2,
          .prose-sm h3 {
            margin: 0.75rem 0;
          }

          .prose-sm p {
            margin: 0.75rem 0;
          }

          .prose-sm ul,
          .prose-sm ol {
            margin: 0.75rem 0;
          }

          .prose-sm li {
            margin: 0.375rem 0;
          }
        }

        @media (min-width: 1280px) {
          .prose-base h1,
          .prose-base h2,
          .prose-base h3 {
            margin: 1rem 0;
          }

          .prose-base p {
            margin: 1rem 0;
          }

          .prose-base ul,
          .prose-base ol {
            margin: 1rem 0;
          }

          .prose-base li {
            margin: 0.5rem 0;
          }
        }
      `}</style>
    </>
  );
}
