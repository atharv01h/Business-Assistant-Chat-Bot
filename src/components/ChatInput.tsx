import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="Ask about any business problem..."
        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-purple-500 text-white
          placeholder-gray-400"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={disabled || !input.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600
          rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={20} />
      </motion.button>
    </form>
  );
}