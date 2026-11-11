import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SocialLinks } from "@/components/social-icon";
import { SITE } from "@/lib/site";

const CREDITS = [
  {
    work: "Drummer performing on stage during a live music concert",
    by: "Shixart1985",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0",
    page: "https://commons.wikimedia.org/wiki/File:Drummer_performing_on_stage_during_a_live_music_concert_at_night_with_dynamic_lighting_effects.jpg",
  },
  {
    work: "Musician performs on stage during a lively concert",
    by: "Shixart1985",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0",
    page: "https://commons.wikimedia.org/wiki/File:Musician_performs_on_stage_during_a_lively_concert_with_dramatic_lighting_at_night.jpg",
  },
  {
    work: "Recording a concert",
    by: "veeterzy",
    licence: "CC0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    page: "https://commons.wikimedia.org/wiki/File:Recording_a_concert_(Unsplash).jpg",
  },
];

export function Footer() {
  return (
    <footer id="site-footer" className="site-footer" data-testid="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div data-testid="footer-logo">
            <a href="#home" className="wordmark" aria-label="THRIII Events, back to the top">
              THRIII<small>Events</small>
            </a>
            <p className="mt-4 max-w-[38ch] font-display text-xl text-foreground">Crafting Joyful Moments</p>
            <p className="mt-3 max-w-[40ch] text-sm text-muted-foreground">{SITE.address}</p>
          </div>

          <div>
            <p className="footer-title">Explore</p>
            <ul>
              <li><a href="#about" className="link-draw" data-testid="footer-about">About</a></li>
              <li><a href="#services" className="link-draw">Services</a></li>
              <li><a href="#portfolio" className="link-draw" data-testid="footer-portfolio">Portfolio</a></li>
              <li><a href="#testimonials" className="link-draw" data-testid="footer-testimonials">Testimonials</a></li>
              <li><a href="#contact" className="link-draw" data-testid="footer-contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-title">Follow</p>
            <SocialLinks />
          </div>
        </div>

        <div className="footer-base">
          <span data-testid="footer-copyright">© {new Date().getFullYear()} THRIII Events FZ LLC</span>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="link-draw cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-[inherit]">
                Photographs via Unsplash and Wikimedia Commons
              </button>
            </DialogTrigger>
            <DialogContent className="border-border bg-background sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-normal">Photograph credits</DialogTitle>
                <DialogDescription>
                  Stand-in photographs, to be replaced with the studio's own event photography.
                </DialogDescription>
              </DialogHeader>
              <ul className="grid gap-4 text-sm">
                {CREDITS.map((c) => (
                  <li key={c.page}>
                    <a href={c.page} target="_blank" rel="noopener noreferrer" className="link-draw text-foreground">
                      {c.work}
                    </a>
                    <span className="block text-muted-foreground">
                      {c.by},{" "}
                      <a href={c.licenceUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
                        {c.licence}
                      </a>
                    </span>
                  </li>
                ))}
                <li className="text-muted-foreground">Other photographs from Unsplash, used under the Unsplash licence.</li>
              </ul>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}
