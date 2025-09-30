import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import VehicleCard from '@/components/VehicleCard';
import { Button } from '@/components/ui/button';
import { Filter, ArrowDownUp } from 'lucide-react';
import { toast } from 'sonner';

// Sample vehicle data - Updated to show only cities within India
const allVehicles = [
  {
    id: '507f1f77bcf86cd799439011',
    vehicleType: 'Cargo Van',
    ownerName: 'Rahul Sharma',
    availableSpace: '3 cubic meters',
    origin: 'Mumbai, MH',
    destination: 'Pune, MH',
    departureDate: 'June 15, 2023',
  },
  {
    id: '507f1f77bcf86cd799439012',
    vehicleType: 'Box Truck',
    ownerName: 'Priya Patel',
    availableSpace: '8 cubic meters',
    origin: 'Delhi, DL',
    destination: 'Jaipur, RJ',
    departureDate: 'June 18, 2023',
  },
  {
    id: '507f1f77bcf86cd799439013',
    vehicleType: 'Semi-Trailer',
    ownerName: 'Amit Singh',
    availableSpace: '25 cubic meters',
    origin: 'Bangalore, KA',
    destination: 'Chennai, TN',
    departureDate: 'June 20, 2023',
  },
  {
    id: '507f1f77bcf86cd799439014',
    vehicleType: 'Pickup Truck',
    ownerName: 'Neha Gupta',
    availableSpace: '1.5 cubic meters',
    origin: 'Hyderabad, TS',
    destination: 'Vijayawada, AP',
    departureDate: 'June 22, 2023',
  },
  {
    id: '507f1f77bcf86cd799439015',
    vehicleType: 'Box Truck',
    ownerName: 'Vikram Reddy',
    availableSpace: '10 cubic meters',
    origin: 'Kolkata, WB',
    destination: 'Bhubaneswar, OR',
    departureDate: 'June 25, 2023',
  },
  {
    id: '507f1f77bcf86cd799439016',
    vehicleType: 'Cargo Van',
    ownerName: 'Ananya Desai',
    availableSpace: '2.5 cubic meters',
    origin: 'Ahmedabad, GJ',
    destination: 'Surat, GJ',
    departureDate: 'June 28, 2023',
  },
];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(allVehicles);
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });

  const handleSearch = (data: { from: string; to: string; date: string }) => {
    setSearchParams(data);
    
    console.log("Search criteria:", data);
    
    // Simple filtering based on search criteria
    // In a real app, this would be a backend search
    const filtered = allVehicles.filter(vehicle => {
      // Extract the city name for comparison (ignoring the state code if present)
      const vehicleOriginCity = vehicle.origin.split(',')[0].trim().toLowerCase();
      const vehicleDestCity = vehicle.destination.split(',')[0].trim().toLowerCase();
      
      const searchFromCity = data.from.split(',')[0].trim().toLowerCase();
      const searchToCity = data.to.split(',')[0].trim().toLowerCase();
      
      const matchFrom = !data.from || vehicleOriginCity.includes(searchFromCity);
      const matchTo = !data.to || vehicleDestCity.includes(searchToCity);
      const matchDate = !data.date || vehicle.departureDate.includes(data.date);
      
      console.log(`Vehicle: ${vehicle.origin} -> ${vehicle.destination}, Matching: ${matchFrom} && ${matchTo} && ${matchDate}`);
      
      return matchFrom && matchTo && matchDate;
    });
    
    console.log("Filtered vehicles:", filtered.length);
    setVehicles(filtered);
  };
  
  const handleFilter = () => {
    toast.info("Filter options", { 
      description: "Vehicle type, space available, and more filter options would appear here" 
    });
  };
  
  const handleSort = () => {
    toast.info("Sort options", { 
      description: "Sort by departure date, available space, or distance options would appear here" 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <motion.h1 
              className="mb-4 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find available <span className="text-primary">vehicles</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Search and browse through all available vehicles with empty space
            </motion.p>
          </div>
          
          <SearchBar 
            className="max-w-5xl mx-auto mb-16"
            onSearch={handleSearch}
          />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-xl font-medium mb-1">Available Vehicles</h2>
                <p className="text-muted-foreground text-sm">
                  {vehicles.length} vehicles found
                  {searchParams.from && ` from "${searchParams.from}"`}
                  {searchParams.to && ` to "${searchParams.to}"`}
                  {searchParams.date && ` on "${searchParams.date}"`}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="rounded-lg" onClick={handleFilter}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg" onClick={handleSort}>
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
            {vehicles.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} {...vehicle} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-secondary/30 rounded-2xl">
                <h3 className="text-xl font-medium mb-2">No vehicles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria to find more results
                </p>
                <Button 
                  onClick={() => {
                    setSearchParams({ from: '', to: '', date: '' });
                    setVehicles(allVehicles);
                  }}
                >
                  Reset Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vehicles;
