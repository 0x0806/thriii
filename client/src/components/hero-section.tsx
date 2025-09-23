import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { BrochureDownload } from '@/components/brochure-download';

export function HeroSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>(200);
  const subtitleRef = useScrollReveal<HTMLParagraphElement>(400);
  const buttonsRef = useScrollReveal<HTMLDivElement>(600);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroElements = document.querySelectorAll('.parallax-layer');
      
      heroElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        (element as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="parallax-container" data-testid="hero-section">
      {/* Cinematic background with motion effects */}
      <div className="parallax-layer hero-bg">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4
          }}
        />
      </div>
      
      {/* Floating particles animation */}
      <div className="floating-particles">
        <div className="particle w-2 h-2 animate-float" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
        <div className="particle w-1 h-1 animate-float" style={{ left: '80%', top: '60%', animationDelay: '2s' }}></div>
        <div className="particle w-3 h-3 animate-float" style={{ left: '60%', top: '30%', animationDelay: '4s' }}></div>
        <div className="particle w-1 h-1 animate-float" style={{ left: '30%', top: '80%', animationDelay: '1s' }}></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 reveal"
              data-testid="hero-title"
            >
              <span className="block text-gradient">CRAFTING</span>
              <span className="block text-foreground">JOYFUL</span>
              <span className="block text-gradient">MOMENTS</span>
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 reveal"
              data-testid="hero-subtitle"
            >
              Transform your vision into unforgettable experiences with our world-class event management and lighting solutions. Where innovation meets elegance.
            </p>
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal"
              data-testid="hero-buttons"
            >
              <Button 
                onClick={() => scrollToSection('portfolio')}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:glow-effect transition-all"
                data-testid="button-view-work"
              >
                View Our Work
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all"
                data-testid="button-start-project"
              >
                Start Your Project
              </Button>
              <BrochureDownload>
                <Button 
                  variant="outline"
                  className="border border-secondary text-secondary px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary hover:text-secondary-foreground transition-all"
                  data-testid="button-download-brochure"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Brochure
                </Button>
              </BrochureDownload>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary animate-bounce" data-testid="scroll-indicator">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </section>
  );
}
