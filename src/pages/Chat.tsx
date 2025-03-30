
import { motion } from 'framer-motion';
import { Calendar, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';

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
            className="text-center mb-4"
          >
            <h1 className="text-3xl font-bold mb-2">HERØ Chat</h1>
            <p className="text-foreground/70 mb-4">
              Get practical, actionable advice for supporting your partner's health needs effectively.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/cycle-tracker">
                <Button 
                  variant="outline" 
                  className="mx-auto"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Partner Cycle Tracker
                </Button>
              </Link>
              <Link to="/shareable-content">
                <Button 
                  variant="outline" 
                  className="mx-auto"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Shareable Content
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl overflow-hidden h-[calc(100vh-260px)] border-hero-light/10"
          >
            <ChatInterface />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
