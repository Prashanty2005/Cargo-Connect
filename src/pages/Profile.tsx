
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Truck, Bell, ShieldCheck, CreditCard, LayoutDashboard } from "lucide-react";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const { user, logout, getUserDisplayName } = useAuth();
  const navigate = useNavigate();
  const displayName = getUserDisplayName();
  const [name, setName] = useState(displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!");
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-5xl mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-4xl font-semibold text-white">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-6 w-full mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Billing
            </TabsTrigger>
            <TabsTrigger value="shipments" className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Shipments
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                  <p className="text-sm text-muted-foreground">Your email address is used for login and cannot be changed.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>Cancel</Button>
                <Button onClick={handleUpdateProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Your Dashboard</CardTitle>
                <CardDescription>Overview of your activity and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Recent Shipments</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>SHP-1234</span>
                        <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs">Delivered</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>SHP-5678</span>
                        <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs">In Transit</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate("/shipments")}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Payment Due</h3>
                    <p className="text-2xl font-bold">₹4,500</p>
                    <p className="text-sm text-muted-foreground">Due on April 15, 2025</p>
                    <Button 
                      className="w-full mt-4"
                      onClick={() => navigate("/billing")}
                    >
                      Pay Now
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 md:col-span-2">
                    <h3 className="font-medium mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button variant="outline" onClick={() => navigate("/shipment-posting")}>
                        Post Shipment
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/vehicle-registration")}>
                        Register Vehicle
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/route-matching")}>
                        Find Routes
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/dummy-payment")}>
                        Make Payment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your billing details and payment methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                    </div>
                    <Button onClick={() => navigate("/payment")} variant="outline">Manage</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Billing History</p>
                      <p className="text-sm text-muted-foreground">View your past invoices and transactions</p>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipments">
            <Card>
              <CardHeader>
                <CardTitle>Shipment History</CardTitle>
                <CardDescription>View and manage your past and current shipments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => navigate("/shipments")}>View All Shipments</Button>
                <Button className="w-full" variant="outline" onClick={() => navigate("/shipment-posting")}>Post New Shipment</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control which notifications you receive.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Notification preferences will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password for better security</p>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4 bg-red-50 dark:bg-red-950/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-600 dark:text-red-400">Logout from all devices</p>
                      <p className="text-sm text-muted-foreground">This will log you out from all devices</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={logout}>Logout All</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
