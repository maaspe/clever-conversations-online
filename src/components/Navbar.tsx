
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-aipurple-600 to-aiteal-400"></div>
          <span className="text-xl font-bold">AiChat</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-aipurple-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium hover:text-aipurple-600 transition-colors">Pricing</a>
          <a href="#faq" className="text-sm font-medium hover:text-aipurple-600 transition-colors">FAQ</a>
          <a href="#contact" className="text-sm font-medium hover:text-aipurple-600 transition-colors">Contact</a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-sm font-medium">Log in</Button>
          <Button className="bg-gradient-to-r from-aipurple-600 to-aiteal-500 text-white">Get Started</Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4 bg-background border-b">
          <div className="flex flex-col gap-4">
            <a href="#features" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#pricing" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Pricing</a>
            <a href="#faq" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>FAQ</a>
            <a href="#contact" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>Contact</a>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="ghost" className="justify-center">Log in</Button>
              <Button className="bg-gradient-to-r from-aipurple-600 to-aiteal-500 text-white justify-center">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
