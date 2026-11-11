import { photos } from "@/lib/photos";

const SERVICES = [
  {
    title: "Lighting design",
    description:
      "Mood lighting for the room and LED installations that follow the music and the movement on the floor.",
  },
  {
    title: "Event management",
    description: "Planning and coordination from venue and vendors to the run of show, with every detail owned.",
  },
  {
    title: "Themed decorations",
    description: "Custom installations and themed environments, styled around your concept and the venue.",
  },
  {
    title: "Creative design",
    description: "Concept and creative direction that turn a brief into a set, a palette and a look.",
  },
  {
    title: "Seasonal festivals",
    description: "Planning, décor and lighting for seasonal and public festivals, from first concept to final cue.",
  },
  {
    title: "Weddings",
    description: "Bespoke wedding planning and design, from intimate ceremonies to large celebrations.",
  },
];

export function ServicesSection() {
  const p = photos.lighting;
  return (
    <section id="services" className="section" style={{ background: "var(--card)" }} data-testid="services-section" aria-labelledby="services-title">
      <div className="wrap">
        <div className="split">
          <div>
            <h2 id="services-title" className="h-section mb-8" data-testid="services-title">
              Event services, start to finish
            </h2>
            <ul className="service-list" data-testid="services-grid">
              {SERVICES.map((s) => (
                <li key={s.title} data-testid={`service-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <h3 className="h-sub">{s.title}</h3>
                  <p>{s.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="services-photo">
            <div className="frame">
              <img
                src={p.large}
                width={1280}
                height={853}
                alt={p.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
