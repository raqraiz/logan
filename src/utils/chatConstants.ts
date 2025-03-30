
import { Message } from '../components/MessageBubble';

export const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "I'm HERØ, your healthcare support assistant. I provide practical, actionable advice for men supporting partners with health issues. How can I help you manage your situation effectively? Check out our new dedicated Cycle Tracker page to better support your partner's health needs.",
    sender: 'bot',
    timestamp: new Date(),
  },
];

export const SUGGESTION_TOPICS = [
  "Managing medical appointments efficiently",
  "Communication strategies during health crises",
  "Creating effective medication routines",
  "Tracking partner's menstrual cycle",
  "Balancing support with independence",
  "Navigating the healthcare system effectively"
];
