
import React, { useState, useEffect } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon, Bell, Save, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CycleData {
  lastPeriodStart: Date | undefined;
  cycleLength: number;
  periodLength: number;
  notifications: boolean;
  useIUD: boolean;
  iudType: string;
  symptoms: string[];
  notes: string;
  mood: string;
  flowIntensity: string;
}

const DEFAULT_CYCLE_LENGTH = 28;
const DEFAULT_PERIOD_LENGTH = 5;

const SYMPTOMS = [
  'Cramps', 'Headache', 'Bloating', 'Fatigue', 
  'Mood Swings', 'Breast Tenderness', 'Acne', 'Back Pain'
];

const MOODS = [
  'Happy', 'Calm', 'Sensitive', 'Sad', 'Irritable', 'Anxious'
];

const FLOW_INTENSITY = [
  'None', 'Light', 'Medium', 'Heavy'
];

const EnhancedCycleTracker: React.FC = () => {
  const [cycleData, setCycleData] = useState<CycleData>(() => {
    const savedData = localStorage.getItem('cycleTrackerData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return {
        ...parsed,
        lastPeriodStart: parsed.lastPeriodStart ? new Date(parsed.lastPeriodStart) : undefined
      };
    }
    
    return {
      lastPeriodStart: undefined,
      cycleLength: DEFAULT_CYCLE_LENGTH,
      periodLength: DEFAULT_PERIOD_LENGTH,
      notifications: false,
      useIUD: false,
      iudType: 'hormonal',
      symptoms: [],
      notes: '',
      mood: '',
      flowIntensity: 'Medium'
    };
  });

  const { toast } = useToast();

  useEffect(() => {
    // Save data to localStorage whenever cycleData changes
    localStorage.setItem('cycleTrackerData', JSON.stringify({
      ...cycleData,
      lastPeriodStart: cycleData.lastPeriodStart?.toISOString()
    }));
  }, [cycleData]);

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

  const handleIUDToggle = (checked: boolean) => {
    setCycleData(prev => ({ 
      ...prev, 
      useIUD: checked,
      flowIntensity: checked ? 'None' : 'Medium'
    }));
  };

  const handleIUDTypeChange = (value: string) => {
    setCycleData(prev => ({ ...prev, iudType: value }));
  };

  const toggleSymptom = (symptom: string) => {
    setCycleData(prev => {
      const hasSymptom = prev.symptoms.includes(symptom);
      const newSymptoms = hasSymptom 
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom];
      
      return { ...prev, symptoms: newSymptoms };
    });
  };

  const handleMoodChange = (value: string) => {
    setCycleData(prev => ({ ...prev, mood: value }));
  };

  const handleFlowIntensityChange = (value: string) => {
    setCycleData(prev => ({ ...prev, flowIntensity: value }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCycleData(prev => ({ ...prev, notes: e.target.value }));
  };

  const calculateNextPeriod = () => {
    if (!cycleData.lastPeriodStart) return null;
    
    const nextPeriodStart = new Date(cycleData.lastPeriodStart);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleData.cycleLength);
    
    return nextPeriodStart;
  };

  const calculateCyclePhase = () => {
    if (!cycleData.lastPeriodStart) return "Unknown";
    
    const today = new Date();
    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const daysSinceLastPeriod = differenceInDays(today, lastPeriod);
    
    if (cycleData.useIUD && cycleData.iudType === 'hormonal') {
      return "IUD Phase - May have minimal or no bleeding";
    }
    
    if (daysSinceLastPeriod < 0) {
      return "Pre-Period Phase";
    } else if (daysSinceLastPeriod < cycleData.periodLength) {
      return "Menstruation Phase";
    } else if (daysSinceLastPeriod < 14) {
      return "Follicular Phase";
    } else if (daysSinceLastPeriod < 16) {
      return "Ovulation Phase";
    } else if (daysSinceLastPeriod < cycleData.cycleLength) {
      return "Luteal Phase";
    } else {
      return "Pre-Period Phase";
    }
  };

  const nextPeriod = calculateNextPeriod();
  const daysUntilNextPeriod = nextPeriod 
    ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
    : null;

  const saveTrackerData = () => {
    localStorage.setItem('cycleTrackerData', JSON.stringify({
      ...cycleData,
      lastPeriodStart: cycleData.lastPeriodStart?.toISOString()
    }));
    
    toast({
      title: "Cycle data saved",
      description: "Your cycle tracking information has been updated."
    });
  };

  const currentPhase = calculateCyclePhase();

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm border">
      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="tracker">Cycle Tracker</TabsTrigger>
          <TabsTrigger value="insights">Insights & Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracker" className="space-y-4">
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
                disabled={cycleData.useIUD && cycleData.iudType === 'hormonal' && cycleData.flowIntensity === 'None'}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="iud-toggle">IUD User</Label>
                <div className="text-sm text-muted-foreground">Track cycle with little or no bleeding</div>
              </div>
              <Switch
                id="iud-toggle"
                checked={cycleData.useIUD}
                onCheckedChange={handleIUDToggle}
              />
            </div>

            {cycleData.useIUD && (
              <div className="space-y-2">
                <Label htmlFor="iud-type">IUD Type</Label>
                <Select 
                  value={cycleData.iudType} 
                  onValueChange={handleIUDTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select IUD type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hormonal">Hormonal IUD</SelectItem>
                    <SelectItem value="copper">Copper IUD</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="pt-2">
                  <Label htmlFor="flow-intensity">Flow Intensity</Label>
                  <Select 
                    value={cycleData.flowIntensity} 
                    onValueChange={handleFlowIntensityChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flow intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      {FLOW_INTENSITY.map(intensity => (
                        <SelectItem key={intensity} value={intensity}>
                          {intensity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="notifications"
              checked={cycleData.notifications}
              onCheckedChange={handleNotificationToggle}
            />
            <Label htmlFor="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Enable notifications
            </Label>
          </div>
          
          {cycleData.lastPeriodStart && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="font-medium">Current phase:</p>
              <p className="text-primary">{currentPhase}</p>
              
              {(!cycleData.useIUD || cycleData.flowIntensity !== 'None') && (
                <>
                  <p className="font-medium mt-2">Next period expected:</p>
                  <p className="text-primary">{nextPeriod ? format(nextPeriod, "MMMM d, yyyy") : "Unknown"}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {daysUntilNextPeriod === 0 
                      ? "Starting today" 
                      : daysUntilNextPeriod && daysUntilNextPeriod > 0 
                        ? `In ${daysUntilNextPeriod} days`
                        : "Currently ongoing"}
                  </p>
                </>
              )}
              
              {cycleData.useIUD && (
                <div className="mt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Info className="mr-2 h-3 w-3" />
                        IUD Information
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>About IUD Tracking</DialogTitle>
                        <DialogDescription>
                          {cycleData.iudType === 'hormonal' ? (
                            <div className="space-y-2 mt-2 text-sm">
                              <p>With a hormonal IUD:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Many users experience significantly lighter periods or no periods at all</li>
                                <li>You may still experience cycle symptoms even without bleeding</li>
                                <li>Tracking symptoms can help identify your cycle phase</li>
                                <li>Your hormonal cycle may continue even if bleeding stops</li>
                              </ul>
                            </div>
                          ) : (
                            <div className="space-y-2 mt-2 text-sm">
                              <p>With a copper IUD:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Periods often remain regular but may be heavier</li>
                                <li>Your natural cycle continues without hormonal intervention</li>
                                <li>Tracking is similar to non-IUD tracking</li>
                                <li>Symptoms may be more pronounced</li>
                              </ul>
                            </div>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}

          <Button onClick={saveTrackerData} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Tracker Data
          </Button>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-2">
            <Label>Symptoms</Label>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOMS.map(symptom => (
                <div key={symptom} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`symptom-${symptom}`}
                    checked={cycleData.symptoms.includes(symptom)}
                    onChange={() => toggleSymptom(symptom)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor={`symptom-${symptom}`}>{symptom}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mood">Current Mood</Label>
            <Select 
              value={cycleData.mood} 
              onValueChange={handleMoodChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mood" />
              </SelectTrigger>
              <SelectContent>
                {MOODS.map(mood => (
                  <SelectItem key={mood} value={mood}>
                    {mood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={cycleData.notes}
              onChange={handleNotesChange}
              placeholder="Add any notes about your cycle..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <Button onClick={saveTrackerData} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Log Data
          </Button>
          
          {cycleData.symptoms.length > 0 && (
            <div className="p-3 bg-muted rounded-md mt-4">
              <h3 className="font-medium">Tracked Symptoms</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {cycleData.symptoms.map(symptom => (
                  <span key={symptom} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {cycleData.mood && (
            <div className="p-3 bg-muted rounded-md">
              <h3 className="font-medium">Current Mood</h3>
              <p>{cycleData.mood}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedCycleTracker;
