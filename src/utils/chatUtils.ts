
// Simple response generation based on keywords
// In a real implementation, this would call an AI API

export async function generateResponse(input: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const inputLower = input.toLowerCase();
  
  if (inputLower.includes('menstruation') || inputLower.includes('period')) {
    return "When she's on her period, be direct and take charge. Skip the excessive sympathy and offer practical solutions - get her pain meds if she needs them, give her space when she wants it, and don't take mood swings personally. It's biology, not an excuse for drama. Stay cool, be decisive, and you'll both get through it without unnecessary complications.";
  }
  
  if (inputLower.includes('postpartum') || inputLower.includes('after birth')) {
    return "After giving birth, your partner needs you to step up and lead. Take control of the household situation - manage visitors, handle the chores, and make executive decisions about everyday tasks so she can recover. Be the rock in chaotic times. Establish a clear routine, delegate when needed, and don't wait to be asked for help. Command the situation and your family will thrive.";
  }
  
  if (inputLower.includes('anxiety') || inputLower.includes('stress')) {
    return "When dealing with her anxiety, be the solid foundation she needs. Don't coddle or amplify the problem. Stay calm, focused, and solution-oriented. Sometimes the best approach is direct: 'Let's resolve this now.' Create structure when her thoughts are chaotic. Be patient but firm, and don't let her anxiety dictate the relationship dynamic. Strong men bring calm to chaos.";
  }
  
  if (inputLower.includes('communication') || inputLower.includes('talking')) {
    return "Direct, honest communication wins every time. Don't dance around issues - address problems head-on without unnecessary emotion. State your needs clearly and expect the same in return. Establish ground rules for arguments: no personal attacks, stick to the facts, and work toward solutions. Command respect by being straight-forward and refusing to engage in mind games or emotional manipulation.";
  }
  
  if (inputLower.includes('hormone') || inputLower.includes('mood')) {
    return "Hormonal mood swings are real, but they're not an excuse for chaos in your life. Stay centered when she's emotional, and don't get pulled into the drama. Maintain your frame, set boundaries on unacceptable behavior, and be the stable force in the relationship. Don't try to fix everything - sometimes the best response is giving her space while you maintain your own priorities and routine.";
  }
  
  // Default responses for different types of questions
  if (inputLower.includes('how')) {
    return "The direct approach is always best. Don't overthink it. Women respect men who are confident and decisive. What exactly do you need help with?";
  }
  
  if (inputLower.includes('why')) {
    return "Understanding the 'why' gives you the edge in handling complex situations with women. It's not about being soft - it's about being strategic and maintaining control. What specific situation are you dealing with?";
  }
  
  // Generic fallback
  return "Real men take charge of situations, not shy away from challenges. Whether it's relationship dynamics or understanding women's needs, the strongest approach is direct communication and confident action. What specific challenge are you facing?";
}
