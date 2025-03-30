
import { motion } from 'framer-motion';
import React from 'react';
import Navbar from '@/components/Navbar';
import EnhancedCycleTracker from '@/components/EnhancedCycleTracker';

const CycleTrackerPage = () => {
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
            <h1 className="text-3xl font-bold mb-2">Partner Cycle Tracker</h1>
            <p className="text-foreground/70 mb-6">
              Track her cycle to better support her health needs
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl overflow-hidden p-4"
          >
            <EnhancedCycleTracker />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CycleTrackerPage;
