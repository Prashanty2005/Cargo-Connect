import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Truck, Camera, FileCheck, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const vehicleSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle type is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(4, "Valid year is required"),
  licensePlate: z.string().min(1, "License plate is required"),
  chassisNumber: z.string().min(1, "Chassis number is required"),
  engineNumber: z.string().min(1, "Engine number is required"),
  capacity: z.string().min(1, "Capacity is required"),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  insurancePolicyNumber: z.string().min(1, "Insurance policy number is required"),
  insuranceExpiryDate: z.string().min(1, "Insurance expiry date is required"),
  registrationCertificate: z.string().min(1, "Registration certificate is required"),
  insuranceDocument: z.string().min(1, "Insurance document is required"),
  fitnessCertificate: z.string().min(1, "Fitness certificate is required"),
  description: z.string().optional(),
});

const VehicleRegistration = () => {
  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vehicleType: "",
      make: "",
      model: "",
      year: "",
      licensePlate: "",
      chassisNumber: "",
      engineNumber: "",
      capacity: "",
      length: "",
      width: "",
      height: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      insuranceExpiryDate: "",
      registrationCertificate: "",
      insuranceDocument: "",
      fitnessCertificate: "",
      description: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to submit the form");
        navigate('/login');
        return;
      }

      console.log('Submitting vehicle registration:', data);

      const response = await fetch('http://localhost:5000/api/vehicle-registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          vehicleType: data.vehicleType,
          make: data.make || 'Not specified',
          model: data.model,
          year: parseInt(data.year),
          registrationNumber: data.licensePlate,
          chassisNumber: data.chassisNumber || 'Not specified',
          engineNumber: data.engineNumber || 'Not specified',
          capacity: parseFloat(data.capacity),
          dimensions: {
            length: data.length || 0,
            width: data.width || 0,
            height: data.height || 0
          },
          insuranceProvider: data.insuranceProvider || 'Not specified',
          insurancePolicyNumber: data.insurancePolicyNumber || 'Not specified',
          insuranceExpiryDate: data.insuranceExpiryDate || new Date(),
          registrationCertificate: data.registrationCertificate || 'Not specified',
          insuranceDocument: data.insuranceDocument || 'Not specified',
          fitnessCertificate: data.fitnessCertificate || 'Not specified'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit registration');
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      
      toast.success("Vehicle registration submitted!", {
        description: "We'll review your information and contact you shortly.",
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast.error("Failed to submit registration", {
        description: error.message || "Please try again later.",
      });
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
              Vehicle <span className="text-primary">Registration</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Register your vehicle to start making money with available space
            </motion.p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="bg-card border rounded-xl p-6 shadow-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cargo_van">Cargo Van</SelectItem>
                              <SelectItem value="pickup_truck">Pickup Truck</SelectItem>
                              <SelectItem value="box_truck">Box Truck</SelectItem>
                              <SelectItem value="straight_truck">Straight Truck</SelectItem>
                              <SelectItem value="semi_trailer">Semi-Trailer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter vehicle make" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter model" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Enter year" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter license plate" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="chassisNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chassis Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter chassis number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="engineNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Engine Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter engine number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity (cubic meters)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Enter capacity" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (meters)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Enter length" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (meters)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Enter width" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (meters)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Enter height" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="insuranceProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Provider</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter insurance provider" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="insurancePolicyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Policy Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter policy number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="insuranceExpiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Expiry Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="registrationCertificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Certificate</FormLabel>
                          <FormControl>
                            <Input {...field} type="file" accept=".pdf,.jpg,.jpeg,.png" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="insuranceDocument"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Document</FormLabel>
                          <FormControl>
                            <Input {...field} type="file" accept=".pdf,.jpg,.jpeg,.png" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fitnessCertificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fitness Certificate</FormLabel>
                          <FormControl>
                            <Input {...field} type="file" accept=".pdf,.jpg,.jpeg,.png" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Any other details about your vehicle..." 
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full">Submit Registration</Button>
                  </div>
                </form>
              </Form>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Required Documents</h3>
                    <p className="text-muted-foreground text-sm">
                      Please keep these documents ready for verification:
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Vehicle Registration Certificate</li>
                      <li>• Insurance Documents</li>
                      <li>• Driver's License</li>
                      <li>• Vehicle Fitness Certificate</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Vehicle Photos</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Clear photos of your vehicle help build trust with potential customers.
                    </p>
                    <Button variant="outline" size="sm">
                      Upload Photos
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto bg-card border rounded-2xl p-8 shadow-sm mt-16" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">Earn More with Your Vehicle</h2>
                <p className="text-muted-foreground mb-6">
                  Once your vehicle is registered, you can start accepting shipment requests and earn money with your unused cargo space.
                </p>
                <div className="flex gap-3">
                  <Button>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-12 w-12 text-primary" />
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

export default VehicleRegistration;
