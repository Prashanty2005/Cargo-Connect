import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { ShipmentDetails } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Check, QrCode } from 'lucide-react';
import Footer from '@/components/Footer';

const DummyPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState('/placeholder.svg');
  const [isLoading, setIsLoading] = useState(false);
  
  const transactionId = 'TXN-' + Math.floor(Math.random() * 1000000);
  
  useEffect(() => {
    if (!location.state || !location.state.shipment) {
      toast({
        title: "Error",
        description: "No shipment selected for payment.",
        variant: "destructive"
      });
      navigate('/shipments');
      return;
    }
    
    setShipment(location.state.shipment);

    setQrImageUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=payment:${transactionId}`);
  }, [location.state, navigate, toast, transactionId]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handlePayment = async () => {
    if (!shipment) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed",
        variant: "default"
      });
      
      navigate('/payment-success', { 
        state: { 
          paymentMethod: 'dummy',
          transactionId: transactionId,
          shipment 
        } 
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process the payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-8">
          <p className="text-center">Please log in to make a payment.</p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => navigate('/login')} className="mx-2">Login</Button>
            <Button onClick={() => navigate('/signup')} variant="outline" className="mx-2">Sign Up</Button>
          </div>
        </div>
      </>
    );
  }
  
  if (!shipment) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-8">
          <p className="text-center">Loading shipment details...</p>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Complete your payment for shipment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Shipment Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Origin:</div>
                <div>{shipment.origin}</div>
                <div className="font-medium">Destination:</div>
                <div>{shipment.destination}</div>
                <div className="font-medium">Shipment ID:</div>
                <div>{shipment.id}</div>
                <div className="font-medium">Amount:</div>
                <div>${shipment.price.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
              <div className="mb-4 w-48 h-48 bg-white p-2 rounded-md flex items-center justify-center">
                <img 
                  src={qrImageUrl} 
                  alt="Payment QR code" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <p className="text-sm text-center font-medium">
                Scan this QR code to pay
              </p>
              <p className="text-xs text-center text-muted-foreground">
                You can use any UPI app or payment wallet
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Transaction ID</Label>
              <div className="flex items-center space-x-2">
                <Input value={transactionId} readOnly className="font-mono text-sm" />
                <Button size="icon" onClick={copyToClipboard} variant="outline">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Keep this transaction ID for your reference
              </p>
            </div>
            
            <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950/30">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Note:</strong> This is a simulated payment for demonstration purposes.
                In a real implementation, you would receive precise payment instructions and confirmations.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button 
              onClick={handlePayment} 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default DummyPayment;
