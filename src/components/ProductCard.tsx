import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductModal } from '@/components/ProductModal';

interface ProductCardProps {
  id: string;
  image: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  unit: string;
}

export const ProductCard = ({ id, image, quantity, onQuantityChange, unit }: ProductCardProps) => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10000) {
      onQuantityChange(id, quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numValue = value === '' ? 0 : parseInt(value);
    if (numValue >= 0 && numValue <= 10000) {
      onQuantityChange(id, numValue);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (quantity === 0) {
      e.target.value = '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onQuantityChange(id, 0);
    }
  };

  return (
    <>
      <div className="neumorphic-card rounded-lg p-1.5 md:p-2 group animate-scale-in">
        {/* Product Image */}
        <div 
          className="relative overflow-hidden rounded-md mb-1 aspect-square bg-gradient-to-br from-muted to-muted/50 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img
            src={image}
            alt={t(`products.${id}`)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

      {/* Product Name */}
      <h3 className="text-[10px] md:text-xs font-bold text-foreground mb-1 text-center leading-tight min-h-[2rem] flex items-center justify-center px-0.5">
        {t(`products.${id}`)}
      </h3>

      {/* Quantity Controls */}
      <div className="space-y-0.5">
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity === 0}
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 disabled:opacity-30 border border-primary/20 h-6 w-6 md:h-7 md:w-7 text-xs"
          >
            −
          </Button>

          <Input
            type="text"
            value={quantity === 0 ? '' : quantity.toString()}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-[3.75rem] text-center text-xs md:text-sm font-bold border border-primary/20 rounded-md focus:ring-2 focus:ring-primary/30 h-6 md:h-7 px-0.5"
            placeholder="0"
          />

          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={quantity >= 10000}
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 disabled:opacity-30 border border-primary/20 h-6 w-6 md:h-7 md:w-7 text-xs"
          >
            +
          </Button>
        </div>

        <p className="text-[9px] md:text-[10px] text-muted-foreground text-center font-medium">
          {t(unit)}
        </p>
      </div>
      </div>

      <ProductModal
        open={showModal}
        onOpenChange={setShowModal}
        productId={id}
        productImage={image}
        currentQuantity={quantity}
        onQuantityUpdate={onQuantityChange}
        unit={unit}
      />
    </>
  );
};
