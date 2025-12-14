import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Plus, Minus, Package } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useSweets } from '@/context/SweetContext';
import { Sweet } from '@/types/sweet';

interface AdminTableProps {
  onEdit: (sweet: Sweet) => void;
}

const AdminTable = ({ onEdit }: AdminTableProps) => {
  const { filteredSweets, deleteSweet, restockSweet, purchaseSweet } = useSweets();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [restockData, setRestockData] = useState<{ id: string; quantity: number } | null>(null);

  const handleRestock = () => {
    if (restockData && restockData.quantity > 0) {
      restockSweet(restockData.id, restockData.quantity);
      setRestockData(null);
    }
  };

  const handleQuickAdjust = (id: string, delta: number) => {
    if (delta > 0) {
      restockSweet(id, delta);
    } else {
      purchaseSweet(id, Math.abs(delta));
    }
  };

  const sweetToDelete = filteredSweets.find(s => s.id === deleteId);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-lg border border-border bg-card overflow-hidden shadow-card"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSweets.map((sweet, index) => (
              <motion.tr
                key={sweet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">{sweet.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{sweet.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  ₹{sweet.price.toFixed(0)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleQuickAdjust(sweet.id, -1)}
                      disabled={sweet.quantity === 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className={`min-w-[40px] text-center font-medium ${
                      sweet.quantity === 0 ? 'text-destructive' :
                      sweet.quantity <= 10 ? 'text-amber-600' : ''
                    }`}>
                      {sweet.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleQuickAdjust(sweet.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRestockData({ id: sweet.id, quantity: 10 })}
                    >
                      <Package className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(sweet)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(sweet.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>

        {filteredSweets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Package className="h-12 w-12 mb-3" />
            <p>No sweets in inventory</p>
          </div>
        )}
      </motion.div>

      {/* Restock Dialog */}
      <Dialog open={!!restockData} onOpenChange={() => setRestockData(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Sweet</DialogTitle>
            <DialogDescription>
              Enter the quantity to add to inventory
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="number"
              min="1"
              value={restockData?.quantity || ''}
              onChange={(e) => setRestockData(prev => 
                prev ? { ...prev, quantity: parseInt(e.target.value) || 0 } : null
              )}
              placeholder="Quantity to add"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRestockData(null)}>
              Cancel
            </Button>
            <Button onClick={handleRestock}>
              Restock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sweet</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{sweetToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) deleteSweet(deleteId);
                setDeleteId(null);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminTable;
