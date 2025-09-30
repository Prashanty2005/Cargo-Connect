
import { CreditCard, Wallet, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <div className="bg-card border rounded-xl p-6 mb-16">
      <h3 className="text-xl font-medium mb-6">How It Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">1</span>
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-medium mb-1">Choose Service</h4>
          <p className="text-sm text-muted-foreground">Select the shipping service that meets your needs</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">2</span>
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-medium mb-1">Select Payment</h4>
          <p className="text-sm text-muted-foreground">Choose your preferred payment method</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">3</span>
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-medium mb-1">Secure Transaction</h4>
          <p className="text-sm text-muted-foreground">Complete the payment securely through Razorpay</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">4</span>
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-medium mb-1">Confirmation</h4>
          <p className="text-sm text-muted-foreground">Receive immediate payment confirmation and receipt</p>
        </div>
      </div>
    </div>
  );
};
