
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
import { Loader2, Copy, Check, ArrowRightLeft } from 'lucide-react';

const BlockchainPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { processBlockchainPayment, isLoading } = useSupabase();
  
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('Ethereum');
  const [copied, setCopied] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('0');
  const [qrImageUrl, setQrImageUrl] = useState('/placeholder.svg');
  
  // Mock contract address for demo
  const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  
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
    
    // Simulate token conversion based on blockchain selection and price
    if (location.state.shipment.price) {
      let mockAmount;
      if (network === 'Ethereum') {
        mockAmount = (location.state.shipment.price * 0.00027).toFixed(6); // ETH
      } else if (network === 'Polygon') {
        mockAmount = (location.state.shipment.price * 0.27).toFixed(2); // MATIC
      } else {
        mockAmount = (location.state.shipment.price * 1.0).toFixed(2); // Stablecoin on other chains
      }
      setTokenAmount(mockAmount);
    }

    // Generate QR code URL
    setQrImageUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${contractAddress}`);
  }, [location.state, navigate, toast, network]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handlePayment = async () => {
    if (!shipment) return;
    
    if (!walletAddress) {
      toast({
        title: "Error",
        description: "Please enter your wallet address.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const result = await processBlockchainPayment(
        shipment.id,
        shipment.price,
        network === 'Ethereum' ? 'ETH' : (network === 'Polygon' ? 'MATIC' : 'USDT'),
        network,
        walletAddress
      );
      
      if (result) {
        navigate('/payment-success', { 
          state: { 
            paymentMethod: 'blockchain',
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
        description: "Failed to process the blockchain payment. Please try again.",
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
            <CardTitle>Blockchain Payment</CardTitle>
            <CardDescription>
              Pay for your shipment using cryptocurrency
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
                <div className="font-medium">Token Amount:</div>
                <div>{tokenAmount} {network === 'Ethereum' ? 'ETH' : (network === 'Polygon' ? 'MATIC' : 'USDT')}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Select Blockchain Network</h3>
              <RadioGroup value={network} onValueChange={setNetwork} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="Ethereum" id="ethereum" />
                  <Label htmlFor="ethereum" className="flex-1">Ethereum</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="Polygon" id="polygon" />
                  <Label htmlFor="polygon" className="flex-1">Polygon</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="Binance Smart Chain" id="bsc" />
                  <Label htmlFor="bsc" className="flex-1">Binance Smart Chain</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="Solana" id="solana" />
                  <Label htmlFor="solana" className="flex-1">Solana</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                <div className="mb-4 w-48 h-48 bg-white p-2 rounded-md flex items-center justify-center">
                  <img 
                    src={qrImageUrl} 
                    alt="Blockchain payment QR code" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="flex items-center space-x-2 w-full">
                  <Input value={contractAddress} readOnly className="font-mono text-sm" />
                  <Button size="icon" onClick={copyToClipboard} variant="outline">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-center mt-2 text-muted-foreground">
                  Send exactly {tokenAmount} {network === 'Ethereum' ? 'ETH' : (network === 'Polygon' ? 'MATIC' : 'USDT')} to this contract
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Your Wallet Address</Label>
                <Input 
                  id="wallet-address" 
                  placeholder="0x..." 
                  value={walletAddress}
                  onChange={e => setWalletAddress(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Enter the wallet address from which you'll be sending the payment.
                </p>
              </div>
            </div>
            
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/30">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Important:</strong> This is a simulated blockchain payment for demonstration purposes.
                <br /><br />
                <strong>Transaction ID:</strong> 0x{Array.from({length: 40}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button 
              onClick={handlePayment} 
              disabled={isLoading || !walletAddress}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Process Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default BlockchainPayment;
