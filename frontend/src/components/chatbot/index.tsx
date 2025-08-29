"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./interface";
import { quickQuestions } from "../../constants/chatbot";
import {
  ChatToggleButton,
  ChatInterface,
  ChatHeader,
  ChatMessages,
  QuickQuestions,
  ChatInput,
} from "./buttons";
import "./chatbot.css";

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

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {mounted && (
        <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      )}

      {/* Chat Interface */}
      {isOpen && (
        <ChatInterface isOpen={isOpen}>
          <ChatHeader onClose={() => setIsOpen(false)} />

          <ChatMessages messages={messages} isLoading={isLoading} />

          <div ref={messagesEndRef} />

          <QuickQuestions
            questions={quickQuestions}
            onQuestionClick={handleQuickQuestion}
          />

          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            isLoading={isLoading}
            onSend={sendMessage}
            onKeyPress={handleKeyPress}
          />
        </ChatInterface>
      )}
    </>
  );
}
