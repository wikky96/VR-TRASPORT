import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Package } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: Array<{ id: string; quantity: number; unit: string }>;
  onConfirm: (mobile: string, name: string) => void;
}

export const BookingModal = ({ open, onOpenChange, selectedProducts, onConfirm }: BookingModalProps) => {
  const { t } = useLanguage();
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');

  const validateIndianPhoneNumber = (phone: string): boolean => {
    // Indian phone numbers: must start with 6-9 and contain exactly 10 digits
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleConfirm = () => {
    // Validate mobile number for Indian format
    if (!mobile) {
      toast.error(t('booking.phoneRequired'));
      return;
    }

    if (!validateIndianPhoneNumber(mobile)) {
      toast.error(t('booking.phoneInvalid'));
      return;
    }

    onConfirm(mobile, name);
    setMobile('');
    setName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-primary/20 sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            {t('booking.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {/* Order Summary */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-2 border border-primary/20">
            <h3 className="font-bold text-sm mb-1 text-primary">{t('booking.summary')}</h3>
            <div className="space-y-0.5 max-h-32 overflow-y-auto">
              {selectedProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center text-xs">
                  <span className="font-medium">{t(`products.${product.id}`)}</span>
                  <span className="font-bold text-primary">
                    {product.quantity} {t(product.unit)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label htmlFor="mobile" className="text-xs font-semibold">
                {t('booking.mobile')} *
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder={t('booking.mobilePlaceholder')}
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) {
                    setMobile(value);
                  }
                }}
                maxLength={10}
                className="border-2 border-primary/20 focus:border-primary rounded-lg h-8 text-sm"
                required
              />
              <p className="text-[10px] text-muted-foreground">
                Enter 10-digit number starting with 6-9
              </p>
            </div>

            <div className="space-y-0.5">
              <Label htmlFor="name" className="text-xs font-semibold">
                {t('booking.name')}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t('booking.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-primary/20 focus:border-primary rounded-lg h-8 text-sm"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('booking.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
