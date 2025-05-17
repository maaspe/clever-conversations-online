
import React from 'react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 md:py-16 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-aipurple-600 to-aiteal-400"></div>
              <span className="text-xl font-bold">AiChat</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Transforming the way businesses and individuals interact with AI through intuitive conversations.
            </p>
            <div className="flex gap-4">
              {/* Social icons */}
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="p-2 rounded-full bg-background hover:bg-muted-foreground/10"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-5 w-5 bg-foreground/70 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">API</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Integrations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Press</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">GDPR</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AiChat. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <Button variant="ghost" className="text-xs h-8">Change Language</Button>
            <Button variant="ghost" className="text-xs h-8">Accessibility</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
