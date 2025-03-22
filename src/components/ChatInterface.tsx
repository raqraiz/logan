
import { useState } from 'react';
import { Message } from './MessageBubble';
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from '@/utils/chatUtils';
import MessageList from './chat/MessageList';
import SuggestionChips from './chat/SuggestionChips';
import ChatInput from './chat/ChatInput';
import { INITIAL_MESSAGES, SUGGESTION_TOPICS } from '@/utils/chatConstants';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  
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
      const response = generateResponse(input);
      
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
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
      />
      
      {messages.length <= 2 && (
        <SuggestionChips 
          topics={SUGGESTION_TOPICS} 
          onSelectSuggestion={handleSuggestionClick} 
        />
      )}
      
      <ChatInput 
        input={input} 
        setInput={setInput}
        handleSend={handleSend}
        isTyping={isTyping}
      />
    </div>
  );
};

export default ChatInterface;
