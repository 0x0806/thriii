import { useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Button } from '@/components/ui/button';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
}

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

function Lightbox({ isOpen, imageSrc, imageAlt, onClose }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={`lightbox ${isOpen ? 'active' : ''}`}
      onClick={onClose}
      data-testid="portfolio-lightbox"
    >
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="max-w-full max-h-full rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-primary"
          data-testid="lightbox-close"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  
  const headerRef = useScrollReveal<HTMLSpanElement>();
  const subtitleRef = useScrollReveal<HTMLHeadingElement>(100);
  const descriptionRef = useScrollReveal<HTMLParagraphElement>(200);
  const filtersRef = useScrollReveal<HTMLDivElement>(300);

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      category: 'corporate',
      title: 'Corporate Gala',
      subtitle: 'Fortune 500 Company',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    },
    {
      id: '2',
      category: 'wedding',
      title: 'Luxury Wedding',
      subtitle: 'Celebrity Couple',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    },
    {
      id: '3',
      category: 'concert',
      title: 'Music Festival',
      subtitle: 'International Artist',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    },
    {
      id: '4',
      category: 'fashion',
      title: 'Fashion Week',
      subtitle: 'Paris Collection',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    },
    {
      id: '5',
      category: 'corporate',
      title: 'Product Launch',
      subtitle: 'Tech Innovation',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    },
    {
      id: '6',
      category: 'wedding',
      title: 'Garden Wedding',
      subtitle: 'Vineyard Celebration',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'concert', label: 'Concerts' },
    { key: 'fashion', label: 'Fashion' },
  ];

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-background" data-testid="portfolio-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span ref={headerRef} className="text-primary font-accent uppercase tracking-wider text-sm font-semibold reveal">
            Our Portfolio
          </span>
          <h2 
            ref={subtitleRef}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground mt-4 reveal"
            data-testid="portfolio-title"
          >
            Showcase of <span className="text-gradient">Excellence</span>
          </h2>
          <p 
            ref={descriptionRef}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 reveal"
            data-testid="portfolio-description"
          >
            Explore our portfolio of world-class events that have set new standards in the industry.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-4 mb-12 reveal" data-testid="portfolio-filters">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeFilter === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
              data-testid={`filter-${filter.key}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="portfolio-grid">
          {filteredItems.map((item, index) => {
            const itemRef = useScrollReveal<HTMLDivElement>(400 + (index * 100));
            
            return (
              <div 
                key={item.id}
                ref={itemRef}
                className="gallery-item reveal stagger cursor-pointer"
                onClick={() => setLightboxImage({ src: item.image, alt: item.title })}
                data-testid={`portfolio-item-${item.id}`}
              >
                <div className="relative group overflow-hidden rounded-2xl">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.subtitle}</p>
                      <i className="fas fa-expand text-2xl mt-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage?.src || ''}
        imageAlt={lightboxImage?.alt || ''}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  );
}
