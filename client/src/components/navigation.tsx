import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BrochureDownload } from '@/components/brochure-download';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'nav-blur bg-background/90' : 'bg-transparent'
        }`}
        data-testid="main-navigation"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2" data-testid="logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt text-primary-foreground text-xl"></i>
              </div>
              <span className="text-2xl font-accent font-semibold text-gradient">THRIII</span>
              <span className="text-sm text-muted-foreground font-body uppercase tracking-wider">EVENTS</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8" data-testid="desktop-menu">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-testimonials"
              >
                Testimonials
              </button>
              <BrochureDownload>
                <Button 
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full hover:glow-effect transition-all font-semibold text-sm"
                  data-testid="nav-brochure"
                >
                  <i className="fas fa-download mr-1"></i>
                  Brochure
                </Button>
              </BrochureDownload>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:glow-effect transition-all font-semibold"
                data-testid="nav-contact"
              >
                Contact
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-foreground hover:text-primary transition-colors"
              data-testid="mobile-menu-btn"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu fixed top-0 right-0 w-80 h-full bg-card nav-blur lg:hidden z-40 ${
          isMobileMenuOpen ? 'active' : ''
        }`}
        data-testid="mobile-menu"
      >
        <div className="p-8">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-foreground hover:text-primary"
            data-testid="mobile-menu-close"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
          <div className="mt-16 space-y-6">
            <button 
              onClick={() => scrollToSection('home')} 
              className="block text-xl text-foreground hover:text-primary transition-colors font-medium w-full text-left"
              data-testid="mobile-nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block text-xl text-foreground hover:text-primary transition-colors font-medium w-full text-left"
              data-testid="mobile-nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block text-xl text-foreground hover:text-primary transition-colors font-medium w-full text-left"
              data-testid="mobile-nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="block text-xl text-foreground hover:text-primary transition-colors font-medium w-full text-left"
              data-testid="mobile-nav-portfolio"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="block text-xl text-foreground hover:text-primary transition-colors font-medium w-full text-left"
              data-testid="mobile-nav-testimonials"
            >
              Testimonials
            </button>
            <BrochureDownload>
              <Button 
                className="block bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-center font-semibold mt-6 w-full"
                data-testid="mobile-nav-brochure"
              >
                <i className="fas fa-download mr-2"></i>
                Download Brochure
              </Button>
            </BrochureDownload>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="block bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-semibold mt-8 w-full"
              data-testid="mobile-nav-contact"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          data-testid="mobile-menu-overlay"
        />
      )}
    </>
  );
}
