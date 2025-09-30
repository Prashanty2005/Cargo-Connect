import { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, MapPin, Package, Truck, User, 
  PhoneCall, Mail, FileText, Weight, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form validation schema
const goodsFormSchema = z.object({
  goodsType: z.string().min(2, "Goods type must be at least 2 characters"),
  weight: z.string().min(1, "Weight is required"),
  dimensions: z.string().min(1, "Dimensions are required"),
  specialHandling: z.string().optional(),
  description: z.string().optional(),
  contactName: z.string().min(2, "Name is required"),
  contactPhone: z.string().min(5, "Valid phone number is required"),
  contactEmail: z.string().email("Valid email is required"),
});

type GoodsFormValues = z.infer<typeof goodsFormSchema>;

const ContactVehicleOwner = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const vehicleId = params.id;
  
  // Get vehicle details from location state
  const vehicleDetails = location.state || {
    vehicleType: "Unknown",
    ownerName: "Unknown",
    availableSpace: "Unknown",
    origin: "Unknown",
    destination: "Unknown",
    departureDate: "Unknown"
  };
  
  const [submitting, setSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<GoodsFormValues>({
    resolver: zodResolver(goodsFormSchema),
    defaultValues: {
      goodsType: "",
      weight: "",
      dimensions: "",
      specialHandling: "",
      description: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
  });
  
  const onSubmit = async (data: GoodsFormValues) => {
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to submit the form");
        navigate('/login');
        return;
      }

      console.log('Submitting form data:', {
        ...data,
        vehicle: '507f1f77bcf86cd799439014' // Updated to use the new MongoDB ObjectId
      });

      const response = await fetch('http://localhost:5000/api/vehicle-contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          vehicle: '507f1f77bcf86cd799439014' // Updated to use the new MongoDB ObjectId
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server response:', responseData);
        throw new Error(responseData.message || 'Failed to submit request');
      }

      console.log('Success response:', responseData);
      
      toast.success("Request sent successfully!", {
        description: `${vehicleDetails.ownerName} will be notified of your interest.`,
      });
      
      navigate("/vehicles");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit request", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <motion.h1 
            className="text-3xl font-bold mb-8 text-center sm:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Vehicle Owner
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Vehicle Owner Details Section */}
            <motion.div 
              className="lg:col-span-2 bg-card rounded-xl border p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-6">Vehicle Details</h2>
              
              {vehicleDetails.image ? (
                <img 
                  src={vehicleDetails.image} 
                  alt={vehicleDetails.vehicleType}
                  className="w-full h-48 object-cover mb-6 rounded-lg" 
                />
              ) : (
                <div className="w-full h-48 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Truck className="h-20 w-20 text-primary/50" />
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{vehicleDetails.ownerName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle Type</p>
                    <p className="font-medium">{vehicleDetails.vehicleType}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Available Space</p>
                    <p className="font-medium">{vehicleDetails.availableSpace}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p className="font-medium">
                      {vehicleDetails.origin} → {vehicleDetails.destination}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Departure Date</p>
                    <p className="font-medium">{vehicleDetails.departureDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  Contact Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-muted-foreground" />
                    <span>Will be shared after your request is accepted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>Will be shared after your request is accepted</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Goods Information Form Section */}
            <motion.div 
              className="lg:col-span-3 bg-card rounded-xl border p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Goods Information</h2>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="goodsType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goods Type</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Electronics, Furniture" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 50 kg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="dimensions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dimensions</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 60 x 40 x 30 cm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialHandling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Handling Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Fragile, Temperature controlled" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide any additional details about your goods"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Your Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={submitting}
                    >
                      {submitting ? "Sending Request..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactVehicleOwner;
