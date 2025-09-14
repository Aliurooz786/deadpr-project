import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link to="/" className="text-2xl font-bold text-white">
                            dead<span className="text-red-600">PR</span>
                        </Link>
                        <p className="text-sm mt-1">Your journey to fitness starts here.</p>
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link to="/about" className="hover:text-white">About Us</Link>
                        <Link to="/contact" className="hover:text-white">Contact</Link>
                        <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-slate-500">&copy; {new Date().getFullYear()} deadPR. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-white"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

