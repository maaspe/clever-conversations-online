
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How does your AI chat service work?",
    answer: "Our AI chat service leverages advanced natural language processing models to understand and respond to your queries. It processes your input, analyzes context, and generates human-like responses in real-time."
  },
  {
    question: "Is my data secure with your service?",
    answer: "Yes, we take data security very seriously. All conversations are encrypted, and we have strict data handling policies in place. We do not share your data with third parties, and you can request deletion of your data at any time."
  },
  {
    question: "Can I customize the AI's knowledge base?",
    answer: "Absolutely! Our Pro and Enterprise plans allow you to upload custom documents and data sources to make the AI's responses more relevant to your specific needs and industry."
  },
  {
    question: "What languages does your AI support?",
    answer: "Our AI currently supports over 50 languages including English, Spanish, French, German, Japanese, Chinese, Russian, Arabic, and many more. We're constantly adding support for additional languages."
  },
  {
    question: "Can I integrate your AI with my existing applications?",
    answer: "Yes, our Enterprise plan includes API access that allows you to integrate our AI capabilities directly into your applications, websites, or internal systems."
  },
  {
    question: "How accurate are the AI's responses?",
    answer: "Our AI is trained on vast amounts of data and is designed to provide accurate information. However, like all AI systems, it may occasionally make mistakes. We're constantly improving its accuracy through ongoing training and updates."
  }
];

const Faq = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Everything you need to know about our AI chat service
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-4">Still have questions?</p>
          <a 
            href="#contact" 
            className="text-aipurple-600 hover:text-aipurple-700 font-medium underline"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default Faq;
