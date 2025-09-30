
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/70 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-medium tracking-tight">Cargo Connect</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Connecting goods vehicles with empty space to people who want to send goods to the same destination.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-muted-foreground hover:text-primary transition-colors">Find Vehicles</Link>
              </li>
              <li>
                <Link to="/post" className="text-muted-foreground hover:text-primary transition-colors">Post Available Space</Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/vehicle-registration" className="text-muted-foreground hover:text-primary transition-colors">Vehicle Registration</Link>
              </li>
              <li>
                <Link to="/shipment-posting" className="text-muted-foreground hover:text-primary transition-colors">Shipment Posting</Link>
              </li>
              <li>
                <Link to="/route-matching" className="text-muted-foreground hover:text-primary transition-colors">Route Matching</Link>
              </li>
              <li>
                <Link to="/secure-payments" className="text-muted-foreground hover:text-primary transition-colors">Secure Payments</Link>
              </li>
              <li>
                <Link to="/shipment-tracking" className="text-muted-foreground hover:text-primary transition-colors">Shipment Tracking</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <span className="text-muted-foreground">123 Logistics Lane, Shipment City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">contact@cargoconnect.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cargo Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
