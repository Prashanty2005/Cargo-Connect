
import { CircleDollarSign, Clock, MapPin, Shield, Truck, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: CircleDollarSign,
    title: 'Save Money',
    description: 'Reduce shipping costs by utilizing existing vehicle routes and available space.',
  },
  {
    icon: Truck,
    title: 'Optimize Space',
    description: 'Vehicle owners can maximize profitability by filling empty capacity.',
  },
  {
    icon: MapPin,
    title: 'Route Matching',
    description: 'Intelligent matching of shipments with vehicles already going to the same destination.',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Verified drivers and secure transaction process ensures your goods are in safe hands.',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Follow your shipment from pickup to delivery with real-time status updates.',
  },
  {
    icon: UserCheck,
    title: 'Verified Profiles',
    description: 'All vehicle owners and shippers are verified for reliability and trust.',
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why choose <span className="text-primary">Cargo Connect</span>?
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our platform connects vehicle owners with shippers, creating an efficient logistics network that benefits everyone.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-card p-8 relative overflow-hidden group"
              variants={itemVariants}
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary mr-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground relative">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
