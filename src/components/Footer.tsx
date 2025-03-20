
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-dark-950/40 backdrop-blur-lg border-t border-white/10 pt-16 pb-8 text-white/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-plant-500" />
              <span className="text-2xl font-medium text-white">GreenThumb</span>
            </div>
            <p className="mt-4 text-sm/relaxed">
              Bringing nature to your doorstep with premium plantation kits designed for success. 
              Grow your own herbs and plants with confidence.
            </p>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-plant-500/20 hover:text-plant-500">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-plant-500/20 hover:text-plant-500">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-plant-500/20 hover:text-plant-500">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-plant-500/20 hover:text-plant-500">
                <Youtube size={18} />
              </Button>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-plant-500 transition-colors inline-block">Home</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-plant-500 transition-colors inline-block">Shop</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-plant-500 transition-colors inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-plant-500 transition-colors inline-block">Plant Care</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-plant-500 transition-colors inline-block">Blog</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-plant-500 transition-colors inline-block">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-plant-500" />
                <span>123 Green Street, Plant City, PC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="shrink-0 text-plant-500" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="shrink-0 text-plant-500" />
                <span>hello@greenthumb.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Newsletter</h3>
            <p className="text-sm/relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-plant-500 hover:bg-plant-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-sm text-center text-white/60">
          <p>© {new Date().getFullYear()} GreenThumb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
