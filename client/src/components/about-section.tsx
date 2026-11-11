import { useEffect, useRef } from "react";

const STATEMENT = "One team plans the event, designs the lighting and runs the night.";
const GOLD = new Set(["lighting"]);

/** The page's one scroll moment: each word lights up as it passes the middle of the screen. */
function useWordLight(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>(".w"));
    const lightAll = () => words.forEach((w) => (w.dataset.lit = "true"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lightAll();
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.62;
      words.forEach((w) => {
        w.dataset.lit = w.getBoundingClientRect().top < line ? "true" : "false";
      });
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}

export function AboutSection() {
  const ref = useRef<HTMLHeadingElement>(null);
  useWordLight(ref);

  return (
    <section id="about" className="section" data-moment="word-highlight" data-testid="about-section" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title" ref={ref} className="statement" data-testid="about-title" aria-label={STATEMENT}>
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} aria-hidden="true">
              <span className="w" data-gold={GOLD.has(word.replace(/\W/g, ""))} data-lit="false">
                {word}
              </span>{" "}
            </span>
          ))}
        </h2>

        <div className="split mt-12 lg:mt-16">
          <div className="prose-tight">
            <p data-testid="about-paragraph-1">
              THRIII Events is an event management company in Ajman Freezone. We design lighting and build bespoke
              setups for weddings, corporate events and private celebrations, and we handle the planning and décor that
              go with them.
            </p>
            <p data-testid="about-paragraph-2">
              Our designers and technical crew work on the same plan, so the lighting, the stage and the schedule are
              made together, not handed over at the door.
            </p>
          </div>
          <dl className="fact-line" data-testid="about-counters">
            <div>
              <dt className="sr-only">Events delivered</dt>
              <dd>
                <strong>500+</strong>events
              </dd>
            </div>
            <div>
              <dt className="sr-only">Clients</dt>
              <dd>
                <strong>50+</strong>clients
              </dd>
            </div>
            <div>
              <dt className="sr-only">Experience</dt>
              <dd>
                <strong>15+</strong>years of experience
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
