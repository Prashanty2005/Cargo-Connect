
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { ShipmentDetails } from '@/services/apiService';
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Copy, Check, QrCode } from 'lucide-react';

const QrCodePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { processBitcoinPayment, isLoading } = useSupabase();
  
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('Bitcoin');
  const [copied, setCopied] = useState(false);
  const [btcAmount, setBtcAmount] = useState('0.00123'); // Simulated conversion
  const [qrImageUrl, setQrImageUrl] = useState('/placeholder.svg');
  
  // Mock wallet address for demo
  const bitcoinWalletAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  
  // Get the shipment details from the location state
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
    
    // Simulate BTC conversion based on price
    if (location.state.shipment.price) {
      const mockRate = 0.000023; // Mock BTC/USD rate
      const calculatedAmount = (location.state.shipment.price * mockRate).toFixed(6);
      setBtcAmount(calculatedAmount);
    }

    // Generate a simple QR code URL (in a real app, you'd use a QR code generator library)
    setQrImageUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bitcoinWalletAddress}`);
  }, [location.state, navigate, toast]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bitcoinWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handlePayment = async () => {
    if (!shipment) return;
    
    if (!walletAddress && network !== 'Lightning Network') {
      toast({
        title: "Error",
        description: "Please enter your wallet address.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // For Lightning Network, we don't need a wallet address
      const senderWalletAddress = network === 'Lightning Network' 
        ? 'lightning-wallet' 
        : walletAddress;
      
      const result = await processBitcoinPayment(
        shipment.id,
        shipment.price,
        'BTC',
        network,
        senderWalletAddress
      );
      
      if (result) {
        navigate('/payment/success', { 
          state: { 
            paymentMethod: 'bitcoin',
            transactionId: result.transactionId,
            network,
            shipment 
          } 
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process the payment. Please try again.",
        variant: "destructive"
      });
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
            <CardTitle>Bitcoin Payment</CardTitle>
            <CardDescription>
              Pay for your shipment using Bitcoin
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
                <div className="font-medium">Amount (USD):</div>
                <div>${shipment.price.toFixed(2)}</div>
                <div className="font-medium">Amount (BTC):</div>
                <div>{btcAmount} BTC</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Select Bitcoin Network</h3>
              <RadioGroup value={network} onValueChange={setNetwork} className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="Bitcoin" id="bitcoin" />
                  <Label htmlFor="bitcoin" className="flex-1">Bitcoin (On-chain)</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="Lightning Network" id="lightning" />
                  <Label htmlFor="lightning" className="flex-1">Lightning Network (Faster)</Label>
                </div>
              </RadioGroup>
            </div>
            
            {network === 'Bitcoin' && (
              <div className="space-y-4">
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                  <div className="mb-4 w-48 h-48 bg-white p-2 rounded-md flex items-center justify-center">
                    <img 
                      src={qrImageUrl} 
                      alt="Bitcoin payment QR code" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="flex items-center space-x-2 w-full">
                    <Input value={bitcoinWalletAddress} readOnly className="font-mono text-sm" />
                    <Button size="icon" onClick={copyToClipboard} variant="outline">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-center mt-2 text-muted-foreground">
                    Send exactly {btcAmount} BTC to this address
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sender-wallet">Your Bitcoin Wallet Address (for confirmation)</Label>
                  <Input 
                    id="sender-wallet" 
                    placeholder="Your BTC wallet address" 
                    value={walletAddress}
                    onChange={e => setWalletAddress(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the wallet address from which you'll be sending the payment.
                  </p>
                </div>
              </div>
            )}
            
            {network === 'Lightning Network' && (
              <div className="space-y-4">
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                  <div className="mb-4 w-48 h-48 bg-white p-2 rounded-md flex items-center justify-center">
                    <div className="bg-[#F7931A] w-full h-full rounded-sm flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-center font-medium">
                    Lightning Invoice
                  </p>
                  <p className="text-xs text-center text-muted-foreground">
                    Scan with your Lightning wallet to pay instantly
                  </p>
                </div>
                
                <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/30">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Lightning Network payments are nearly instant and have very low fees.
                    Just scan the QR code with your Lightning-enabled wallet.
                  </p>
                </div>
              </div>
            )}
            
            <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950/30">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Important:</strong> This is a simulated Bitcoin payment for demonstration purposes.
                In a real implementation, you would receive precise payment instructions and confirmations.
                <br /><br />
                <strong>Transaction ID:</strong> {network === 'Lightning Network' ? 
                  'lntx_' + Math.random().toString(36).substring(2, 15) : 
                  '0x' + Array.from({length: 32}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button 
              onClick={handlePayment} 
              disabled={isLoading || (network === 'Bitcoin' && !walletAddress)}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default QrCodePayment;
