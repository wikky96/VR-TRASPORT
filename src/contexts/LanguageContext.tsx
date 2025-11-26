import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ta' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'header.title': 'VR Transport',
    'header.ticker': '🚛 Quality Construction Materials • Fast Delivery • Competitive Prices • Trusted by 1000+ Customers • 📞 80566 55272',
    'header.companySub' : 'Quality Construction Materials',
    'products.title': 'Our Products',
    'products.msand': 'M-Sand',
    'products.psand': 'P-Sand',
    'products.riversand': 'River Sand',
    'products.dust': 'Dust',
    'products.6mmchips': '6 mm Chips Blue Metal',
    'products.bluemetal20': 'Blue Metal 20mm',
    'products.bluemetal40': 'Blue Metal 40mm',
    'products.gravel': 'Gravel',
    'products.bricks': 'Bricks',
    'products.redgravel': 'Red Gravel',
    'products.redsoil': 'Red Soil',
    'products.unit': 'Unit',
    'products.quantity': 'Quantity',
    'booking.button': 'Book Now',
    'booking.title': 'Confirm Your Booking',
    'booking.summary': 'Order Summary',
    'booking.mobile': 'Mobile Number',
    'booking.mobilePlaceholder': 'Enter your mobile number',
    'booking.name': 'Name (Optional)',
    'booking.namePlaceholder': 'Enter your name',
    'booking.confirm': 'Confirm Booking',
    'booking.cancel': 'Cancel',
    'booking.success': 'Booking confirmed! We will contact you shortly.',
    'booking.error': 'Please enter a valid mobile number',
    'booking.phoneRequired': 'Phone number is required',
    'booking.phoneInvalid': 'Please enter a valid 10-digit number starting with 6-9',
    'pwa.install': 'Install App',
    'pwa.message': 'Install VR Transport for quick access',
    'whatsapp.chat': 'Chat with us on WhatsApp',
    'whatsapp.hover' : 'Chat our WhatsApp',
    'whatsapp.message' : 'Hello, I’m reaching out from the VR Transports website. Please share information about rates, delivery time, and availability of construction materials.',
    
  },
  ta: {
    'header.title': 'VR டிரான்ஸ்போர்ட்',
    'header.ticker': '🚛 தரமான கட்டுமானப் பொருட்கள் • விரைவான டெலிவரி • போட்டி விலை • 1000+ வாடிக்கையாளர்கள் நம்பிக்கை • 📞 80566 55272',
    'header.companySub' : 'உங்களுக்கான உயர்தர கட்டுமானப் பொருட்கள்',
    'products.title': 'எங்கள் தயாரிப்புகள்',
    'products.msand': 'எம்-சாண்ட்',
    'products.psand': 'பி-சாண்ட்',
    'products.riversand': 'ஆற்று மணல்',
    'products.dust': 'டஸ்ட்',
    'products.6mmchips': 'சிப்ஸ் ஜல்லி',
    'products.bluemetal20': '¾ ஜல்லி',
    'products.bluemetal40': '1 ½ ஜல்லி',
    'products.gravel': 'கிராவல்',
    'products.bricks': 'செங்கல்',
    'products.redgravel': 'சிவப்பு மணி கிராவல்',
    'products.redsoil': 'செம்மண்',
    'products.unit': 'யூனிட்',
    'products.quantity': 'எண்ணிக்கை',
    'booking.button': 'பதிவு செய்',
    'booking.title': 'உங்கள் பதிவை உறுதிப்படுத்தவும்',
    'booking.summary': 'ஆர்டர் சுருக்கம்',
    'booking.mobile': 'மொபைல் எண்',
    'booking.mobilePlaceholder': 'உங்கள் மொபைல் எண்ணை உள்ளிடவும்',
    'booking.name': 'பெயர் (விரும்பினால்)',
    'booking.namePlaceholder': 'உங்கள் பெயரை உள்ளிடவும்',
    'booking.confirm': 'பதிவை உறுதிப்படுத்தவும்',
    'booking.cancel': 'ரத்து செய்',
    'booking.success': 'பதிவு உறுதிப்படுத்தப்பட்டது! நாங்கள் விரைவில் தொடர்பு கொள்வோம்.',
    'booking.error': 'சரியான மொபைல் எண்ணை உள்ளிடவும்',
    'booking.phoneRequired': 'மொபைல் எண் தேவை',
    'booking.phoneInvalid': '10 இலக்க எண்ணை 6-9 உடன் தொடங்க வேண்டும்',
    'pwa.install': 'ஆப்ஸை நிறுவவும்',
    'pwa.message': 'விரைவான அணுகலுக்கு VR டிரான்ஸ்போர்ட்டை நிறுவவும்',
    'whatsapp.chat': 'வாட்ஸ்அப்பில் எங்களுடன் அரட்டையடிக்கவும்',
    'whatsapp.hover' : 'WhatsApp-ல் தொடர்பு கொள்ளுங்கள்',
    'whatsapp.message' : 'வணக்கம், VR Transports இணையதளம் மூலம் தொடர்பு கொள்கிறேன். கட்டுமான பொருட்கள் தொடர்பான தகவல்களை வழங்க முடியுமா?',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ta';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
