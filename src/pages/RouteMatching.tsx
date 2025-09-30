
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, LocateFixed, ArrowRight, Clock, 
  PackageCheck, TrendingUp, Truck, CalendarClock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

// Sample route data
const matchedRoutes = [
  {
    id: '1',
    origin: 'Mumbai, MH',
    destination: 'Pune, MH',
    distance: '150 km',
    departureDate: 'June 15, 2023',
    vehicleType: 'Cargo Van',
    availableSpace: '3 cubic meters',
    price: '₹899',
    deliveryTime: '4-6 hours',
    matches: '92%',
  },
  {
    id: '2',
    origin: 'Delhi, DL',
    destination: 'Jaipur, RJ',
    distance: '281 km',
    departureDate: 'June 18, 2023',
    vehicleType: 'Box Truck',
    availableSpace: '8 cubic meters',
    price: '₹1,749',
    deliveryTime: '8-10 hours',
    matches: '87%',
  },
  {
    id: '3',
    origin: 'Bangalore, KA',
    destination: 'Chennai, TN',
    distance: '346 km',
    departureDate: 'June 20, 2023',
    vehicleType: 'Semi-Trailer',
    availableSpace: '25 cubic meters',
    price: '₹2,999',
    deliveryTime: '10-12 hours',
    matches: '76%',
  },
];

const RouteMatching = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1 
              className="mb-4 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Route <span className="text-primary">Matching</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Find the optimal route matches for your shipments
            </motion.p>
          </div>
          
          <motion.div 
            className="max-w-5xl mx-auto bg-card rounded-xl border shadow-sm p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <MapPin className="h-3 w-3 text-white" />
                      </div>
                      <div className="w-0.5 h-8 bg-muted-foreground/20"></div>
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <LocateFixed className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-1">Origin</label>
                        <Input placeholder="Enter pickup location" className="w-full" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-1">Destination</label>
                        <Input placeholder="Enter delivery location" className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <label className="text-sm text-muted-foreground block mb-1">Date</label>
                  <Input type="date" className="w-full md:w-40" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <label className="text-sm text-muted-foreground invisible block mb-1">Search</label>
                <Button className="w-full md:w-auto">Find Routes</Button>
              </div>
            </div>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {matchedRoutes.map((route, index) => (
                <motion.div 
                  key={route.id}
                  className="bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-7/12">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            {route.matches} Match
                          </Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            {route.vehicleType}
                          </Badge>
                        </div>
                        
                        <div className="flex items-start mb-6">
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            <div className="w-0.5 h-10 bg-muted-foreground/20 my-1"></div>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <LocateFixed className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="mb-4">
                              <h3 className="font-medium">{route.origin}</h3>
                              <p className="text-sm text-muted-foreground">Pickup Location</p>
                            </div>
                            <div>
                              <h3 className="font-medium">{route.destination}</h3>
                              <p className="text-sm text-muted-foreground">Destination • {route.distance}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{route.departureDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{route.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PackageCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{route.availableSpace}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-5/12 flex flex-col justify-between border-t pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0 md:border-l md:pl-6">
                        <div>
                          <div className="text-2xl font-bold mb-1">{route.price}</div>
                          <p className="text-sm text-muted-foreground mb-6">Estimated price for this route</p>
                          
                          <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-700">High compatibility with your shipment needs</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                          <Button asChild className="flex-1">
                            <Link to={`/shipments?route=${route.id}`}>
                              Select Route
                            </Link>
                          </Button>
                          <Button variant="outline" asChild className="flex-1">
                            <Link to={`/route-details/${route.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="outline" size="lg">
                Show More Results
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="max-w-5xl mx-auto bg-muted/30 rounded-2xl p-8 mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Optimized Routes</h3>
                <p className="text-sm text-muted-foreground">
                  Our smart algorithm matches your shipment with vehicles already traveling on your route.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Time Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Save time with scheduled pickups and accurate delivery time estimates.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <PackageCheck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Perfect Fit</h3>
                <p className="text-sm text-muted-foreground">
                  Match your shipment with vehicles that have the right space and capabilities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RouteMatching;
