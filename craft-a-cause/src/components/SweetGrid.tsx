import { motion } from 'framer-motion';
import { Frown } from 'lucide-react';
import SweetCard from './SweetCard';
import { useSweets } from '@/context/SweetContext';

const SweetGrid = () => {
  const { filteredSweets } = useSweets();

  if (filteredSweets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <Frown className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          No sweets found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredSweets.map((sweet, index) => (
        <SweetCard key={sweet.id} sweet={sweet} index={index} />
      ))}
    </div>
  );
};

export default SweetGrid;
