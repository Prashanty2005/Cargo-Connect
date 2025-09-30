
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Banner = () => {
  return (
    <div className="p-8 bg-primary text-white">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-3">Trusted Payment Processing</h2>
          <p className="mb-6">
            We've partnered with Razorpay, India's leading payment gateway, to ensure 
            your transactions are secure, swift, and reliable.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" asChild>
              <Link to="/services">View Services</Link>
            </Button>
            <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/10" asChild>
              <Link to="/secure-payments/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center">
            <LockKeyhole className="h-14 w-14 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
