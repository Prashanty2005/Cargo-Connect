
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ClipboardCopy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getBlockchainExplorerUrl } from '@/utils/paymentUtils';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get payment details from location state or session storage
    const details = location.state;
    if (details) {
      setPaymentDetails(details);
      // Store in session storage as backup
      sessionStorage.setItem('payment_completed', 'true');
      sessionStorage.setItem('payment_details', JSON.stringify(details));
    } else {
      // Try to get from session storage
      const completed = sessionStorage.getItem('payment_completed');
      const storedDetails = sessionStorage.getItem('payment_details');
      
      if (completed === 'true' && storedDetails) {
        setPaymentDetails(JSON.parse(storedDetails));
      } else {
        // No payment details found, redirect to home or payment page
        navigate('/payment');
      }
    }
  }, [location.state, navigate]);

  const copyTransactionId = () => {
    if (paymentDetails?.transactionId) {
      navigator.clipboard.writeText(paymentDetails.transactionId);
      setCopied(true);
      toast.success('Transaction ID copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-8">
          <p className="text-center">Please log in to view payment details.</p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
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
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 overflow-hidden">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-white/20 p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="h-8 w-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-center">Payment Successful!</h1>
                  <p className="text-center mt-2 text-white/80">
                    Your payment has been processed and confirmed.
                  </p>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium mb-2">Transaction Details</h2>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Method</span>
                          <span className="font-medium capitalize">
                            {paymentDetails?.paymentMethod || 'Card'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Transaction ID</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs md:text-sm truncate max-w-[180px]">
                              {paymentDetails?.transactionId || 'TX-123456789'}
                            </span>
                            <button
                              onClick={copyTransactionId}
                              className="text-muted-foreground hover:text-foreground"
                              title="Copy transaction ID"
                            >
                              <ClipboardCopy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {paymentDetails?.network && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Network</span>
                            <span>{paymentDetails.network}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date & Time</span>
                          <span>{new Date().toLocaleString()}</span>
                        </div>
                        
                        {(paymentDetails?.paymentMethod === 'blockchain' || 
                         paymentDetails?.paymentMethod === 'bitcoin') && 
                         paymentDetails?.transactionId && (
                          <div className="pt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs"
                              asChild
                            >
                              <a 
                                href={getBlockchainExplorerUrl(
                                  paymentDetails.transactionId, 
                                  paymentDetails.network || 'ethereum'
                                )} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                View on Blockchain Explorer
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {paymentDetails?.shipment && (
                      <div>
                        <h2 className="text-lg font-medium mb-2">Shipment Details</h2>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipment ID</span>
                            <span className="font-mono">
                              {paymentDetails.shipment.id}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Route</span>
                            <span>
                              {paymentDetails.shipment.origin} to {paymentDetails.shipment.destination}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount Paid</span>
                            <span className="font-medium">
                              ₹{paymentDetails.shipment.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between gap-4 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1" 
                        asChild
                      >
                        <Link to="/dashboard">Go to Dashboard</Link>
                      </Button>
                      <Button 
                        className="flex-1" 
                        asChild
                      >
                        <Link to="/shipment-tracking">Track Shipment</Link>
                      </Button>
                    </div>
                    
                    <div className="text-center text-sm text-muted-foreground pt-2">
                      A confirmation email has been sent to your registered email address.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
