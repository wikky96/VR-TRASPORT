import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { BookingModal } from '@/components/BookingModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

import msandImage from '@/assets/msand.jpg';
import psandImage from '@/assets/psand.jpg';
import gravelImage from '@/assets/gravel.jpg';
import bluemetal20Image from '@/assets/bluemetal20.jpg';
import bluemetal40Image from '@/assets/bluemetal40.jpg';
import bricksImage from '@/assets/bricks.jpg';
import WhatsAppButton from '@/components/WhatsAppButton';

const WHATSAPP_NUMBER = '+6594606260';

const products = [
  // Sands
  { id: 'msand', unit: 'products.unit', image: 'https://cfloworld.com/media/c1gndicx/maunfactured-sand-featured-image.jpg' },
  { id: 'psand', unit: 'products.unit', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP09Vy4tHQyTdEpOFlOR-QBpXd3ipJsO8mZg&s' },
  { id: 'riversand', unit: 'products.unit', image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/soil-manure/d/o/z/1-natural-river-sand-1-villehut-original-imahgjdacgnempd5.jpeg?q=90' },
  // Blue Metals
  { id: 'dust', unit: 'products.unit', image: 'https://images.squarespace-cdn.com/content/v1/5a0efd4ed74cff09f7dab221/1536871030651-182XJ2AEWROP3ZFYJI93/Quarry%2BDust%2BPile.JPG' },
  { id: '6mmchips', unit: 'products.unit', image: 'https://images.jdmagicbox.com/quickquotes/images_main/blue-metal-chips-2216608575-ncu87380.jpg' },
  { id: 'bluemetal20', unit: 'products.unit', image: 'https://images.jdmagicbox.com/quickquotes/images_main/blue-metal-aggregate-20mm-2136082629-1nm3q863.jpg' },
  { id: 'bluemetal40', unit: 'products.unit', image: 'https://content.jdmagicbox.com/quickquotes/images_main/40mm-blue-metal-stone-chips-803282989-qr9w7956.png?im=Resize%3D%28360%2C360%29%2Caspect%3Dfit&impolicy=queryparam' },
  // Gravel
  { id: 'gravel', unit: 'products.unit', image: 'https://images.jdmagicbox.com/quickquotes/images_main/gravel-sand-for-construction-2217784779-bzwi6nfs.jpg' },
  { id: 'redgravel', unit: 'products.unit', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Tt8NpOPMm7L33EyLTnLOiOHfbaWPfM672g&s' },
  // Other products
  { id: 'bricks', unit: 'products.quantity', image: bricksImage },
  { id: 'redsoil', unit: 'products.unit', image: 'https://media.istockphoto.com/id/899773846/photo/ground-texture-top-view-of-a-red-soil-surface.jpg?s=612x612&w=0&k=20&c=eZEQbAx_od7YBRjTPX32sadtCWNHavR6-u7uHI8AveA=' },
];

const Index = () => {
  const { t } = useLanguage();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const getTotalQuantity = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getSelectedProducts = () => {
    return products
      .filter((p) => quantities[p.id] > 0)
      .map((p) => ({
        id: p.id,
        quantity: quantities[p.id],
        unit: p.unit,
      }));
  };

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async (mobile: string, name: string) => {
    const selectedProducts = getSelectedProducts();
    
    try {
      // Call the edge function to create booking (bypasses auth)
      const { supabase } = await import('@/integrations/supabase/client');
      
      const bookingData = {
        user_name: name || 'Guest',
        phone_number: mobile,
        products: selectedProducts.map(p => ({
          id: p.id,
          name: t(`products.${p.id}`),
          quantity: p.quantity,
          unit: t(p.unit)
        }))
      };

      const { data, error } = await supabase.functions.invoke('create-booking', {
        body: bookingData
      });

      if (error) {
        console.error('Booking error:', error);
        toast.error('Failed to save booking. Please try again.');
        return;
      }

      // Show success message
      toast.success(t('booking.success'));
      
      // Reset quantities and close modal
      setQuantities(products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
      setShowBookingModal(false);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to process booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Products Section */}
        <section className="mb-12">
          <h2 className="text-base md:text-lg font-bold text-center mb-3 text-gradient animate-fade-in whitespace-nowrap">
            {t('products.title')}
          </h2>

          {/* Product Grid - Always 3 columns */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 mb-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  id={product.id}
                  image={product.image}
                  quantity={quantities[product.id]}
                  onQuantityChange={handleQuantityChange}
                  unit={product.unit}
                />
              </div>
            ))}
          </div>

          {/* Book Now Button */}
          {getTotalQuantity() > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
              <Button
                onClick={handleBookNow}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-full px-8 shadow-2xl text-lg font-bold glow-effect hover:scale-105 transition-all"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t('booking.button')}
                 {/* ({getTotalQuantity()}) */}
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Modals and Floating Elements */}
      <BookingModal
        open={showBookingModal}
        onOpenChange={setShowBookingModal}
        selectedProducts={getSelectedProducts()}
        onConfirm={handleConfirmBooking}
      />
      {/* <FloatingWhatsApp /> */}
      <WhatsAppButton />
      <PWAInstallPrompt />
      
      <Footer />
    </div>
  );
};

export default Index;
