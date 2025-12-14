import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CreditCard, 
  Wallet, 
  Banknote, 
  MapPin, 
  CheckCircle, 
  PartyPopper,
  Truck
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { useSweets } from '@/context/SweetContext';
import { toast } from 'sonner';

const addressSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  address: z.string().trim().min(10, 'Please enter complete address').max(500),
  landmark: z.string().trim().max(100).optional(),
  city: z.string().trim().min(2, 'City is required').max(50),
  state: z.string().trim().min(2, 'State is required').max(50),
  pincode: z.string().trim().regex(/^\d{6}$/, 'Enter valid 6-digit pincode'),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
}

const paymentMethods = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: Banknote,
  },
  {
    id: 'upi',
    name: 'UPI',
    description: 'GPay, PhonePe, Paytm',
    icon: Wallet,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: CreditCard,
  },
];

const CheckoutDialog = ({ open, onClose }: CheckoutDialogProps) => {
  const { items, totalPrice, clearCart, setIsOpen } = useCart();
  const { purchaseSweet } = useSweets();
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
    },
  });

  const handleAddressSubmit = () => {
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Process all purchases
    let allSuccessful = true;
    for (const item of items) {
      const success = purchaseSweet(item.sweet.id, item.quantity);
      if (!success) {
        allSuccessful = false;
        break;
      }
    }
    
    if (allSuccessful) {
      setStep('success');
      clearCart();
      
      // Close after showing success
      setTimeout(() => {
        onClose();
        setIsOpen(false);
        setStep('address');
        form.reset();
      }, 4000);
    } else {
      toast.error('Some items are out of stock');
    }
    
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (step !== 'success') {
      onClose();
      setStep('address');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {step === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2 justify-center">
                Order Placed! <PartyPopper className="h-6 w-6" />
              </h3>
              <p className="text-muted-foreground mt-2">
                Your delicious sweets are on the way!
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-primary">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-medium">Estimated delivery: 2-3 days</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl flex items-center gap-2">
                {step === 'address' ? (
                  <>
                    <MapPin className="h-6 w-6 text-primary" />
                    Delivery Address
                  </>
                ) : (
                  <>
                    <Wallet className="h-6 w-6 text-primary" />
                    Payment Method
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {step === 'address' 
                  ? 'Where should we deliver your sweets?' 
                  : 'Choose how you want to pay'
                }
              </DialogDescription>
            </DialogHeader>

            {step === 'address' ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddressSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="House/Flat No., Building, Street, Area" 
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landmark (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Near temple, opposite mall, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Maharashtra" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="400001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <RadioGroup 
                  value={selectedPayment} 
                  onValueChange={setSelectedPayment}
                  className="space-y-3"
                >
                  {paymentMethods.map((method) => (
                    <div key={method.id}>
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={method.id}
                        className="flex items-center gap-4 p-4 rounded-lg border-2 border-border bg-card cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                      >
                        <div className="p-2 rounded-lg bg-secondary">
                          <method.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === method.id 
                            ? 'border-primary bg-primary' 
                            : 'border-muted-foreground'
                        }`}>
                          {selectedPayment === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full rounded-full bg-primary flex items-center justify-center"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                            </motion.div>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Separator />

                <div className="space-y-2 p-4 rounded-lg bg-secondary/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice.toFixed(0)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep('address')} 
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder} 
                    className="flex-1 gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Processing...
                      </>
                    ) : (
                      <>Place Order</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
