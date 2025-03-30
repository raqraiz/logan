import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, MoveRight, Droplet, Cloud, Sun, Zap, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CYCLE_PHASES = {
  menstruation: {
    name: "Red Zone",
    medicalName: "Menstrual Phase",
    days: "Days 1-5",
    description: "Extra support needed",
    detailedDescription: "During this phase, hormone levels are generally low. She may experience cramping, fatigue, and mood changes. This is when comfort, understanding, and patience are most appreciated. Consider bringing her favorite snacks, a heating pad, or offering a back massage. Small gestures go a long way during the Red Zone.",
    color: "bg-red-100",
    borderColor: "border-red-300",
    textColor: "text-red-700",
    hoverColor: "hover:bg-red-200",
    icon: Droplet,
    doList: ["Offer comfort foods", "Be extra patient", "Provide a heating pad", "Listen more than usual", "Have pain relief ready"],
    dontList: ["Plan demanding activities", "Dismiss her symptoms", "Comment on mood changes", "Force social events"]
  },
  follicular: {
    name: "Recovery Zone",
    medicalName: "Follicular Phase",
    days: "Days 1-14",
    description: "Energy returning",
    detailedDescription: "As estrogen rises, her energy and mood typically improve during this phase. She's likely to feel more sociable and adventurous. It's a great time for new activities and moderate exercise. The Recovery Zone is when she starts feeling better and more like herself again.",
    color: "bg-blue-100",
    borderColor: "border-blue-300",
    textColor: "text-blue-700",
    hoverColor: "hover:bg-blue-200",
    icon: Cloud,
    doList: ["Suggest outdoor activities", "Plan social gatherings", "Support new interests", "Schedule moderate exercise together", "Be ready for her increasing energy"],
    dontList: ["Expect immediate full energy", "Ignore lingering symptoms", "Push too hard too quickly"]
  },
  ovulation: {
    name: "Green Zone",
    medicalName: "Ovulatory Phase",
    days: "Days 14-16",
    description: "Peak energy & mood",
    detailedDescription: "This is when she's typically feeling her absolute best with peak hormone levels. Energy, confidence, and mood are usually at their highest during these few days. It's the perfect time for date nights, social events, and trying new things together. Make the most of the Green Zone!",
    color: "bg-green-100",
    borderColor: "border-green-300",
    textColor: "text-green-700",
    hoverColor: "hover:bg-green-200",
    icon: Sun,
    doList: ["Plan date nights", "Schedule important events", "Be spontaneous", "Compliment her confidence", "Try new activities together"],
    dontList: ["Waste this peak energy time", "Ignore her increased sociability", "Stay home when she wants to go out"]
  },
  luteal: {
    name: "Yellow Zone",
    medicalName: "Luteal Phase",
    days: "Days 15-28",
    description: "PMS alert",
    detailedDescription: "As hormones begin to decrease, PMS symptoms may appear. During the Yellow Zone, she might experience increased sensitivity, food cravings, fatigue, and mood changes. This is when extra understanding and support become important again as her body prepares for the next cycle.",
    color: "bg-yellow-100",
    borderColor: "border-yellow-300",
    textColor: "text-yellow-700",
    hoverColor: "hover:bg-yellow-200",
    icon: Zap,
    doList: ["Give extra reassurance", "Anticipate mood fluctuations", "Have her favorite comfort foods ready", "Create a calm environment", "Be understanding about changing plans"],
    dontList: ["Take mood changes personally", "Plan stressful events", "Point out PMS symptoms", "Make jokes about hormones", "Push for decisions"]
  }
};

const PhaseVisualizer: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<string>("Unknown");
  const [cycleDay, setCycleDay] = useState<number | null>(null);
  const [hasData, setHasData] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  useEffect(() => {
    const loadCycleData = () => {
      const savedData = localStorage.getItem('cycleTrackerData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.lastPeriodStart) {
          setHasData(true);
          
          const lastPeriodStart = new Date(parsedData.lastPeriodStart);
          const cycleLength = parsedData.cycleLength || 28;
          const periodLength = parsedData.periodLength || 5;
          
          const today = new Date();
          const daysSinceLastPeriod = differenceInDays(today, lastPeriodStart);
          
          const currentCycleDay = (daysSinceLastPeriod % cycleLength) + 1;
          setCycleDay(currentCycleDay);
          
          let phase;
          if (daysSinceLastPeriod < 0) {
            phase = "Pre-Red Zone";
            setProgress(0);
          } else if (currentCycleDay <= periodLength) {
            phase = "Red Zone";
            setProgress((currentCycleDay / periodLength) * 100);
          } else if (currentCycleDay < 14) {
            phase = "Recovery Zone";
            setProgress(((currentCycleDay - periodLength) / (14 - periodLength)) * 100);
          } else if (currentCycleDay >= 14 && currentCycleDay <= 16) {
            phase = "Green Zone";
            setProgress(((currentCycleDay - 14) / 3) * 100);
          } else {
            phase = "Yellow Zone";
            setProgress(((currentCycleDay - 16) / (cycleLength - 16)) * 100);
          }
          
          setCurrentPhase(phase);
        }
      }
    };
    
    loadCycleData();
    // Reload data when localStorage changes
    window.addEventListener('storage', loadCycleData);
    
    return () => {
      window.removeEventListener('storage', loadCycleData);
    };
  }, []);

  const getCurrentPhaseDetails = () => {
    switch (currentPhase) {
      case "Red Zone":
        return CYCLE_PHASES.menstruation;
      case "Recovery Zone":
        return CYCLE_PHASES.follicular;
      case "Green Zone":
        return CYCLE_PHASES.ovulation;
      case "Yellow Zone":
        return CYCLE_PHASES.luteal;
      default:
        return {
          name: "Unknown",
          medicalName: "",
          days: "No data",
          description: "Add cycle data to view",
          color: "bg-gray-100",
          borderColor: "border-gray-300",
          textColor: "text-gray-500",
          icon: Calendar
        };
    }
  };

  const togglePhaseExpansion = (phaseName: string) => {
    if (expandedPhase === phaseName) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phaseName);
    }
  };

  const getPhaseConfig = (phaseName: string) => {
    if (phaseName.toLowerCase().includes('red')) return CYCLE_PHASES.menstruation;
    if (phaseName.toLowerCase().includes('recovery')) return CYCLE_PHASES.follicular;
    if (phaseName.toLowerCase().includes('green')) return CYCLE_PHASES.ovulation;
    if (phaseName.toLowerCase().includes('yellow')) return CYCLE_PHASES.luteal;
    return CYCLE_PHASES.menstruation; // Default fallback
  };

  const phaseDetails = getCurrentPhaseDetails();
  const PhaseIcon = phaseDetails.icon;

  if (!hasData) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Cycle Data Yet</h3>
        <p className="text-gray-500 text-sm">
          Enter her last cycle date below to visualize her current zone
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold mb-1">Current Cycle Visualizer</h2>
        <p className="text-sm text-muted-foreground">
          Visual guide to where she is in her cycle
        </p>
      </div>
      
      <div className="relative mt-6">
        {/* Phase timeline */}
        <div className="flex justify-between mb-2">
          {Object.entries(CYCLE_PHASES).map(([key, phase]) => (
            <button 
              key={phase.name} 
              onClick={() => togglePhaseExpansion(phase.name)}
              className={`text-center flex-1 px-1 transition-colors ${
                currentPhase === phase.name ? phase.textColor : 'text-gray-500'
              } ${phase.hoverColor} rounded-md py-1 cursor-pointer`}
            >
              <phase.icon className={`h-5 w-5 mx-auto ${
                currentPhase === phase.name ? 'animate-pulse' : ''
              }`} />
              <p className="text-xs font-medium mt-1">{phase.name}</p>
              {expandedPhase === phase.name ? (
                <ChevronUp className="h-3 w-3 mx-auto mt-1" />
              ) : (
                <ChevronDown className="h-3 w-3 mx-auto mt-1" />
              )}
            </button>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${phaseDetails.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Current phase indicator */}
        <motion.div 
          className={`mt-4 p-4 rounded-lg border ${phaseDetails.borderColor} ${phaseDetails.color} flex items-center justify-between`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${phaseDetails.color} mr-3`}>
              <PhaseIcon className={`h-6 w-6 ${phaseDetails.textColor}`} />
            </div>
            <div>
              <h3 className={`font-bold ${phaseDetails.textColor}`}>
                {phaseDetails.name}
              </h3>
              <p className="text-sm text-gray-600">{phaseDetails.days}</p>
              {phaseDetails.medicalName && (
                <p className="text-xs text-gray-400 italic">
                  {phaseDetails.medicalName}
                </p>
              )}
            </div>
          </div>
          
          <div className="text-right">
            {cycleDay && (
              <div className="text-2xl font-bold text-gray-700">
                Day {cycleDay}
              </div>
            )}
            <p className="text-sm text-gray-600">{phaseDetails.description}</p>
            <button 
              onClick={() => togglePhaseExpansion(phaseDetails.name)}
              className={`mt-1 text-xs flex items-center justify-end ${phaseDetails.textColor}`}
            >
              {expandedPhase === phaseDetails.name ? 'Show less' : 'Show more'}
              {expandedPhase === phaseDetails.name ? 
                <ChevronUp className="h-3 w-3 ml-1" /> : 
                <ChevronDown className="h-3 w-3 ml-1" />
              }
            </button>
          </div>
        </motion.div>

        {/* Expanded phase information */}
        {expandedPhase && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-3 p-4 rounded-lg border ${getPhaseConfig(expandedPhase).borderColor} bg-white`}
          >
            <h4 className="font-bold mb-2">{expandedPhase}</h4>
            
            <p className="text-sm mb-3">
              {getPhaseConfig(expandedPhase).detailedDescription}
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="do" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm font-medium">
                  Hero Actions (What to do)
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {getPhaseConfig(expandedPhase).doList.map((item, index) => (
                      <li key={`do-${index}`} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="dont">
                <AccordionTrigger className="py-2 text-sm font-medium">
                  Caution Zone (What to avoid)
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {getPhaseConfig(expandedPhase).dontList.map((item, index) => (
                      <li key={`dont-${index}`} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="text-xs flex items-center text-gray-500 mt-2">
                  <Info className="h-3 w-3 mr-1" />
                  Medical perspective
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="text-sm">
                  <p className="font-semibold mb-1">
                    {getPhaseConfig(expandedPhase).medicalName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {expandedPhase.toLowerCase().includes('red') ? 
                      "The shedding of the uterine lining. Estrogen and progesterone levels are at their lowest." : 
                    expandedPhase.toLowerCase().includes('recovery') ? 
                      "Rising estrogen levels stimulate the growth of the uterine lining. General well-being improves." : 
                    expandedPhase.toLowerCase().includes('green') ? 
                      "A mature egg is released. Estrogen peaks and then drops, while progesterone rises. Energy and mood are typically at their highest." : 
                      "The egg travels down the fallopian tube. If not fertilized, hormone levels drop in preparation for menstruation."
                    }
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        )}
        
        {/* Next phase indicator */}
        {currentPhase !== "Unknown" && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {progress < 100 
                ? `${Math.round(progress)}% through this zone` 
                : "Entering next zone soon"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhaseVisualizer;
