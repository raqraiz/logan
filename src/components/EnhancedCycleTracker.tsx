
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
  lastPeriodEnd: Date | undefined;
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

const CYCLE_PHASES = {
  menstruation: {
    name: "Menstruation Phase",
    days: "Days 1-5",
    description: "The uterine lining sheds, resulting in menstrual bleeding. Hormone levels are generally low."
  },
  follicular: {
    name: "Follicular Phase",
    days: "Days 1-14",
    description: "Overlaps with menstruation. Follicles in the ovary mature, and estrogen levels rise."
  },
  ovulation: {
    name: "Ovulation Phase",
    days: "Day 14-16",
    description: "A mature egg is released from the ovary. Hormone levels peak, often causing changes in mood and energy."
  },
  luteal: {
    name: "Luteal Phase",
    days: "Days 15-28",
    description: "The body prepares for possible pregnancy. If no pregnancy occurs, hormone levels drop before the next cycle."
  }
};

const EnhancedCycleTracker: React.FC = () => {
  const [cycleData, setCycleData] = useState<CycleData>(() => {
    const savedData = localStorage.getItem('cycleTrackerData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return {
        ...parsed,
        lastPeriodStart: parsed.lastPeriodStart ? new Date(parsed.lastPeriodStart) : undefined,
        lastPeriodEnd: parsed.lastPeriodEnd ? new Date(parsed.lastPeriodEnd) : undefined
      };
    }
    
    return {
      lastPeriodStart: undefined,
      lastPeriodEnd: undefined,
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
    localStorage.setItem('cycleTrackerData', JSON.stringify({
      ...cycleData,
      lastPeriodStart: cycleData.lastPeriodStart?.toISOString(),
      lastPeriodEnd: cycleData.lastPeriodEnd?.toISOString()
    }));
  }, [cycleData]);

  useEffect(() => {
    if (cycleData.lastPeriodStart && !cycleData.lastPeriodEnd) {
      const calculatedEndDate = new Date(cycleData.lastPeriodStart);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + cycleData.periodLength - 1);
      setCycleData(prev => ({ ...prev, lastPeriodEnd: calculatedEndDate }));
    }
  }, [cycleData.lastPeriodStart, cycleData.periodLength]);

  const handlePeriodStartChange = (date: Date | undefined) => {
    setCycleData(prev => ({ ...prev, lastPeriodStart: date }));
  };

  const handlePeriodEndChange = (date: Date | undefined) => {
    setCycleData(prev => ({ ...prev, lastPeriodEnd: date }));
    
    if (cycleData.lastPeriodStart && date) {
      const newPeriodLength = differenceInDays(date, cycleData.lastPeriodStart) + 1;
      if (newPeriodLength > 0) {
        setCycleData(prev => ({ ...prev, periodLength: newPeriodLength }));
      }
    }
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
      
      if (cycleData.lastPeriodStart) {
        const newEndDate = new Date(cycleData.lastPeriodStart);
        newEndDate.setDate(newEndDate.getDate() + value - 1);
        setCycleData(prev => ({ ...prev, lastPeriodEnd: newEndDate }));
      }
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
    
    const cycleDay = (daysSinceLastPeriod % cycleData.cycleLength) + 1;
    
    if (daysSinceLastPeriod < 0) {
      return "Pre-Period Phase";
    } else if (cycleDay <= cycleData.periodLength) {
      return "Menstruation Phase";
    } else if (cycleDay < 14) {
      return "Follicular Phase";
    } else if (cycleDay >= 14 && cycleDay <= 16) {
      return "Ovulation Phase";
    } else {
      return "Luteal Phase";
    }
  };

  const getCurrentCycleDay = () => {
    if (!cycleData.lastPeriodStart) return null;
    
    const today = new Date();
    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const daysSinceLastPeriod = differenceInDays(today, lastPeriod);
    
    if (daysSinceLastPeriod < 0) return null;
    
    return (daysSinceLastPeriod % cycleData.cycleLength) + 1;
  };

  const getCurrentPhaseInfo = () => {
    const phase = calculateCyclePhase();
    const cycleDay = getCurrentCycleDay();
    
    switch (phase) {
      case "Menstruation Phase":
        return CYCLE_PHASES.menstruation;
      case "Follicular Phase":
        return CYCLE_PHASES.follicular;
      case "Ovulation Phase":
        return CYCLE_PHASES.ovulation;
      case "Luteal Phase":
        return CYCLE_PHASES.luteal;
      default:
        return { name: phase, days: "Unknown", description: "Information not available" };
    }
  };

  const nextPeriod = calculateNextPeriod();
  const daysUntilNextPeriod = nextPeriod 
    ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
    : null;

  const saveTrackerData = () => {
    localStorage.setItem('cycleTrackerData', JSON.stringify({
      ...cycleData,
      lastPeriodStart: cycleData.lastPeriodStart?.toISOString(),
      lastPeriodEnd: cycleData.lastPeriodEnd?.toISOString()
    }));
    
    toast({
      title: "Cycle data saved",
      description: "Her cycle tracking information has been updated."
    });
  };

  const currentPhase = calculateCyclePhase();
  const currentPhaseInfo = getCurrentPhaseInfo();
  const currentCycleDay = getCurrentCycleDay();

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm border">
      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="tracker">Cycle Tracker</TabsTrigger>
          <TabsTrigger value="insights">Insights & Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracker" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="last-period-start">Her last period start date</Label>
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

          <div className="space-y-2">
            <Label htmlFor="last-period-end">Her last period end date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !cycleData.lastPeriodEnd && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {cycleData.lastPeriodEnd ? (
                    format(cycleData.lastPeriodEnd, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={cycleData.lastPeriodEnd}
                  onSelect={handlePeriodEndChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cycle-length">Her cycle length (days)</Label>
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
              <Label htmlFor="period-length">Her period length (days)</Label>
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
                <div className="text-sm text-muted-foreground">Track her cycle with little or no bleeding</div>
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
              Enable notifications for her cycle
            </Label>
          </div>
          
          {cycleData.lastPeriodStart && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <div className="mb-2">
                <p className="font-medium">Her current phase:</p>
                <p className="text-primary">{currentPhase}</p>
                
                {currentCycleDay && (
                  <p className="text-sm text-muted-foreground">
                    Day {currentCycleDay} of her cycle
                  </p>
                )}
              </div>
              
              <div className="space-y-1 mt-3 p-2 bg-background/50 rounded">
                <p className="font-medium text-sm">{currentPhaseInfo.name} ({currentPhaseInfo.days})</p>
                <p className="text-xs text-muted-foreground">{currentPhaseInfo.description}</p>
              </div>
              
              {(!cycleData.useIUD || cycleData.flowIntensity !== 'None') && (
                <>
                  <p className="font-medium mt-2">Her next period expected:</p>
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
                        IUD & Cycle Information
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
                                <li>Your hormonal cycle continues even if bleeding stops</li>
                              </ul>
                              
                              <div className="mt-4 space-y-3">
                                <p className="font-medium">Cycle phases with IUD:</p>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.menstruation.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.menstruation.description} With hormonal IUD, bleeding may be light or absent, but hormonal shifts still occur.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.follicular.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.follicular.description} IUD users may still experience follicular growth.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.ovulation.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.ovulation.description} Hormonal IUDs may prevent ovulation in some cycles but not all.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.luteal.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.luteal.description} Symptoms may be milder with a hormonal IUD.</p>
                                </div>
                              </div>
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
                              
                              <div className="mt-4 space-y-3">
                                <p className="font-medium">Cycle phases with copper IUD:</p>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.menstruation.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.menstruation.description} Copper IUDs may cause heavier or longer periods.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.follicular.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.follicular.description} Should remain unchanged with copper IUD.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.ovulation.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.ovulation.description} Copper IUDs do not prevent ovulation.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.luteal.name}</p>
                                  <p className="text-xs">{CYCLE_PHASES.luteal.description} Should remain unchanged with copper IUD.</p>
                                </div>
                              </div>
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
            Save Her Cycle Data
          </Button>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-2">
            <Label>Her Symptoms</Label>
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
            <Label htmlFor="mood">Her Current Mood</Label>
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
            <Label htmlFor="notes">Notes About Her Cycle</Label>
            <textarea
              id="notes"
              value={cycleData.notes}
              onChange={handleNotesChange}
              placeholder="Add any notes about her cycle..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <Button onClick={saveTrackerData} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Her Log Data
          </Button>
          
          {cycleData.symptoms.length > 0 && (
            <div className="p-3 bg-muted rounded-md mt-4">
              <h3 className="font-medium">Her Tracked Symptoms</h3>
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
              <h3 className="font-medium">Her Current Mood</h3>
              <p>{cycleData.mood}</p>
            </div>
          )}
          
          {cycleData.lastPeriodStart && (
            <div className="p-3 bg-muted rounded-md mt-4">
              <h3 className="font-medium">Her Cycle Phase Information</h3>
              <p className="text-sm">{currentPhase}</p>
              
              <div className="mt-2 space-y-2">
                <p className="text-xs font-medium">What to expect in her current phase:</p>
                <p className="text-xs">{currentPhaseInfo.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-background/60 p-2 rounded text-xs">
                    <p className="font-medium">Menstruation</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.menstruation.days}</p>
                  </div>
                  <div className="bg-background/60 p-2 rounded text-xs">
                    <p className="font-medium">Follicular</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.follicular.days}</p>
                  </div>
                  <div className="bg-background/60 p-2 rounded text-xs">
                    <p className="font-medium">Ovulation</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.ovulation.days}</p>
                  </div>
                  <div className="bg-background/60 p-2 rounded text-xs">
                    <p className="font-medium">Luteal</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.luteal.days}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedCycleTracker;
