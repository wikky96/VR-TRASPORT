import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Check if user has dismissed before (reset after 7 days)
      const dismissed = localStorage.getItem('pwa-dismissed');
      const dismissedTime = localStorage.getItem('pwa-dismissed-time');
      
      if (dismissed && dismissedTime) {
        const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed > 7) {
          localStorage.removeItem('pwa-dismissed');
          localStorage.removeItem('pwa-dismissed-time');
          setShowPrompt(true);
        }
      } else if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-dismissed', 'true');
    localStorage.setItem('pwa-dismissed-time', Date.now().toString());
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 animate-slide-up">
      <div className="glass-effect rounded-2xl p-5 shadow-2xl border-2 border-primary/20">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{t('pwa.install')}</h3>
              <p className="text-sm text-muted-foreground">{t('pwa.message')}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8 rounded-lg hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleInstall}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-xl shadow-lg"
        >
          <Download className="mr-2 h-4 w-4" />
          {t('pwa.install')}
        </Button>
      </div>
    </div>
  );
};
