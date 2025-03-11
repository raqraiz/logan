
import { motion } from 'framer-motion';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
}

const MessageBubble = ({ message, isLast }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'bg-secondary text-secondary-foreground rounded-tl-none'
        } shadow-sm`}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        <div className={`text-xs mt-1 opacity-70 text-right ${isUser ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
