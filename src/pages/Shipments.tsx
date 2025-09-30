
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Package, Search, Clock, Truck, MapPin, Calendar,
  ArrowRight, ChevronRight, ExternalLink, Filter, Info, History
} from 'lucide-react';
import { Link } from 'react-router-dom';

const shipments = [
  {
    id: 'SHP-1234',
    status: 'In Transit',
    origin: 'Mumbai, MH',
    destination: 'Pune, MH',
    date: '2023-06-15',
    vehicle: 'Cargo Van',
    tracking: 'TRK-9875',
  },
  {
    id: 'SHP-5678',
    status: 'Delivered',
    origin: 'Delhi, DL',
    destination: 'Jaipur, RJ',
    date: '2023-06-12',
    vehicle: 'Box Truck',
    tracking: 'TRK-6543',
  },
  {
    id: 'SHP-9012',
    status: 'Pending',
    origin: 'Bangalore, KA',
    destination: 'Chennai, TN',
    date: '2023-06-18',
    vehicle: 'Semi-Trailer',
    tracking: 'TRK-3210',
  },
  {
    id: 'SHP-3456',
    status: 'Processing',
    origin: 'Hyderabad, TS',
    destination: 'Vijayawada, AP',
    date: '2023-06-20',
    vehicle: 'Pickup Truck',
    tracking: 'TRK-7890',
  },
  {
    id: 'SHP-7890',
    status: 'Delivered',
    origin: 'Ahmedabad, GJ',
    destination: 'Surat, GJ',
    date: '2023-06-10',
    vehicle: 'Box Truck',
    tracking: 'TRK-4567',
  },
];

const Shipments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredShipments = shipments.filter(shipment => 
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.tracking.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              Your <span className="text-primary">Shipments</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Track and manage all your packages in one place
            </motion.p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by ID, tracking number, or location"
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button asChild>
                  <Link to="/shipment-posting">New Shipment</Link>
                </Button>
              </div>
            </div>
            
            <motion.div
              className="bg-card border rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipment ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Vehicle Type</TableHead>
                      <TableHead>Tracking#</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.length > 0 ? (
                      filteredShipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">{shipment.id}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(shipment.status)}>
                              {shipment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <span className="truncate max-w-24">{shipment.origin}</span>
                              <ArrowRight className="h-3 w-3" />
                              <span className="truncate max-w-24">{shipment.destination}</span>
                            </div>
                          </TableCell>
                          <TableCell>{shipment.date}</TableCell>
                          <TableCell>{shipment.vehicle}</TableCell>
                          <TableCell>{shipment.tracking}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/shipment-details/${shipment.id}`}>
                                <Info className="h-4 w-4 mr-1" />
                                Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center">
                            <Package className="h-10 w-10 text-muted-foreground mb-3" />
                            <p className="mb-1">No shipments found</p>
                            <p className="text-sm text-muted-foreground mb-4">Try adjusting your search criteria</p>
                            <Button asChild>
                              <Link to="/shipment-posting">Create New Shipment</Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
            
            <div className="mt-12 grid md:grid-cols-1 gap-8">
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <History className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Shipment History</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      View your complete shipment history and analytics to optimize your logistics.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/shipment-history">
                        View History
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shipments;
