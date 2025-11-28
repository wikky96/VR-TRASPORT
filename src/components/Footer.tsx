import { useLanguage } from '@/contexts/LanguageContext';

import React, { useState } from 'react';
// import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  // return (
  //   <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20 overflow-hidden">
  //     {/* Animated background elements */}
  //     <div className="absolute inset-0 overflow-hidden opacity-20">
  //       <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
  //       <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
  //     </div>

  //     <div className="relative container mx-auto px-4 py-12">
  //       {/* Company Info & Social */}
  //       <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-white/10">
  //         <div className="flex flex-col md:flex-row items-center gap-6">
  //           <div className="flex items-center gap-3">
  //             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
  //               VR
  //             </div>
  //             <div>
  //               <h3 className="text-2xl font-bold">VR Transport</h3>
  //               <p className="text-slate-400 text-sm">Quality Construction Materials</p>
  //             </div>
  //           </div>
  //           <div className="hidden md:block w-px h-12 bg-white/10"></div>
  //           <p className="text-slate-300 text-sm max-w-md text-center md:text-left">
  //             Your trusted partner in building dreams and delivering excellence.
  //           </p>
  //         </div>
          
  //         <div className="flex gap-3">
  //           <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
  //             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //               <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
  //             </svg>
  //           </a>
  //           <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
  //             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  //             </svg>
  //           </a>
  //           <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
  //             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  //             </svg>
  //           </a>
  //         </div>
  //       </div>

  //       {/* Navigation & Contact */}
  //       <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
  //         {/* Quick Links */}
  //         <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
  //           {['About Us', 'Our Services', 'Products', 'Testimonials', 'Transport', 'Logistics', 'Material Supply'].map((link) => (
  //             <a key={link} href="#" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm group relative">
  //               {link}
  //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
  //             </a>
  //           ))}
  //         </div>

  //         {/* Contact Info */}
  //         <div className="flex flex-wrap items-center justify-center gap-6">
  //           <a 
  //             href="mailto:vrtransport49@gmail.com"
  //             className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 group text-sm"
  //           >
  //             <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
  //               <Mail className="w-4 h-4" />
  //             </div>
  //             <span className="hidden sm:inline">vrtransport49@gmail.com</span>
  //           </a>

  //           <a 
  //             href="tel:+918056655272"
  //             className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 group text-sm"
  //           >
  //             <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
  //               <Phone className="w-4 h-4" />
  //             </div>
  //             <span>+91 80566 55272</span>
  //           </a>

  //           <a 
  //             href="https://wa.me/918056655272"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
  //           >
  //             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  //             </svg>
  //             WhatsApp
  //             <ArrowUpRight className="w-3 h-3" />
  //           </a>
  //         </div>
  //       </div>

  //       {/* Bottom Bar */}
  //       <div className="pt-8 border-t border-white/10">
  //         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
  //           <p className="text-slate-400 text-sm">
  //             © {new Date().getFullYear()} VR Transport. All rights reserved.
  //           </p>
  //           <div className="flex gap-6 text-sm">
  //             <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
  //               Privacy Policy
  //             </a>
  //             <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
  //               Terms of Service
  //             </a>
  //             <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
  //               Cookie Policy
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </footer>
  // );

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Content - Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
                VR
              </div>
              <div>
                <h3 className="text-xl font-bold">VR Transport</h3>
                <p className="text-slate-400 text-xs">Quality Materials</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner in construction materials and transport solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-bold mb-4 text-white">Quick Links</h5>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Products', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-sm font-bold mb-4 text-white">Services</h5>
            <ul className="space-y-2">
              {['Transport', 'Logistics', 'Material Supply', 'Custom Orders'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm font-bold mb-4 text-white">Contact Us</h5>
            <div className="space-y-3">
              <a 
                href="mailto:vrtransports49@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4" />
                <span className="text-xs">vrtransports49@gmail.com</span>
              </a>

              <a 
                href="tel:+91 6380724731"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+91 6380724731</span>
              </a>
               <a 
                href="tel:+91 8056892227"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+91 8056892227</span>
              </a>

              <a 
                href="https://wa.me/918056655272"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 text-sm font-medium mt-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

       
