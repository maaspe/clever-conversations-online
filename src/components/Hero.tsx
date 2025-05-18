
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ChatDemo from './ChatDemo';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
                <span className="inline-block mb-2">Next-Gen AI Conversations</span>
                <span className="gradient-text">Powered by Intelligence</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6">
                Engage with our advanced AI assistant to get instant answers, generate creative content, and solve complex problems - all with natural, human-like conversation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-aipurple-600 to-aiteal-500 text-white px-8 py-6 text-lg" asChild>
                <Link to="/chat">Try for Free</Link>
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg" asChild>
                <Link to="/chat">View Demo</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full bg-aipurple-${(i + 3) * 100} border-2 border-white`}></div>
                ))}
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium">5,000+</span> businesses trust our AI solutions
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-float">
            <ChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
