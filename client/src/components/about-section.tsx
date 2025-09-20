import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface CounterProps {
  target: number;
  label: string;
}

function Counter({ target, label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (isIntersecting) {
      const increment = target / 100;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(current));
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [isIntersecting, target]);

  return (
    <div ref={ref} className="text-center" data-testid={`counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="counter text-4xl lg:text-5xl font-bold text-primary">{count}</div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}

export function AboutSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const contentRef1 = useScrollReveal<HTMLParagraphElement>(200);
  const contentRef2 = useScrollReveal<HTMLParagraphElement>(300);
  const countersRef = useScrollReveal<HTMLDivElement>(400);
  const imageRef = useScrollReveal<HTMLDivElement>(500);

  return (
    <section id="about" className="py-20 lg:py-32 bg-background" data-testid="about-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div ref={headerRef} className="reveal">
              <span className="text-primary font-accent uppercase tracking-wider text-sm font-semibold">About THRIII Events</span>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-foreground mt-4" data-testid="about-title">
                Crafting <span className="text-gradient">Extraordinary</span> Experiences
              </h2>
            </div>
            <p 
              ref={contentRef1}
              className="text-lg text-muted-foreground leading-relaxed reveal"
              data-testid="about-paragraph-1"
            >
              For over a decade, THRIII Events has been at the forefront of luxury event management and innovative lighting design. We transform spaces into immersive experiences that captivate, inspire, and leave lasting impressions.
            </p>
            <p 
              ref={contentRef2}
              className="text-lg text-muted-foreground leading-relaxed reveal"
              data-testid="about-paragraph-2"
            >
              Our team of visionary designers and technical experts work with the world's most prestigious brands, celebrities, and organizations to create events that transcend expectations and set new standards for excellence.
            </p>
            
            {/* Animated Counters */}
            <div ref={countersRef} className="grid grid-cols-3 gap-8 pt-8 reveal" data-testid="about-counters">
              <Counter target={500} label="Events Created" />
              <Counter target={50} label="Countries Served" />
              <Counter target={15} label="Years Experience" />
            </div>
          </div>
          
          {/* Image */}
          <div ref={imageRef} className="reveal" data-testid="about-image">
            <img 
              src="https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional event lighting setup" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
