import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Dumbbell } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition bg-alpha-black">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-16 lg:py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-alpha-graphite flex items-center justify-center mx-auto mb-8 border-2 border-alpha-white/10 shadow-lg"
              >
                <Dumbbell className="w-16 h-16 text-alpha-red" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wider">
                <span className="text-alpha-white">logan</span>
              </h1>
              <p className="text-xl text-alpha-white/70 max-w-3xl mx-auto mb-8">
                Your wingman for handling your partner's health like a boss. No BS, just straight talk
              </p>
              <Link 
                to="/chat" 
                className="action-button"
              >
                Start Chatting
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
                  <path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                  <path d="M2 9v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9" />
                  <path d="M3 19h18" />
                </svg>
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card rounded-2xl p-8 border-alpha-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-alpha-graphite flex items-center justify-center mb-4 text-alpha-red">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-alpha-white">Cut Through the BS</h3>
                <p className="text-alpha-white/70 leading-relaxed">
                  Get straight talk on women's health without the fluff. Know what they're going through and how to handle it like a pro.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass-card rounded-2xl p-8 border-alpha-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-alpha-graphite flex items-center justify-center mb-4 text-alpha-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-alpha-white">Boss-Level Communication</h3>
                <p className="text-alpha-white/70 leading-relaxed">
                  Learn how to talk to her without the drama. Get your point across and shut down arguments before they start.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="glass-card rounded-2xl p-8 border-alpha-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-alpha-graphite flex items-center justify-center mb-4 text-alpha-cyan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m7 10 5 5 5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-alpha-white">Take Charge Tactics</h3>
                <p className="text-alpha-white/70 leading-relaxed">
                  Get actionable moves to handle different situations - from mood swings to major life changes. Be the man with a plan.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-alpha-white">Ready to level up your game?</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/chat" 
                  className="action-button"
                >
                  Start a Conversation
                </Link>
                <Link 
                  to="/resources" 
                  className="secondary-button"
                >
                  Explore Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
