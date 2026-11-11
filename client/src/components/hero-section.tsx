import { photos } from "@/lib/photos";
import { SITE } from "@/lib/site";

export function HeroSection() {
  const p = photos.hero;
  return (
    <section id="home" className="hero" data-enter data-testid="hero-section">
      <div className="hero-photo">
        <img
          src={p.large}
          width={1280}
          height={851}
          alt={p.alt}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="wrap hero-body">
        <div className="hero-copy">
          <h1 className="h-display" data-testid="hero-title">
            Event management and lighting design in Ajman
          </h1>
          <p className="hero-sub" data-testid="hero-subtitle">
            We plan the event, build the set and light the room for weddings, corporate launches and concerts, with one
            team from first call to final cue.
          </p>
          <div className="hero-actions" data-testid="hero-buttons">
            <a href="#contact" className="btn btn-primary" data-testid="button-start-project">
              {SITE.mainAction}
            </a>
            <a href="#portfolio" className="btn btn-ghost" data-testid="button-view-work">
              See our work
            </a>
          </div>
          <p className="hero-fact">
            <strong>500+ events</strong> for 50+ clients, planned by a team with 15+ years of experience.
          </p>
        </div>
      </div>
    </section>
  );
}
