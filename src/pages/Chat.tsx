
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24 px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">HERØ Chat</h1>
            <p className="text-foreground/70">
              Get practical, actionable advice for supporting your partner's health needs effectively.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl overflow-hidden h-[calc(100vh-220px)] border-hero-light/10"
          >
            <ChatInterface />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Chat;

