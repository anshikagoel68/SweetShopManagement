import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Candy, Package, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  
  // Try to use cart context (only available on shop pages)
  let cartContext: { totalItems: number; setIsOpen: (open: boolean) => void } | null = null;
  try {
    cartContext = useCart();
  } catch {
    // Cart context not available (e.g., on admin pages)
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Candy className="h-8 w-8 text-primary" />
          </motion.div>
          <span className="font-display text-2xl font-bold text-foreground">
            Sweet<span className="text-primary">Shop</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant={!isAdmin ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Shop</span>
            </Link>
          </Button>
          <Button
            variant={isAdmin ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/admin" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </Button>
          
          {cartContext && (
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => cartContext?.setIsOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              <AnimatePresence>
                {cartContext.totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
                  >
                    {cartContext.totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
