
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bitcoin, QrCode, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';

interface BitcoinPaymentFormProps {
  amount: number;
  shipmentId: string;
  onPaymentProcessing: () => void;
  onPaymentComplete: (transactionHash: string) => void;
}

export const BitcoinPaymentForm = ({
  amount,
  shipmentId,
  onPaymentProcessing,
  onPaymentComplete
}: BitcoinPaymentFormProps) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('Bitcoin Mainnet');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Convert amount to BTC (mock conversion rate 1 INR = 0.0000012 BTC)
  const btcAmount = (amount * 0.0000012).toFixed(8);
  // Mock Bitcoin address
  const receivingAddress = '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5';
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(receivingAddress);
    setCopied(true);
    toast.success('Bitcoin address copied to clipboard');
    setTimeout(() => setCopied(false), 3000);
  };
  
  const handleSubmitManualPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress) {
      toast.error('Please enter your wallet address');
      return;
    }
    
    setIsLoading(true);
    onPaymentProcessing();
    
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-payment', {
        body: {
          shipmentId,
          amount,
          currency: 'BTC',
          network,
          walletAddress,
          paymentMethod: 'bitcoin'
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.success) {
        toast.success('Bitcoin payment initiated!');
        toast.info(`Expected confirmation time: ${data.estimated_confirmation}`);
        
        // Store transaction hash in session for demo purpose
        sessionStorage.setItem('payment_completed', 'true');
        sessionStorage.setItem('transaction_hash', data.transaction_hash);
        sessionStorage.setItem('payment_method', 'bitcoin');
        
        // Call the completion handler
        onPaymentComplete(data.transaction_hash);
      } else {
        throw new Error(data?.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Error processing Bitcoin payment:', error);
      toast.error(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  };
  
  const handlePretendPayment = () => {
    setIsLoading(true);
    onPaymentProcessing();
    
    // Simulate payment for demo purposes
    setTimeout(() => {
      const mockTxHash = `btc_${Math.random().toString(36).substring(2, 15)}`;
      toast.success('Bitcoin payment detected!');
      
      // Store transaction details
      sessionStorage.setItem('payment_completed', 'true');
      sessionStorage.setItem('transaction_hash', mockTxHash);
      sessionStorage.setItem('payment_method', 'bitcoin');
      
      // Call the completion handler
      onPaymentComplete(mockTxHash);
    }, 3000);
  };
  
  return (
    <div className="bg-orange-50 rounded-lg p-6">
      <div className="flex items-center justify-center mb-4">
        <Bitcoin className="h-12 w-12 text-orange-500" />
      </div>
      
      <h3 className="text-lg font-medium text-center mb-2">Bitcoin Payment</h3>
      <p className="text-sm text-center mb-6">Pay securely using Bitcoin</p>
      
      <Tabs defaultValue="qr" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="qr" className="space-y-4">
          <div className="bg-white p-4 rounded-md flex flex-col items-center">
            <div className="border border-orange-200 p-2 rounded-md mb-3">
              <QrCode className="h-32 w-32 text-orange-500" />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Send exactly</p>
              <p className="font-bold text-xl">{btcAmount} BTC</p>
              <p className="text-sm text-muted-foreground mt-1">≈ ₹{amount}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label>Bitcoin Address</Label>
            <div className="flex">
              <Input 
                value={receivingAddress} 
                readOnly 
                className="flex-1 bg-white text-sm font-mono"
              />
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="ml-2"
                onClick={handleCopyAddress}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePretendPayment}
              className="w-full"
            >
              I've sent the payment
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2 mt-4 border-t pt-4">
            <p>Please send the exact amount shown above.</p>
            <p>After sending, the transaction typically confirms in 10-60 minutes.</p>
            <a 
              href="https://www.blockchain.com/explorer" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Verify on blockchain explorer
            </a>
          </div>
        </TabsContent>
        
        <TabsContent value="manual">
          <form onSubmit={handleSubmitManualPayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Your Bitcoin Wallet Address</Label>
              <Input
                id="walletAddress"
                placeholder="e.g., 3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="font-mono text-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Network</Label>
              <RadioGroup
                value={network}
                onValueChange={setNetwork}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Bitcoin Mainnet" id="mainnet" />
                  <Label htmlFor="mainnet" className="font-normal cursor-pointer">
                    Bitcoin Mainnet
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Lightning Network" id="lightning" />
                  <Label htmlFor="lightning" className="font-normal cursor-pointer">
                    Lightning Network (Faster)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-white p-3 rounded-md mt-4">
              <p className="text-sm mb-1">Amount to pay:</p>
              <p className="font-bold text-lg">{btcAmount} BTC</p>
              <p className="text-sm text-muted-foreground">(₹{amount})</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Payment'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};
