import { openWhatsApp, getGeneralMessage } from './whatsapp';
import { useLanguage } from '@/contexts/LanguageContext';
export default function WhatsAppButton() {
  const { t } = useLanguage();
  return (
    <>
      <button
        onClick={() => openWhatsApp(t('whatsapp.message'))}
        // onClick={() => openWhatsApp('')}
        className="whatsapp-float group"
        aria-label="Chat on WhatsApp"
        title={t('whatsapp.chat')}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M16 0C7.163 0 0 7.163 0 16c0 2.831.738 5.485 2.031 7.788L0 32l8.38-2.2A15.936 15.936 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0z"
            fill="#fff"
          />
          <path
            d="M25.258 22.75c-.338.949-1.681 1.737-2.75 1.963-.731.15-1.688.269-4.906-.938-4.119-1.544-6.781-5.706-6.988-5.969-.2-.262-1.675-2.231-1.675-4.256 0-2.025 1.063-3.019 1.438-3.431.375-.413.819-.519 1.094-.519.275 0 .55.006.787.019.256.013.6-.1.938.713.338.819 1.15 2.819 1.25 3.019.1.2.169.431.038.694-.131.262-.2.425-.4.656-.2.231-.419.519-.6.694-.2.194-.406.406-.175.8.231.387.1.031 2.075 3.019 1.587 1.887 2.088 2.088 2.45 2.325.375.231.6.194.825-.119.225-.312.969-1.131 1.225-1.519.256-.387.519-.325.869-.194.35.131 2.219 1.044 2.6 1.231.381.188.631.281.725.438.094.156.094.9-.244 1.85z"
            fill="#25D366"
          />
        </svg>

        <span className="whatsapp-tooltip">{t('whatsapp.hover')}</span>
      </button>

      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4),
                      0 8px 24px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid rgba(255, 255, 255, 0.3);
          animation: whatsapp-pulse 2s ease-in-out infinite;
        }

        .whatsapp-float:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.5),
                      0 12px 32px rgba(0, 0, 0, 0.2);
          animation: none;
        }

        .whatsapp-float:active {
          transform: scale(1.05);
        }

        .whatsapp-tooltip {
          position: absolute;
          right: 70px;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transform: translateX(10px);
          transition: all 0.3s ease;
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .whatsapp-tooltip::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 0 6px 8px;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.85);
        }

        .whatsapp-float:hover .whatsapp-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }

        @keyframes whatsapp-pulse {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4),
                        0 8px 24px rgba(0, 0, 0, 0.15),
                        0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          50% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4),
                        0 8px 24px rgba(0, 0, 0, 0.15),
                        0 0 0 10px rgba(37, 211, 102, 0);
          }
        }

        @media (max-width: 768px) {
          .whatsapp-float {
            width: 56px;
            height: 56px;
            bottom: 20px;
            right: 20px;
          }

          .whatsapp-float svg {
            width: 28px;
            height: 28px;
          }

          .whatsapp-tooltip {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-float {
            width: 52px;
            height: 52px;
            bottom: 16px;
            right: 16px;
          }

          .whatsapp-float svg {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>
    </>
  );
}
