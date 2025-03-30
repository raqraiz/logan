
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, MoveRight, Droplet, Cloud, Sun, Zap } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const CYCLE_PHASES = {
  menstruation: {
    name: "Red Zone",
    medicalName: "Menstrual Phase",
    days: "Days 1-5",
    description: "Extra support needed",
    color: "bg-red-100",
    borderColor: "border-red-300",
    textColor: "text-red-700",
    icon: Droplet
  },
  follicular: {
    name: "Recovery Zone",
    medicalName: "Follicular Phase",
    days: "Days 1-14",
    description: "Energy returning",
    color: "bg-blue-100",
    borderColor: "border-blue-300",
    textColor: "text-blue-700",
    icon: Cloud
  },
  ovulation: {
    name: "Green Zone",
    medicalName: "Ovulatory Phase",
    days: "Days 14-16",
    description: "Peak energy & mood",
    color: "bg-green-100",
    borderColor: "border-green-300",
    textColor: "text-green-700",
    icon: Sun
  },
  luteal: {
    name: "Yellow Zone",
    medicalName: "Luteal Phase",
    days: "Days 15-28",
    description: "PMS alert",
    color: "bg-yellow-100",
    borderColor: "border-yellow-300",
    textColor: "text-yellow-700",
    icon: Zap
  }
};

const PhaseVisualizer: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<string>("Unknown");
  const [cycleDay, setCycleDay] = useState<number | null>(null);
  const [hasData, setHasData] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
          {Object.values(CYCLE_PHASES).map((phase, index) => (
            <div 
              key={phase.name} 
              className={`text-center flex-1 px-1 ${
                currentPhase === phase.name ? phase.textColor : 'text-gray-500'
              }`}
            >
              <phase.icon className={`h-5 w-5 mx-auto ${
                currentPhase === phase.name ? 'animate-pulse' : ''
              }`} />
              <p className="text-xs font-medium mt-1">{phase.name}</p>
            </div>
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
          </div>
        </motion.div>
        
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
