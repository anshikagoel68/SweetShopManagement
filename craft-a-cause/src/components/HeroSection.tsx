import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroBanner} 
          alt="Sweet shop banner with colorful candies and pastries" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Fresh sweets daily</span>
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Discover the{' '}
            <span className="text-primary">Sweetest</span>
            <br />
            Treats in Town
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg">
            Handcrafted chocolates, delicate macarons, fluffy cupcakes, and more. 
            Every bite is a moment of pure joy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
