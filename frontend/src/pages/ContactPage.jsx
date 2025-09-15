import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="bg-slate-50 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Get In Touch</h1>
                    <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">We'd love to hear from you. Here's how you can reach us for any inquiries, partnerships, or support.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
                                <Mail className="h-8 w-8 text-red-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                            <p className="text-slate-600 mb-4">For general questions, support, or partnerships.</p>
                            <a href="mailto:contact@deadpr.com" className="text-red-600 font-semibold hover:underline">
                                Work.deadprfitness@gmail.com
                            </a>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                             <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
                                <Phone className="h-8 w-8 text-red-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">WhatsApp Us</h3>
                            <p className="text-slate-600 mb-4">For a faster response, connect with us on WhatsApp.</p>
                            <a href="https://wa.me/7376604335" target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline">
                                +91 7376604335 
                            </a>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                             <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
                                <MapPin className="h-8 w-8 text-red-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                            <p className="text-slate-600 mb-4">Visit us at our Office for a coffee.</p>
                            <p className="text-red-600 font-semibold">
                                Dolphin Enclave Lucknow, Uttar Pradesh, India
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

