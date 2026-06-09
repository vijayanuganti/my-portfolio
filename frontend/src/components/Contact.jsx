import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { api } from '../utils/api';
import SectionHeader from './common/SectionHeader';
import ScrollReveal from './common/ScrollReveal';

const Contact = ({ portfolio }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const response = await api.sendContactMessage(formData);
      if (response.success) {
        setSuccess(true);
        toast({
          title: 'Message sent!',
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Failed to send message. Please try again.';
      toast({
        title: error.response?.status === 429 ? 'Rate limit reached' : 'Error',
        description: typeof msg === 'string' ? msg : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const email = portfolio?.email || 'vijayanuganti504@gmail.com';
  const phone = portfolio?.phone || '+91 8341121870';
  const location = portfolio?.location || 'Hyderabad, Telangana';
  const github = portfolio?.github || 'https://github.com/vijayanuganti';
  const linkedin = portfolio?.linkedin || 'https://www.linkedin.com/in/vijju1403';

  const contactInfo = [
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: location, href: null },
  ];

  return (
    <section id="contact" className="py-20 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Let's Build Something Great"
          subtitle="Open to full-time roles and impactful freelance projects"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card key={info.label} className="card-glow p-4 bg-card border-border">
                    <div className="flex items-center gap-4">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-foreground hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" asChild>
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <Card className="card-glow p-6 md:p-8 bg-card border-border">
              <h3 className="font-heading text-2xl font-bold mb-6">Send a Message</h3>
              {success && (
                <p className="text-accent text-sm mb-4">✓ Message delivered successfully.</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    disabled={loading}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    disabled={loading}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    disabled={loading}
                    className="bg-background border-border resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  portfolio: PropTypes.object,
};

export default Contact;
