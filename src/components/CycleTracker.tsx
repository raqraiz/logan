
import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface CycleData {
  lastPeriodStart: Date | undefined;
  cycleLength: number;
  periodLength: number;
  notifications: boolean;
}

const DEFAULT_CYCLE_LENGTH = 28;
const DEFAULT_PERIOD_LENGTH = 5;

const CycleTracker: React.FC = () => {
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodStart: undefined,
    cycleLength: DEFAULT_CYCLE_LENGTH,
    periodLength: DEFAULT_PERIOD_LENGTH,
    notifications: false
  });

  const { toast } = useToast();

  const handlePeriodStartChange = (date: Date | undefined) => {
    setCycleData(prev => ({ ...prev, lastPeriodStart: date }));
  };

  const handleCycleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 60) {
      setCycleData(prev => ({ ...prev, cycleLength: value }));
    }
  };

  const handlePeriodLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 14) {
      setCycleData(prev => ({ ...prev, periodLength: value }));
    }
  };

  const handleNotificationToggle = (checked: boolean) => {
    setCycleData(prev => ({ ...prev, notifications: checked }));
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: checked 
        ? "You'll receive notifications about upcoming cycle events." 
        : "You won't receive cycle notifications.",
    });
  };

  const calculateNextPeriod = () => {
    if (!cycleData.lastPeriodStart) return null;
    
    const nextPeriodStart = new Date(cycleData.lastPeriodStart);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleData.cycleLength);
    
    return nextPeriodStart;
  };

  const nextPeriod = calculateNextPeriod();
  const daysUntilNextPeriod = nextPeriod 
    ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
    : null;

  const saveTrackerData = () => {
    // In a real app, this would save to a database
    toast({
      title: "Cycle data saved",
      description: "Your cycle tracking information has been updated."
    });
  };

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Partner Cycle Tracker</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="last-period">Last period start date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !cycleData.lastPeriodStart && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {cycleData.lastPeriodStart ? (
                  format(cycleData.lastPeriodStart, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={cycleData.lastPeriodStart}
                onSelect={handlePeriodStartChange}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cycle-length">Cycle length (days)</Label>
            <input
              id="cycle-length"
              type="number"
              min="21"
              max="60"
              value={cycleData.cycleLength}
              onChange={handleCycleLengthChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="period-length">Period length (days)</Label>
            <input
              id="period-length"
              type="number"
              min="1"
              max="14"
              value={cycleData.periodLength}
              onChange={handlePeriodLengthChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="notifications"
            checked={cycleData.notifications}
            onCheckedChange={handleNotificationToggle}
          />
          <Label htmlFor="notifications">Enable notifications</Label>
        </div>
        
        {nextPeriod && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="font-medium">Next period expected:</p>
            <p className="text-primary">{format(nextPeriod, "MMMM d, yyyy")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {daysUntilNextPeriod === 0 
                ? "Starting today" 
                : daysUntilNextPeriod && daysUntilNextPeriod > 0 
                  ? `In ${daysUntilNextPeriod} days`
                  : "Currently ongoing"}
            </p>
          </div>
        )}

        <Button onClick={saveTrackerData} className="w-full">
          Save Tracker Data
        </Button>
      </div>
    </div>
  );
};

export default CycleTracker;
