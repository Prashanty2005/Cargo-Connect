
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Package, MapPin, CheckCircle2, 
  Truck, Clock, AlertTriangle, MapIcon, BarChart3, 
  Gauge, Battery, CircleAlert
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getShipmentById } from '@/services/apiService';

// Sample tracking data for demo
const sampleShipment = {
  id: 'TRK-7890',
  status: 'In Transit',
  origin: 'Mumbai, MH',
  destination: 'Pune, MH',
  pickupDate: '2023-06-15',
  estimatedDelivery: '2023-06-16',
  currentLocation: 'Lonavala, MH',
  vehicle: {
    type: 'Cargo Van',
    plate: 'MH01AB1234',
    driver: 'Rahul Sharma',
    contact: '+91 98765 43210',
    totalCapacity: '5 cubic meters',
    usedCapacity: '3 cubic meters',
    remainingCapacity: '2 cubic meters',
    capacityPercentage: 60,
    weight: {
      total: '1500 kg',
      used: '900 kg',
      remaining: '600 kg',
      percentage: 60
    }
  },
  history: [
    {
      status: 'Order Placed',
      location: 'Mumbai, MH',
      timestamp: '2023-06-15 09:15 AM',
      completed: true,
    },
    {
      status: 'Picked Up',
      location: 'Mumbai, MH',
      timestamp: '2023-06-15 11:30 AM',
      completed: true,
    },
    {
      status: 'In Transit',
      location: 'Lonavala, MH',
      timestamp: '2023-06-15 03:45 PM',
      completed: true,
    },
    {
      status: 'Out for Delivery',
      location: 'Pune, MH',
      timestamp: 'Pending',
      completed: false,
    },
    {
      status: 'Delivered',
      location: 'Pune, MH',
      timestamp: 'Pending',
      completed: false,
    },
  ],
  progress: 60,
};

const CapacityVisualization = ({ capacityPercentage, type }) => {
  const getCapacityColor = (percentage) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getIconByType = (type, percentage) => {
    if (type === 'weight') {
      return <Gauge className="h-16 w-16 text-primary" />;
    } else {
      return <Battery className={`h-16 w-16 ${percentage >= 80 ? "text-red-500" : "text-primary"}`} />;
    }
  };
  
  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm bg-card">
      <div className="mb-4">
        {getIconByType(type, capacityPercentage)}
      </div>
      <div className="w-full mb-2">
        <div className="flex justify-between mb-1 text-sm">
          <span className="font-medium">{type === 'weight' ? 'Weight' : 'Space'} Utilization</span>
          <span>{capacityPercentage}%</span>
        </div>
        <div className="w-full h-4 bg-muted overflow-hidden rounded-full">
          <div 
            className={`h-full ${getCapacityColor(capacityPercentage)} transition-all`}
            style={{ width: `${capacityPercentage}%` }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-center mt-2 text-muted-foreground">
        {100 - capacityPercentage}% {type === 'weight' ? 'weight' : 'space'} remaining
      </p>
      {capacityPercentage >= 80 && (
        <div className="flex items-center mt-3 text-red-600 gap-1 text-xs">
          <CircleAlert className="h-3 w-3" />
          <span>Near full capacity</span>
        </div>
      )}
    </div>
  );
};

const ShipmentTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleTrack = async () => {
    if (!trackingNumber) {
      toast.error("Please enter a tracking number");
      return;
    }
    
    setIsSearching(true);
    
    try {
      if (trackingNumber.toUpperCase() === 'TRK-7890') {
        setShipment(sampleShipment);
        toast.success("Shipment found!");
      } else {
        const result = await getShipmentById(trackingNumber);
        if (result) {
          toast.success("Shipment found!");
          setShipment({
            id: result.tracking,
            status: result.status,
            origin: result.origin,
            destination: result.destination,
            currentLocation: result.origin, 
            estimatedDelivery: result.estimatedDelivery,
            pickupDate: result.date,
            progress: 30, 
            vehicle: {
              type: result.vehicle,
              plate: 'Not available',
              driver: 'Not available',
              contact: 'Not available',
              totalCapacity: result.capacity,
              usedCapacity: '60%',
              remainingCapacity: '40%',
              capacityPercentage: 60,
              weight: {
                total: result.weightLimit || '1000 kg',
                used: '600 kg',
                remaining: '400 kg',
                percentage: 60
              }
            },
            history: [
              {
                status: 'Order Placed',
                location: result.origin,
                timestamp: new Date(result.date).toLocaleString(),
                completed: true,
              },
              {
                status: 'In Transit',
                location: 'En Route',
                timestamp: 'In progress',
                completed: false,
              },
              {
                status: 'Delivered',
                location: result.destination,
                timestamp: 'Pending',
                completed: false,
              },
            ]
          });
        } else {
          toast.error("No shipment found with this tracking number");
          setShipment(null);
        }
      }
    } catch (error) {
      console.error("Error fetching shipment:", error);
      toast.error("Error fetching shipment details");
      setShipment(null);
    } finally {
      setIsSearching(false);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Order Placed':
        return 'bg-purple-100 text-purple-800';
      case 'Picked Up':
        return 'bg-indigo-100 text-indigo-800';
      case 'Out for Delivery':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
              Shipment <span className="text-primary">Tracking</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Track your shipments in real-time
            </motion.p>
          </div>
          
          <motion.div 
            className="max-w-lg mx-auto bg-card rounded-xl border shadow-sm p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-medium mb-4">Track Your Shipment</h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Enter tracking number (try TRK-7890)" 
                  className="pl-10"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                />
              </div>
              <Button onClick={handleTrack} disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Track'}
              </Button>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Try other tracking numbers: TRK-9875, TRK-6543, TRK-3210, TRK-5432, TRK-2109</p>
            </div>
          </motion.div>
          
          {shipment && (
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-card border rounded-xl shadow-sm overflow-hidden mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-medium">Tracking #{shipment.id}</h2>
                        <Badge variant="outline" className={getStatusColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Estimated delivery: {shipment.estimatedDelivery}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <MapIcon className="h-4 w-4" />
                        View on Map
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Progress value={shipment.progress} className="h-2" />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Order Placed</span>
                      <span>In Transit</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">From</p>
                          <p className="font-medium">{shipment.origin}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">To</p>
                          <p className="font-medium">{shipment.destination}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Package className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Current Location</p>
                          <p className="font-medium">{shipment.currentLocation}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-4">
                      <h3 className="font-medium mb-3">Vehicle & Driver Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vehicle Type:</span>
                          <span>{shipment.vehicle.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">License Plate:</span>
                          <span>{shipment.vehicle.plate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Driver:</span>
                          <span>{shipment.vehicle.driver}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contact:</span>
                          <span>{shipment.vehicle.contact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Vehicle Capacity Section */}
                <div className="border-t border-b">
                  <div className="p-6">
                    <h3 className="font-medium mb-4">Vehicle Capacity</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Enhanced capacity visualization */}
                      <CapacityVisualization capacityPercentage={shipment.vehicle.capacityPercentage} type="space" />
                      <CapacityVisualization capacityPercentage={shipment.vehicle.weight.percentage} type="weight" />
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm">
                        <div className="flex gap-2">
                          <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800 dark:text-blue-300">
                              Space Capacity Information
                            </p>
                            <p className="text-blue-700 dark:text-blue-400 mt-1">
                              This vehicle has {shipment.vehicle.usedCapacity} of space used
                              with {shipment.vehicle.remainingCapacity} still available for additional cargo.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-md text-sm">
                        <div className="flex gap-2">
                          <Gauge className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-emerald-800 dark:text-emerald-300">
                              Weight Capacity Information
                            </p>
                            <p className="text-emerald-700 dark:text-emerald-400 mt-1">
                              The vehicle is carrying {shipment.vehicle.weight.used} out of a total capacity of {shipment.vehicle.weight.total}
                              with {shipment.vehicle.weight.remaining} additional weight capacity available.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t">
                  <div className="p-6">
                    <h3 className="font-medium mb-4">Tracking History</h3>
                    <div className="space-y-6">
                      {shipment.history.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              event.completed 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {event.completed ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <Clock className="h-5 w-5" />
                              )}
                            </div>
                            {index < shipment.history.length - 1 && (
                              <div className={`w-0.5 h-12 ${
                                event.completed ? 'bg-primary/30' : 'bg-muted'
                              }`}></div>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-medium">{event.status}</h4>
                            <p className="text-sm">{event.location}</p>
                            <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="grid md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-card border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Delivery Instructions</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Standard delivery to the main door. Signature required upon delivery.
                      </p>
                      <Button variant="outline" size="sm">
                        Update Instructions
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-800 mb-2">Delivery Update</h3>
                      <p className="text-sm text-yellow-700 mb-3">
                        Traffic delays have been reported on the route. Delivery might be delayed by 30 minutes.
                      </p>
                      <Button variant="outline" size="sm" className="border-yellow-300 bg-yellow-100/50 text-yellow-800 hover:bg-yellow-100">
                        Get Updates
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {!shipment && !isSearching && (
            <motion.div 
              className="max-w-md mx-auto text-center" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Shipment Found</h3>
              <p className="text-muted-foreground mb-6">
                Enter your tracking number above to track your shipment.
                For demo, try using tracking numbers: <span className="font-medium">TRK-7890, TRK-9875, TRK-3210</span>.
              </p>
              <Button asChild variant="outline">
                <a href="/shipments">View My Shipments</a>
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShipmentTracking;
