
import { ArrowRight, Package, Truck, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
      {/* Decorative elements */}
      <div className="absolute -z-10 top-0 left-1/2 right-0 -translate-x-1/2 h-full w-full max-w-7xl mx-auto">
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium text-primary bg-primary/10 rounded-full">
              Connecting empty vehicle space with shipment needs
            </div>
          </motion.div>

          <motion.h1
            className="text-balance mb-6 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The smart way to <span className="text-primary">ship goods</span> and utilize <span className="text-primary">empty vehicle space</span>
          </motion.h1>

          <motion.p 
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Cargo Connect connects goods vehicles with empty space to people who need to ship goods to the same destination. Save money, reduce emissions, and make logistics more efficient.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg" className="rounded-xl px-8 group">
              <Link to="/vehicles">
                Find Available Vehicles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8">
              <Link to="/post">Post Available Space</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
            <div className="h-full w-full bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center">
              <div className="text-center p-10 text-white">
                <motion.div 
                  className="flex flex-col md:flex-row items-center justify-center gap-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <Truck className="h-10 w-10" />
                    </div>
                    <p className="text-lg font-medium">Vehicle with Empty Space</p>
                  </div>
                  
                  <motion.div 
                    className="w-16 h-16 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCcw className="h-10 w-10" />
                  </motion.div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <Package className="h-10 w-10" />
                    </div>
                    <p className="text-lg font-medium">Goods Needing Transport</p>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="mt-8 text-xl font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  Cargo Connect brings them together for efficient logistics
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
