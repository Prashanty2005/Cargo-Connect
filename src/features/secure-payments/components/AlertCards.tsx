
import { AlertTriangle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AlertCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-medium text-yellow-800 mb-2">Payment Security Alert</h3>
            <p className="text-sm text-yellow-700 mb-3">
              We will never ask for your payment information over phone or email.
              Always ensure you're on our secure payment page before entering payment details.
            </p>
            <Button variant="outline" size="sm" className="border-yellow-300 bg-yellow-100/50 text-yellow-800 hover:bg-yellow-100">
              Security Tips
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-card border rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-2">Need Help with Payments?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Our payment support team is available to assist you with any payment-related queries.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
              <Button variant="secondary" size="sm">
                Chat Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
