
// Simple response generation based on keywords
// In a real implementation, this would call an AI API

export async function generateResponse(input: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const inputLower = input.toLowerCase();
  
  if (inputLower.includes('menstruation') || inputLower.includes('period')) {
    return "Supporting a partner during menstruation involves understanding their unique experience, offering comfort without judgment, and being attentive to their needs. Simple gestures like preparing a heating pad, keeping pain relievers handy, or taking on extra household responsibilities can be meaningful. Most importantly, maintain open communication and ask how you can best provide support.";
  }
  
  if (inputLower.includes('postpartum') || inputLower.includes('after birth')) {
    return "Postpartum recovery is a significant physical and emotional journey. You can provide support by ensuring your partner gets adequate rest, helping with baby care and household tasks, and promoting healthy nutrition. Emotional support is crucial - validate her feelings, be patient with mood changes, and encourage her to express her needs. Also be vigilant for signs of postpartum depression and encourage professional support when needed.";
  }
  
  if (inputLower.includes('anxiety') || inputLower.includes('stress')) {
    return "Supporting a partner with anxiety starts with understanding that anxiety is real and not something they can simply 'get over.' Practice active listening without immediately trying to solve problems. Learn their triggers and coping mechanisms. Encourage professional help when appropriate, and educate yourself about anxiety. Remember self-care is important too - supporting someone with anxiety can be emotionally demanding.";
  }
  
  if (inputLower.includes('communication') || inputLower.includes('talking')) {
    return "Effective communication about sensitive topics requires creating a safe space without judgment. Choose appropriate timing - not during stress or conflict. Use 'I' statements rather than accusatory language. Practice active listening by maintaining eye contact and reflecting back what you hear. Remember that understanding, not necessarily agreeing, is the goal. If conversations become too heated, it's okay to pause and resume later.";
  }
  
  if (inputLower.includes('hormone') || inputLower.includes('mood')) {
    return "Hormonal changes can significantly impact mood, energy, and physical comfort. These changes occur throughout life - during menstrual cycles, pregnancy, postpartum, and menopause. Be patient during mood fluctuations and avoid dismissing feelings as 'just hormones.' Educate yourself about different hormonal phases and their effects. Sometimes, simply acknowledging these changes without trying to fix them can be the most supportive approach.";
  }
  
  // Default responses for different types of questions
  if (inputLower.includes('how')) {
    return "That's an excellent question about how to provide support. The key is to approach with empathy, open communication, and a willingness to learn. Would you like me to provide more specific guidance on this topic?";
  }
  
  if (inputLower.includes('why')) {
    return "Understanding the 'why' behind women's health experiences is crucial for providing meaningful support. This knowledge helps develop empathy and appropriate responses. Would you like me to explain more about the underlying factors?";
  }
  
  // Generic fallback
  return "Thank you for bringing this up. Supporting the women in your life involves listening, learning, and being present. Each person's experience is unique, so open communication is key. Would you like me to provide more specific guidance on this topic?";
}
