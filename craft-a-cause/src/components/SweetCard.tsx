import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sweet } from '@/types/sweet';
import { useCart } from '@/context/CartContext';

interface SweetCardProps {
  sweet: Sweet;
  index: number;
}

const categoryColors: Record<string, string> = {
  Chocolates: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Macarons: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  Cupcakes: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  Candies: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Fudge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
};

const categoryEmojis: Record<string, string> = {
  Chocolates: '🍫',
  Macarons: '🍪',
  Cupcakes: '🧁',
  Candies: '🍭',
  Fudge: '🍬',
};

const SweetCard = ({ sweet, index }: SweetCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(sweet, quantity);
    setQuantity(1);
    setIsOpen(true);
  };

  const isLowStock = sweet.quantity <= 10;
  const isOutOfStock = sweet.quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="overflow-hidden border-border/50 shadow-card transition-all duration-300 hover:shadow-glow gradient-card">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-muted">
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-6xl"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {categoryEmojis[sweet.category] || '🍬'}
          </motion.div>
          
          <Badge 
            className={`absolute top-3 left-3 ${categoryColors[sweet.category] || 'bg-secondary text-secondary-foreground'}`}
          >
            {sweet.category}
          </Badge>

          {isLowStock && !isOutOfStock && (
            <Badge variant="destructive" className="absolute top-3 right-3 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Low Stock
            </Badge>
          )}
          
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-display text-xl font-semibold text-foreground mb-1">
            {sweet.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {sweet.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ₹{sweet.price.toFixed(0)}
            </span>
            <span className="text-sm text-muted-foreground">
              {sweet.quantity} in stock
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex w-full items-center gap-2">
            <div className="flex items-center rounded-lg border border-border bg-background">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.min(sweet.quantity, quantity + 1))}
                disabled={isOutOfStock || quantity >= sweet.quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SweetCard;
