export const SITE = {
  name: "THRIII Events",
  email: "hello@thriiievents.com",
  phoneDisplay: "+971 50 3321 363",
  phoneHref: "tel:+971503321363",
  whatsapp: "https://wa.me/971503321363",
  address: "Ajman Freezone, Sheikh Rashid Bin Saeed Al Maktoum Street, Ajman, U.A.E",
  mainAction: "Start your project",
} as const;

export const SOCIALS = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/thriiievents/" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/thriii-events-fz-llc-344307386/" },
  { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@thriiievents" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@THRIIIEVENTSFZLLC" },
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61581765570460" },
  { key: "x", label: "X", href: "https://x.com/thriiievents" },
  { key: "threads", label: "Threads", href: "https://www.threads.com/@thriiievents" },
] as const;

/** Resolve a file in /public, correct under any base path. */
export const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

/**
 * Sends a form to the studio inbox through FormSubmit's AJAX endpoint.
 * Resolves true only when the service confirms it accepted the message.
 */
export async function sendLead(fields: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _captcha: "false", _template: "table", ...fields }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success === true || data.success === "true";
  } catch {
    return false;
  }
}
