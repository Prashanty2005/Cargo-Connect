
import { useState } from 'react';
import * as apiService from '@/services/apiService';
import { VehicleCardProps } from '@/components/VehicleCard';
import { FilterCriteria, ShipmentDetails } from '@/services/apiService';
import { processPayment as processPaymentUtil, PaymentMethod } from '@/utils/paymentUtils';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Generic hook for API calls
export const useAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get all vehicles
  const getAllVehicles = async (): Promise<VehicleCardProps[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const vehicles = await apiService.getVehicles();
      return vehicles;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Search vehicles
  const searchVehicles = async (query: string): Promise<VehicleCardProps[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const vehicles = await apiService.searchVehicles(query);
      return vehicles;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Filter vehicles
  const filterVehicles = async (criteria: FilterCriteria): Promise<VehicleCardProps[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const vehicles = await apiService.filterVehicles(criteria);
      return vehicles;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Create vehicle post
  const createVehiclePost = async (vehicleData: Omit<VehicleCardProps, 'id'>): Promise<VehicleCardProps | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newVehicle = await apiService.createVehiclePost(vehicleData);
      return newVehicle;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get shipment by ID
  const getShipmentById = async (id: string): Promise<ShipmentDetails | undefined> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const shipment = await apiService.getShipmentById(id);
      return shipment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  // Get all shipments
  const getShipments = async (): Promise<ShipmentDetails[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const shipments = await apiService.getShipments();
      return shipments;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Process payment with enhanced error handling and success navigation
  const processPayment = async (
    shipmentId: string, 
    paymentMethod: PaymentMethod,
    amount: number
  ): Promise<apiService.PaymentDetails | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use our utility function for processing payments
      const result = await processPaymentUtil(paymentMethod, amount, shipmentId);
      
      if (result.success) {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
        
        // Navigate to success page with the payment method info
        navigate('/payment/success', { 
          state: { 
            paymentMethod,
            transactionId: result.transactionId
          } 
        });
        
        // Return the complete PaymentDetails object
        return {
          shipmentId,
          amount,
          currency: 'INR',
          description: `Payment for shipment ${shipmentId}`,
          status: 'success',
          transactionId: result.transactionId || `TXN-${Math.floor(Math.random() * 1000000)}`
        };
      } else {
        setError(result.error || 'Payment failed');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: errorMessage,
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getAllVehicles,
    searchVehicles,
    filterVehicles,
    createVehiclePost,
    getShipmentById,
    getShipments,
    processPayment
  };
};
