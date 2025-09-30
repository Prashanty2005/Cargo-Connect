
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, PlusCircle, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

// Mock payment methods
const mockPaymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "04/25", default: true },
  { id: 2, type: "Mastercard", last4: "5555", expiry: "07/26", default: false },
];

// Mock invoices
const mockInvoices = [
  { id: "INV-001", date: "2023-10-15", amount: 125.00, status: "Paid" },
  { id: "INV-002", date: "2023-11-15", amount: 125.00, status: "Paid" },
  { id: "INV-003", date: "2023-12-15", amount: 150.00, status: "Paid" },
  { id: "INV-004", date: "2024-01-15", amount: 150.00, status: "Pending" },
];

const Billing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: ""
  });

  const handleAddCard = () => {
    // In a real app, this would call an API to add the card
    toast.success("Payment method added successfully!");
    setShowAddCard(false);
    // Reset form
    setNewCard({
      name: "",
      number: "",
      expiry: "",
      cvc: ""
    });
  };

  const handleRemoveCard = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success("Payment method removed successfully");
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      default: method.id === id
    })));
    toast.success("Default payment method updated");
  };

  if (!user) {
    return <div>Loading billing information...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-4xl mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Billing</h1>
            <p className="text-muted-foreground">Manage your billing information and payment methods</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-secondary p-3">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {method.type === "Visa" ? (
                          <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                        ) : (
                          <div className="w-10 h-7 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {method.type} •••• {method.last4}
                          {method.default && <span className="ml-2 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">Default</span>}
                        </p>
                        <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!method.default && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set as default
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveCard(method.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}

                {showAddCard ? (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">Add Payment Method</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input 
                          id="card-name" 
                          placeholder="John Doe"
                          value={newCard.name}
                          onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input 
                          id="card-number" 
                          placeholder="4242 4242 4242 4242"
                          value={newCard.number}
                          onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY"
                            value={newCard.expiry}
                            onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input 
                            id="cvc" 
                            placeholder="123"
                            value={newCard.cvc}
                            onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" onClick={() => setShowAddCard(false)}>Cancel</Button>
                        <Button onClick={handleAddCard}>Add Card</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowAddCard(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent invoices and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <Separator />
                {mockInvoices.map((invoice, index) => (
                  <div key={invoice.id}>
                    <div className="grid grid-cols-4 p-4">
                      <div>{invoice.id}</div>
                      <div>{new Date(invoice.date).toLocaleDateString()}</div>
                      <div>${invoice.amount.toFixed(2)}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          invoice.status === "Paid" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                    {index < mockInvoices.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Billing;
