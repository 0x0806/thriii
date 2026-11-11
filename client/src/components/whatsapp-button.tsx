import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { SITE } from "@/lib/site";

export function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  // The contact form and the footer already offer every way to reach us: keep the button off them.
  useEffect(() => {
    const targets = ["contact", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const seen = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
      setHidden(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const href = `${SITE.whatsapp}?text=${encodeURIComponent("Hi! I would like to ask about your event services.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa"
      data-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      aria-label="Chat with THRIII Events on WhatsApp (opens in a new tab)"
      data-testid="whatsapp-button"
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}
