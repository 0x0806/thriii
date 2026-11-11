import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrochureDownload } from "@/components/brochure-download";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
];

export function Navigation() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    const onScroll = () => window.scrollY < 200 && setCurrent("");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="site-nav" data-solid={solid || open} data-testid="main-navigation">
        <div className="wrap">
          <a href="#home" className="wordmark" aria-label="THRIII Events, back to the top" data-testid="logo">
            THRIII<small>Events</small>
          </a>

          <nav className="nav-links" aria-label="Main" data-testid="desktop-menu">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-draw"
                aria-current={current === l.href.slice(1) ? "true" : undefined}
                data-testid={`nav-${l.href.slice(1)}`}
              >
                {l.label}
              </a>
            ))}
            <BrochureDownload>
              <button type="button" className="nav-text link-draw" data-testid="nav-brochure">
                Download brochure
              </button>
            </BrochureDownload>
            <a href="#contact" className="btn btn-primary btn-sm" data-testid="nav-contact">
              {SITE.mainAction}
            </a>
          </nav>

          <div className="nav-end">
          <a href="#contact" className="btn btn-primary btn-sm nav-cta-mid">
            {SITE.mainAction}
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            data-testid="mobile-menu-btn"
          >
            <Menu size={26} aria-hidden="true" />
          </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className="mobile-menu" data-open={open} data-testid="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
        <div style={{ height: "var(--nav-h)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="wordmark" aria-hidden="true">
            THRIII<small>Events</small>
          </span>
          <button
            ref={closeRef}
            type="button"
            className="nav-burger"
            aria-label="Close menu"
            onClick={() => {
              setOpen(false);
              burgerRef.current?.focus();
            }}
            data-testid="mobile-menu-close"
          >
            <X size={26} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} data-testid={`mobile-nav-${l.href.slice(1)}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ marginTop: "auto", display: "grid", gap: 12 }}>
          <BrochureDownload>
            <button type="button" className="btn btn-ghost" data-testid="mobile-nav-brochure">
              Download brochure
            </button>
          </BrochureDownload>
          <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)} data-testid="mobile-nav-contact">
            {SITE.mainAction}
          </a>
        </div>
      </div>
    </>
  );
}
