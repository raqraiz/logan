
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  CalendarDays, 
  Heart, 
  Pencil, 
  Save, 
  Plus, 
  X, 
  Calendar,
  MessageSquare 
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { useJournalEntries } from '@/hooks/use-journal';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useIsMobile } from '@/hooks/use-mobile';
import CycleTrackerModal from '@/components/CycleTrackerModal';

const Journal = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const { 
    entries, 
    addEntry, 
    getEntry,
    deleteEntry,
    updateEntry 
  } = useJournalEntries();
  
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  
  const currentEntry = editingEntryId 
    ? getEntry(editingEntryId) 
    : getEntry(format(date, 'yyyy-MM-dd'));
  
  const [formData, setFormData] = useState({
    mood: currentEntry?.mood || 'neutral',
    notes: currentEntry?.notes || '',
    observed_symptoms: currentEntry?.observed_symptoms || '',
    energy_level: currentEntry?.energy_level || 'medium',
    activities: currentEntry?.activities || '',
    important_events: currentEntry?.important_events || '',
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    const entryId = editingEntryId || format(date, 'yyyy-MM-dd');
    const entryExists = !!getEntry(entryId);
    
    const entry = {
      id: entryId,
      date: date,
      ...formData
    };
    
    if (entryExists) {
      updateEntry(entryId, entry);
      toast.success("Journal entry updated");
    } else {
      addEntry(entry);
      toast.success("New journal entry added");
    }
    
    setEditingEntryId(null);
    setShowNewEntryForm(false);
  };
  
  const handleNewEntry = () => {
    setFormData({
      mood: 'neutral',
      notes: '',
      observed_symptoms: '',
      energy_level: 'medium',
      activities: '',
      important_events: '',
    });
    setShowNewEntryForm(true);
  };
  
  const handleEditEntry = (id: string) => {
    const entry = getEntry(id);
    if (entry) {
      setFormData({
        mood: entry.mood || 'neutral',
        notes: entry.notes || '',
        observed_symptoms: entry.observed_symptoms || '',
        energy_level: entry.energy_level || 'medium',
        activities: entry.activities || '',
        important_events: entry.important_events || '',
      });
      setEditingEntryId(id);
      setShowNewEntryForm(true);
    }
  };
  
  const handleCancelForm = () => {
    setShowNewEntryForm(false);
    setEditingEntryId(null);
  };
  
  const getDateWithEntries = () => {
    return entries.map(entry => new Date(entry.date));
  };
  
  const datesWithEntries = getDateWithEntries();
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Her Daily Journal</h1>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Track important details about your partner to better understand and support her needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Select Date
                </CardTitle>
                <CardDescription>
                  Choose a date to view or add an entry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                  modifiers={{
                    hasEntry: datesWithEntries,
                  }}
                  modifiersStyles={{
                    hasEntry: {
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.5)',
                    },
                  }}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  onClick={handleNewEntry} 
                  className="w-full"
                  variant="default"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Entry for {format(date, 'MMM d, yyyy')}
                </Button>
                
                <Button 
                  onClick={() => setIsTrackerOpen(true)} 
                  className="w-full"
                  variant="outline"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  View Cycle Tracker
                </Button>
              </CardFooter>
            </Card>
            
            <div className="col-span-1 lg:col-span-8">
              {showNewEntryForm ? (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingEntryId ? 'Edit Entry' : 'New Entry'} - {format(date, 'MMMM d, yyyy')}
                    </CardTitle>
                    <CardDescription>
                      Record observations about your partner to help build a complete picture
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel>Mood</FormLabel>
                          <Select 
                            value={formData.mood} 
                            onValueChange={(value) => handleInputChange('mood', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select mood" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="happy">Happy</SelectItem>
                              <SelectItem value="energetic">Energetic</SelectItem>
                              <SelectItem value="neutral">Neutral</SelectItem>
                              <SelectItem value="tired">Tired</SelectItem>
                              <SelectItem value="irritable">Irritable</SelectItem>
                              <SelectItem value="anxious">Anxious</SelectItem>
                              <SelectItem value="sad">Sad</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel>Energy Level</FormLabel>
                          <Select 
                            value={formData.energy_level} 
                            onValueChange={(value) => handleInputChange('energy_level', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select energy level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="very-low">Very Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Observed Symptoms</FormLabel>
                        <Textarea 
                          placeholder="Headache, cramps, bloating, etc..."
                          value={formData.observed_symptoms}
                          onChange={(e) => handleInputChange('observed_symptoms', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Activities</FormLabel>
                        <Textarea 
                          placeholder="Exercise, work events, social activities..."
                          value={formData.activities}
                          onChange={(e) => handleInputChange('activities', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Important Events</FormLabel>
                        <Textarea 
                          placeholder="Anniversaries, deadlines, family events..."
                          value={formData.important_events}
                          onChange={(e) => handleInputChange('important_events', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Additional Notes</FormLabel>
                        <Textarea 
                          placeholder="Other observations or things to remember..."
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handleCancelForm}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Entry
                    </Button>
                  </CardFooter>
                </Card>
              ) : currentEntry ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>{format(new Date(currentEntry.date), 'MMMM d, yyyy')}</CardTitle>
                      <CardDescription>Daily observations</CardDescription>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleEditEntry(currentEntry.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Mood</p>
                          <p className="capitalize">{currentEntry.mood}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Energy Level</p>
                          <p className="capitalize">{currentEntry.energy_level.replace('-', ' ')}</p>
                        </div>
                      </div>
                      
                      {currentEntry.observed_symptoms && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Observed Symptoms</p>
                          <p>{currentEntry.observed_symptoms}</p>
                        </div>
                      )}
                      
                      {currentEntry.activities && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Activities</p>
                          <p>{currentEntry.activities}</p>
                        </div>
                      )}
                      
                      {currentEntry.important_events && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Important Events</p>
                          <p>{currentEntry.important_events}</p>
                        </div>
                      )}
                      
                      {currentEntry.notes && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Additional Notes</p>
                          <p>{currentEntry.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="mb-4 p-4 rounded-full bg-primary/10">
                    <Pencil className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Entry For This Date</h3>
                  <p className="text-muted-foreground mb-6">
                    Start tracking your partner's health, moods, and important events.
                  </p>
                  <Button
                    onClick={handleNewEntry}
                    className="w-full max-w-sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Entry
                  </Button>
                </Card>
              )}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-8 glass-card rounded-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Track Changes</h3>
                <p className="text-foreground/70">
                  Notice patterns in her mood, energy levels, and symptoms over time.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Predict Needs</h3>
                <p className="text-foreground/70">
                  Get notifications when she might need extra support based on patterns.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Be Prepared</h3>
                <p className="text-foreground/70">
                  Remember important dates and anticipate how to best support her.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <CycleTrackerModal 
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />
    </div>
  );
};

export default Journal;
