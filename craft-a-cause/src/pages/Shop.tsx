import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SearchAndFilter from '@/components/SearchAndFilter';
import SweetGrid from '@/components/SweetGrid';
import CartDrawer from '@/components/CartDrawer';
import { SweetProvider } from '@/context/SweetContext';
import { CartProvider } from '@/context/CartContext';

const Shop = () => {
  return (
    <SweetProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <HeroSection />
          
          <main className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Our Sweets Collection
              </h2>
              <p className="text-muted-foreground">
                Browse our handcrafted selection of delicious treats
              </p>
            </motion.div>

            <div className="space-y-6">
              <SearchAndFilter />
              <SweetGrid />
            </div>
          </main>

          <footer className="border-t border-border bg-secondary/30 py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">
                © 2024 SweetShop. Made with love and sugar.
              </p>
            </div>
          </footer>

          <CartDrawer />
        </div>
      </CartProvider>
    </SweetProvider>
  );
};

export default Shop;
