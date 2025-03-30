
import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import CycleTracker from './CycleTracker';

interface CycleTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CycleTrackerModal: React.FC<CycleTrackerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-background rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cycle Tracker</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <CycleTracker />
        </div>
      </motion.div>
    </div>
  );
};

export default CycleTrackerModal;
