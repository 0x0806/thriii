
import { useState } from 'react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp business number
    const phoneNumber = '+971503321363'; // Using the phone number from contact section
    const message = 'Hi! I would like to inquire about your event services.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
        data-testid="whatsapp-button"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </button>
      
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-slide-down">
          <p className="text-sm text-foreground whitespace-nowrap">
            Chat with us on WhatsApp
          </p>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border"></div>
        </div>
      )}
    </div>
  );
}
