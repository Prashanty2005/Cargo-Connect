
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlockchainPaymentRequest {
  shipmentId: string;
  amount: number;
  currency: string;
  network: string;
  walletAddress: string;
  paymentMethod?: string; // Added to distinguish between general blockchain and Bitcoin
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { shipmentId, amount, currency, network, walletAddress, paymentMethod = 'blockchain' } = await req.json() as BlockchainPaymentRequest;
    
    // Get user ID from JWT token
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle different blockchain payment methods
    const isBitcoin = paymentMethod === 'bitcoin';
    console.log(`Processing ${isBitcoin ? 'Bitcoin' : 'blockchain'} payment of ${amount} ${currency} on ${network} network`);
    
    // Bitcoin-specific processing logic
    let transactionHash;
    let estimatedConfirmationTime;
    
    if (isBitcoin) {
      // Simulate Bitcoin transaction - in real implementation, this would call a Bitcoin node or service
      if (network === 'Lightning Network') {
        // Lightning transactions are nearly instant
        transactionHash = `lntx_${Math.random().toString(36).substring(2, 15)}`;
        estimatedConfirmationTime = 'under 1 minute';
      } else {
        // Regular Bitcoin transactions take longer
        transactionHash = `btctx_${Math.random().toString(36).substring(2, 15)}`;
        estimatedConfirmationTime = 'about 30 minutes';
      }
    } else {
      // Generic blockchain transaction
      transactionHash = `tx_${Math.random().toString(36).substring(2, 15)}`;
      estimatedConfirmationTime = '10-30 minutes';
    }
    
    // Create payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('blockchain_payments')
      .insert({
        shipment_id: shipmentId,
        user_id: user.id,
        transaction_hash: transactionHash,
        amount: amount,
        currency: currency,
        status: 'processing', // Initial status
        blockchain_network: network,
        wallet_address: walletAddress
      })
      .select()
      .single();
    
    if (paymentError) {
      console.error('Payment insert error:', paymentError);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Update shipment payment_status
    const { error: shipmentError } = await supabase
      .from('shipments')
      .update({ 
        payment_status: 'processing',
        payment_method: isBitcoin ? 'bitcoin' : 'blockchain',
        payment_details: { 
          transaction_hash: transactionHash,
          blockchain_network: network,
          estimated_confirmation: estimatedConfirmationTime
        }
      })
      .eq('id', shipmentId);
    
    if (shipmentError) {
      console.error('Shipment update error:', shipmentError);
      // Payment was created but shipment update failed
      // In a real app, you might want to rollback or handle this case differently
    }
    
    // Simulate confirmation after a delay (in a real app this would be a webhook or polling)
    // For demo purposes, we'll update the status after 5 seconds
    setTimeout(async () => {
      // Update payment status
      const { error: updateError } = await supabase
        .from('blockchain_payments')
        .update({ status: 'completed' })
        .eq('id', payment.id);
      
      if (updateError) {
        console.error('Error updating payment status:', updateError);
      }
      
      // Update shipment payment status
      const { error: shipUpdateError } = await supabase
        .from('shipments')
        .update({ payment_status: 'paid' })
        .eq('id', shipmentId);
      
      if (shipUpdateError) {
        console.error('Error updating shipment payment status:', shipUpdateError);
      }
      
      // Create notification for user
      const { error: notifError } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title: isBitcoin ? 'Bitcoin Payment Confirmed' : 'Blockchain Payment Confirmed',
          message: `Your ${isBitcoin ? 'Bitcoin' : 'blockchain'} payment of ${amount} ${currency} for shipment ${shipmentId} has been confirmed.`,
          link: `/shipment/${shipmentId}`
        });
      
      if (notifError) {
        console.error('Error creating notification:', notifError);
      }
    }, isBitcoin && network === 'Lightning Network' ? 2000 : 5000); // Lightning is faster
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Payment is being processed on the ${network}`,
        transaction_hash: transactionHash,
        payment_id: payment.id,
        estimated_confirmation: estimatedConfirmationTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
