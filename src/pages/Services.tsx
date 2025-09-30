
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Package, Truck, MapPin, CalendarClock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const serviceItems = [
  {
    title: 'Regular Shipping',
    description: 'Economical shipping for non-urgent items',
    icon: Package,
    features: [
      'Delivery within 5-7 business days',
      'Package tracking',
      'Up to 50kg per shipment',
      'Insurance available',
    ],
    price: '₹829',
    priceDescription: 'per shipment',
    mostPopular: false,
    linkTo: '/shipments',
  },
  {
    title: 'Express Shipping',
    description: 'Fast delivery for time-sensitive packages',
    icon: Truck,
    features: [
      'Delivery within 2-3 business days',
      'Real-time tracking',
      'Up to 100kg per shipment',
      'Basic insurance included',
      'Priority handling',
    ],
    price: '₹1,659',
    priceDescription: 'per shipment',
    mostPopular: true,
    linkTo: '/shipments',
  },
  {
    title: 'Same-Day Delivery',
    description: 'Ultra-fast local delivery service',
    icon: CalendarClock,
    features: [
      'Delivery within 24 hours',
      'Live tracking with courier details',
      'Up to 30kg per shipment',
      'Full insurance included',
      'Dedicated customer support',
    ],
    price: '₹2,489',
    priceDescription: 'per shipment',
    mostPopular: false,
    linkTo: '/shipments',
  },
];

const Services = () => {
  const navigate = useNavigate();
  
  const handleSelectService = (title: string) => {
    toast.success(`${title} selected`, {
      description: "Proceeding to shipment configuration."
    });
    navigate('/shipments');
  };
  
  const handleContactSales = () => {
    toast.info("Contact Sales", {
      description: "Our sales team will contact you shortly."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1 
              className="mb-4 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our <span className="text-primary">Services</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Choose the best shipping option for your needs
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {serviceItems.map((service, index) => (
              <motion.div
                key={service.title}
                className={`relative rounded-2xl overflow-hidden border shadow-sm bg-card transition-shadow hover:shadow-md ${
                  service.mostPopular ? 'ring-2 ring-primary' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {service.mostPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 min-h-[48px]">{service.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{service.price}</span>
                    <span className="text-muted-foreground ml-1">{service.priceDescription}</span>
                  </div>
                  
                  <Button 
                    className={`w-full mb-6 ${service.mostPopular ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                    onClick={() => handleSelectService(service.title)}
                  >
                    Select {service.title}
                  </Button>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="max-w-5xl mx-auto bg-card border rounded-2xl p-8 shadow-sm" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h2 className="mb-4">Custom Shipping Solutions</h2>
                <p className="text-muted-foreground mb-6">
                  Need a customized solution for your business? We offer tailored shipping services to meet your specific requirements, no matter the size or complexity.
                </p>
                <div className="flex gap-3">
                  <Button onClick={handleContactSales}>
                    Contact Sales
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/vehicles">Browse Vehicles</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
