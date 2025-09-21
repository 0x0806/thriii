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
    setIsSubmitting(true);

    try {
      // Create FormData for FormSubmit
      const submitData = new FormData();
      submitData.append('_subject', 'New Contact Form Submission - THRIII Events');
      submitData.append('_captcha', 'true');
      submitData.append('_template', 'table');
      submitData.append('_cc', 'hello@thriiievents.com');
      
      // Add form data with proper field names
      submitData.append('First Name', formData.firstName);
      submitData.append('Last Name', formData.lastName);
      submitData.append('Email', formData.email);
      submitData.append('Phone', formData.phone);
      submitData.append('Event Type', formData.eventType);
      submitData.append('Project Details', formData.message);

      const response = await fetch('https://formsubmit.co/hello@thriiievents.com', {
        method: 'POST',
        body: submitData,
        mode: 'cors'
      });

      // FormSubmit redirects on success, so we check for redirect or ok status
      if (response.ok || response.type === 'opaqueredirect') {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for your interest. We\'ll get back to you within 2 hours during business hours.',
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
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'There was a problem sending your message. Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <Label htmlFor="budget" className="block text-sm font-semibold text-foreground mb-2">
                  Budget Range
                </Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground" data-testid="select-budget">
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
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:glow-effect transition-all animate-glow"
                data-testid="button-submit"
              >
                {isSubmitting ? 'Sending...' : 'Start Your Project'} <i className="fas fa-arrow-right ml-2"></i>
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
                      AJMAN FREEZONE
                      SHEIKH RASHID BIN SAEED AL MAKTOUM STREET
                      AJMAN- UAE
                  </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-6">Follow Us</h3>
              <div className="flex space-x-4" data-testid="social-links">
                <a href="#" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-linkedin"></i>
                </a>
                 <a href="#" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-youtube"></i>
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
