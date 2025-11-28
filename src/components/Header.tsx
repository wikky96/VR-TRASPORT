import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, Mail, Phone, QrCode, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState } from 'react';

export const Header = () => {
  const { t } = useLanguage();
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  // Generate QR code URL using API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://vrtransports.com')}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = 'vrtransports-qrcode.png';
    link.href = qrCodeUrl;
    link.target = '_blank';
    link.click();
  };

  return (
    <header className="sticky top-0 z-50 glass-effect shadow-lg">
      {/* Main Header */}
      <div className="flex items-center justify-between py-2 px-3 md:py-3 md:px-4">
        {/* Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <Link to="/login">
                <Button variant="outline" className="w-full justify-start">
                  Admin Login
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo and Title */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-center md:justify-start">
          {/* <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-lg md:text-xl font-bold text-white">VR</span>
          </div> */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full 
    bg-gradient-to-br from-primary to-primary/70 
    shadow-[3px_3px_10px_rgba(0,0,0,0.4),-3px_-3px_10px_rgba(255,255,255,0.1)]
    flex items-center justify-center">
  <span className="text-lg md:text-xl font-bold text-white">VR</span>
</div>

          <div>
            <h1 className="text-base md:text-lg font-bold text-gradient leading-tight">
              {t('header.title')}
            </h1>
            <p className="text-[9px] md:text-[10px] text-muted-foreground">
              {t('header.companySub')}
            </p>
          </div>
        </div>

        {/* Contact Icons & Language Switcher */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Email */}
          <a href="mailto:vrtransports@gmail.com" title="Email Us">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Mail className="h-4 w-4" />
            </Button>
          </a>

          {/* Phone */}
          <a href="tel:+91 6380724731" title="Call Us">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
          </a>

          {/* QR Code Dialog */}
          <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="Scan QR Code">
                <QrCode className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Scan & Download Our App</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                {/* QR Code Image */}
                <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-primary/20">
                  <img 
                    src={qrCodeUrl}
                    alt="VR Transports QR Code"
                    className="w-64 h-64 rounded-lg"
                  />
                </div>

                {/* Instructions */}
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium">📱 Scan to visit our website</p>
                  <p className="text-xs text-muted-foreground">
                    Point your camera at the QR code<br />
                    or download it for later use
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    vrtransports@gmail.com
                  </p>
                </div>

                {/* Download Button */}
                <Button 
                  onClick={downloadQRCode}
                  className="w-full gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Running Ticker */}
      <div className="bg-primary/10 border-t border-primary/20 overflow-hidden">
        <div className="py-1">
          <div className="animate-ticker whitespace-nowrap">
            <span className="text-xs font-medium  px-3">
              {t('header.ticker')}
            </span>
            <span className="text-xs font-medium  px-3">
              {t('header.ticker')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};