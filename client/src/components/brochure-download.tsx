import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface BrochureDownloadProps {
  children?: React.ReactNode;
  className?: string;
}

export function BrochureDownload({ children, className }: BrochureDownloadProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create a hidden form for FormSubmit submission
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/hello@thriiievents.com';
    form.method = 'POST';
    form.style.display = 'none';

    // Add FormSubmit configuration
    const fields = [
      { name: '_subject', value: 'Brochure Download Request - THRIII Events' },
      { name: '_captcha', value: 'false' },
      { name: '_template', value: 'table' },
      { name: '_next', value: window.location.href },
      { name: '_cc', value: 'hello@thriiievents.com' },
      { name: 'Name', value: formData.name },
      { name: 'Email', value: formData.email },
      { name: 'Phone', value: formData.phone },
      { name: 'Request Type', value: 'Brochure Download' }
    ];

    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      form.appendChild(input);
    });

    // Show success message and trigger download
    toast({
      title: 'Brochure Download Started!',
      description: 'Thank you for your interest! Your brochure download will begin shortly.',
    });
    
    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '' });
    setIsOpen(false);

    // Submit the form for email notification
    document.body.appendChild(form);
    form.submit();
    
    // Trigger brochure download (placeholder - you can replace with actual PDF link)
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/brochure.pdf'; // You'll need to add the actual brochure PDF to public folder
      link.download = 'THRIII-Events-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            className={`bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:glow-effect transition-all ${className}`}
          >
            <i className="fas fa-download mr-2"></i>
            Download Brochure
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-semibold text-foreground flex items-center">
            <i className="fas fa-file-download mr-3 text-primary"></i>
            Download Our Brochure
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <p className="text-muted-foreground text-sm">
            Get our comprehensive brochure showcasing our premium event management and lighting design services.
          </p>
          
          <div>
            <Label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground"
              placeholder="john@company.com"
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
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:glow-effect transition-all"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner animate-spin mr-2"></i>
                  Preparing Download...
                </>
              ) : (
                <>
                  <i className="fas fa-download mr-2"></i>
                  Download Now
                </>
              )}
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-lg font-semibold border-border"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}