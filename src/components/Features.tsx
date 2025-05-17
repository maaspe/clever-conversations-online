
import React from 'react';
import { MessageCircle, Lightbulb, Shield, Zap, Globe, Database } from "lucide-react";

const featuresData = [
  {
    icon: <MessageCircle className="h-8 w-8 text-aipurple-500" />,
    title: "Natural Conversations",
    description: "Engage in fluid, context-aware conversations that feel remarkably human-like."
  },
  {
    icon: <Zap className="h-8 w-8 text-aipurple-500" />,
    title: "Lightning Fast Responses",
    description: "Get instant answers and solutions with our high-performance AI processing."
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-aipurple-500" />,
    title: "Creative Content Generation",
    description: "Generate articles, stories, code, and more with just a simple prompt."
  },
  {
    icon: <Shield className="h-8 w-8 text-aipurple-500" />,
    title: "Enterprise-Grade Security",
    description: "Your conversations and data are protected with state-of-the-art encryption."
  },
  {
    icon: <Globe className="h-8 w-8 text-aipurple-500" />,
    title: "Multilingual Support",
    description: "Communicate in over 50 languages with seamless translation capabilities."
  },
  {
    icon: <Database className="h-8 w-8 text-aipurple-500" />,
    title: "Knowledge Integration",
    description: "Connect to your data sources for personalized and relevant responses."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-white to-aipurple-50 dark:from-gray-950 dark:to-aipurple-950/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold">Powerful AI Capabilities</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Discover what makes our conversational AI platform stand out
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl border bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 rounded-full bg-aipurple-100 dark:bg-aipurple-900/30 inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
