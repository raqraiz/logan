
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Share2, Heart, Copy, Check, Info, BookOpen, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import SupportCard from '@/components/SupportCard';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type Article = {
  id: string;
  title: string;
  summary: string;
  content: React.ReactNode;
  image?: string;
};

const Resources = () => {
  const [openArticle, setOpenArticle] = useState<Article | null>(null);
  
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
      ),
      image: "https://images.unsplash.com/photo-1576089073624-b5417ec53f82?auto=format&fit=crop&w=800&q=80"
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
      ),
      image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Handling Her Head Game",
      description: "When she's stressing or freaking out, here's how to keep your cool and bring her back to reality without losing your mind.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
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
      ),
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Talk Tactics",
      description: "Cut through the bullshit with straight-up communication that gets results. No mind games, no drama.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Keeping Your Edge",
      description: "How to be there for her without losing yourself. Set boundaries, maintain your priorities, and stay on top of your game.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const articles: Article[] = [
    {
      id: 'support-during-health',
      title: "5 Ways Men Can Support Their Partners During Health Challenges (Without Losing Their Mind)",
      summary: "Practical ways to be there for her while maintaining your own balance.",
      image: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>Being a supportive partner doesn't mean sacrificing your sanity. Here are five practical approaches that work:</p>
          
          <h3 className="text-lg font-medium mt-6">1. Know When to Act, When to Listen</h3>
          <p>Most guys immediately jump into problem-solving mode. But sometimes, she just needs you to hear her out. Ask directly: "Do you want my advice or do you just need me to listen?" This simple question prevents a ton of unnecessary arguments.</p>
          
          <h3 className="text-lg font-medium mt-6">2. Create a Shared Health Calendar</h3>
          <p>Track appointments, medication schedules, and symptom patterns together using a shared calendar. This gives you both visibility without her having to constantly remind you. Bonus points for setting up your own reminders so she doesn't have to manage you too.</p>
          
          <h3 className="text-lg font-medium mt-6">3. Learn the Basics of Her Condition</h3>
          <p>You don't need a medical degree, but understanding the fundamentals of what she's dealing with shows you're invested. Do your own research instead of making her explain everything repeatedly. It's a major stress reliever for her when you can follow the conversation at doctor appointments.</p>
          
          <h3 className="text-lg font-medium mt-6">4. Build Your Support Network</h3>
          <p>Being her only support person will burn you out fast. Connect with other partners in similar situations, whether online or in-person. Having people who understand your specific challenges makes a massive difference for your mental health.</p>
          
          <h3 className="text-lg font-medium mt-6">5. Schedule Regular Breaks</h3>
          <p>Supporting someone isn't a 24/7 job. Block off time for your own physical and mental maintenance - whether that's hitting the gym, meeting friends, or just vegging with a video game. Make these non-negotiable. You can't pour from an empty cup.</p>
          
          <p className="italic mt-6">Remember: Being supportive doesn't mean being perfect. It means showing up consistently, learning from mistakes, and putting in genuine effort to understand her experience.</p>
        </div>
      )
    },
    {
      id: 'practical-guide',
      title: "What Every Guy Needs to Know About Women's Health – A Practical Guide",
      summary: "No-nonsense information that actually helps you be a better partner.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>Skip the awkwardness and confusion. Here's what you actually need to know about women's health to be an effective partner:</p>
          
          <h3 className="text-lg font-medium mt-6">The Menstrual Cycle: More Than Just "That Time of the Month"</h3>
          <p>It's a full hormonal process that affects energy levels, mood, and physical comfort throughout the month, not just during bleeding. The average cycle is 28 days but can vary widely. Each phase brings different challenges and strengths. Track her cycle together using the Logan Cycle Tracker to learn her patterns.</p>
          
          <h3 className="text-lg font-medium mt-6">Common Health Issues You Should Understand</h3>
          <p>PCOS, endometriosis, and hormonal imbalances affect millions of women but are often dismissed or misdiagnosed. These aren't just "bad cramps" - they can be debilitating conditions. When she talks about symptoms, take them seriously. Women are often not believed about their own pain levels.</p>
          
          <h3 className="text-lg font-medium mt-6">Mental Health Is Physical Health</h3>
          <p>Hormonal fluctuations directly impact brain chemistry. PMS, PMDD, and postpartum depression aren't character flaws or excuses – they're real physiological conditions. Supporting her mental health might include adapting plans during tough weeks or encouraging professional support when needed.</p>
          
          <h3 className="text-lg font-medium mt-6">Birth Control Facts</h3>
          <p>Different methods have different side effects. Many impact mood, weight, sex drive and energy levels. If she's experiencing side effects, she's not making it up. Be part of the conversation about options rather than leaving it all on her shoulders.</p>
          
          <h3 className="text-lg font-medium mt-6">The Healthcare System Often Fails Women</h3>
          <p>Women routinely wait years for diagnoses of common conditions. Their pain is frequently dismissed or attributed to anxiety. Being an advocate in medical settings - backing up her concerns and taking notes during appointments - can make a huge difference in her care quality.</p>
          
          <p className="italic mt-6">Understanding these basics puts you miles ahead of most partners and creates a foundation for more open, honest communication about health.</p>
        </div>
      )
    }
  ];

  const handleCopyLink = (articleId: string) => {
    const url = `${window.location.origin}/resources/${articleId}`;
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard!", {
      description: "Share this article with others who might benefit.",
    });
  };

  const handleShare = async (article: Article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: `${window.location.origin}/resources/${article.id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyLink(article.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Knowledge and shareable content to help you be a better partner.
            </p>
          </motion.div>
          
          <Tabs defaultValue="guides" className="w-full mb-10">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="guides">Bro Guides</TabsTrigger>
              <TabsTrigger value="shareable">Shareable Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource, index) => (
                  <SupportCard
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    icon={resource.icon}
                    delay={index}
                    image={resource.image}
                  />
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8 p-8 glass-card rounded-2xl text-center"
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
            </TabsContent>
            
            <TabsContent value="shareable">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card rounded-2xl overflow-hidden"
                  >
                    {article.image && (
                      <div>
                        <AspectRatio ratio={16 / 9}>
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="object-cover w-full h-full rounded-t-2xl"
                          />
                        </AspectRatio>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-3 text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span className="text-sm">Article</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">5 min read</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
                      <p className="text-foreground/70 mb-5">{article.summary}</p>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          onClick={() => setOpenArticle(article)}
                          variant="default"
                          className="flex items-center"
                        >
                          Read Full Article
                        </Button>
                        
                        <Button 
                          onClick={() => handleShare(article)}
                          variant="outline"
                          className="flex items-center"
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        
                        <Button 
                          onClick={() => handleCopyLink(article.id)}
                          variant="outline"
                          className="flex items-center"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-16 p-8 glass-card rounded-2xl text-center"
              >
                <h2 className="text-2xl font-medium mb-4">Be a Hero for Her Health</h2>
                <p className="text-foreground/70 mb-6">
                  Share these resources to help more men understand and support their partners. 
                  Small actions can make a big difference.
                </p>
                <div className="flex justify-center">
                  <Heart className="h-16 w-16 text-rose-500" />
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Dialog open={!!openArticle} onOpenChange={(open) => !open && setOpenArticle(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{openArticle?.title}</DialogTitle>
            <DialogDescription>
              {openArticle?.summary}
            </DialogDescription>
          </DialogHeader>
          
          {openArticle?.image && (
            <div className="mt-2 rounded-md overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={openArticle.image} 
                  alt={openArticle.title} 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          )}
          
          <div className="mt-4">
            {openArticle?.content}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button 
              onClick={() => handleCopyLink(openArticle?.id || '')}
              variant="outline"
              className="flex items-center"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
            
            <Button 
              onClick={() => openArticle && handleShare(openArticle)}
              variant="default"
              className="flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
