import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, PackageOpen, Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Post = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vehicle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Vehicle form state
  const [vehicleData, setVehicleData] = useState({
    vehicleType: '',
    origin: '',
    destination: '',
    departureDate: '',
    availableSpace: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });
  
  // Shipment form state
  const [shipmentData, setShipmentData] = useState({
    goodsType: '',
    origin: '',
    destination: '',
    shipmentDate: '',
    packageSize: '',
    packageWeight: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });
  
  // Handle vehicle form input changes
  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle shipment form input changes
  const handleShipmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShipmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post vehicle space.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5000/api/posts/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vehicleData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post vehicle space');
      }

      const result = await response.json();
      
      toast({
        title: "Vehicle space posted successfully!",
        description: "Vehicle owners will be able to see your available space.",
      });
      
      // Reset form data
      setVehicleData({
        vehicleType: '',
        origin: '',
        destination: '',
        departureDate: '',
        availableSpace: '',
        description: '',
        contactName: '',
        contactPhone: '',
        contactEmail: ''
      });
      
    } catch (error) {
      toast({
        title: "Error posting vehicle space",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      console.error("Error posting vehicle space:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleShipmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post shipment request.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5000/api/posts/shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(shipmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post shipment request');
      }

      const result = await response.json();
      
      toast({
        title: "Shipment request posted successfully!",
        description: "Vehicle owners will be able to see your shipment request.",
      });
      
      // Reset form data
      setShipmentData({
        goodsType: '',
        origin: '',
        destination: '',
        shipmentDate: '',
        packageSize: '',
        packageWeight: '',
        description: '',
        contactName: '',
        contactPhone: '',
        contactEmail: ''
      });
      
    } catch (error) {
      toast({
        title: "Error posting shipment request",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      console.error("Error posting shipment request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Post your <span className="text-primary">requirements</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Whether you have space in your vehicle or need to ship goods, post your requirements here
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="vehicle" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="vehicle" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>I have a vehicle with space</span>
                </TabsTrigger>
                <TabsTrigger value="shipment" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
                  <PackageOpen className="h-4 w-4 mr-2" />
                  <span>I need to ship goods</span>
                </TabsTrigger>
              </TabsList>
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-lg shadow-sm p-8"
              >
                <TabsContent value="vehicle" className="mt-0">
                  <form onSubmit={handleVehicleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Input 
                          name="vehicleType"
                          placeholder="e.g. Cargo Van, Box Truck, Semi-Trailer" 
                          value={vehicleData.vehicleType}
                          onChange={handleVehicleChange}
                          required 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="origin">Origin</Label>
                          <Input 
                            name="origin"
                            placeholder="Indian City, State" 
                            value={vehicleData.origin}
                            onChange={handleVehicleChange}
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="destination">Destination</Label>
                          <Input 
                            name="destination"
                            placeholder="Indian City, State" 
                            value={vehicleData.destination}
                            onChange={handleVehicleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="departureDate">Departure Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              name="departureDate"
                              type="date" 
                              className="pl-10" 
                              value={vehicleData.departureDate}
                              onChange={handleVehicleChange}
                              required 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="availableSpace">Available Space</Label>
                          <Input 
                            name="availableSpace"
                            placeholder="e.g. 3 cubic meters" 
                            value={vehicleData.availableSpace}
                            onChange={handleVehicleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          name="description"
                          placeholder="Provide details about your vehicle, space limitations, and any other relevant information"
                          className="min-h-[120px]"
                          value={vehicleData.description}
                          onChange={handleVehicleChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactName">Contact Name</Label>
                          <Input 
                            name="contactName"
                            value={vehicleData.contactName}
                            onChange={handleVehicleChange}
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input 
                            name="contactPhone"
                            type="tel" 
                            value={vehicleData.contactPhone}
                            onChange={handleVehicleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input 
                          name="contactEmail"
                          type="email" 
                          value={vehicleData.contactEmail}
                          onChange={handleVehicleChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Posting...' : 'Post Available Vehicle Space'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="shipment" className="mt-0">
                  <form onSubmit={handleShipmentSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="goodsType">Goods Type</Label>
                        <Input 
                          name="goodsType"
                          placeholder="e.g. Furniture, Electronics, General Merchandise" 
                          value={shipmentData.goodsType}
                          onChange={handleShipmentChange}
                          required 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipmentOrigin">Origin</Label>
                          <Input 
                            name="origin"
                            placeholder="Indian City, State" 
                            value={shipmentData.origin}
                            onChange={handleShipmentChange}
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipmentDestination">Destination</Label>
                          <Input 
                            name="destination"
                            placeholder="Indian City, State" 
                            value={shipmentData.destination}
                            onChange={handleShipmentChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipmentDate">Required Shipment Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              name="shipmentDate"
                              type="date" 
                              className="pl-10" 
                              value={shipmentData.shipmentDate}
                              onChange={handleShipmentChange}
                              required 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="packageSize">Package Size</Label>
                          <Input 
                            name="packageSize"
                            placeholder="e.g. 2 cubic meters" 
                            value={shipmentData.packageSize}
                            onChange={handleShipmentChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="packageWeight">Package Weight (kg)</Label>
                        <Input 
                          name="packageWeight"
                          type="number" 
                          placeholder="e.g. 50" 
                          value={shipmentData.packageWeight}
                          onChange={handleShipmentChange}
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="shipmentDescription">Description</Label>
                        <Textarea 
                          name="description"
                          placeholder="Provide details about your goods, handling requirements, and any other relevant information"
                          className="min-h-[120px]"
                          value={shipmentData.description}
                          onChange={handleShipmentChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipperName">Contact Name</Label>
                          <Input 
                            name="contactName"
                            value={shipmentData.contactName}
                            onChange={handleShipmentChange}
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipperPhone">Contact Phone</Label>
                          <Input 
                            name="contactPhone"
                            type="tel" 
                            value={shipmentData.contactPhone}
                            onChange={handleShipmentChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="shipperEmail">Contact Email</Label>
                        <Input 
                          name="contactEmail"
                          type="email" 
                          value={shipmentData.contactEmail}
                          onChange={handleShipmentChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Posting...' : 'Post Shipment Request'}
                    </Button>
                  </form>
                </TabsContent>
              </motion.div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Post;
