import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-gray-800 text-white py-24 md:py-40 rounded-b-3xl shadow-2xl overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M11 0L0 11l11 9.92V0zm5.24 4.5L20 9.26V0l-3.76 4.5zM20 12.39L12.39 20H20v-7.61zM0 16.32l3.68 3.68H0v-3.68z'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in-down">Welcome to deadPR</h1>
          <p className="text-xl md:text-2xl font-light mb-10 opacity-90 animate-fade-in-down delay-200">
            Personal training that is affordable and accessible for everyone.
          </p>
          <a href="#" className="bg-white text-cyan-400 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
            Get Started
          </a>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10">
              Our Story: Grounded in Community
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
              <p className="mb-6">
                Everyone deserves a healthy lifestyle and the benefits of good fitness. However, we know that many people struggle to find a good, affordable personal trainer at their local gym. Often, the prices are too high, or the quality of training simply isn't what it should be.
              </p>
              <p className="mb-6">
                That's where we come in. deadPR was created for those who deserve high-quality personal training but can't find it in their immediate area. Our mission is to democratize fitness, making it accessible to everyone, regardless of their financial background.
              </p>
              <p className="mb-6 font-semibold text-gray-900">
                We believe that everyone should have the support and expert guidance they need to reach their fitness goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-200 py-20 md:py-32 rounded-3xl">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Why Choose deadPR?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1: Affordable Price */}
            <div className="bg-white p-8 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-teal-500 w-14 h-14 mx-auto mb-4">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 6a.75.75 0 0 1 .75.75c0 1.258.118 2.51.365 3.738A2.224 2.224 0 0 1 15 12.375c.345.508.667 1.054.965 1.637.587 1.154.915 2.404.915 3.688.75 0 1.5.672 1.5 1.5.75.75 0 1.5-.75 1.5H8.25c-.75 0-1.5-.672-1.5-1.5 0-.75.75-1.5 1.5-1.5a.75.75 0 0 1 .75-.75c0-1.258-.118-2.51-.365-3.738A2.224 2.224 0 0 1 9 11.625c-.345-.508-.667-1.054-.965-1.637C7.448 8.834 7.12 7.584 7.12 6.315a.75.75 0 0 1 .75-.75h4.13c1.071 0 1.838.748 1.838 1.815 0 .438.257.75.5.75h1.12c.243 0 .445-.164.445-.44a.434.434 0 0 0-.445-.443h-.455c-.29-.028-.58-.042-.87-.042-1.071 0-1.838-.748-1.838-1.815 0-.438-.257-.75-.5-.75h-1.12c-.243 0-.445.164-.445.44a.434.434 0 0 0 .445.443h.455c.29.028.58.042.87.042Zm-3.12 9.068a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 8.25a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75V6.75a.75.75 0 0 1 1.5 0V8.25Z" clipRule="evenodd" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Affordable Price</h3>
              <p className="text-gray-600">High-quality training services that won't break the bank.</p>
            </div>

            {/* Feature 2: Best Trainers */}
            <div className="bg-white p-8 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-500 w-14 h-14 mx-auto mb-4">
                <path d="M11.625 10.5L14.775 7.35a.75.75 0 0 0-1.06-1.06L10.5 9.44l-3.265-3.265a.75.75 0 0 0-1.06 1.06l3.265 3.265L6.175 13.65a.75.75 0 0 0 1.06 1.06l3.265-3.265L13.65 14.775a.75.75 0 0 0 1.06-1.06l-3.265-3.265Z" />
                <path d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm0 17.5a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5Z" clipRule="evenodd" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Best Trainers</h3>
              <p className="text-gray-600">All our trainers are certified and experienced, and they understand your goals.</p>
            </div>

            {/* Feature 3: Personalized Plans */}
            <div className="bg-white p-8 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 w-14 h-14 mx-auto mb-4">
                <path d="M11.625 1.488a.75.75 0 0 0-.75-.75-.75.75 0 0 0-.75.75v12.75a.75.75 0 0 0 1.5 0V1.488Z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 18a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5Z" clipRule="evenodd" />
                <path d="M17.25 11.25a.75.75 0 0 0-.75-.75H7.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 .75-.75Z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Personalized Plans</h3>
              <p className="text-gray-600">We create personalized training plans based on your unique needs and goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">1</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Find Your Trainer</h3>
              <p className="text-gray-600">Browse through a list of certified trainers and find the perfect match for you.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">2</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Get a Personalized Plan</h3>
              <p className="text-gray-600">Your trainer will create a customized plan tailored to your fitness goals.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">3</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Your Journey</h3>
              <p className="text-gray-600">Begin your training with the support and motivation you deserve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-200 py-20 md:py-32 rounded-3xl">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <p className="text-lg italic text-gray-600 mb-4">"deadPR changed my life! The trainer was amazing and the price was unbelievable. I finally achieved my fitness goals."</p>
              <p className="font-bold text-gray-800">- Babue dhillon</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <p className="text-lg italic text-gray-600 mb-4">"I never thought I could afford a personal trainer. deadPR proved me wrong. It's a fantastic platform for real people."</p>
              <p className="font-bold text-gray-800">- koyala gangwar</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <p className="text-lg italic text-gray-600 mb-4">"The trainers here are highly professional and supportive. My experience was top-notch from day one."</p>
              <p className="font-bold text-gray-800">- kha saab</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white p-12 md:p-16 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Ready to transform?</h2>
            <p className="text-xl md:text-2xl font-light mb-8">Start your fitness journey today.</p>
            <a href="#" className="bg-white text-teal-600 px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              Find Your Trainer
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline-block ml-2 w-6 h-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.694 4.693a.75.75 0 1 1-1.06 1.06L15.28 16.29A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
