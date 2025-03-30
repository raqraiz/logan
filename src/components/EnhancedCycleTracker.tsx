
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
import { toast } from '@/components/ui/use-toast';
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
  'Mood Swings', 'Needs Extra Support', 'Skin Changes', 'Back Pain'
];

const MOODS = [
  'Happy', 'Calm', 'Sensitive', 'Sad', 'Irritable', 'Anxious'
];

const FLOW_INTENSITY = [
  'None', 'Light', 'Medium', 'Heavy'
];

const CYCLE_PHASES = {
  menstruation: {
    name: "Red Zone",
    days: "Days 1-5",
    description: "She may need extra support and comfort. Hormone levels are generally low. Bring chocolate, be patient."
  },
  follicular: {
    name: "Recovery Zone",
    days: "Days 1-14",
    description: "Energy is returning. She's likely feeling better and more upbeat as estrogen rises."
  },
  ovulation: {
    name: "Green Zone",
    days: "Day 14-16",
    description: "Peak energy and mood. She's likely feeling her best with peak hormone levels. Great time for date nights."
  },
  luteal: {
    name: "Yellow Zone",
    days: "Days 15-28",
    description: "PMS alert. Energy declining, potential mood changes. Be extra supportive and understanding."
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
      title: checked ? "Hero Alerts Enabled" : "Hero Alerts Disabled",
      description: checked 
        ? "You'll receive advance notices when she's entering different zones." 
        : "You won't receive advance zone alerts.",
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
      return "Pre-Red Zone";
    } else if (cycleDay <= cycleData.periodLength) {
      return "Red Zone";
    } else if (cycleDay < 14) {
      return "Recovery Zone";
    } else if (cycleDay >= 14 && cycleDay <= 16) {
      return "Green Zone";
    } else {
      return "Yellow Zone";
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
      case "Red Zone":
        return CYCLE_PHASES.menstruation;
      case "Recovery Zone":
        return CYCLE_PHASES.follicular;
      case "Green Zone":
        return CYCLE_PHASES.ovulation;
      case "Yellow Zone":
        return CYCLE_PHASES.luteal;
      default:
        return { name: phase, days: "Unknown", description: "Information not available yet. Add her last cycle date to get started." };
    }
  };

  const getNextPhase = () => {
    const currentPhase = calculateCyclePhase();
    let nextPhase = "";
    let daysUntilNextPhase = 0;
    
    if (!cycleData.lastPeriodStart) return { phase: "Unknown", days: 0 };
    
    const today = new Date();
    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const daysSinceLastPeriod = differenceInDays(today, lastPeriod);
    const cycleDay = (daysSinceLastPeriod % cycleData.cycleLength) + 1;
    
    if (currentPhase === "Red Zone") {
      nextPhase = "Recovery Zone";
      daysUntilNextPhase = cycleData.periodLength - cycleDay + 1;
    } else if (currentPhase === "Recovery Zone") {
      nextPhase = "Green Zone";
      daysUntilNextPhase = 14 - cycleDay;
    } else if (currentPhase === "Green Zone") {
      nextPhase = "Yellow Zone";
      daysUntilNextPhase = 17 - cycleDay;
    } else if (currentPhase === "Yellow Zone") {
      nextPhase = "Red Zone";
      daysUntilNextPhase = cycleData.cycleLength - cycleDay + 1;
    } else {
      return { phase: "Unknown", days: 0 };
    }
    
    return { phase: nextPhase, days: daysUntilNextPhase };
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
    
    // Show a notification that data is saved
    if (cycleData.notifications) {
      // Schedule notifications for upcoming phase changes
      const nextPhaseInfo = getNextPhase();
      if (nextPhaseInfo.days > 0 && nextPhaseInfo.days <= 3) {
        toast({
          title: `HERO ALERT: ${nextPhaseInfo.phase} Coming Soon`,
          description: `She'll be entering her ${nextPhaseInfo.phase} in ${nextPhaseInfo.days} days. Be prepared!`,
        });
      }
    }
    
    toast({
      title: "Mood forecast saved",
      description: "Her cycle tracking information has been updated."
    });
  };

  const currentPhase = calculateCyclePhase();
  const currentPhaseInfo = getCurrentPhaseInfo();
  const currentCycleDay = getCurrentCycleDay();
  const nextPhaseInfo = getNextPhase();

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm border">
      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="tracker">Mood Forecast</TabsTrigger>
          <TabsTrigger value="insights">Support Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracker" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="last-period-start">When did her last cycle start?</Label>
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
            <Label htmlFor="last-period-end">When did her last cycle end?</Label>
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
              <Label htmlFor="cycle-length">Days between cycles</Label>
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
              <Label htmlFor="period-length">Red Zone days</Label>
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
                <div className="text-sm text-muted-foreground">Track her zones even with reduced cycles</div>
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
              Enable Hero Alerts (advance zone notifications)
            </Label>
          </div>
          
          {cycleData.lastPeriodStart && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <div className="mb-2">
                <p className="font-medium">Her current zone:</p>
                <p className="text-primary font-bold text-lg">{currentPhase}</p>
                
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
              
              {nextPhaseInfo.phase !== "Unknown" && (
                <div className="space-y-1 mt-3 p-2 bg-background/50 rounded">
                  <p className="font-medium text-sm">Next up: {nextPhaseInfo.phase}</p>
                  <p className="text-xs text-muted-foreground">
                    Coming in {nextPhaseInfo.days} days - be prepared!
                  </p>
                </div>
              )}
              
              {(!cycleData.useIUD || cycleData.flowIntensity !== 'None') && (
                <>
                  <p className="font-medium mt-2">Next Red Zone begins:</p>
                  <p className="text-primary">{nextPeriod ? format(nextPeriod, "MMMM d, yyyy") : "Unknown"}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {daysUntilNextPeriod === 0 
                      ? "Starting today - be ready!" 
                      : daysUntilNextPeriod && daysUntilNextPeriod > 0 
                        ? `In ${daysUntilNextPeriod} days - plan ahead!`
                        : "Currently ongoing - extra support time!"}
                  </p>
                </>
              )}
              
              {cycleData.useIUD && (
                <div className="mt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Info className="mr-2 h-3 w-3" />
                        IUD Zone Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>IUD Zone Guide for Partners</DialogTitle>
                        <DialogDescription>
                          {cycleData.iudType === 'hormonal' ? (
                            <div className="space-y-2 mt-2 text-sm">
                              <p>With a hormonal IUD:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>She may have lighter or no visible Red Zone</li>
                                <li>The zones still exist - hormones still fluctuate</li>
                                <li>She may have fewer symptoms but still appreciate your support</li>
                              </ul>
                              
                              <div className="mt-4 space-y-3">
                                <p className="font-medium">What to expect with each zone:</p>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.menstruation.name}</p>
                                  <p className="text-xs">Support time! Even with lighter symptoms, comfort is welcome. Hormone levels are generally low.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.follicular.name}</p>
                                  <p className="text-xs">Energy returns and mood improves. Great time for activities and socializing.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.ovulation.name}</p>
                                  <p className="text-xs">Peak energy and confidence! A perfect time for date nights.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.luteal.name}</p>
                                  <p className="text-xs">Watch for subtle mood changes. Be extra patient and understanding.</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2 mt-2 text-sm">
                              <p>With a copper IUD:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Red Zone may be heavier or longer - extra support needed</li>
                                <li>All zones function normally - copper doesn't affect hormones</li>
                                <li>Be ready with supplies and comfort during Red Zone</li>
                              </ul>
                              
                              <div className="mt-4 space-y-3">
                                <p className="font-medium">What to expect with each zone:</p>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.menstruation.name}</p>
                                  <p className="text-xs">May be intense with a copper IUD. Have supplies ready and offer extra comfort.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.follicular.name}</p>
                                  <p className="text-xs">Relief time! Energy returns as her body recovers from Red Zone.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.ovulation.name}</p>
                                  <p className="text-xs">She's at her peak! Energy and mood are at their highest.</p>
                                </div>
                                
                                <div className="space-y-1.5">
                                  <p className="font-medium text-xs">{CYCLE_PHASES.luteal.name}</p>
                                  <p className="text-xs">PMS may be noticeable. Be patient and understanding as her next Red Zone approaches.</p>
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
            Save Mood Forecast Data
          </Button>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-2">
            <Label>Symptoms She's Experiencing</Label>
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
            <Label htmlFor="notes">Support Notes</Label>
            <textarea
              id="notes"
              value={cycleData.notes}
              onChange={handleNotesChange}
              placeholder="Add notes about what works best for her..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <Button onClick={saveTrackerData} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Support Notes
          </Button>
          
          {cycleData.symptoms.length > 0 && (
            <div className="p-3 bg-muted rounded-md mt-4">
              <h3 className="font-medium">Support Checklist</h3>
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
              <h3 className="font-medium">Current Mood Alert</h3>
              <p>{cycleData.mood}</p>
            </div>
          )}
          
          {cycleData.lastPeriodStart && (
            <div className="p-3 bg-muted rounded-md mt-4">
              <h3 className="font-medium">Zone Support Guide</h3>
              <p className="text-sm font-bold">{currentPhase}</p>
              
              <div className="mt-2 space-y-2">
                <p className="text-xs font-medium">How to be a hero in her current zone:</p>
                <p className="text-xs">{currentPhaseInfo.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className={`p-2 rounded text-xs ${currentPhase === "Red Zone" ? "bg-red-100 border border-red-200" : "bg-background/60"}`}>
                    <p className="font-medium">Red Zone</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.menstruation.days}</p>
                    <p className="text-xs mt-1">Comfort and patience needed</p>
                  </div>
                  <div className={`p-2 rounded text-xs ${currentPhase === "Recovery Zone" ? "bg-blue-100 border border-blue-200" : "bg-background/60"}`}>
                    <p className="font-medium">Recovery Zone</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.follicular.days}</p>
                    <p className="text-xs mt-1">Energy returning</p>
                  </div>
                  <div className={`p-2 rounded text-xs ${currentPhase === "Green Zone" ? "bg-green-100 border border-green-200" : "bg-background/60"}`}>
                    <p className="font-medium">Green Zone</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.ovulation.days}</p>
                    <p className="text-xs mt-1">Peak energy, great for plans</p>
                  </div>
                  <div className={`p-2 rounded text-xs ${currentPhase === "Yellow Zone" ? "bg-yellow-100 border border-yellow-200" : "bg-background/60"}`}>
                    <p className="font-medium">Yellow Zone</p>
                    <p className="text-muted-foreground">{CYCLE_PHASES.luteal.days}</p>
                    <p className="text-xs mt-1">PMS alert, extra patience</p>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-2 rounded-md mt-2">
                  <p className="text-xs font-medium">Pro Tip:</p>
                  <p className="text-xs">Track what works best in each zone. Certain gestures, foods, or activities may be especially appreciated at different times in her cycle.</p>
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
