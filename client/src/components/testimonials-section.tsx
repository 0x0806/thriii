interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "THRIII Events transformed our annual gala into an absolutely magical experience. The lighting design was breathtaking, and every detail was executed flawlessly. Our guests are still talking about it months later.",
    name: "J. Gomes",
    role: "GM, Pedrollo U.A.E",
  },
  {
    id: "2",
    quote:
      "Working with THRIII Events on our wedding was the best decision we made. They brought our dream vision to life and created the most romantic, elegant atmosphere. Truly exceptional service.",
    name: "Michael & Rachel",
    role: "Wedding clients",
  },
  {
    id: "3",
    quote:
      "The production quality and attention to detail from THRIII Events is unmatched. They handled our international product launch with such professionalism and creativity. Simply outstanding.",
    name: "V. Sagar",
    role: "Manager, Linden Shipping",
  },
];

export function TestimonialsSection() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <section id="testimonials" className="section" style={{ background: "var(--card)" }} data-testid="testimonials-section" aria-labelledby="testimonials-title">
      <div className="wrap">
        <h2 id="testimonials-title" className="h-section" data-testid="testimonials-title">
          What clients say about us
        </h2>

        <div className="split mt-12" data-testid="testimonials-carousel">
          <figure className="quote-lead m-0" data-testid={`testimonial-${lead.id}`}>
            <blockquote>“{lead.quote}”</blockquote>
            <figcaption className="mt-8">
              <b>{lead.name}</b>
              {lead.role && <>, {lead.role}</>}
            </figcaption>
          </figure>

          <div className="quote-side">
            {rest.map((t) => (
              <figure key={t.id} data-testid={`testimonial-${t.id}`}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  {t.role && <>, {t.role}</>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
