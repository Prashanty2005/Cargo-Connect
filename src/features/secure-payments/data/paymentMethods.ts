
import { CreditCard, Wallet, ShieldCheck, ArrowRightLeft, Bitcoin } from 'lucide-react';

export const paymentMethods = [
  {
    id: 'credit-card',
    title: 'Credit/Debit Cards',
    icon: CreditCard,
    description: 'Pay securely using your credit or debit card.',
    advantages: [
      'Instant payment confirmation',
      'No additional fees',
      'Save cards for future payments',
    ],
    processingTime: 'Instant',
    supportedCards: ['Visa', 'Mastercard', 'American Express', 'Discover'],
  },
  {
    id: 'upi',
    title: 'UPI Payments',
    icon: Wallet,
    description: 'Use any UPI app (Google Pay, PhonePe, Paytm, etc.) for quick payments.',
    advantages: [
      'Quick and convenient',
      'No need to enter card details',
      'Widely supported across India',
    ],
    processingTime: 'Instant',
    supportedApps: ['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay'],
  },
  {
    id: 'netbanking',
    title: 'Net Banking',
    icon: ShieldCheck,
    description: 'Transfer directly from your bank account using net banking.',
    advantages: [
      'Supported by all major banks',
      'Secure bank-level encryption',
      'Transaction records in your bank statement',
    ],
    processingTime: '1-2 hours',
    supportedBanks: ['HDFC', 'SBI', 'ICICI', 'Axis', 'and 50+ more'],
  },
  {
    id: 'blockchain',
    title: 'Blockchain Payments',
    icon: ArrowRightLeft,
    description: 'Pay using cryptocurrencies for enhanced security and privacy.',
    advantages: [
      'Enhanced transaction privacy',
      'Lower transaction fees',
      'International payments without exchange fees',
    ],
    processingTime: '10-30 minutes',
    supportedCurrencies: ['Bitcoin', 'Ethereum', 'USDC', 'USDT'],
  },
  {
    id: 'bitcoin',
    title: 'Bitcoin Payments',
    icon: Bitcoin,
    description: 'Pay directly with Bitcoin for maximum security and global accessibility.',
    advantages: [
      'Direct peer-to-peer transactions',
      'No third-party intermediaries',
      'Global payment option independent of banking systems',
      'Irreversible transactions preventing chargebacks'
    ],
    processingTime: '10-60 minutes',
    networkOptions: ['Bitcoin Mainnet', 'Lightning Network'],
  },
];
