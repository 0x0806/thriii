import { useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const RATE_LIMIT_DELAY = 30000; // 30 seconds between submissions

  const headerRef = useScrollReveal<HTMLSpanElement>();
  const subtitleRef = useScrollReveal<HTMLHeadingElement>(100);
  const descriptionRef = useScrollReveal<HTMLParagraphElement>(200);
  const formRef = useScrollReveal<HTMLDivElement>(300);
  const infoRef = useScrollReveal<HTMLDivElement>(400);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < RATE_LIMIT_DELAY) {
      const remainingTime = Math.ceil((RATE_LIMIT_DELAY - (currentTime - lastSubmissionTime)) / 1000);
      toast({
        title: 'Please wait',
        description: `Please wait ${remainingTime} seconds before submitting again.`,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Create a hidden form for FormSubmit submission
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/hello@thriiievents.com';
    form.method = 'POST';
    form.style.display = 'none';

    // Add FormSubmit configuration
    const fields = [
      { name: '_subject', value: 'New Contact Form Submission - THRIII Events' },
      { name: '_captcha', value: 'false' },
      { name: '_template', value: 'table' },
      { name: '_next', value: window.location.href },
      { name: '_cc', value: 'hello@thriiievents.com' },
      { name: 'First Name', value: formData.firstName },
      { name: 'Last Name', value: formData.lastName },
      { name: 'Email', value: formData.email },
      { name: 'Phone', value: formData.phone },
      { name: 'Event Type', value: formData.eventType },
      { name: 'Project Details', value: formData.message }
    ];

    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      form.appendChild(input);
    });

    // Set success state before submission
    setLastSubmissionTime(currentTime);
    toast({
      title: 'Message Sent Successfully!',
      description: 'Thank you for your inquiry. We will get back to you within 2 hours during business hours.',
    });
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventType: '',
      message: ''
    });

    // Submit the form (this will cause a redirect, but we've already shown success)
    document.body.appendChild(form);
    form.submit();
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background relative overflow-hidden" data-testid="contact-section">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-particles">
          <div className="particle w-4 h-4 animate-float" style={{ left: '20%', top: '10%', animationDelay: '0s' }}></div>
          <div className="particle w-2 h-2 animate-float" style={{ left: '70%', top: '30%', animationDelay: '2s' }}></div>
          <div className="particle w-3 h-3 animate-float" style={{ left: '40%', top: '70%', animationDelay: '4s' }}></div>
          <div className="particle w-1 h-1 animate-float" style={{ left: '80%', top: '90%', animationDelay: '1s' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span ref={headerRef} className="text-primary font-accent uppercase tracking-wider text-sm font-semibold reveal">
            Get In Touch
          </span>
          <h2 
            ref={subtitleRef}
            className="text-4xl lg:text-6xl font-display font-bold text-foreground mt-4 reveal"
            data-testid="contact-title"
          >
            Let's Create Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p 
            ref={descriptionRef}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 reveal"
            data-testid="contact-description"
          >
            Ready to transform your vision into an unforgettable experience? Contact us today and let's start planning your next event.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div ref={formRef} className="reveal" data-testid="contact-form">
            <form onSubmit={handleSubmit} className="form-glow space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground"
                    placeholder="John"
                    data-testid="input-firstName"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground"
                    placeholder="Doe"
                    data-testid="input-lastName"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground"
                  placeholder="john@company.com"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground"
                  placeholder="+1 (555) 123-4567"
                  data-testid="input-phone"
                />
              </div>
              
              <div>
                <Label htmlFor="eventType" className="block text-sm font-semibold text-foreground mb-2">
                  Event Type
                </Label>
                <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                  <SelectTrigger className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground" data-testid="select-eventType">
                    <SelectValue placeholder="Select Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="concert">Concert/Festival</SelectItem>
                    <SelectItem value="fashion">Fashion Show</SelectItem>
                    <SelectItem value="private">Private Party</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              
              
              <div>
                <Label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Project Details
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground resize-none"
                  placeholder="Tell us about your vision, event date, location, and any specific requirements..."
                  data-testid="textarea-message"
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting || (Date.now() - lastSubmissionTime < RATE_LIMIT_DELAY)}
                className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:glow-effect transition-all animate-glow disabled:opacity-50"
                data-testid="button-submit"
              >
                {isSubmitting ? 'Sending...' : 
                 (Date.now() - lastSubmissionTime < RATE_LIMIT_DELAY) ? 
                 `Wait ${Math.ceil((RATE_LIMIT_DELAY - (Date.now() - lastSubmissionTime)) / 1000)}s` : 
                 'Start Your Project'} 
                {!isSubmitting && (Date.now() - lastSubmissionTime >= RATE_LIMIT_DELAY) && <i className="fas fa-arrow-right ml-2"></i>}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8 reveal" data-testid="contact-info">
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-primary-foreground"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-muted-foreground">+971 50 3321 363</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-primary-foreground"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">hello@thriiievents.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-primary-foreground"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Location</div>
                    <div className="text-muted-foreground">
                     AJMAN FREEZONE, SHEIKH RASHID BIN SAEED AL MAKTOUM STREET, AJMAN, U.A.E
                  </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-6">Follow Us</h3>
              <div className="flex space-x-4" data-testid="social-links">
                <a href="https://www.instagram.com/thriiievents/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/thriii-events-fz-llc-344307386/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.tiktok.com/@thriiievents" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://www.youtube.com/@THRIIIEVENTSFZLLC" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-youtube"></i>
                </a>
                  <a href="https://www.facebook.com/profile.php?id=61581765570460" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://x.com/thriiievents" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-x"></i>
                </a>
                <a href="https://www.threads.com/@thriiievents" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-threads"></i>
                </a>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="font-semibold text-foreground mb-3">Quick Response Guarantee</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We understand that timing is crucial for events. That's why we guarantee a response within 2 hours during business hours and 24 hours on weekends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
