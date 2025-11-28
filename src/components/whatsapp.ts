
export const WHATSAPP_NUMBER = '+91 6380724731';

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export const getBookingMessage = (type: string, item: string) => {
  return `Hello AJC Holidays, I would like to book ${type}: ${item}`;
};


