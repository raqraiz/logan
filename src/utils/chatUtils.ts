
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
            content: "You are HERØ, a healthcare assistant for men supporting partners with health issues. Provide clear, direct advice that is practical and actionable. Focus on concrete steps, efficient solutions, and straightforward explanations without fluff. Your audience is pragmatic, success-driven men who value direct communication and effective problem-solving. Offer guidance on navigating medical processes, communicating with partners, and handling both logistical and emotional aspects of healthcare support. Avoid excessive emotional language or platitudes - prioritize clarity, practicality and actionable insights."
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
    
    // Fallback to practical health advice responses if API fails
    return practicalHealthAdviceFallback(input);
  }
}

// Fallback responses with practical health advice when API fails
function practicalHealthAdviceFallback(input: string): string {
  const inputLower = input.toLowerCase();
  
  if (inputLower.includes('menstruation') || inputLower.includes('period')) {
    return "When your partner is dealing with menstruation, there are several practical ways to help: 1) Keep pain relievers like ibuprofen available, 2) Have heating pads ready for cramps, 3) Stock her preferred hygiene products, 4) Take on more household responsibilities during this time, 5) Understand that symptoms vary - some women experience severe pain and mood changes while others don't. Be matter-of-fact about it; this is a normal biological process that doesn't need to be dramatized or treated as taboo.";
  }
  
  if (inputLower.includes('postpartum') || inputLower.includes('after birth')) {
    return "During the postpartum period: 1) Coordinate a schedule for night feedings so you both get sleep, 2) Take over household management completely for the first few weeks, 3) Screen visitors to protect mom's recovery time, 4) Watch for signs of postpartum depression including excessive crying, severe mood swings, or withdrawal, 5) Attend the 6-week follow-up appointment to understand recovery milestones, 6) Set up a system for medication tracking if needed. The key is handling logistics so she can focus on healing and bonding with the baby.";
  }
  
  if (inputLower.includes('anxiety') || inputLower.includes('stress')) {
    return "To effectively support a partner with anxiety: 1) Research her specific type of anxiety to understand triggers and symptoms, 2) Create a distraction-free environment during episodes, 3) Establish a simple signal system she can use when feeling overwhelmed, 4) Know which grounding techniques work for her (breathing exercises, sensory focus, etc.), 5) Help maintain her treatment plan including medication schedules and therapy appointments. Remember, anxiety is physiological - logical reassurance often doesn't help during an attack. Instead, focus on practical assistance and maintaining routine.";
  }
  
  if (inputLower.includes('communication') || inputLower.includes('talking')) {
    return "For effective healthcare communication: 1) Maintain a shared digital health record with all doctor information, medication lists, and treatment plans, 2) Prepare 3-5 key questions before appointments and record answers, 3) Use direct, specific language about symptoms rather than vague descriptions, 4) Set aside dedicated time to discuss health concerns without distractions, 5) Establish clear signals for when your partner needs you to advocate for her versus when she prefers to speak for herself. Approach health discussions as you would a work project - systematically and with clear objectives.";
  }
  
  if (inputLower.includes('hormone') || inputLower.includes('mood')) {
    return "Managing hormone-related mood changes requires a systematic approach: 1) Track symptoms using a health app to identify patterns, 2) Implement environmental controls during difficult days (manage lighting, noise, temperature), 3) Maintain a consistent sleep and meal schedule to stabilize baseline body functions, 4) Create a standard protocol for severe days with agreed-upon responses, 5) Consider asking her doctor about testing hormone levels if symptoms are severe. The goal is to establish predictable routines and responses that create stability when hormones are causing instability.";
  }
  
  // Default responses for different types of questions
  if (inputLower.includes('how')) {
    return "When addressing health challenges, the most effective approach is one based on information gathering, systematic planning, and consistent implementation. To properly address your specific situation, I'd need more details about the particular health issue you're helping manage. The most successful partners approach health support like project management: identify the problems, research solutions, implement a plan, and adjust based on results. What specific aspect of supporting your partner's health are you dealing with?";
  }
  
  if (inputLower.includes('why')) {
    return "Understanding the mechanisms behind health conditions helps create more effective support systems. The 'why' often involves biological processes, environmental factors, and sometimes psychological components. Having this knowledge allows you to implement targeted solutions rather than generic approaches. Could you provide more specific information about what health issue you're trying to understand? With more details, I can provide the practical insights that will help you develop an effective action plan.";
  }
  
  // Generic fallback
  return "HERØ provides clear, practical advice for men supporting partners with health issues. I focus on actionable steps, efficient solutions, and straightforward explanations. Whether you're dealing with medical appointments, medication management, or day-to-day support, I can offer concrete strategies. What specific health situation are you managing with your partner? The more details you provide, the more tailored my recommendations can be.";
}

