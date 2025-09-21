import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

function ServiceCard({ icon, title, description, delay }: ServiceCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>(delay);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={cardRef}
      className="card-3d bg-background rounded-2xl p-8 hover:bg-gradient-to-br hover:from-background hover:to-card border border-border reveal stagger"
      data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 glow-effect">
        <i className={`${icon} text-primary-foreground text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>
      <button
        onClick={scrollToContact}
        className="text-primary font-semibold hover:text-secondary transition-colors"
        data-testid={`learn-more-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        Learn More <i className="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  );
}

export function ServicesSection() {
  const headerRef = useScrollReveal<HTMLSpanElement>();
  const subtitleRef = useScrollReveal<HTMLHeadingElement>(100);
  const descriptionRef = useScrollReveal<HTMLParagraphElement>(200);

  const services = [
    {
      icon: "fas fa-lightbulb",
      title: "Lighting Design",
      description:
        "Transform any space with our cutting-edge lighting solutions. From ambient mood lighting to dynamic LED installations that respond to music and movement.",
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Event Management",
      description:
        "Complete event planning and coordination services. We handle every detail from venue selection to vendor management, ensuring flawless execution.",
    },
    {
      icon: "fas fa-video",
      title: "Themed Decorations",
      description:
        "State-of-the-art audio-visual production services including live streaming, projection mapping, and immersive sound systems.",
    },
    {
      icon: "fas fa-palette",
      title: "Creative Design",
      description:
        "Conceptual design and creative direction that brings your vision to life. Custom installations, themed environments, and artistic elements.",
    },
    {
      icon: "fas fa-building",
      title: "Seasonal Festivals",
      description:
        "Professional corporate event solutions including conferences, product launches, galas, and team building experiences.",
    },
    {
      icon: "fas fa-heart",
      title: "Weddings",
      description:
        "Bespoke wedding planning and design services that create magical moments. From intimate ceremonies to grand celebrations.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-card"
      data-testid="services-section"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span
            ref={headerRef}
            className="text-primary font-accent uppercase tracking-wider text-sm font-semibold reveal"
          >
            Our Services
          </span>
          <h2
            ref={subtitleRef}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground mt-4 reveal"
            data-testid="services-title"
          >
            Comprehensive <span className="text-gradient">Event Solutions</span>
          </h2>
          <p
            ref={descriptionRef}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 reveal"
            data-testid="services-description"
          >
            From concept to execution, we provide end-to-end event management
            services that exceed expectations and create unforgettable moments.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-testid="services-grid"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={300 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
