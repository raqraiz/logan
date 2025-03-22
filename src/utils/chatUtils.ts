
// Chat utility for generating local responses

export function generateResponse(input: string): string {
  const inputLower = input.toLowerCase();
  
  if (inputLower.includes('menstruation') || inputLower.includes('period')) {
    return "During her period, be the rock she needs. Get her pain meds if needed, give her space when she wants it, and don't take the mood shifts personally. It's just biology in action. Stay cool, handle business, and you'll both cruise through it without drama.";
  }
  
  if (inputLower.includes('postpartum') || inputLower.includes('after birth')) {
    return "After she gives birth, time to step up and dominate the home turf. Take charge of visitors, crush the chores, and make the calls on daily stuff so she can recover. Be her backup. Set a solid routine, delegate when needed, and jump in without being asked. Command the situation like a boss.";
  }
  
  if (inputLower.includes('anxiety') || inputLower.includes('stress')) {
    return "When she's feeling anxious, be her anchor. Stay cool and action-focused. Sometimes a straight \"Let's fix this now\" is exactly what's needed. Create structure when her thoughts are all over the place. Be patient but firm. Strong guys bring stability when things get shaky.";
  }
  
  if (inputLower.includes('communication') || inputLower.includes('talking')) {
    return "Straight talk always wins. Hit issues head-on without the drama. Say what you need clearly and expect the same back. Set ground rules for arguments: no cheap shots, stick to facts, find solutions. Get respect by being straight-up and shutting down mind games.";
  }
  
  if (inputLower.includes('hormone') || inputLower.includes('mood')) {
    return "Hormones are real and powerful - that's just science. When her mood shifts, stay solid and don't get pulled into unnecessary drama. Keep your cool, know when to give space, and maintain your routine. Sometimes the best move is to let things chill while you handle your business.";
  }
  
  // Default responses for different types of questions
  if (inputLower.includes('how')) {
    return "Direct approach works best. Women respect guys who know what they're about. What exactly do you need help with?";
  }
  
  if (inputLower.includes('why')) {
    return "Knowing the 'why' gives you the edge in tough situations. It's about strategy and staying in control. What specific situation are you dealing with?";
  }
  
  // Generic fallback
  return "Take charge of situations, don't back down from challenges. With relationship stuff or women's health issues, straight talk and confident action always win. What specific challenge are you facing?";
}
