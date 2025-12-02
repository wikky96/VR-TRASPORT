import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, Mail, Phone, QrCode, Download, Home, Package, ShoppingBag, LogIn, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState } from 'react';

export const Header = () => {
  const { t } = useLanguage();
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Generate QR code URL using API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://vrtransports.com')}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = 'vrtransports-qrcode.png';
    link.href = qrCodeUrl;
    link.target = '_blank';
    link.click();
  };

  const menuItems = [
    { icon: Home, label: 'Products', path: '/' },
    { icon: ShoppingBag, label: 'Your Orders', path: '/orders' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-effect shadow-lg">
      {/* Main Header */}
      <div className="flex items-center justify-between py-2 px-3 md:py-3 md:px-4">
        {/* Menu Button */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
            {/* Menu Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-white">VR</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Menu</h2>
                    <p className="text-xs text-muted-foreground">Navigate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer group">
                      <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Admin Login at Bottom */}
            <div className="border-t border-border/50 p-4 mt-auto bg-muted/30">
              <Link 
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all duration-200 cursor-pointer group border border-primary/20">
                  <div className="p-2 rounded-md bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <LogIn className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-sm block">Admin Login</span>
                    <span className="text-xs text-muted-foreground">Access dashboard</span>
                  </div>
                </div>
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo and Title */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-center md:justify-start">
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
          <a href="mailto:vrtransports49@gmail.com" title="Email Us">
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
                    vrtransports49@gmail.com
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
            <span className="text-xs font-medium px-3">
              {t('header.ticker')}
            </span>
            <span className="text-xs font-medium px-3">
              {t('header.ticker')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};