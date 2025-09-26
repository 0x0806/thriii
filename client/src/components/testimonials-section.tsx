import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
}

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const headerRef = useScrollReveal<HTMLSpanElement>();
  const subtitleRef = useScrollReveal<HTMLHeadingElement>(100);
  const descriptionRef = useScrollReveal<HTMLParagraphElement>(200);
  const carouselRef = useScrollReveal<HTMLDivElement>(300);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: "THRIII Events transformed our annual gala into an absolutely magical experience. The lighting design was breathtaking, and every detail was executed flawlessly. Our guests are still talking about it months later.",
      name: "J. Gomes",
      title: "GM, Pedrollo U.A.E",
      initials: "JG"
    },
    {
      id: '2',
      quote: "Working with THRIII Events on our wedding was the best decision we made. They brought our dream vision to life and created the most romantic, elegant atmosphere. Truly exceptional service.",
      name: "Michael & Rachel",
     
      initials: "MR"
    },
    {
      id: '3',
      quote: "The production quality and attention to detail from THRIII Events is unmatched. They handled our international product launch with such professionalism and creativity. Simply outstanding.",
      name: "V. Sagar",
      title: "Manager, Linden Shipping",
      initials: "VS"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-card" data-testid="testimonials-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span ref={headerRef} className="text-primary font-accent uppercase tracking-wider text-sm font-semibold reveal">
            Testimonials
          </span>
          <h2 
            ref={subtitleRef}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground mt-4 reveal"
            data-testid="testimonials-title"
          >
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p 
            ref={descriptionRef}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 reveal"
            data-testid="testimonials-description"
          >
            Discover why leading brands and celebrities trust THRIII Events with their most important moments.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div ref={carouselRef} className="relative max-w-4xl mx-auto reveal" data-testid="testimonials-carousel">
          <div className="testimonial-carousel relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial-card ${index === currentTestimonial ? 'active' : 'absolute inset-0'} bg-background rounded-3xl p-8 lg:p-12`}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="flex text-primary text-2xl">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
                <blockquote className="text-xl lg:text-2xl text-foreground text-center font-light leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">{testimonial.initials}</span>
                  </div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2" data-testid="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                }`}
                data-testid={`testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
