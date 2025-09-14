import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingTiers = [
    {
        name: "Starter Plan",
        price: "1500",
        description: "Perfect for beginners to kickstart their fitness journey.",
        features: [
            "1 Month Custom Plan",
            "Weekly Check-ins",
            "Email Support"
        ],
        cta: "Choose Plan"
    },
    {
        name: "Pro Plan",
        price: "2500",
        description: "Ideal for those looking to break plateaus and achieve specific goals.",
        features: [
            "1 Month Custom Plan",
            "Bi-Weekly Video Calls",
            "Priority WhatsApp Support",
            "Dietary Guidance"
        ],
        cta: "Choose Plan"
    },
    {
        name: "Ultimate Plan",
        price: "4000",
        description: "The complete package for a total body and lifestyle transformation.",
        features: [
            "3 Month Custom Plan",
            "Weekly Video Calls",
            "24/7 WhatsApp Support",
            "Full Nutrition Plan"
        ],
        cta: "Choose Plan"
    }
];

const PricingPage = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Simple, Transparent Pricing</h1>
                <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
                    Choose a plan that fits your goals. All packages are fulfilled by our certified professional trainers.
                </p>
            </div>

            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingTiers.map((tier) => (
                            <Card key={tier.name} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-semibold">{tier.name}</CardTitle>
                                    <p className="text-4xl font-bold my-4">₹{tier.price}<span className="text-lg font-normal text-slate-500">/month</span></p>
                                    <CardDescription>{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-center">
                                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                                <span className="text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                                        <Link to="/trainers">{tier.cta}</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
