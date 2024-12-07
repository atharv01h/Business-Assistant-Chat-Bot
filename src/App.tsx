import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Footer } from './components/Footer';
import { Message } from './types/chat';
import { generateResponse } from './utils/api';
import { CREATOR_INFO } from './constants/creator';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="border-b border-gray-800 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="p-2 bg-purple-600 rounded-full"
          >
            <Bot size={24} />
          </motion.div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Business Assistant
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Welcome to Your Business Assistant by {CREATOR_INFO.name}
                </h2>
                <p>Ask me anything about business strategy, analysis, or problem-solving!</p>
              </motion.div>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-gray-400"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200" />
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <div className="border-t border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;