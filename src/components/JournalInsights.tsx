
import React from 'react';
import { Bell, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJournalEntries } from '@/hooks/use-journal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const JournalInsights = () => {
  const { insights, markInsightAsRead } = useJournalEntries();
  const [open, setOpen] = React.useState(false);
  
  const unreadCount = insights.filter(insight => !insight.isRead).length;
  
  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markInsightAsRead(id);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Insights & Notifications</h4>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Personalized notifications based on journal entries
          </p>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {insights.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No insights yet. Keep adding journal entries.
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {insights.map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 border-b ${!insight.isRead ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-sm mb-1">{insight.title}</h5>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-6 w-6 ${insight.isRead ? 'text-muted-foreground' : 'text-primary'}`}
                      onClick={(e) => handleMarkAsRead(insight.id, e)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JournalInsights;
