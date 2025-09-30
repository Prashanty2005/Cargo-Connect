import { Calendar, MapPin, Package, Truck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export interface VehicleCardProps {
  id: string;
  vehicleType: string;
  ownerName: string;
  availableSpace: string;
  origin: string;
  destination: string;
  departureDate: string;
  image?: string;
}

const VehicleCard = ({
  id,
  vehicleType,
  ownerName,
  availableSpace,
  origin,
  destination,
  departureDate,
  image,
}: VehicleCardProps) => {
  const navigate = useNavigate();
  
  const handleContactOwner = () => {
    navigate(`/contact-vehicle-owner/${id}`, { 
      state: { 
        vehicleType,
        ownerName,
        availableSpace,
        origin,
        destination,
        departureDate,
        image
      }
    });
  };

  return (
    <motion.div 
      className="glass-card overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <Badge className="absolute top-4 left-4 z-20">Available</Badge>
        
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-white text-xl font-medium mb-1">{vehicleType}</h3>
          <div className="flex items-center text-white/90">
            <User className="h-4 w-4 mr-1" />
            <span className="text-sm">{ownerName}</span>
          </div>
        </div>
        
        <div className="h-full w-full">
          {image ? (
            <img 
              src={image} 
              alt={vehicleType} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-primary/60 to-primary">
              <Truck className="h-20 w-20 text-white" />
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Route</p>
              <p className="font-medium">
                {origin} → {destination}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Departure Date</p>
              <p className="font-medium">{departureDate}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Package className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Available Space</p>
              <p className="font-medium">{availableSpace}</p>
            </div>
          </div>
        </div>
        
        <Button className="w-full rounded-xl" onClick={handleContactOwner}>Contact Vehicle Owner</Button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
