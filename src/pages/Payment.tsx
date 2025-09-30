import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { CreditCard, ArrowLeft, Check, Wallet, QrCode } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { paymentMethods } from '@/features/secure-payments/data/paymentMethods';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [shipmentId, setShipmentId] = useState<string | null>(null);
  const [shipmentDetails, setShipmentDetails] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || (location.state as any)?.shipmentId || 'SHP-1234';
    setShipmentId(id);
    
    if (id) {
      fetchShipmentDetails(id);
    }
  }, [location]);

  const fetchShipmentDetails = async (id: string) => {
    try {
      const mockData = {
        id: id,
        origin: 'Mumbai, MH',
        destination: 'Pune, MH',
        price: 2999,
        status: 'Pending Payment'
      };
      
      setShipmentDetails(mockData);
    } catch (error) {
      console.error('Error fetching shipment:', error);
      toast.error('Could not load shipment details');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (paymentMethod === 'card') {
      setCardDetails(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSpecializedPayment = () => {
    if (paymentMethod === 'blockchain') {
      navigate('/blockchain-payment', { state: { shipment: shipmentDetails } });
      return;
    }
    
    if (paymentMethod === 'dummy') {
      navigate('/dummy-payment', { state: { shipment: shipmentDetails } });
      return;
    }
    
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc) {
        toast.error('Please fill in all card details');
        return;
      }
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful!');
      
      sessionStorage.setItem('payment_completed', 'true');
      sessionStorage.setItem('payment_method', paymentMethod);
      
      setTimeout(() => {
        navigate('/payment-success', { 
          state: { 
            paymentMethod,
            transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
            shipment: shipmentDetails 
          } 
        });
      }, 1000);
    }, 2000);
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Login Required</h1>
                <p className="mb-6">Please log in to make a payment</p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => navigate('/login')}>Login</Button>
                  <Button variant="outline" onClick={() => navigate('/signup')}>Sign Up</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/shipments">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shipments
              </Link>
            </Button>
            
            <motion.div 
              className="bg-card border rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 md:p-8">
                <h1 className="text-2xl font-bold mb-6">Payment</h1>
                
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-3">
                    <div>
                      <div className="mb-6">
                        <Label className="text-base mb-3 block">Payment Method</Label>
                        <RadioGroup 
                          defaultValue="card" 
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="flex flex-col space-y-3"
                        >
                          <div className="flex items-center space-x-3 rounded-lg border p-4">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="font-normal flex items-center">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Credit/Debit Card
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-lg border p-4">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="font-normal">
                              PayPal
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-lg border p-4 bg-blue-50">
                            <RadioGroupItem value="blockchain" id="blockchain" />
                            <Label htmlFor="blockchain" className="font-normal flex items-center">
                              <Wallet className="mr-2 h-4 w-4 text-blue-600" />
                              Blockchain Payment
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-lg border p-4 bg-purple-50">
                            <RadioGroupItem value="dummy" id="dummy" />
                            <Label htmlFor="dummy" className="font-normal flex items-center">
                              <QrCode className="mr-2 h-4 w-4 text-purple-600" />
                              QR Code Payment
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="number"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              name="name"
                              placeholder="John Smith"
                              value={cardDetails.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                name="cvc"
                                placeholder="123"
                                value={cardDetails.cvc}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'paypal' && (
                        <div className="bg-secondary/30 rounded-lg p-6 text-center">
                          <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                          <Button type="button" variant="outline">
                            Continue to PayPal
                          </Button>
                        </div>
                      )}
                      
                      {paymentMethod === 'blockchain' && (
                        <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center">
                          <Wallet className="h-12 w-12 text-blue-600 mb-4" />
                          <h3 className="text-lg font-medium mb-2">Blockchain Payment</h3>
                          <p className="mb-6">Continue to our secure blockchain payment page to complete your transaction using cryptocurrency.</p>
                          <Button 
                            onClick={() => navigate('/blockchain-payment', { state: { shipment: shipmentDetails }})}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Continue to Blockchain Payment
                          </Button>
                        </div>
                      )}

                      {paymentMethod === 'dummy' && (
                        <div className="bg-purple-50 rounded-lg p-6 flex flex-col items-center text-center">
                          <QrCode className="h-12 w-12 text-purple-600 mb-4" />
                          <h3 className="text-lg font-medium mb-2">QR Code Payment</h3>
                          <p className="mb-6">Continue to our QR code payment page to complete your transaction quickly.</p>
                          <Button 
                            onClick={() => navigate('/dummy-payment', { state: { shipment: shipmentDetails }})}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                          >
                            Continue to QR Payment
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-8">
                        <Button 
                          className="w-full" 
                          size="lg"
                          disabled={isProcessing || paymentMethod === 'blockchain' || paymentMethod === 'dummy'}
                          onClick={handleSpecializedPayment}
                        >
                          {isProcessing ? (
                            <><span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>Processing...</>
                          ) : (
                            <>Pay ₹{shipmentDetails?.price || 2999}</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="bg-secondary/20 rounded-xl p-6">
                      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping service</span>
                          <span>Express Shipping</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Route</span>
                          <span>{shipmentDetails?.origin || 'Mumbai'} to {shipmentDetails?.destination || 'Pune'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weight</span>
                          <span>5 kg</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>₹1,999</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Insurance</span>
                          <span>₹500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>₹500</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>₹{shipmentDetails?.price || 2999}</span>
                      </div>
                      
                      <div className="mt-6 bg-white/50 rounded-lg p-4 text-sm dark:bg-background/50">
                        <div className="flex">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <p>Your payment information is encrypted and secure.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
