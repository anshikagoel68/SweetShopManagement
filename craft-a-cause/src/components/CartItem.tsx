import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const categoryEmojis: Record<string, string> = {
  Chocolates: '🍫',
  Macarons: '🍪',
  Cupcakes: '🧁',
  Candies: '🍭',
  Fudge: '🍬',
};

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { sweet, quantity } = item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50"
    >
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl shrink-0">
        {categoryEmojis[sweet.category] || '🍬'}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{sweet.name}</h4>
        <p className="text-sm text-primary font-semibold">₹{sweet.price.toFixed(0)}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => updateQuantity(sweet.id, quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-6 text-center text-sm font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => updateQuantity(sweet.id, quantity + 1)}
          disabled={quantity >= sweet.quantity}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="text-right min-w-[70px]">
        <p className="font-semibold text-foreground">
          ₹{(sweet.price * quantity).toFixed(0)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
        onClick={() => removeFromCart(sweet.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default CartItem;
