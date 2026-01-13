import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <span className="text-2xl font-bold tracking-tight">ZenCartopia</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your premium destination for lifestyle essentials. We curate the extraordinary for the ambitious.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">Electronics</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">Fashion</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">Home & Living</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info - UPDATED WITH YOUR DETAILS */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Vidyaranyapura,<br/>Bengaluru - 560097</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+91 7204427571</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>praneeth@zencartopia.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ZenCartopia. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;