import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass-effect shadow-lg">
      {/* Main Header */}
      <div className="flex items-center justify-between py-2 px-3 md:py-3 md:px-4">
        {/* Menu Button (Mobile) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
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
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-lg md:text-xl font-bold text-white">V</span>
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-gradient leading-tight">
              {t('header.title')}
            </h1>
            <p className="text-[9px] md:text-[10px] text-muted-foreground">
              Quality Construction Materials
            </p>
          </div>
        </div>

        {/* Desktop Menu & Language Switcher */}
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden md:block">
            <Button variant="ghost" size="sm">
              Admin Login
            </Button>
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Running Ticker */}
      <div className="bg-primary/10 border-t border-primary/20 overflow-hidden">
        <div className="py-1">
          <div className="animate-ticker whitespace-nowrap">
            <span className="text-xs font-medium text-primary px-3">
              {t('header.ticker')}
            </span>
            <span className="text-xs font-medium text-primary px-3">
              {t('header.ticker')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
