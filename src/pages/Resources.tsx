import { motion } from 'framer-motion';
import { useState } from 'react';
import { Share2, Heart, Copy, Info, BookOpen, User, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import SupportCard from '@/components/SupportCard';
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
  readTime?: string;
  category?: string;
};

const Resources = () => {
  const [openArticle, setOpenArticle] = useState<Article | null>(null);
  
  const articles: Article[] = [
    {
      id: 'support-during-health',
      title: "5 Ways Men Can Support Their Partners During Health Challenges",
      summary: "Practical ways to be there for her while maintaining your own balance.",
      category: "Support",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1516401266446-6432a8a07d41?auto=format&fit=crop&w=800&q=80",
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
      category: "Education",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
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
    },
    {
      id: 'real-deal-periods',
      title: "The Real Deal on Periods",
      summary: "Learn what's actually happening during her cycle, how to spot the signs, and what to do (and not do) when it's that time of the month.",
      category: "Health",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>Let's cut through the confusion. Here's what you actually need to know about periods:</p>
          
          <h3 className="text-lg font-medium mt-6">What's Actually Happening?</h3>
          <p>A period isn't just random bleeding. It's one phase of a monthly hormonal cycle that affects her body and mind in different ways. During menstruation, the uterus sheds its lining because pregnancy didn't occur. This typically lasts 3-7 days, but the full cycle is about a month long.</p>
          
          <h3 className="text-lg font-medium mt-6">Physical Symptoms to Be Aware Of</h3>
          <p>Beyond the obvious bleeding, many women experience cramping (which can range from mild to debilitating), headaches, fatigue, bloating, and back pain. These aren't "excuses" - they're real physical symptoms caused by hormonal changes and the uterine contractions that help expel the lining.</p>
          
          <h3 className="text-lg font-medium mt-6">Mental/Emotional Changes</h3>
          <p>Hormone fluctuations can affect mood, energy levels, and concentration. Some women experience heightened emotions, irritability, or anxiety before or during their periods. This isn't them being "dramatic" - it's a biological response to significant hormonal shifts.</p>
          
          <h3 className="text-lg font-medium mt-6">How to Be Helpful (Not Annoying)</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Don't attribute every negative emotion to "being on her period" - that's dismissive and usually incorrect</li>
            <li>Offer pain relief options (heating pad, OTC pain medication) without being pushy</li>
            <li>Be understanding about potential changes in energy levels or sexual interest</li>
            <li>Never, ever make jokes about periods or mood swings</li>
            <li>Track her cycle with her (using our Cycle Tracker) so you can be prepared to offer support when needed</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">When It's More Than "Just a Period"</h3>
          <p>Conditions like endometriosis, PCOS, and PMDD can make periods significantly more painful and disruptive. If she describes extreme pain or symptoms that interfere with daily life, take it seriously and support her in seeking medical help.</p>
          
          <p className="italic mt-6">Understanding these basics will make you more empathetic and better equipped to support her when needed - without making a big deal out of a normal biological process.</p>
        </div>
      )
    },
    {
      id: 'baby-playbook',
      title: "The Baby Playbook",
      summary: "How to be the MVP during pregnancy and after the baby comes. Step up your game when she needs you most.",
      category: "Parenting",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1518795108696-d31b9bd4e750?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>Whether you're planning for a baby or already expecting, here's your game plan for being the partner she needs:</p>
          
          <h3 className="text-lg font-medium mt-6">During Pregnancy</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>First Trimester:</strong> She may be exhausted and nauseated even though she doesn't "look pregnant." Take over more household duties, keep healthy snacks on hand, and don't take it personally if her sex drive changes.</li>
            <li><strong>Second Trimester:</strong> Typically the "honeymoon period" - energy returns but physical changes accelerate. Help research baby gear, attend appointments, and consider a babymoon if possible.</li>
            <li><strong>Third Trimester:</strong> Discomfort peaks as the body prepares for birth. Help with physical comfort (pregnancy pillows, foot rubs), finalize the birth plan together, and prepare the home.</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">Hospital Game Plan</h3>
          <p>Be her advocate, not just a bystander. Know her birth preferences, learn comfort techniques, pack the hospital bag, and be ready to communicate with medical staff when she can't. Don't pass out - you're needed.</p>
          
          <h3 className="text-lg font-medium mt-6">The Fourth Trimester (First 12 Weeks After Birth)</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Take paternity leave if possible:</strong> These early weeks are crucial for bonding and establishing patterns.</li>
            <li><strong>Manage visitors and external stressors:</strong> Be the gatekeeper she needs.</li>
            <li><strong>Learn infant care:</strong> Changing, bathing, soothing - all skills you need to master, not "help with."</li>
            <li><strong>Support breastfeeding:</strong> It's harder than it looks. Bring water, snacks, and encouragement.</li>
            <li><strong>Watch for postpartum depression signs:</strong> In both her AND yourself (yes, partners get it too).</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">Long Game Strategies</h3>
          <p>Establish equal parenting from day one. Create systems for splitting nighttime duties. Schedule regular check-ins about how you're both doing. Find parent friends who respect equal parenting. Remember you're partners first, parents second.</p>
          
          <p className="italic mt-6">Being an equal parent isn't about "helping" - it's about taking full responsibility alongside your partner. The investment pays off in a stronger relationship and a deeper bond with your child.</p>
        </div>
      )
    },
    {
      id: 'handling-head-game',
      title: "Handling Her Head Game",
      summary: "When she's stressing or freaking out, here's how to keep your cool and bring her back to reality without losing your mind.",
      category: "Relationships",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>When stress, anxiety, or overwhelming emotions hit your partner, here's how to handle it effectively:</p>
          
          <h3 className="text-lg font-medium mt-6">Recognize What's Happening</h3>
          <p>Learn to spot her specific stress or anxiety patterns. Does she get quiet and withdraw? Become irritable? Talk rapidly? Start catastrophizing? Identifying these patterns without judgment is step one.</p>
          
          <h3 className="text-lg font-medium mt-6">The STOP Method</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>S - Stay calm yourself:</strong> Her escalating emotions don't require you to match them. Breathe deeply and maintain your composure.</li>
            <li><strong>T - Time and space:</strong> Ask if she needs a moment alone or if she wants company. Don't assume.</li>
            <li><strong>O - Open-ended questions:</strong> "What's on your mind right now?" works better than "Are you okay?" which usually gets a reflexive "I'm fine."</li>
            <li><strong>P - Presence over fixing:</strong> Your instinct to solve the problem immediately is usually counterproductive. Just be there first.</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">What To Say (And What Not To)</h3>
          <p><strong>Helpful:</strong> "I'm here for you." "What do you need right now?" "That sounds really difficult." "I believe you can handle this, and I've got your back."</p>
          
          <p><strong>Harmful:</strong> "Calm down." "You're overreacting." "It's not that big a deal." "Just think positively." Any sentence starting with "At least..."</p>
          
          <h3 className="text-lg font-medium mt-6">Physical Grounding Techniques</h3>
          <p>If she's open to it, suggest proven anxiety-reducing techniques: The 5-4-3-2-1 method (name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, 1 thing you taste), deep breathing exercises, or a brief walk outside.</p>
          
          <h3 className="text-lg font-medium mt-6">Know When It's Beyond Your Help</h3>
          <p>If anxiety or stress is consistently disrupting her life, gently suggest professional support. Say "I notice this is happening more frequently and seems to be affecting you deeply. Would talking to someone with expertise in this area be helpful?"</p>
          
          <p className="italic mt-6">The goal isn't to "fix" her emotions but to be a steady presence that helps her move through them. Being this kind of partner takes practice and patience, but it's a skill worth mastering.</p>
        </div>
      )
    },
    {
      id: 'hormone-hacks',
      title: "Hormone Hacks",
      summary: "The straight facts on why she acts different sometimes and how to deal with it like a champ. Biology isn't an excuse for chaos.",
      category: "Health",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>Hormones are powerful chemical messengers that affect everything from mood to energy levels. Here's how to navigate the reality of hormonal fluctuations:</p>
          
          <h3 className="text-lg font-medium mt-6">The Monthly Cycle Basics</h3>
          <p>The menstrual cycle has four main phases, each with different hormonal patterns:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Menstrual phase:</strong> Lower hormone levels, possible fatigue and discomfort</li>
            <li><strong>Follicular phase:</strong> Rising estrogen, typically brings increased energy and better mood</li>
            <li><strong>Ovulatory phase:</strong> Peak estrogen and testosterone, often highest energy and sex drive</li>
            <li><strong>Luteal phase:</strong> Rising progesterone, can bring PMS symptoms including mood changes</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">Other Significant Hormonal Events</h3>
          <p><strong>Birth control:</strong> Can stabilize hormone levels but may cause side effects including mood changes, decreased libido, or weight fluctuations.</p>
          
          <p><strong>Pregnancy:</strong> Massive hormonal shifts that affect mood, energy, and physical comfort throughout the three trimesters.</p>
          
          <p><strong>Postpartum:</strong> Dramatic hormone drop after birth can contribute to mood disorders like postpartum depression.</p>
          
          <p><strong>Perimenopause/Menopause:</strong> Years-long transition with fluctuating hormones that can cause mood swings, sleep disruption, and physical symptoms.</p>
          
          <h3 className="text-lg font-medium mt-6">Strategic Support Approaches</h3>
          <p><strong>Track patterns:</strong> Use the Cycle Tracker to identify patterns in her cycle and be proactive about support.</p>
          
          <p><strong>Lifestyle adjustments:</strong> Certain times may require more rest, different types of exercise, or dietary adjustments.</p>
          
          <p><strong>Timing matters:</strong> Consider hormonal patterns when planning important conversations, events, or trips.</p>
          
          <h3 className="text-lg font-medium mt-6">When To Be Concerned</h3>
          <p>Hormonal fluctuations are normal, but severe mood changes, debilitating physical symptoms, or significant disruption to daily functioning may indicate conditions like PMDD, endometriosis, or thyroid issues that require medical attention.</p>
          
          <p className="italic mt-6">Understanding hormonal influences isn't about excusing behavior but recognizing biological realities that affect how someone feels. The goal is supportive awareness, not stereotyping or dismissal.</p>
        </div>
      )
    },
    {
      id: 'talk-tactics',
      title: "Talk Tactics",
      summary: "Cut through the bullshit with straight-up communication that gets results. No mind games, no drama.",
      category: "Communication",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>Effective communication is the foundation of any solid relationship. Here's how to master it:</p>
          
          <h3 className="text-lg font-medium mt-6">The 4-3-2-1 Framework</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>4 seconds:</strong> Pause before responding to emotional statements. This tiny buffer prevents reactive responses.</li>
            <li><strong>3 perspectives:</strong> Consider how the situation looks from her view, your view, and an objective outsider's view.</li>
            <li><strong>2 questions:</strong> "What do you need from me right now?" and "How can I best support you in this?"</li>
            <li><strong>1 goal:</strong> Remember you're on the same team working toward mutual understanding, not competing to "win" the conversation.</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">The Structure of Difficult Conversations</h3>
          <p>When addressing problems, use this format:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Observation:</strong> "I've noticed that..." (stick to objective facts)</li>
            <li><strong>Feeling:</strong> "When this happens, I feel..." (own your emotions)</li>
            <li><strong>Need:</strong> "What I need is..." (be specific)</li>
            <li><strong>Request:</strong> "Would you be willing to..." (actionable and clear)</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">Active Listening Hacks</h3>
          <p>Listening is more than waiting for your turn to talk:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Put away your phone completely</li>
            <li>Maintain appropriate eye contact</li>
            <li>Periodically summarize what you're hearing: "So what you're saying is..."</li>
            <li>Ask clarifying questions rather than making assumptions</li>
            <li>Validate emotions even when you disagree with conclusions</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">Conflict Resolution Reset</h3>
          <p>When conversations get heated:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Suggest a 20-minute break to cool down if emotions are overwhelming</li>
            <li>Use physical touch if appropriate (hand on shoulder, etc.) to maintain connection</li>
            <li>Explicitly state your good intentions: "I want us to figure this out together"</li>
            <li>Focus on the current issue rather than bringing up past conflicts</li>
          </ul>
          
          <p className="italic mt-6">Strong communication doesn't mean never having conflicts. It means having the tools to work through them effectively when they arise, and preventing many of them in the first place.</p>
        </div>
      )
    },
    {
      id: 'keeping-your-edge',
      title: "Keeping Your Edge",
      summary: "How to be there for her without losing yourself. Set boundaries, maintain your priorities, and stay on top of your game.",
      category: "Self-care",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=800&q=80",
      content: (
        <div className="space-y-4">
          <p>Supporting your partner shouldn't mean sacrificing your own well-being. Here's how to maintain balance:</p>
          
          <h3 className="text-lg font-medium mt-6">The Oxygen Mask Principle</h3>
          <p>Just like on airplanes, you need to secure your own oxygen mask before helping others. Self-care isn't selfish—it's necessary for sustainable support. Neglecting your own needs leads to resentment, burnout, and ultimately being a less effective partner.</p>
          
          <h3 className="text-lg font-medium mt-6">Non-Negotiable Time Blocks</h3>
          <p>Identify and protect time for activities that maintain your mental and physical health:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Physical activity (strength training, sports, running, etc.)</li>
            <li>Solo recharge time (reading, gaming, projects)</li>
            <li>Male friendships and community connections</li>
            <li>Career development and skill building</li>
          </ul>
          <p>Schedule these as recurring appointments in your calendar and treat them with the same respect as work meetings.</p>
          
          <h3 className="text-lg font-medium mt-6">Setting Healthy Boundaries</h3>
          <p>Clear boundaries prevent burnout and actually strengthen relationships:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Communicate limits clearly: "I need an hour to decompress after work before discussing big topics."</li>
            <li>Be consistent with your boundaries</li>
            <li>Respect her boundaries with the same seriousness</li>
            <li>Revisit and adjust boundaries as life circumstances change</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6">The Check-In System</h3>
          <p>Establish regular relationship check-ins (weekly or monthly) to discuss:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>What's working well for both of you</li>
            <li>Areas where adjustments might be needed</li>
            <li>Upcoming challenges and how to approach them together</li>
            <li>Individual needs that might have gone unnoticed</li>
          </ul>
          <p>This proactive approach prevents small issues from becoming major problems.</p>
          
          <h3 className="text-lg font-medium mt-6">Delegation and Outsourcing</h3>
          <p>Identify tasks that drain your energy but need to be done. Consider:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Splitting responsibilities based on preferences and strengths</li>
            <li>Using technology solutions (meal delivery, cleaning services, etc.)</li>
            <li>Lowering standards in less important areas to preserve energy for priorities</li>
          </ul>
          
          <p className="italic mt-6">Being a supportive partner doesn't mean becoming a martyr. The strongest relationships involve two healthy, whole individuals who maintain their identity while growing together.</p>
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
              Practical knowledge and shareable content to help you be a better partner.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {article.image && (
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="object-cover w-full h-full brightness-90 hover:brightness-100 transition-all duration-300"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-alpha-black/80 to-transparent opacity-60"></div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-3 text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm">{article.category || 'Article'}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{article.readTime || '5 min read'}</span>
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
                  </div>
                </div>
              </motion.div>
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
            <div className="flex justify-center space-x-4">
              <a 
                href="/chat" 
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md button-hover"
              >
                Chat Now
              </a>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="outline"
                className="flex items-center"
              >
                Back to Articles
              </Button>
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
