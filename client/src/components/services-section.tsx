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
        "Professional lighting design services in Dubai and UAE featuring cutting-edge LED technology, architectural lighting, and dynamic mood lighting. Our expert lighting designers create stunning visual experiences for corporate events, weddings, and luxury celebrations with intelligent lighting systems that synchronize with music and movement.",
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Event Management",
      description:
        "Full-service event management company in UAE providing end-to-end event planning, coordination, and execution services. From venue selection and vendor management to timeline coordination and day-of logistics, we ensure flawless luxury events, corporate conferences, and private celebrations across Dubai, Abu Dhabi, and the Middle East.",
    },
    {
      icon: "fas fa-video",
      title: "Themed Decorations",
      description:
        "Premium themed decoration and audio-visual production services featuring projection mapping, live streaming, immersive sound systems, and custom stage design. We create spectacular themed environments for galas, product launches, fashion shows, and brand activations with state-of-the-art AV technology and creative staging solutions.",
    },
    {
      icon: "fas fa-palette",
      title: "Creative Design",
      description:
        "Award-winning creative design and artistic direction services for luxury events in Dubai. Our team specializes in conceptual event design, custom installations, branded environments, and artistic elements that transform venues into extraordinary experiential spaces. From concept visualization to 3D design and execution.",
    },
    {
      icon: "fas fa-building",
      title: "Seasonal Festivals",
      description:
        "Comprehensive seasonal festival and large-scale event production services including music festivals, cultural celebrations, holiday events, and outdoor festivals in UAE. We provide complete festival management from logistics and security to entertainment booking, vendor coordination, and crowd management for unforgettable seasonal experiences.",
    },
    {
      icon: "fas fa-heart",
      title: "Weddings",
      description:
        "Luxury wedding planning and design services in Dubai offering bespoke wedding coordination, destination wedding management, and personalized celebration design. From intimate beachfront ceremonies to grand ballroom receptions, we create magical wedding experiences with custom décor, floral design, and complete wedding day coordination.",
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
