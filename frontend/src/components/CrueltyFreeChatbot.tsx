"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ProductSuggestion {
  product_name: string;
  category: string;
  animal_materials: string;
  cruelty_flag: string;
  vegan_alternative: string;
  vegan_material: string;
  vegan_price: string;
  why_vegan: string;
}

export default function CrueltyFreeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your cruelty-free shopping assistant. I can help you find vegan alternatives to products that use animal materials. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/chatbot/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

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
        console.log("Chatbot response:", data); // Debug log
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
        console.error(
          "Chatbot API error:",
          response.status,
          response.statusText
        );
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

  const loadSuggestions = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (maxPrice) params.append("max_price", maxPrice);

      const response = await fetch(`/api/chatbot/suggestions?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Failed to load suggestions:", error);
    }
  };

  const quickQuestions = [
    "What are vegan alternatives to leather handbags?",
    "Tell me about products that use ostrich leather",
    "What are the most affordable vegan alternatives?",
    "How are animals harmed in the wool industry?",
    "Show me vegan alternatives under $200",
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-forest text-sand p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        aria-label="Open cruelty-free shopping assistant"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {isOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">🛍️</span>
          )}
        </div>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-forest/20 flex flex-col">
          {/* Header */}
          <div className="bg-forest text-sand p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-forest text-lg">🌱</span>
              </div>
              <div>
                <h3 className="font-sans-bold text-lg">
                  Cruelty-Free Shopping
                </h3>
                <p className="text-sand/80 text-sm">
                  Your vegan shopping assistant
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-forest text-sand"
                      : "bg-white text-forest border-2 border-sage/30 shadow-sm"
                  }`}
                >
                  {message.type === "bot" ? (
                    <div
                      className="chatbot-prose animate-fade-in"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  )}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-forest border-2 border-sage/30 p-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-sage rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-sage rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-sage rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 bg-sand/20 border-t border-sage/30">
              <p className="text-xs text-forest/70 mb-2 font-sans-medium">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(question);
                      setTimeout(() => sendMessage(), 100);
                    }}
                    className="text-xs bg-white text-forest px-3 py-1 rounded-full border border-sage/30 hover:bg-sage/10 transition-colors duration-200"
                  >
                    {question.length > 30
                      ? question.substring(0, 30) + "..."
                      : question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 bg-sand/20 border-t border-sage/30 max-h-32 overflow-y-auto">
              <p className="text-xs text-forest/70 mb-2 font-sans-medium">
                Product Suggestions:
              </p>
              <div className="space-y-2">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white p-2 rounded-lg border border-sage/30"
                  >
                    <p className="text-xs font-sans-medium text-forest">
                      {suggestion.vegan_alternative}
                    </p>
                    <p className="text-xs text-forest/70">
                      {suggestion.vegan_material} • ${suggestion.vegan_price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="p-4 bg-sand/20 border-t border-sage/30">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs p-2 rounded-lg border border-sage/30 bg-white text-forest"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="text-xs p-2 rounded-lg border border-sage/30 bg-white text-forest"
              />
            </div>
            <button
              onClick={loadSuggestions}
              className="w-full text-xs bg-forest text-sand py-2 rounded-lg hover:bg-forest/90 transition-colors duration-200 font-sans-medium"
            >
              Find Alternatives
            </button>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-sage/30">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cruelty-free alternatives..."
                className="flex-1 text-sm p-3 rounded-xl border-2 border-sage/30 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40 transition-all duration-200"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-forest text-sand p-3 rounded-xl hover:bg-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span className="text-lg">➤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
