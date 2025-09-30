import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import Notifications from './pages/Notifications';
import Services from './pages/Services';
import Vehicles from './pages/Vehicles';
import RouteMatching from './pages/RouteMatching';
import Shipments from './pages/Shipments';
import ShipmentHistory from './pages/ShipmentHistory';
import ShipmentDetails from './pages/ShipmentDetails';
import ShipmentTracking from './pages/ShipmentTracking';
import ShipmentPosting from './pages/ShipmentPosting';
import Post from './pages/Post';
import VehicleRegistration from './pages/VehicleRegistration';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import SecurePayments from './pages/SecurePayments';
import SecurePaymentsLearnMore from './pages/SecurePaymentsLearnMore';
import BlockchainPayment from './pages/BlockchainPayment';
import QrCodePayment from './pages/DummyPayment';
import NotFound from './pages/NotFound';
import { Toaster } from 'sonner';
import ContactVehicleOwner from './pages/ContactVehicleOwner';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/services" element={<Services />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/contact-vehicle-owner/:id" element={<ContactVehicleOwner />} />
        <Route path="/route-matching" element={<RouteMatching />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/shipment-history" element={<ShipmentHistory />} />
        <Route path="/shipment-details/:id" element={<ShipmentDetails />} />
        <Route path="/shipment-tracking" element={<ShipmentTracking />} />
        <Route path="/shipment-posting" element={<ShipmentPosting />} />
        <Route path="/post" element={<Post />} />
        <Route path="/vehicle-registration" element={<VehicleRegistration />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/secure-payments" element={<SecurePayments />} />
        <Route path="/secure-payments/learn-more" element={<SecurePaymentsLearnMore />} />
        <Route path="/blockchain-payment" element={<BlockchainPayment />} />
        <Route path="/qr-code-payment" element={<QrCodePayment />} />
        <Route path="/dummy-payment" element={<QrCodePayment />} />
        
        {/* Add the new payment routes */}
        <Route path="/payment/blockchain" element={<BlockchainPayment />} />
        <Route path="/payment/qrcode" element={<QrCodePayment />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
