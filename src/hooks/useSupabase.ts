
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ShipmentDetails, PaymentDetails } from '@/services/apiService';
import { PaymentMethod } from '@/utils/paymentUtils';

export const useSupabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get all shipments for the current user
  const getShipments = async (): Promise<ShipmentDetails[]> => {
    if (!user) {
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('shipper_id', user.id);

      if (error) {
        throw new Error(error.message);
      }
      
      // Map Supabase data to our ShipmentDetails interface
      return data.map(item => ({
        id: item.id,
        status: item.status,
        origin: item.origin,
        destination: item.destination,
        date: new Date(item.date).toISOString().split('T')[0],
        vehicle: item.vehicle_id || 'Unassigned',
        tracking: item.tracking_number || 'Pending',
        capacity: item.capacity,
        price: item.price,
        estimatedDelivery: item.estimated_delivery ? new Date(item.estimated_delivery).toISOString().split('T')[0] : 'Not specified',
        description: item.description || '',
        weightLimit: item.weight_limit || 'Not specified',
        insuranceIncluded: item.insurance_included || false,
        specialHandling: item.special_handling || false,
        notes: item.notes,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch shipments';
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get shipment by ID
  const getShipmentById = async (id: string): Promise<ShipmentDetails | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        return undefined;
      }

      return {
        id: data.id,
        status: data.status,
        origin: data.origin,
        destination: data.destination,
        date: new Date(data.date).toISOString().split('T')[0],
        vehicle: data.vehicle_id || 'Unassigned',
        tracking: data.tracking_number || 'Pending',
        capacity: data.capacity,
        price: data.price,
        estimatedDelivery: data.estimated_delivery ? new Date(data.estimated_delivery).toISOString().split('T')[0] : 'Not specified',
        description: data.description || '',
        weightLimit: data.weight_limit || 'Not specified',
        insuranceIncluded: data.insurance_included || false,
        specialHandling: data.special_handling || false,
        notes: data.notes,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch shipment';
      setError(errorMessage);
      toast.error(errorMessage);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new shipment
  const createShipment = async (shipmentData: Omit<ShipmentDetails, 'id'>): Promise<ShipmentDetails | null> => {
    if (!user) {
      toast.error('You must be logged in to create a shipment');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Format the data for Supabase
      const supabaseShipmentData = {
        shipper_id: user.id,
        origin: shipmentData.origin,
        destination: shipmentData.destination,
        date: new Date(shipmentData.date).toISOString(),
        capacity: shipmentData.capacity,
        price: shipmentData.price,
        description: shipmentData.description,
        weight_limit: shipmentData.weightLimit,
        insurance_included: shipmentData.insuranceIncluded,
        special_handling: shipmentData.specialHandling,
        notes: shipmentData.notes,
        estimated_delivery: shipmentData.estimatedDelivery ? new Date(shipmentData.estimatedDelivery).toISOString() : null,
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('shipments')
        .insert(supabaseShipmentData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Shipment created successfully');

      return {
        id: data.id,
        status: data.status,
        origin: data.origin,
        destination: data.destination,
        date: new Date(data.date).toISOString().split('T')[0],
        vehicle: data.vehicle_id || 'Unassigned',
        tracking: data.tracking_number || 'Pending',
        capacity: data.capacity,
        price: data.price,
        estimatedDelivery: data.estimated_delivery ? new Date(data.estimated_delivery).toISOString().split('T')[0] : 'Not specified',
        description: data.description || '',
        weightLimit: data.weight_limit || 'Not specified',
        insuranceIncluded: data.insurance_included || false,
        specialHandling: data.special_handling || false,
        notes: data.notes,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create shipment';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Process blockchain payment
  const processBlockchainPayment = async (
    shipmentId: string,
    amount: number,
    currency: string,
    network: string,
    walletAddress: string
  ): Promise<PaymentDetails | null> => {
    if (!user) {
      toast.error('You must be logged in to make a payment');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('blockchain-payment', {
        body: {
          shipmentId,
          amount,
          currency,
          network,
          walletAddress,
          paymentMethod: 'blockchain'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.message || 'Payment processing failed');
      }

      toast.success('Blockchain payment initiated', {
        description: `Your transaction is being processed on the ${network} network`,
      });

      return {
        shipmentId,
        amount,
        currency,
        description: `Blockchain payment for shipment ${shipmentId}`,
        status: 'pending',
        transactionId: data.transaction_hash
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process blockchain payment';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Process Bitcoin payment
  const processBitcoinPayment = async (
    shipmentId: string,
    amount: number,
    currency: string,
    network: string,
    walletAddress: string
  ): Promise<PaymentDetails | null> => {
    if (!user) {
      toast.error('You must be logged in to make a payment');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('blockchain-payment', {
        body: {
          shipmentId,
          amount,
          currency,
          network,
          walletAddress,
          paymentMethod: 'bitcoin'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.message || 'Payment processing failed');
      }

      toast.success('Bitcoin payment initiated', {
        description: `Your transaction is being processed on the ${network} network. Estimated confirmation time: ${data.estimated_confirmation}`,
      });

      return {
        shipmentId,
        amount,
        currency,
        description: `Bitcoin payment for shipment ${shipmentId}`,
        status: 'pending',
        transactionId: data.transaction_hash
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process Bitcoin payment';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get user's vehicles
  const getUserVehicles = async () => {
    if (!user) {
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch vehicles';
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new vehicle
  const createVehicle = async (vehicleData: {
    vehicle_type: string;
    model: string;
    capacity: string;
    license_plate: string;
    origin?: string;
    destination?: string;
    departure_date?: string;
  }) => {
    if (!user) {
      toast.error('You must be logged in to register a vehicle');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabaseVehicleData = {
        ...vehicleData,
        owner_id: user.id,
        departure_date: vehicleData.departure_date ? new Date(vehicleData.departure_date).toISOString() : null,
        available: true
      };

      const { data, error } = await supabase
        .from('vehicles')
        .insert(supabaseVehicleData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Vehicle registered successfully');
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register vehicle';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get user's notifications
  const getUserNotifications = async () => {
    if (!user) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      console.error('Error fetching notifications:', err);
      return [];
    }
  };

  // Mark notification as read
  const markNotificationAsRead = async (notificationId: string) => {
    if (!user) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (err) {
      console.error('Error marking notification as read:', err);
      return false;
    }
  };

  // Set up real-time updates for notifications
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('notification-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          toast.info(payload.new.title, {
            description: payload.new.message,
            action: {
              label: 'View',
              onClick: () => window.open(payload.new.link || '/notifications', '_blank'),
            },
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    isLoading,
    error,
    getShipments,
    getShipmentById,
    createShipment,
    processBlockchainPayment,
    processBitcoinPayment,
    getUserVehicles,
    createVehicle,
    getUserNotifications,
    markNotificationAsRead
  };
};
