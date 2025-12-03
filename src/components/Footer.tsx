import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Content - Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
                VR
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('footer.brand.name')}</h3>
                <p className="text-slate-400 text-xs">{t('footer.brand.tagline')}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.brand.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-bold mb-4 text-white">{t('footer.sections.quick_links.title')}</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.quick_links.links.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.quick_links.links.services')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.quick_links.links.products')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.quick_links.links.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-sm font-bold mb-4 text-white">{t('footer.sections.services.title')}</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.services.links.transport')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.services.links.logistics')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.services.links.material_supply')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t('footer.sections.services.links.custom_orders')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm font-bold mb-4 text-white">{t('footer.sections.contact.title')}</h5>
            <div className="space-y-3">
              <a 
                href="mailto:vrtransports49@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4" />
                <span className="text-xs">vrtransports49@gmail.com</span>
              </a>

              <a 
                href="tel:+916380724731"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+91 6380724731</span>
              </a>
              
              <a 
                href="tel:+918056892227"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+91 8056892227</span>
              </a>

              <a 
                href="https://wa.me/916380724731"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 text-sm font-medium mt-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('footer.sections.contact.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};