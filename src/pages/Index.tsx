
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SearchBar from '@/components/SearchBar';
import VehicleCard from '@/components/VehicleCard';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample vehicle data
const featuredVehicles = [
  {
    id: '1',
    vehicleType: 'Cargo Van',
    ownerName: 'John Doe',
    availableSpace: '3 cubic meters',
    origin: 'San Francisco, CA',
    destination: 'Los Angeles, CA',
    departureDate: 'June 15, 2023',
  },
  {
    id: '2',
    vehicleType: 'Box Truck',
    ownerName: 'Jane Smith',
    availableSpace: '8 cubic meters',
    origin: 'New York, NY',
    destination: 'Boston, MA',
    departureDate: 'June 18, 2023',
  },
  {
    id: '3',
    vehicleType: 'Semi-Trailer',
    ownerName: 'David Johnson',
    availableSpace: '25 cubic meters',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    departureDate: 'June 20, 2023',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        
        <section className="py-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.h2 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Find the perfect vehicle for your <span className="text-primary">shipment</span>
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Search for vehicles with available space going to your desired destination
              </motion.p>
            </div>
            
            <SearchBar className="max-w-5xl mx-auto mb-16" />
            
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-medium">Featured Vehicles</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/vehicles" className="flex items-center">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {featuredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} {...vehicle} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        <Features />
        
        <section className="py-24 bg-primary text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to optimize your logistics?
              </motion.h2>
              <motion.p 
                className="text-lg text-white/80 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join LoadMate today and be part of the future of efficient shipping and transportation.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg" variant="secondary" className="rounded-xl px-8">
                  <Link to="/vehicles">Find Vehicles</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl px-8 bg-transparent border-white/20 hover:bg-white/10">
                  <Link to="/post">Post Available Space</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
