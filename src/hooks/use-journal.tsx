
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export type JournalEntry = {
  id: string;
  date: Date;
  mood: string;
  energy_level: string;
  observed_symptoms?: string;
  activities?: string;
  important_events?: string;
  notes?: string;
};

// Sample insights to demonstrate the notification feature
const SAMPLE_INSIGHTS = [
  {
    id: '1',
    title: 'Energy Pattern Noticed',
    description: 'Your partner\'s energy tends to be lower during the week. Consider planning relaxing activities for weeknights.',
    isRead: false,
  },
  {
    id: '2',
    title: 'Upcoming Cycle Phase',
    description: 'Based on your tracking, your partner may be entering a more sensitive phase in 3 days. Be extra supportive.',
    isRead: false,
  },
  {
    id: '3', 
    title: 'Symptom Correlation',
    description: 'Headaches have been recorded multiple times alongside stressful work events. Consider checking in about work stress.',
    isRead: true,
  }
];

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [insights, setInsights] = useState(SAMPLE_INSIGHTS);
  
  // Load entries from localStorage on mount
  useEffect(() => {
    const storedEntries = localStorage.getItem('journal_entries');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries);
        // Convert string dates back to Date objects
        const entriesWithDates = parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setEntries(entriesWithDates);
      } catch (error) {
        console.error('Error parsing journal entries:', error);
      }
    }
    
    // Load insights from localStorage
    const storedInsights = localStorage.getItem('journal_insights');
    if (storedInsights) {
      try {
        setInsights(JSON.parse(storedInsights));
      } catch (error) {
        console.error('Error parsing insights:', error);
      }
    }
  }, []);
  
  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries));
  }, [entries]);
  
  // Save insights to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journal_insights', JSON.stringify(insights));
  }, [insights]);
  
  const addEntry = (entry: JournalEntry) => {
    setEntries(prev => [...prev, entry]);
    generateInsightsFromNewEntry(entry);
  };
  
  const updateEntry = (id: string, updatedEntry: JournalEntry) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? updatedEntry : entry
    ));
  };
  
  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };
  
  const getEntry = (id: string): JournalEntry | null => {
    return entries.find(entry => entry.id === id) || null;
  };
  
  const getRecentEntries = (count: number = 5): JournalEntry[] => {
    return [...entries]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  };
  
  // Helper function to generate insights based on patterns
  const generateInsightsFromNewEntry = (newEntry: JournalEntry) => {
    // This is a simplified version - in a real app, you'd have more sophisticated pattern recognition
    if (entries.length < 3) return; // Need at least a few entries to find patterns
    
    // Example: Check for repeating symptoms
    const symptomPattern = checkForRepeatingSymptoms(newEntry);
    if (symptomPattern) {
      addNewInsight(symptomPattern);
    }
    
    // Example: Check for mood changes
    const moodPattern = checkForMoodPatterns();
    if (moodPattern) {
      addNewInsight(moodPattern);
    }
  };
  
  const checkForRepeatingSymptoms = (newEntry: JournalEntry) => {
    if (!newEntry.observed_symptoms) return null;
    
    const symptoms = newEntry.observed_symptoms.toLowerCase();
    
    // Look for headaches, cramps, etc.
    if (symptoms.includes('headache') || symptoms.includes('migraine')) {
      return {
        id: Date.now().toString(),
        title: 'Headache Pattern Detected',
        description: 'Your partner has mentioned headaches multiple times. Consider checking if there are triggers you can help with.',
        isRead: false
      };
    }
    
    return null;
  };
  
  const checkForMoodPatterns = () => {
    const last5Entries = getRecentEntries(5);
    
    // Check if most recent entries show a pattern of lower mood
    const lowMoodCount = last5Entries.filter(entry => 
      entry.mood === 'sad' || entry.mood === 'tired' || entry.mood === 'irritable'
    ).length;
    
    if (lowMoodCount >= 3) {
      return {
        id: Date.now().toString(),
        title: 'Mood Change Noticed',
        description: 'Your partner\'s mood has been lower recently. This might be a good time for extra emotional support.',
        isRead: false
      };
    }
    
    return null;
  };
  
  const addNewInsight = (insight: any) => {
    setInsights(prev => [insight, ...prev]);
  };
  
  const markInsightAsRead = (id: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === id ? { ...insight, isRead: true } : insight
    ));
  };
  
  return {
    entries,
    insights,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntry,
    getRecentEntries,
    markInsightAsRead
  };
}
