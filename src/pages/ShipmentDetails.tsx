import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Truck, Calendar, MapPin, Package, Clock, ArrowRight, Building,
  FileText, DollarSign, Info, CircleAlert, Weight, User, QrCode, 
  Smartphone, CreditCard, Bitcoin, Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getShipmentById, ShipmentDetails as ShipmentDetailsType } from '@/services/apiService';
import { useIsMobile } from '@/hooks/use-mobile';
import { PaymentMethodCard } from '@/features/secure-payments/components/PaymentMethodCard';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const createRazorpayOrder = async (amount: number) => {
  return {
    id: 'order_' + Math.random().toString(36).substring(2, 15),
    amount: amount * 100,
    currency: 'INR',
    receipt: 'rcpt_' + Math.random().toString(36).substring(2, 10)
  };
};

const ShipmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [shipment, setShipment] = useState<ShipmentDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        if (id) {
          const fetchedShipment = await getShipmentById(id);
          if (fetchedShipment) {
            setShipment(fetchedShipment);
          } else {
            toast.error('Shipment not found');
            navigate('/shipments');
          }
        }
      } catch (error) {
        console.error('Error fetching shipment:', error);
        toast.error('Failed to load shipment details');
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="flex flex-col items-center gap-3">
            <Package className="h-10 w-10 animate-pulse text-muted-foreground" />
            <p>Loading shipment details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="flex flex-col items-center gap-3">
            <CircleAlert className="h-10 w-10 text-destructive" />
            <p>Shipment not found</p>
            <Button asChild>
              <Link to="/shipments">Return to Shipments</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePayment = async () => {
    setIsPaymentProcessing(true);
    
    if (paymentMethod === 'qrcode') {
      navigate('/qr-code-payment', {
        state: {
          shipmentId: shipment?.id,
          amount: shipment?.price
        }
      });
      return;
    }
    
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsPaymentProcessing(false);
        return;
      }
      
      const order = await createRazorpayOrder(shipment!.price);
      
      const options = {
        key: 'rzp_test_dummy_key',
        amount: order.amount,
        currency: order.currency,
        name: 'LoadMate Finder',
        description: `Shipment: ${shipment!.id} (${shipment!.origin} to ${shipment!.destination})`,
        order_id: order.id,
        handler: function (response: any) {
          console.log('Payment successful:', response);
          setIsPaymentProcessing(false);
          toast.success('Payment successful!');
          navigate('/payment-success');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9876543210'
        },
        theme: {
          color: '#6366F1'
        },
        modal: {
          ondismiss: function() {
            setIsPaymentProcessing(false);
            toast.info('Payment cancelled');
          }
        }
      };
      
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed. Please try again.');
      setIsPaymentProcessing(false);
    }
  };

  const handleBlockchainPayment = () => {
    navigate('/blockchain-payment', {
      state: {
        shipmentId: shipment?.id,
        amount: shipment?.price
      }
    });
  };

  const handleDummyPayment = () => {
    navigate('/qr-code-payment', {
      state: {
        shipment
      }
    });
  };

  const PaymentDialog = isMobile ? Drawer : Dialog;
  const PaymentDialogTrigger = isMobile ? DrawerTrigger : DialogTrigger;
  const PaymentDialogContent = isMobile ? DrawerContent : DialogContent;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Link to="/shipments" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipments
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{shipment.id}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Shipment {shipment.id}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(shipment.status)}>
                    {shipment.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Tracking # {shipment.tracking}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handlePayment}
                disabled={isPaymentProcessing}
                className="w-full sm:w-auto"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                {isPaymentProcessing ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Information</CardTitle>
                  <CardDescription>
                    Details about the shipment route and logistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Origin</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <p className="font-medium">{shipment.origin}</p>
                      </div>
                    </div>
                    <ArrowRight className="hidden sm:block h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Destination</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <p className="font-medium">{shipment.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Shipment Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="font-medium">{shipment.date}</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <p className="font-medium">{shipment.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Vehicle Type</p>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-primary" />
                        <p className="font-medium">{shipment.vehicle}</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-primary" />
                        <p className="font-medium">{shipment.capacity} kg</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Shipping Notes</h3>
                    <p className="text-muted-foreground">
                      {shipment.notes || 'No additional notes for this shipment.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>
                    Shipment cost breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Base Charge</span>
                    <span>₹{(shipment.price * 0.85).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{(shipment.price * 0.15).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center py-2 font-medium">
                    <span>Total Amount</span>
                    <span className="text-lg">₹{shipment.price.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-2">
                  <PaymentDialog>
                    <PaymentDialogTrigger asChild>
                      <Button className="w-full">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Select Payment Method
                      </Button>
                    </PaymentDialogTrigger>
                    <PaymentDialogContent>
                      <div className="pt-4 pb-2 px-4">
                        {isMobile ? (
                          <DrawerHeader className="px-0">
                            <DrawerTitle>Select Payment Method</DrawerTitle>
                            <DrawerDescription>
                              Choose your preferred way to pay
                            </DrawerDescription>
                          </DrawerHeader>
                        ) : (
                          <DialogHeader>
                            <DialogTitle>Select Payment Method</DialogTitle>
                            <DialogDescription>
                              Choose your preferred way to pay
                            </DialogDescription>
                          </DialogHeader>
                        )}
                        
                        <div className="grid gap-4 py-4">
                          <PaymentMethodCard
                            id="razorpay"
                            title="Credit/Debit Card"
                            icon={CreditCard}
                            description="Pay securely with your credit or debit card via Razorpay"
                            advantages={[
                              "Fast and secure checkout",
                              "Multiple card options supported",
                              "Encrypted transaction"
                            ]}
                            isSelected={paymentMethod === 'razorpay'}
                            onSelect={() => setPaymentMethod('razorpay')}
                          />
                          
                          <PaymentMethodCard
                            id="qrcode"
                            title="UPI / QR Code"
                            icon={QrCode}
                            description="Pay using UPI apps like Google Pay, PhonePe, or Paytm"
                            advantages={[
                              "No additional charges",
                              "Instant payment confirmation",
                              "Use any UPI-enabled app"
                            ]}
                            isSelected={paymentMethod === 'qrcode'}
                            onSelect={() => setPaymentMethod('qrcode')}
                          />
                          
                          <PaymentMethodCard
                            id="blockchain"
                            title="Blockchain Payment"
                            icon={Wallet}
                            description="Pay securely with cryptocurrency for enhanced privacy and lower fees"
                            advantages={[
                              "Enhanced privacy and security",
                              "No intermediaries",
                              "Lower transaction fees"
                            ]}
                            isSelected={paymentMethod === 'blockchain'}
                            onSelect={() => setPaymentMethod('blockchain')}
                          />
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-2">
                          <Button 
                            onClick={paymentMethod === 'blockchain' ? handleBlockchainPayment : handlePayment} 
                            disabled={!paymentMethod || isPaymentProcessing}
                          >
                            {isPaymentProcessing ? 'Processing...' : 'Continue Payment'}
                          </Button>
                        </div>
                      </div>
                    </PaymentDialogContent>
                  </PaymentDialog>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-1/2" onClick={handleBlockchainPayment}>
                      <Wallet className="h-4 w-4 mr-2" />
                      Blockchain
                    </Button>
                    
                    <Button variant="outline" className="w-1/2" onClick={handleDummyPayment}>
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    Secure payment powered by Razorpay
                  </p>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Shipper</p>
                      <p className="text-sm text-muted-foreground">{shipment.shipper}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Receiver</p>
                      <p className="text-sm text-muted-foreground">{shipment.receiver}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

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

export default ShipmentDetails;
