
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SecuritySections } from '@/features/secure-payments/learn-more/components/SecuritySection';
import { CertificationsSection } from '@/features/secure-payments/learn-more/components/CertificationsSection';
import { SecurityResponsibilitySection } from '@/features/secure-payments/learn-more/components/SecurityResponsibilitySection';

const SecurePaymentsLearnMore = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-8">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/secure-payments">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Secure Payments
              </Link>
            </Button>
            
            <motion.h1 
              className="text-balance text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Understanding Our <span className="text-primary">Payment Security</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We prioritize the security of your financial information with multiple layers of protection
            </motion.p>
            
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SecuritySections />
              
              <CertificationsSection />
              
              <SecurityResponsibilitySection />
              
              <div className="text-center pt-6">
                <Button size="lg" asChild>
                  <Link to="/secure-payments">
                    Return to Secure Payments
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurePaymentsLearnMore;
