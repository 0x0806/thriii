import { FaWhatsapp } from "react-icons/fa6";
import { SITE } from "@/lib/site";

export function WhatsAppButton() {
  const href = `${SITE.whatsapp}?text=${encodeURIComponent("Hi! I would like to ask about your event services.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa"
      aria-label="Chat with THRIII Events on WhatsApp (opens in a new tab)"
      data-testid="whatsapp-button"
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}
