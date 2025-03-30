
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Menu } from 'lucide-react';
import Navbar from '@/components/Navbar';
import EnhancedCycleTracker from '@/components/EnhancedCycleTracker';
import PhaseVisualizer from '@/components/PhaseVisualizer';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import CycleTrackerModal from '@/components/CycleTrackerModal';

const CycleTrackerPage = () => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <h1 className="text-3xl font-bold mb-2">Partner Mood Forecaster</h1>
            <p className="text-foreground/70 mb-4">
              Stay one step ahead and be the hero she needs
            </p>
            <Link to="/shareable-content">
              <Button 
                variant="outline" 
                className="mx-auto"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Check out resources
              </Button>
            </Link>
          </motion.div>
          
          <TooltipProvider>
            {isMobile ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden p-4 mb-4"
                >
                  <PhaseVisualizer />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center my-6"
                >
                  <Button onClick={() => setIsModalOpen(true)}>
                    Open Full Cycle Tracker
                  </Button>
                </motion.div>
                
                <CycleTrackerModal 
                  isOpen={isModalOpen} 
                  onClose={() => setIsModalOpen(false)} 
                />
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden p-4 mb-4"
                >
                  <PhaseVisualizer />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-card rounded-2xl overflow-hidden p-4"
                >
                  <EnhancedCycleTracker />
                </motion.div>
              </>
            )}
          </TooltipProvider>
        </div>
      </main>
    </div>
  );
};

export default CycleTrackerPage;
