
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    price: "$9",
    description: "Perfect for individuals getting started with AI conversations.",
    features: [
      "500 AI messages per month",
      "Standard response time",
      "Basic content generation",
      "Email support",
      "1 user account"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    description: "Ideal for professionals who need more advanced capabilities.",
    features: [
      "3,000 AI messages per month",
      "Priority response time",
      "Advanced content generation",
      "Priority support",
      "5 user accounts",
      "Custom instructions"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced needs and security requirements.",
    features: [
      "Unlimited AI messages",
      "Fastest response time",
      "Premium content generation",
      "24/7 dedicated support",
      "Unlimited user accounts",
      "Custom knowledge integration",
      "Advanced security features",
      "API access"
    ],
    popular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Choose the plan that works best for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl p-6 ${
                plan.popular 
                  ? 'border-2 border-aipurple-500 shadow-lg shadow-aipurple-500/10 relative' 
                  : 'border bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-aipurple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-aipurple-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-aipurple-600 to-aiteal-500 text-white' 
                    : 'border-aipurple-600 border text-aipurple-600 hover:bg-aipurple-50 bg-transparent'
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
