
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Info, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Form schema validation
const formSchema = z.object({
  origin: z.string().min(1, { message: 'Origin address is required' }),
  destination: z.string().min(1, { message: 'Destination address is required' }),
  weight: z.string().min(1, { message: 'Weight is required' }),
  dimensions: z.string().min(1, { message: 'Dimensions are required' }),
  itemDescription: z.string().min(1, { message: 'Item description is required' }),
  specialHandling: z.boolean().optional(),
  fragile: z.boolean().optional(),
  insurance: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ShipmentPosting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: '',
      destination: '',
      weight: '',
      dimensions: '',
      itemDescription: '',
      specialHandling: false,
      fragile: false,
      insurance: false,
    },
  });

  // Watch form values for preview
  const formValues = watch();

  const nextStep = () => {
    // Don't proceed if there are errors on the current step
    if (currentStep === 1) {
      if (!formValues.origin || !formValues.destination) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else if (currentStep === 2) {
      if (!formValues.weight || !formValues.dimensions || !formValues.itemDescription) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (!pickupDate || !deliveryDate) {
        toast.error('Please select pickup and delivery dates');
        return;
      }
    }

    // Move to next step
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: FormValues) => {
    if (!pickupDate || !deliveryDate) {
      toast.error('Please select pickup and delivery dates');
      return;
    }

    setIsSubmitting(true);

    // Add dates to the form data
    const fullData = {
      ...data,
      pickupDate: format(pickupDate, 'yyyy-MM-dd'),
      deliveryDate: format(deliveryDate, 'yyyy-MM-dd'),
    };

    try {
      // Simulate API call
      console.log('Submitting data:', fullData);
      
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success UI
      setShowSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/shipments');
      }, 3000);
    } catch (error) {
      console.error('Error submitting shipment:', error);
      toast.error('Failed to post shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Content by step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold mb-6">Location Details</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="origin">Pickup Address</Label>
                <Input
                  id="origin"
                  placeholder="Enter full pickup address"
                  {...register('origin')}
                  className={errors.origin ? 'border-red-500' : ''}
                />
                {errors.origin && (
                  <p className="text-red-500 text-sm">{errors.origin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Delivery Address</Label>
                <Input
                  id="destination"
                  placeholder="Enter full delivery address"
                  {...register('destination')}
                  className={errors.destination ? 'border-red-500' : ''}
                />
                {errors.destination && (
                  <p className="text-red-500 text-sm">{errors.destination.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !pickupDate && 'text-muted-foreground',
                          errors.origin ? 'border-red-500' : ''
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? format(pickupDate, 'PPP') : <span>Select pickup date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !deliveryDate && 'text-muted-foreground',
                          errors.destination ? 'border-red-500' : ''
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deliveryDate ? format(deliveryDate, 'PPP') : <span>Select delivery date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                        disabled={(date) => (pickupDate ? date <= pickupDate : date < new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold mb-6">Shipment Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg/lbs)</Label>
                  <Input
                    id="weight"
                    placeholder="e.g., 25 kg"
                    {...register('weight')}
                    className={errors.weight ? 'border-red-500' : ''}
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm">{errors.weight.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                  <Input
                    id="dimensions"
                    placeholder="e.g., 60cm x 40cm x 30cm"
                    {...register('dimensions')}
                    className={errors.dimensions ? 'border-red-500' : ''}
                  />
                  {errors.dimensions && (
                    <p className="text-red-500 text-sm">{errors.dimensions.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemDescription">Item Description</Label>
                <Textarea
                  id="itemDescription"
                  placeholder="Describe your items (type, quantity, etc.)"
                  rows={3}
                  {...register('itemDescription')}
                  className={errors.itemDescription ? 'border-red-500' : ''}
                />
                {errors.itemDescription && (
                  <p className="text-red-500 text-sm">{errors.itemDescription.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label>Special Requirements</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="specialHandling"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="specialHandling"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="specialHandling" className="font-normal">
                      Requires special handling
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="fragile"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="fragile"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="fragile" className="font-normal">
                      Fragile items
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="insurance"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="insurance"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="insurance" className="font-normal">
                      Add shipping insurance
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold mb-6">Review Your Shipment</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Location Details</h3>
                    <Separator className="my-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Pickup Address</p>
                        <p className="font-medium">{formValues.origin}</p>
                        {pickupDate && (
                          <p className="text-sm mt-1">
                            Pickup Date: {format(pickupDate, 'MMMM d, yyyy')}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Delivery Address</p>
                        <p className="font-medium">{formValues.destination}</p>
                        {deliveryDate && (
                          <p className="text-sm mt-1">
                            Delivery Date: {format(deliveryDate, 'MMMM d, yyyy')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Shipment Details</h3>
                    <Separator className="my-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="font-medium">{formValues.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dimensions</p>
                        <p className="font-medium">{formValues.dimensions}</p>
                      </div>
                    </div>
                    <div className="my-4">
                      <p className="text-sm text-muted-foreground">Item Description</p>
                      <p>{formValues.itemDescription}</p>
                    </div>
                    <div className="my-4">
                      <p className="text-sm text-muted-foreground">Special Requirements</p>
                      <ul className="list-disc list-inside mt-1">
                        {formValues.specialHandling && (
                          <li>Requires special handling</li>
                        )}
                        {formValues.fragile && <li>Fragile items</li>}
                        {formValues.insurance && <li>Shipping insurance</li>}
                        {!formValues.specialHandling && !formValues.fragile && !formValues.insurance && (
                          <li>None</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Estimated Cost</h3>
                    <Separator className="my-2" />
                    <div className="p-4 bg-muted/50 rounded-lg my-4">
                      <div className="flex justify-between">
                        <span>Base shipping cost</span>
                        <span>$120.00</span>
                      </div>
                      {formValues.specialHandling && (
                        <div className="flex justify-between mt-2">
                          <span>Special handling fee</span>
                          <span>$25.00</span>
                        </div>
                      )}
                      {formValues.insurance && (
                        <div className="flex justify-between mt-2">
                          <span>Insurance</span>
                          <span>$15.00</span>
                        </div>
                      )}
                      <Separator className="my-3" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>
                          $
                          {120 +
                            (formValues.specialHandling ? 25 : 0) +
                            (formValues.insurance ? 15 : 0)}
                          .00
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <Info className="h-4 w-4 mr-1" />
                      <span>Final price may vary based on actual weight and dimensions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // If not logged in, redirect to login
  useEffect(() => {
    if (!user && !isSubmitting) {
      toast.error('Please sign in to post a shipment');
      navigate('/login', { state: { from: '/shipment-posting' } });
    }
  }, [user, navigate, isSubmitting]);

  // Success screen
  if (showSuccess) {
    return (
      <>
        <Navbar />
        <div className="container max-w-4xl mx-auto py-20 px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Shipment Posted Successfully!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your shipment has been posted and carriers will be notified.
          </p>
          <p className="text-muted-foreground">Redirecting you to your shipments...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto py-10 px-4 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a New Shipment</h1>
          <p className="text-muted-foreground">
            Fill out the details below to post your shipment and find carriers
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-10">
          <div className="flex justify-between">
            <div className="text-center flex-1">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}
              >
                1
              </div>
              <p className="text-sm mt-2">Location</p>
            </div>
            <div className="text-center flex-1">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}
              >
                2
              </div>
              <p className="text-sm mt-2">Details</p>
            </div>
            <div className="text-center flex-1">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto ${
                  currentStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}
              >
                3
              </div>
              <p className="text-sm mt-2">Review</p>
            </div>
          </div>
          <div className="relative mt-4 mb-8">
            <div className="absolute h-1 w-full bg-muted"></div>
            <div
              className="absolute h-1 bg-primary transition-all"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}

          <div className="flex justify-between mt-10">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Continue
              </Button>
            ) : (
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Shipment'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ShipmentPosting;
