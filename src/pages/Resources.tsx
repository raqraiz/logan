
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SupportCard from '@/components/SupportCard';

const Resources = () => {
  const resources = [
    {
      title: "The Real Deal on Periods",
      description: "Learn what's actually happening during her cycle, how to spot the signs, and what to do (and not do) when it's that time of the month.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z" />
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      )
    },
    {
      title: "The Baby Playbook",
      description: "How to be the MVP during pregnancy and after the baby comes. Step up your game when she needs you most.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 13v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6" />
          <path d="M12 3v12" />
          <path d="M5 8h14" />
        </svg>
      )
    },
    {
      title: "Handling Her Head Game",
      description: "When she's stressing or freaking out, here's how to keep your cool and bring her back to reality without losing your mind.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
      )
    },
    {
      title: "Hormone Hacks",
      description: "The straight facts on why she acts different sometimes and how to deal with it like a champ. Biology isn't an excuse for chaos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18a5 5 0 0 0-10 0" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
          <line x1="1" y1="18" x2="3" y2="18" />
          <line x1="21" y1="18" x2="23" y2="18" />
          <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
          <line x1="23" y1="22" x2="1" y2="22" />
          <polyline points="8 6 12 2 16 6" />
        </svg>
      )
    },
    {
      title: "Talk Tactics",
      description: "Cut through the bullshit with straight-up communication that gets results. No mind games, no drama.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </svg>
      )
    },
    {
      title: "Keeping Your Edge",
      description: "How to be there for her without losing yourself. Set boundaries, maintain your priorities, and stay on top of your game.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bro Guides</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Straight-up knowledge to help you crush it when dealing with women's stuff.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <SupportCard
                key={index}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                delay={index}
              />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 p-8 glass-card rounded-2xl text-center"
          >
            <h2 className="text-2xl font-medium mb-4">Need specific advice?</h2>
            <p className="text-foreground/70 mb-6">
              Our AI has your back 24/7 with no-BS answers to your toughest questions.
            </p>
            <a 
              href="/chat" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md button-hover"
            >
              Chat Now
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Resources;
