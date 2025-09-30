// Mock API service to simulate backend API calls

import { VehicleCardProps } from '@/components/VehicleCard';

// Mock vehicles data with Indian cities
const VEHICLES_DATA: VehicleCardProps[] = [
  {
    id: '1',
    vehicleType: 'Semi Truck',
    ownerName: 'Rajesh Kumar',
    availableSpace: '40ft Container',
    origin: 'Delhi',
    destination: 'Mumbai',
    departureDate: 'May 15, 2023',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '2',
    vehicleType: 'Box Truck',
    ownerName: 'Priya Sharma',
    availableSpace: '20ft Container',
    origin: 'Bangalore',
    destination: 'Chennai',
    departureDate: 'May 20, 2023'
  },
  {
    id: '3',
    vehicleType: 'Cargo Van',
    ownerName: 'Amit Patel',
    availableSpace: '8ft x 5ft x 4ft',
    origin: 'Hyderabad',
    destination: 'Pune',
    departureDate: 'May 18, 2023',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
  },
  {
    id: '4',
    vehicleType: 'Flatbed Truck',
    ownerName: 'Kavita Singh',
    availableSpace: '30ft Flatbed',
    origin: 'Ahmedabad',
    destination: 'Jaipur',
    departureDate: 'May 25, 2023'
  },
  {
    id: '5',
    vehicleType: 'Refrigerated Truck',
    ownerName: 'Vikram Reddy',
    availableSpace: '25ft Refrigerated',
    origin: 'Kolkata',
    destination: 'Bhubaneswar',
    departureDate: 'May 23, 2023',
    image: 'https://images.unsplash.com/photo-1626664334720-1417bab791d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '6',
    vehicleType: 'Tanker Truck',
    ownerName: 'Suresh Mehta',
    availableSpace: '20,000 Gallons',
    origin: 'Surat',
    destination: 'Indore',
    departureDate: 'May 30, 2023'
  }
];

// Mock shipment data
export interface ShipmentDetails {
  id: string;
  status: string;
  origin: string;
  destination: string;
  date: string;
  vehicle: string;
  tracking: string;
  capacity: string;
  price: number;
  estimatedDelivery: string;
  description: string;
  weightLimit: string;
  insuranceIncluded: boolean;
  specialHandling: boolean;
  notes?: string;
  shipper?: string;
  receiver?: string;
}

// Sample shipment data with Indian cities
const SHIPMENTS_DATA: ShipmentDetails[] = [
  {
    id: 'SHP-1234',
    status: 'In Transit',
    origin: 'Mumbai, MH',
    destination: 'Pune, MH',
    date: '2023-06-15',
    vehicle: 'Cargo Van',
    tracking: 'TRK-9875',
    capacity: '500 kg',
    price: 2999,
    estimatedDelivery: '2023-06-17',
    description: 'Express shipment of manufactured goods',
    weightLimit: '1000 kg',
    insuranceIncluded: true,
    specialHandling: false,
    notes: 'Handle with care. Deliver during business hours only.',
    shipper: 'Reliance Industries Ltd.',
    receiver: 'Infosys Pune Campus'
  },
  {
    id: 'SHP-5678',
    status: 'Delivered',
    origin: 'Delhi, DL',
    destination: 'Jaipur, RJ',
    date: '2023-06-12',
    vehicle: 'Box Truck',
    tracking: 'TRK-6543',
    capacity: '1500 kg',
    price: 4599,
    estimatedDelivery: '2023-06-14',
    description: 'Standard delivery of retail merchandise',
    weightLimit: '2000 kg',
    insuranceIncluded: true,
    specialHandling: false,
    notes: 'No specific delivery instructions',
    shipper: 'Amazon Fulfillment Services',
    receiver: 'Pink City Mall, Jaipur'
  },
  {
    id: 'SHP-9012',
    status: 'Pending',
    origin: 'Bangalore, KA',
    destination: 'Chennai, TN',
    date: '2023-06-18',
    vehicle: 'Semi-Trailer',
    tracking: 'TRK-3210',
    capacity: '5000 kg',
    price: 8999,
    estimatedDelivery: '2023-06-21',
    description: 'Bulk shipment of electronic components',
    weightLimit: '7500 kg',
    insuranceIncluded: true,
    specialHandling: true,
    notes: 'Temperature sensitive electronics. Maintain between 10-25°C.',
    shipper: 'Wipro Electronics',
    receiver: 'Cognizant Technology Solutions'
  },
  {
    id: 'SHP-3456',
    status: 'Processing',
    origin: 'Hyderabad, TS',
    destination: 'Vijayawada, AP',
    date: '2023-06-20',
    vehicle: 'Pickup Truck',
    tracking: 'TRK-7890',
    capacity: '800 kg',
    price: 1999,
    estimatedDelivery: '2023-06-22',
    description: 'Express delivery of perishable goods',
    weightLimit: '1000 kg',
    insuranceIncluded: false,
    specialHandling: true,
    notes: 'Perishable food items. Deliver within 24 hours.',
    shipper: 'Organic Harvest Co.',
    receiver: 'Fresh Foods Market'
  },
  {
    id: 'SHP-7890',
    status: 'Delivered',
    origin: 'Ahmedabad, GJ',
    destination: 'Surat, GJ',
    date: '2023-06-10',
    vehicle: 'Box Truck',
    tracking: 'TRK-4567',
    capacity: '1200 kg',
    price: 2499,
    estimatedDelivery: '2023-06-12',
    description: 'Standard delivery of textiles',
    weightLimit: '1500 kg',
    insuranceIncluded: true,
    specialHandling: false,
    notes: 'Textile rolls, keep dry and clean',
    shipper: 'Gujarat Textiles Ltd.',
    receiver: 'Surat Fashion Hub'
  },
  {
    id: 'SHP-2345',
    status: 'In Transit',
    origin: 'Kolkata, WB',
    destination: 'Bhubaneswar, OR',
    date: '2023-06-22',
    vehicle: 'Container Truck',
    tracking: 'TRK-5432',
    capacity: '3000 kg',
    price: 5999,
    estimatedDelivery: '2023-06-24',
    description: 'Industrial machinery transport',
    weightLimit: '5000 kg',
    insuranceIncluded: true,
    specialHandling: true,
    notes: 'Heavy machinery, requires special loading equipment',
    shipper: 'Eastern Industrial Solutions',
    receiver: 'Odisha Manufacturing Plant'
  },
  {
    id: 'SHP-6789',
    status: 'Processing',
    origin: 'Chennai, TN',
    destination: 'Coimbatore, TN',
    date: '2023-06-25',
    vehicle: 'Refrigerated Van',
    tracking: 'TRK-2109',
    capacity: '1000 kg',
    price: 3499,
    estimatedDelivery: '2023-06-27',
    description: 'Cold chain logistics for pharmaceuticals',
    weightLimit: '1500 kg',
    insuranceIncluded: true,
    specialHandling: true,
    notes: 'Temperature-controlled shipping. Maintain 2-8°C.',
    shipper: 'MedLife Pharmaceuticals',
    receiver: 'Regional Medical Distributor'
  },
  {
    id: 'SHP-4567',
    status: 'Pending',
    origin: 'Pune, MH',
    destination: 'Nagpur, MH',
    date: '2023-06-28',
    vehicle: 'Flatbed Truck',
    tracking: 'TRK-8765',
    capacity: '4000 kg',
    price: 6999,
    estimatedDelivery: '2023-06-30',
    description: 'Construction equipment transport',
    weightLimit: '6000 kg',
    insuranceIncluded: true,
    specialHandling: true,
    notes: 'Large construction vehicles. Requires specialized loading.',
    shipper: 'Maharashtra Infrastructure Co.',
    receiver: 'Construction Site Management'
  },
  {
    id: 'SHP-8901',
    status: 'In Transit',
    origin: 'Lucknow, UP',
    destination: 'Kanpur, UP',
    date: '2023-06-30',
    vehicle: 'Box Truck',
    tracking: 'TRK-1234',
    capacity: '2000 kg',
    price: 4299,
    estimatedDelivery: '2023-07-02',
    description: 'Agricultural equipment and supplies',
    weightLimit: '3000 kg',
    insuranceIncluded: false,
    specialHandling: false,
    notes: 'Agricultural machinery and fertilizer transport',
    shipper: 'UP Agricultural Supplies',
    receiver: 'Rural Farming Cooperative'
  },
  {
    id: 'SHP-5432',
    status: 'Delivered',
    origin: 'Surat, GJ',
    destination: 'Vadodara, GJ',
    date: '2023-06-15',
    vehicle: 'Cargo Van',
    tracking: 'TRK-6789',
    capacity: '800 kg',
    price: 2299,
    estimatedDelivery: '2023-06-16',
    description: 'Textile product distribution',
    weightLimit: '1200 kg',
    insuranceIncluded: true,
    specialHandling: false,
    notes: 'Packaged textile goods, handle with standard care',
    shipper: 'Gujarat Textile Exports',
    receiver: 'Regional Retail Distribution Center'
  }
];

// Function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all vehicles
export const getVehicles = async (): Promise<VehicleCardProps[]> => {
  // Simulate API delay
  await delay(800);
  return VEHICLES_DATA;
};

// Get vehicle by ID
export const getVehicleById = async (id: string): Promise<VehicleCardProps | undefined> => {
  // Simulate API delay
  await delay(500);
  return VEHICLES_DATA.find(vehicle => vehicle.id === id);
};

// Search vehicles by query
export const searchVehicles = async (query: string): Promise<VehicleCardProps[]> => {
  // Simulate API delay
  await delay(600);
  
  if (!query) return VEHICLES_DATA;
  
  const lowerQuery = query.toLowerCase();
  return VEHICLES_DATA.filter(vehicle => 
    vehicle.vehicleType.toLowerCase().includes(lowerQuery) ||
    vehicle.origin.toLowerCase().includes(lowerQuery) ||
    vehicle.destination.toLowerCase().includes(lowerQuery)
  );
};

// Filter vehicles by criteria
export interface FilterCriteria {
  vehicleType?: string;
  origin?: string;
  destination?: string;
  departureDate?: string;
}

export const filterVehicles = async (criteria: FilterCriteria): Promise<VehicleCardProps[]> => {
  // Simulate API delay
  await delay(700);
  
  return VEHICLES_DATA.filter(vehicle => {
    let match = true;
    
    if (criteria.vehicleType && !vehicle.vehicleType.includes(criteria.vehicleType)) {
      match = false;
    }
    
    if (criteria.origin && !vehicle.origin.includes(criteria.origin)) {
      match = false;
    }
    
    if (criteria.destination && !vehicle.destination.includes(criteria.destination)) {
      match = false;
    }
    
    if (criteria.departureDate && !vehicle.departureDate.includes(criteria.departureDate)) {
      match = false;
    }
    
    return match;
  });
};

// Create vehicle post (for demo purposes, just returns the input data with an ID)
export const createVehiclePost = async (vehicleData: Omit<VehicleCardProps, 'id'>): Promise<VehicleCardProps> => {
  // Simulate API delay
  await delay(1000);
  
  // Generate a random ID
  const newId = Math.floor(Math.random() * 10000).toString();
  
  // Return the new vehicle with ID
  return {
    id: newId,
    ...vehicleData
  };
};

// Get shipment by ID
export const getShipmentById = async (id: string): Promise<ShipmentDetails | undefined> => {
  // Simulate API delay
  await delay(500);
  return SHIPMENTS_DATA.find(shipment => shipment.id === id);
};

// Get all shipments
export const getShipments = async (): Promise<ShipmentDetails[]> => {
  // Simulate API delay
  await delay(800);
  return SHIPMENTS_DATA;
};

// Mock function to process payment
export interface PaymentDetails {
  shipmentId: string;
  amount: number;
  currency: string;
  description: string;
  status: 'success' | 'pending' | 'failed';
  transactionId: string;
}

export const processPayment = async (shipmentId: string): Promise<PaymentDetails> => {
  // Simulate API delay
  await delay(1000);
  
  const shipment = SHIPMENTS_DATA.find(s => s.id === shipmentId);
  
  if (!shipment) {
    throw new Error('Shipment not found');
  }
  
  // Mock successful payment
  return {
    shipmentId: shipment.id,
    amount: shipment.price,
    currency: 'INR',
    description: `Payment for shipment ${shipment.id}`,
    status: 'success',
    transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`
  };
};
