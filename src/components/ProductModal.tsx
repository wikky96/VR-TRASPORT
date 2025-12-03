import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Minus, Plus } from 'lucide-react';

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productImage: string;
  currentQuantity: number;
  onQuantityUpdate: (id: string, quantity: number) => void;
  unit: string;
}

export const ProductModal = ({
  open,
  onOpenChange,
  productId,
  productImage,
  currentQuantity,
  onQuantityUpdate,
  unit,
}: ProductModalProps) => {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(currentQuantity);

  const handleIncrement = () => {
    if (quantity < 10000) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numValue = value === '' ? 0 : parseInt(value);
    if (numValue >= 0 && numValue <= 10000) {
      setQuantity(numValue);
    }
  };

  const handleSave = () => {
    onQuantityUpdate(productId, quantity);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-gradient">
            {t(`products.${productId}`)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-muted to-muted/50">
            <img
              src={productImage}
              alt={t(`products.${productId}`)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quantity Input */}
          <div className="space-y-3">
            <Label htmlFor="quantity" className="text-sm font-medium">
              {t('products.quantity')} ({t(unit)})
            </Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={quantity === 0}
                className="h-10 w-10 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                id="quantity"
                type="text"
                value={quantity === 0 ? '' : quantity.toString()}
                onChange={handleInputChange}
                className="text-center text-lg font-bold flex-1"
                placeholder="0"
              />

              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={quantity >= 10000}
                className="h-10 w-10 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {t('booking.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-primary to-accent"
            >
             {t('booking.save')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};