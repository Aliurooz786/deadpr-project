import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="container mx-auto px-6 py-12">
                {/* Upar wala hissa ab multi-column hai */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand ki Jaankari */}
                    <div className="md:col-span-1">
                        <Link to="/" className="text-2xl font-bold text-white">
                            dead<span className="text-red-600">PR</span>
                        </Link>
                        <p className="mt-2 text-sm text-slate-400 max-w-xs">
                            Your journey to fitness starts here. Affordable and accessible personal training for everyone.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2 flex justify-end">
                        <div>
                            <h3 className="font-semibold text-white tracking-wider uppercase">Navigate</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link to="/trainers" className="hover:text-white">Find a Trainer</Link></li>
                                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Neeche wala hissa (Center Aligned) */}
                <div className="mt-12 border-t border-slate-700 pt-8 text-center">
                    <div className="flex justify-center space-x-6 mb-4">
                        <a href="https://www.instagram.com/deadprfitness?igsh=MTV3Y3F5cHFtYWkwdw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Instagram size={20} /></a>
                        <a href="https://linkedin.com/in/deadpr-fitness-981186381" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Linkedin size={20} /></a>
                        <a href="https://x.com/deadprFitness" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Twitter size={20} /></a>
                    </div>
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} deadPR. All Rights Reserved. Built with ❤️ by Urooz Ali.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

