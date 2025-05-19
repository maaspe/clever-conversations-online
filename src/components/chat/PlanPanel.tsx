
import React from 'react';
import { User } from './types';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BadgeCheck, Star, Crown, Building, CreditCard } from 'lucide-react';

interface PlanPanelProps {
  user: User | null;
}

const planInfo = {
  free: {
    name: "Free Plan",
    icon: BadgeCheck,
    color: "text-gray-500",
    features: ["3 free messages per day", "Basic chat features", "Standard support"]
  },
  basic: {
    name: "Basic Plan",
    icon: Star,
    color: "text-blue-500",
    features: ["Unlimited messages", "Priority support", "Chat history"]
  },
  premium: {
    name: "Premium Plan",
    icon: Crown,
    color: "text-amber-500",
    features: ["Advanced features", "Faster response times", "Custom chat settings", "Priority support"]
  },
  enterprise: {
    name: "Enterprise Plan",
    icon: Building,
    color: "text-purple-500",
    features: ["Custom solutions", "Dedicated account manager", "SLA guarantees", "Advanced security features"]
  }
};

const PlanPanel = ({ user }: PlanPanelProps) => {
  const currentPlan = user?.plan?.type || 'free';
  const PlanIcon = planInfo[currentPlan].icon;
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute bottom-4 left-4 rounded-full">
          <CreditCard className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[340px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Your Subscription</SheetTitle>
          <SheetDescription>
            View and manage your subscription plan
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-muted ${planInfo[currentPlan].color}`}>
                <PlanIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{planInfo[currentPlan].name}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === 'free' ? 'Free forever' : 'Active subscription'}
                </p>
              </div>
            </div>
            
            {currentPlan === 'free' && (
              <Button size="sm" className="bg-gradient-to-r from-aipurple-600 to-aiteal-400 hover:opacity-90">
                Upgrade
              </Button>
            )}
          </div>
          
          <h4 className="font-medium mb-2">Plan features:</h4>
          <ul className="space-y-2 mb-6">
            {planInfo[currentPlan].features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <BadgeCheck className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
          
          {currentPlan !== 'free' && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Billing information</h4>
              <p className="text-sm text-muted-foreground mb-1">Next billing date: June 15, 2025</p>
              <p className="text-sm text-muted-foreground">Payment method: •••• 4242</p>
              <div className="mt-3">
                <Button variant="outline" size="sm">Manage billing</Button>
              </div>
            </div>
          )}
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          {currentPlan !== 'free' && (
            <Button variant="ghost" className="text-destructive hover:text-destructive">
              Cancel subscription
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PlanPanel;
