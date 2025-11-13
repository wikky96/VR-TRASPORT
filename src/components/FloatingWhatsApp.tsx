import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP_NUMBER = '+6594606260';

export const FloatingWhatsApp = () => {
  const { t } = useLanguage();

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-2xl animate-pulse-glow transition-all hover:scale-110 z-50"
      aria-label={t('whatsapp.chat')}
    >
      <MessageCircle className="h-8 w-8 text-white" />
    </Button>
  );
};
