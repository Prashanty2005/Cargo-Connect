
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { paymentMethods } from '@/features/secure-payments/data/paymentMethods';
import { PaymentMethodCard } from '@/features/secure-payments/components/PaymentMethodCard';
import { HowItWorks } from '@/features/secure-payments/components/HowItWorks';
import { PaymentFaq } from '@/features/secure-payments/components/PaymentFaq';
import { AlertCards } from '@/features/secure-payments/components/AlertCards';
import { Banner } from '@/features/secure-payments/components/Banner';

const SecurePayments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1 
              className="mb-4 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Secure <span className="text-primary">Payments</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Pay safely with our trusted payment processing system
            </motion.p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="bg-card border rounded-xl overflow-hidden shadow-sm mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Banner />
              
              <div className="p-8">
                <h3 className="text-xl font-medium mb-6">Payment Methods</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard key={method.id} {...method} />
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <HowItWorks />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <PaymentFaq />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AlertCards />
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurePayments;
