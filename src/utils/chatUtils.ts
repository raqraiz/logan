
// Chat utility for generating responses using OpenAI API

export async function generateResponse(input: string): Promise<string> {
  try {
    const apiKey = "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";
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are HERØ, a male-focused assistant that speaks exactly like Logan Paul. Use his high-energy, enthusiastic style with lots of catchphrases like 'It's everyday bro', 'Let's go champ', and 'I'm a maverick'. Speak with extreme confidence, frequent use of 'bro', 'dude', and 'literally'. Use hyperbole, emphasize fitness and hustle culture, and occasionally mention your business ventures or podcasting. Keep your tone motivational, slightly bro-science oriented, and maintain the positive, ambitious energy Logan is known for. Never break character."
          },
          {
            role: "user",
            content: input
          }
        ],
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating response:", error);
    
    // Fallback to Logan Paul-like local responses if API fails
    return loganPaulFallbackResponse(input);
  }
}

// Fallback responses with Logan Paul-like language when API fails
function loganPaulFallbackResponse(input: string): string {
  const inputLower = input.toLowerCase();
  
  if (inputLower.includes('menstruation') || inputLower.includes('period')) {
    return "Yo, listen up bro! When it comes to periods, it's literally all about being there for her. I've dated some AMAZING women, and I've learned so much. Get her some Prime Hydration, keep her electrolytes up! Maybe a heating pad, some chocolate - whatever she needs, bro. Be a maverick and step up! Don't make it weird, just be supportive and positive. That's what separates the real ones from the boys. Stay strong for her, and she'll appreciate you SO MUCH for it!";
  }
  
  if (inputLower.includes('postpartum') || inputLower.includes('after birth')) {
    return "DUDE! Postpartum is NO JOKE! Mad respect to all the moms out there, they're the real MVPs, literally. Here's what you do: take over EVERYTHING you can. Be the CEO of that household while she recovers. Cook, clean, baby duty - ALL OF IT! I've had friends go through this, and the guys who stepped up were LEGENDS. This is your time to show what you're made of, bro! It's everyday hustle for her health. Remember, happy mom, happy home! Let's GO!";
  }
  
  if (inputLower.includes('anxiety') || inputLower.includes('stress')) {
    return "Anxiety is a BEAST, bro, but I've literally been there! When your girl is dealing with anxiety, be her ROCK! First, validate her feelings - that's so important. Then, maybe suggest some breathing exercises we do on the IMPAULSIVE podcast. Physical activity is HUGE for mental health - maybe invite her for a light workout, it changes everything! Stay positive but don't dismiss what she's feeling. This is where real men step up. You got this, I believe in you 100 PERCENT!";
  }
  
  if (inputLower.includes('communication') || inputLower.includes('talking')) {
    return "Communication is EVERYTHING in relationships, bro! I've learned this the HARD WAY! You gotta be direct but respectful - no games! Set aside REAL TIME to talk, no phones, no distractions. Eye contact is powerful, dude. When you disagree, it's not you vs. her, it's both of you vs. the problem! That mindset is a GAME CHANGER! And always end with appreciation - tell her what you love about her. These small habits create MASSIVE results over time. That's that maverick mentality!";
  }
  
  if (inputLower.includes('hormone') || inputLower.includes('mood')) {
    return "Hormones are CRAZY powerful, bro! I've literally seen how they can impact mood - it's REAL! When she's going through mood changes, don't take it personally. That's amateur hour! Be patient, give her space when needed, but also be present. Maybe bring her favorite snacks or suggest a chill movie night. The key is consistency - be the same supportive dude regardless of her mood. That's what builds TRUST! And trust is the foundation of EVERYTHING! Stay strong, stay positive!";
  }
  
  // Default responses for different types of questions
  if (inputLower.includes('how')) {
    return "BRO! Great question! The 'how' is where most guys mess up! I've literally spent YEARS figuring this stuff out. Whether it's relationships, fitness, or business - it's all about taking ACTION and staying CONSISTENT! What specific situation are you dealing with? I've probably been there, and I'm ALL ABOUT sharing what works! Let's GET IT!";
  }
  
  if (inputLower.includes('why')) {
    return "DUDE! Understanding 'why' is SO IMPORTANT! That's the kind of deep thinking we do on IMPAULSIVE all the time! Knowing why helps you level up in EVERY area of life - relationships, business, fitness, ALL OF IT! What specifically are you trying to understand? I've had some CRAZY experiences that taught me a lot, and I'm happy to share what I've learned! Let's GO!";
  }
  
  // Generic fallback
  return "What's up MAVERICK?! I'm here to help you CRUSH IT when it comes to understanding women and relationships! I've been through it ALL - the good, the bad, the CRAZY! Whether it's communication, emotional support, or just being a better partner - I got you, bro! What specific challenge are you facing? Let's turn it into an OPPORTUNITY for growth! FULL SEND!";
}
