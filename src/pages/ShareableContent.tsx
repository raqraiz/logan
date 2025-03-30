
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Share2, Heart, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Article = {
  id: string;
  title: string;
  summary: string;
  content: React.ReactNode;
  image?: string;
};

const ShareableContent = () => {
  const [openArticle, setOpenArticle] = useState<Article | null>(null);
  
  const articles: Article[] = [
    {
      id: 'support-during-health',
      title: "5 Ways Men Can Support Their Partners During Health Challenges (Without Losing Their Mind)",
      summary: "Practical ways to be there for her while maintaining your own balance.",
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
    const url = `${window.location.origin}/shareable-content/${articleId}`;
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
          url: `${window.location.origin}/shareable-content/${article.id}`,
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
      
      <main className="flex-1 pt-24 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Shareable Content</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Resources you can share with others to spread awareness and support for women's health.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="p-6">
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

export default ShareableContent;
