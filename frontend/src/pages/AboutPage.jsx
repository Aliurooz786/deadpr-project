import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">About deadPR</h1>
                <p className="text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
                    Our mission is to make high-quality personal training accessible and affordable for everyone.
                </p>
            </div>
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-lg text-slate-700 leading-relaxed">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Our Story</h2>
                        <p className="mb-6">
                            deadPR was born from a simple observation: countless dedicated individuals go to the gym every day, full of ambition, but lack the expert guidance needed to truly transform. Professional personal training is often seen as a luxury, priced out of reach for many. We decided to change that.
                        </p>
                        <p className="mb-6">
                            We believe that expert fitness knowledge should not be a privilege. Our platform connects you with a curated network of certified, experienced, and passionate trainers who are committed to helping you achieve your goals, whatever they may be. From powerlifting and bodybuilding to fat loss and functional fitness, we have a specialist for you.
                        </p>
                        <p className="font-semibold text-slate-900">
                            We are not just a service; we are a community dedicated to empowering your fitness journey. Welcome to the future of personal training. Welcome to deadPR.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

