
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MessageBubble, { Message } from '../MessageBubble';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = ({ messages, isTyping }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <MessageBubble 
          key={message.id} 
          message={message} 
          isLast={index === messages.length - 1} 
        />
      ))}
      
      {isTyping && (
        <div className="flex justify-start mb-4">
          <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary-foreground/40 animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-secondary-foreground/40 animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-secondary-foreground/40 animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
