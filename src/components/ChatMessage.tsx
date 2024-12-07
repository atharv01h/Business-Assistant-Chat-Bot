import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types/chat';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''} mb-6`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${isUser ? 'bg-purple-600' : 'bg-blue-600'}`}>
        {isUser ? <MessageCircle size={20} /> : <Bot size={20} />}
      </div>
      <div className={`flex-1 px-4 py-3 rounded-lg ${
        isUser ? 'bg-purple-900/50' : 'bg-blue-900/50'
      } text-white max-w-[80%]`}>
        <ReactMarkdown className="prose prose-invert">
          {message.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}