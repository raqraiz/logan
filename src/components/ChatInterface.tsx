import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MessageBubble, { Message } from './MessageBubble';
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from '@/utils/chatUtils';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Welcome to HERØ. I'm your supportive AI assistant, here to help you better support the women in your life. What would you like to discuss today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const SUGGESTION_TOPICS = [
  "How can I better support during menstruation?",
  "Understanding postpartum recovery",
  "Supporting a partner with anxiety",
  "Communication tips for sensitive topics",
  "Understanding hormonal changes"
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Simulate API delay
      const response = await generateResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
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
      
      {messages.length <= 2 && (
        <div className="px-4 mb-4">
          <p className="text-sm text-foreground/60 mb-2">Suggested topics:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTION_TOPICS.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(topic)}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4 border-t border-border/50">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="w-full p-3 pr-16 rounded-xl border border-input bg-background/80 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 bottom-2 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed button-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
