
import { motion } from 'framer-motion';

interface SupportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const SupportCard = ({ title, description, icon, delay = 0 }: SupportCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-alpha-graphite flex items-center justify-center mb-4 text-alpha-cyan">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2 text-alpha-white">{title}</h3>
      <p className="text-alpha-white/70 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default SupportCard;
