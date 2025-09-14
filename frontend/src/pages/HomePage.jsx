import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, DollarSign, ClipboardList, UserCheck } from 'lucide-react';

// Data ko code se alag kar diya gaya hai, isse content manage karna aasan hai
const features = [
    {
        icon: <DollarSign className="w-12 h-12 text-red-500" />,
        title: "Affordable Price",
        description: "High-quality training services that won't break the bank."
    },
    {
        icon: <Award className="w-12 h-12 text-red-500" />,
        title: "Best Trainers",
        description: "All our trainers are certified, experienced, and understand your goals."
    },
    {
        icon: <ClipboardList className="w-12 h-12 text-red-500" />,
        title: "Personalized Plans",
        description: "We create personalized training plans based on your unique needs and goals."
    }
];

const testimonials = [
    {
        quote: "\"deadPR changed my life! The trainer was amazing and the price was unbelievable. I finally achieved my fitness goals.\"",
        author: "- Babue Dhillon"
    },
    {
        quote: "\"I never thought I could afford a personal trainer. deadPR proved me wrong. It's a fantastic platform for real people.\"",
        author: "- Koyala Gangwar"
    },
    {
        quote: "\"The trainers here are highly professional and supportive. My experience was top-notch from day one.\"",
        author: "- Kha Saab"
    }
];

const HomePage = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 md:py-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">Welcome to dead<span className="text-red-500">PR</span></h1>
          <p className="text-xl md:text-2xl font-light mb-10 opacity-90 max-w-3xl mx-auto">
            Personal training that is affordable and accessible for everyone.
          </p>
          <Button asChild size="lg" className="h-12 px-10 text-lg rounded-full">
            <Link to="/trainers">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Why Choose deadPR?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hum .map() ka istemal karke code ko repeat hone se bacha rahe hain */}
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-100 py-20 md:py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                    <CardContent className="pt-6">
                        <p className="text-lg italic text-gray-700 mb-4">{testimonial.quote}</p>
                        <p className="font-bold text-gray-800 text-right">{testimonial.author}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-slate-900 text-white p-12 md:p-16 rounded-2xl shadow-lg">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Ready to Transform?</h2>
            <p className="text-xl md:text-2xl font-light mb-8">Start your fitness journey today.</p>
            <Button asChild size="lg" className="h-12 px-10 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-200">
              <Link to="/trainers">Find Your Trainer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

