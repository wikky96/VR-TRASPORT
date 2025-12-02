import { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const APP_VERSION = '1.0.0'; // Must match the version in PWAInstallPrompt

export const PWAUpdateChecker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);

  const checkForUpdates = async () => {
    try {
      const userId = localStorage.getItem('pwa-user-id');
      if (!userId) return;

      const response = await fetch('https://hyenscttndcerngyuqzl.supabase.co/functions/v1/track-pwa-install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          appVersion: APP_VERSION,
          action: 'check-update',
        }),
      });

      const data = await response.json();
      
      if (data.needsUpdate) {
        setUpdateInfo(data);
        setUpdateAvailable(true);
        setShowAlert(true);
        
        // Store that update is available
        localStorage.setItem('update-available', 'true');
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  useEffect(() => {
    // Check if app is installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      // Check for updates on mount
      checkForUpdates();
      
      // Check for updates every 6 hours
      const interval = setInterval(checkForUpdates, 6 * 60 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const handleUpdate = () => {
    // Register service worker update
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.update().then(() => {
            // Reload the page to get the new version
            window.location.reload();
          });
        }
      });
    }
  };

  const handleDismiss = () => {
    if (updateInfo?.isMandatory) {
      // Don't allow dismissing mandatory updates
      return;
    }
    setShowAlert(false);
    // Show again in 24 hours
    const dismissUntil = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('update-dismissed-until', dismissUntil.toString());
  };

  if (!showAlert || !updateAvailable) return null;

  return (
    <div className="fixed top-20 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 animate-slide-down">
      <Alert className="glass-effect border-2 border-primary/20 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              <AlertTitle className="text-lg font-bold">
                {updateInfo?.isMandatory ? 'Required Update' : 'Update Available'}
              </AlertTitle>
            </div>
            <AlertDescription className="text-sm mb-3">
              <p className="mb-2">Version {updateInfo?.latestVersion} is now available!</p>
              {updateInfo?.description && (
                <p className="text-muted-foreground">{updateInfo.description}</p>
              )}
            </AlertDescription>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                className="flex-1 bg-gradient-to-r from-primary to-accent"
                size="sm"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Update Now
              </Button>
              {!updateInfo?.isMandatory && (
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  size="sm"
                >
                  Later
                </Button>
              )}
            </div>
          </div>
          {!updateInfo?.isMandatory && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="h-8 w-8 ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
};