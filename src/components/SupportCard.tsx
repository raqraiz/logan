
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface SupportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  image?: string;
}

const SupportCard = ({ title, description, icon, delay = 0, image }: SupportCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {image && (
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img 
              src={image} 
              alt={title} 
              className="object-cover w-full h-full brightness-90 hover:brightness-100 transition-all duration-300"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-alpha-black/80 to-transparent opacity-60"></div>
        </div>
      )}
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-alpha-graphite flex items-center justify-center mb-4 text-alpha-cyan border border-alpha-cyan/20 shadow-lg shadow-alpha-cyan/10">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-2 text-alpha-white">{title}</h3>
        <p className="text-alpha-white/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default SupportCard;
