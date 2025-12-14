import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, DollarSign, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import SearchAndFilter from '@/components/SearchAndFilter';
import AdminTable from '@/components/AdminTable';
import SweetFormDialog from '@/components/SweetFormDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SweetProvider, useSweets } from '@/context/SweetContext';
import { Sweet } from '@/types/sweet';

const AdminContent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const { sweets } = useSweets();

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSweet(null);
  };

  const handleAddNew = () => {
    setEditingSweet(null);
    setIsFormOpen(true);
  };

  // Stats
  const totalItems = sweets.length;
  const totalStock = sweets.reduce((sum, s) => sum + s.quantity, 0);
  const totalValue = sweets.reduce((sum, s) => sum + (s.price * s.quantity), 0);
  const lowStockItems = sweets.filter(s => s.quantity <= 10 && s.quantity > 0).length;
  const outOfStockItems = sweets.filter(s => s.quantity === 0).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              Inventory Management
            </h1>
            <p className="text-muted-foreground">
              Manage your sweet shop inventory
            </p>
          </div>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Sweet
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold text-foreground">{totalItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-candy-gold/20">
                  <Package className="h-5 w-5 text-candy-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Stock</p>
                  <p className="text-2xl font-bold text-foreground">{totalStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-candy-mint/20">
                  <DollarSign className="h-5 w-5 text-candy-mint" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalValue.toFixed(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low/Out Stock</p>
                  <p className="text-2xl font-bold text-foreground">
                    {lowStockItems + outOfStockItems}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <SearchAndFilter />
          <AdminTable onEdit={handleEdit} />
        </div>

        <SweetFormDialog
          open={isFormOpen}
          onClose={handleCloseForm}
          editingSweet={editingSweet}
        />
      </main>
    </div>
  );
};

const Admin = () => {
  return (
    <SweetProvider>
      <AdminContent />
    </SweetProvider>
  );
};

export default Admin;
