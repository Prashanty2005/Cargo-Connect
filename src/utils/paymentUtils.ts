
import { toast } from "@/components/ui/use-toast";

export type PaymentMethod = 'credit-card' | 'upi' | 'netbanking' | 'blockchain';

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const processPayment = async (
  paymentMethod: PaymentMethod,
  amount: number,
  shipmentId: string
): Promise<PaymentResult> => {
  // In a real app, this would call an API endpoint
  console.log(`Processing ${paymentMethod} payment of ${amount} for shipment ${shipmentId}`);
  
  try {
    // Simulate API call with random success/failure
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate errors for demo purposes (20% chance of error)
    if (Math.random() < 0.2) {
      const errors = {
        'credit-card': 'Card was declined. Please try another card or payment method.',
        'upi': 'UPI transaction failed. Please check your UPI ID and try again.',
        'netbanking': 'Bank server timeout. Please try again later.',
        'blockchain': 'Blockchain network congestion. Please increase gas fee or try later.',
      };
      
      throw new Error(errors[paymentMethod]);
    }
    
    // Generate mock transaction ID
    let transactionId: string;
    
    if (paymentMethod === 'blockchain') {
      transactionId = `0x${Array.from({length: 64}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')}`;
    } else {
      transactionId = `TXN-${Math.floor(Math.random() * 1000000)}`;
    }
    
    // Store in session storage for demo purposes
    sessionStorage.setItem('payment_completed', 'true');
    sessionStorage.setItem('payment_method', paymentMethod);
    
    if (paymentMethod === 'blockchain') {
      sessionStorage.setItem('transaction_hash', transactionId);
    }
    
    return {
      success: true,
      transactionId
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    toast({
      variant: "destructive",
      title: "Payment Failed",
      description: errorMessage,
    });
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export const validatePaymentForm = (
  paymentMethod: string | null,
  formData: Record<string, any>
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
  }
  
  if (paymentMethod === 'credit-card') {
    if (!formData.cardNumber) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      errors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.expiryDate) {
      errors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    
    if (!formData.cvv) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }
  } else if (paymentMethod === 'upi') {
    if (!formData.upiId) {
      errors.upiId = 'UPI ID is required';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(formData.upiId)) {
      errors.upiId = 'Invalid UPI ID format';
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Function to get explorer URL for blockchain transactions
export const getBlockchainExplorerUrl = (transactionHash: string, network: string = 'ethereum'): string => {
  const explorers = {
    ethereum: 'https://etherscan.io/tx/',
    polygon: 'https://polygonscan.com/tx/'
  };
  
  // Default to ethereum
  return `${explorers[network as keyof typeof explorers] || explorers.ethereum}${transactionHash}`;
};
