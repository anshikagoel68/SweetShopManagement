import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sweet } from '@/types/sweet';
import { useSweets } from '@/context/SweetContext';
import { categories } from '@/data/sweets';

const sweetSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  quantity: z.coerce.number().int().min(0, 'Quantity cannot be negative'),
  description: z.string().optional(),
});

type SweetFormData = z.infer<typeof sweetSchema>;

interface SweetFormDialogProps {
  open: boolean;
  onClose: () => void;
  editingSweet?: Sweet | null;
}

const SweetFormDialog = ({ open, onClose, editingSweet }: SweetFormDialogProps) => {
  const { addSweet, updateSweet } = useSweets();
  const isEditing = !!editingSweet;

  const form = useForm<SweetFormData>({
    resolver: zodResolver(sweetSchema),
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
    },
  });

  useEffect(() => {
    if (editingSweet) {
      form.reset({
        name: editingSweet.name,
        category: editingSweet.category,
        price: editingSweet.price,
        quantity: editingSweet.quantity,
        description: editingSweet.description || '',
      });
    } else {
      form.reset({
        name: '',
        category: '',
        price: 0,
        quantity: 0,
        description: '',
      });
    }
  }, [editingSweet, form]);

  const onSubmit = (data: SweetFormData) => {
    const sweetData = {
      name: data.name,
      category: data.category,
      price: data.price,
      quantity: data.quantity,
      description: data.description,
    };
    
    if (isEditing && editingSweet) {
      updateSweet(editingSweet.id, sweetData);
    } else {
      addSweet(sweetData);
    }
    onClose();
    form.reset();
  };

  const availableCategories = categories.filter(c => c !== 'All');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {isEditing ? 'Edit Sweet' : 'Add New Sweet'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the sweet details below' : 'Fill in the details for your new sweet'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chocolate Truffle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A delicious treat..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update' : 'Add'} Sweet
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SweetFormDialog;
