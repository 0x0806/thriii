import { useRef, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "@/components/social-icon";
import { BrochureDownload } from "@/components/brochure-download";
import { SITE, sendLead } from "@/lib/site";

type Status = { kind: "idle" | "sending" } | { kind: "ok" | "error"; text: string };

const RATE_LIMIT_MS = 30_000;

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const lastSent = useRef(0);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const sending = status.kind === "sending";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bots fill the hidden field

    const wait = RATE_LIMIT_MS - (Date.now() - lastSent.current);
    if (wait > 0) {
      setStatus({ kind: "error", text: `Your last request just went through. You can send another in ${Math.ceil(wait / 1000)} seconds.` });
      return;
    }

    setStatus({ kind: "sending" });
    const ok = await sendLead({
      _subject: "New contact form submission - THRIII Events",
      _cc: SITE.email,
      "First name": String(data.get("firstName") ?? ""),
      "Last name": String(data.get("lastName") ?? ""),
      Email: String(data.get("email") ?? ""),
      Phone: String(data.get("phone") ?? ""),
      "Event type": String(data.get("eventType") ?? ""),
      "Project details": String(data.get("message") ?? ""),
    });

    if (ok) {
      lastSent.current = Date.now();
      form.reset();
      setStatus({ kind: "ok", text: "Your project details are in. We reply within 2 hours on business days." });
    } else {
      setStatus({
        kind: "error",
        text: `We could not send your request. Check your connection and try again, or email ${SITE.email}.`,
      });
    }
  }

  return (
    <section id="contact" className="section" data-testid="contact-section" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="max-w-3xl">
          <h2 id="contact-title" className="h-section" data-testid="contact-title">
            Tell us about your event
          </h2>
          <p className="lede mt-5" data-testid="contact-description">
            Send the date, the venue and what you have in mind. We reply within 2 hours on business days and within 24
            hours on weekends.
          </p>
        </div>

        <div className="split mt-10">
          <form ref={formRef} onSubmit={onSubmit} action={`https://formsubmit.co/${SITE.email}`} method="POST" className="grid gap-5" data-testid="contact-form" aria-busy={sending}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input id="firstName" name="firstName" className="control" type="text" required autoComplete="given-name" data-testid="input-firstName" />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" name="lastName" className="control" type="text" required autoComplete="family-name" data-testid="input-lastName" />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" className="control" type="email" required autoComplete="email" data-testid="input-email" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" className="control" type="tel" autoComplete="tel" data-testid="input-phone" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="eventType">Event type</label>
              <select id="eventType" name="eventType" className="control" defaultValue="" required data-testid="select-eventType">
                <option value="" disabled>
                  Choose an event type
                </option>
                <option>Corporate event</option>
                <option>Wedding</option>
                <option>Concert or festival</option>
                <option>Fashion show</option>
                <option>Private party</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                className="control"
                required
                rows={4}
                placeholder="Event date, venue, guest count and any special requirements"
                data-testid="textarea-message"
              />
            </div>
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

            <div>
              <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={sending} data-testid="button-submit">
                {sending ? "Sending…" : SITE.mainAction}
              </button>
            </div>

            <div aria-live="polite" role="status">
              {(status.kind === "ok" || status.kind === "error") && (
                <p className="form-status" data-kind={status.kind}>
                  {status.text}
                </p>
              )}
            </div>
          </form>

          <div data-testid="contact-info">
            <ul className="info-list">
              <li>
                <span>Phone</span>
                <a href={SITE.phoneHref} className="link-draw justify-self-start">
                  <Phone size={16} className="mr-2 inline -translate-y-px" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${SITE.email}`} className="link-draw justify-self-start">
                  <Mail size={16} className="mr-2 inline -translate-y-px" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <span>Studio</span>
                <address className="not-italic">
                  <MapPin size={16} className="mr-2 inline -translate-y-px" aria-hidden="true" />
                  {SITE.address}
                </address>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-6">
              <SocialLinks />
              <div>
                <BrochureDownload>
                  <button type="button" className="btn btn-ghost">
                    Download brochure
                  </button>
                </BrochureDownload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
