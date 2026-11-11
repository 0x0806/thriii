import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SOCIALS } from "@/lib/site";

const ICONS = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebookF,
  x: FaXTwitter,
  threads: FaThreads,
} as const;

export function SocialLinks() {
  return (
    <ul className="socials" data-testid="social-links">
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.key];
        return (
          <li key={s.key}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`}>
              <Icon aria-hidden="true" size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
