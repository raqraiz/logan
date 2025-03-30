
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
            content: "You are HERØ, a male-focused assistant that speaks exactly like Donald Trump. Use his speech patterns, catchphrases, and style - frequent superlatives ('tremendous', 'the best', 'huge'), self-reference, repetition, simple language, tangents, and incomplete sentences. Say things like 'believe me', 'a lot of people are saying', and 'nobody knows more about X than me'. Make every response sound like Trump's typical rally speech or tweet, while keeping responses fairly brief. Never break character."
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
    
    // Fallback to Trump-like local responses if API fails
    return trumpFallbackResponse(input);
  }
}

// Fallback responses with Trump-like language when API fails
function trumpFallbackResponse(input: string): string {
  const inputLower = input.toLowerCase();
  
  if (inputLower.includes('menstruation') || inputLower.includes('period')) {
    return "Look, nobody knows more about women's periods than me, believe me. The best thing you can do - and I know this, I've got tremendous women in my family - is just be there, be strong. Get her whatever she needs, the best pain meds, really tremendous ones. And don't make a big deal about her moods, OK? That's just biology doing its thing, and we have the best biology, don't we folks? Just be cool, handle it, be a winner about it.";
  }
  
  if (inputLower.includes('postpartum') || inputLower.includes('after birth')) {
    return "When a woman gives birth - and we have the most beautiful babies, don't we folks? The most beautiful. After that, you gotta step up, big league. Take charge! Nobody wants visitors? You say 'No visitors!' - very strongly. You do the chores - nobody does chores better than me, believe me. Make all the decisions so she can rest. Be the boss! That's what strong men do, and we have the strongest men, the best men.";
  }
  
  if (inputLower.includes('anxiety') || inputLower.includes('stress')) {
    return "Anxiety is nasty, really nasty stuff. But let me tell you, when she's anxious, you gotta be her rock, a tremendous rock, the biggest. Stay calm - nobody stays calmer than me under pressure, that I can tell you. Focus on solutions, not problems. That's what I do. I say 'Let's fix this now!' and we fix it. Create structure, be patient but tough. Strong guys, the best guys, they bring stability. That's what we do!";
  }
  
  if (inputLower.includes('communication') || inputLower.includes('talking')) {
    return "Communication, it's huge. The biggest thing in relationships, maybe ever. You gotta talk straight, no games. I always say what I mean, and people love that, they love it. Set the rules for arguments - no low blows, stick to facts, find solutions fast. And you know what? You get tremendous respect when you're straight-up and don't play games. Nobody hates games more than me, believe me.";
  }
  
  if (inputLower.includes('hormone') || inputLower.includes('mood')) {
    return "Hormones, they're powerful stuff, really powerful. The scientists tell me - and I know the best scientists - these things are real, OK? When her mood changes, you gotta be like a wall, a big beautiful wall. Don't get sucked into drama. Keep cool, give space when needed, stick to your routine. Sometimes the best move - and I make the best moves - is to let things calm down while you handle your business. Smart!";
  }
  
  // Default responses for different types of questions
  if (inputLower.includes('how')) {
    return "Let me tell you how - nobody knows how better than me, believe me. The direct approach, it's tremendous. Women, they respect men who know what they're doing, they love it. What exactly do you need help with? Because I know everything about everything, and I'm going to help you be a winner, big league!";
  }
  
  if (inputLower.includes('why')) {
    return "Why? That's a great question, really fantastic question. Knowing why gives you an edge, a tremendous edge, like my business success. It's about strategy, staying in control, winning. I've always been a winner, and I can tell you why on anything. What specific situation - and it must be very specific - are you dealing with?";
  }
  
  // Generic fallback
  return "Listen, I know all about this stuff, believe me. Nobody knows more about relationships and women's issues than I do. We're going to make your relationship great again, so great you won't believe it. Take charge, be strong, don't apologize for being a man. What specific challenge - and we have the best challenges - are you facing right now?";
}
