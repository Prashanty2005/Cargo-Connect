
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bell, Check, Package, Clock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock notifications
const mockNotifications = [
  { 
    id: 1, 
    type: "shipment", 
    title: "Shipment #12345 has been delivered", 
    description: "Your shipment has been successfully delivered to the destination.",
    timestamp: "2023-12-15T14:32:00Z",
    read: true
  },
  { 
    id: 2, 
    type: "payment", 
    title: "Payment processed", 
    description: "Your payment of $125.00 for shipment #12345 has been processed successfully.",
    timestamp: "2023-12-14T10:15:00Z",
    read: true
  },
  { 
    id: 3, 
    type: "system", 
    title: "Account security alert", 
    description: "There was a new login to your account from a new device.",
    timestamp: "2023-12-13T18:45:00Z",
    read: false
  },
  { 
    id: 4, 
    type: "shipment", 
    title: "Shipment #12346 in transit", 
    description: "Your shipment is currently in transit and expected to arrive on schedule.",
    timestamp: "2023-12-10T09:20:00Z",
    read: false
  },
];

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const handleSavePreferences = () => {
    toast.success("Notification preferences saved");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) {
    return <div>Loading notifications...</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "shipment":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "payment":
        return <Bell className="h-5 w-5 text-green-500" />;
      case "system":
        return <Shield className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-4xl mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Manage your notifications and preferences</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-secondary p-3 relative">
            <Bell className="h-6 w-6 text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                <Check className="h-4 w-4 mr-1" /> 
                Mark all read
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                Clear all
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>
                  Your recent notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div key={notification.id}>
                        <div 
                          className={`p-4 hover:bg-muted/50 rounded-lg transition-colors ${!notification.read ? 'bg-muted/30' : ''}`}
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(notification.timestamp)}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-muted-foreground">You're all caught up!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread">
            <Card>
              <CardHeader>
                <CardTitle>Unread Notifications</CardTitle>
                <CardDescription>
                  Notifications you haven't seen yet
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notifications.filter(n => !n.read).length > 0 ? (
                  <div className="space-y-1">
                    {notifications.filter(n => !n.read).map((notification) => (
                      <div key={notification.id}>
                        <div 
                          className="p-4 hover:bg-muted/50 rounded-lg transition-colors bg-muted/30"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-primary">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(notification.timestamp)}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">All caught up!</h3>
                    <p className="text-muted-foreground">You have no unread notifications.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications to your email address</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailEnabled}
                        onCheckedChange={setEmailEnabled}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={pushEnabled}
                        onCheckedChange={setPushEnabled}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={smsEnabled}
                        onCheckedChange={setSmsEnabled}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shipment-notifications">Shipment Updates</Label>
                        <p className="text-sm text-muted-foreground">Status changes and delivery confirmations</p>
                      </div>
                      <Switch
                        id="shipment-notifications"
                        defaultChecked
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-notifications">Payment Notifications</Label>
                        <p className="text-sm text-muted-foreground">Billing and payment confirmations</p>
                      </div>
                      <Switch
                        id="payment-notifications"
                        defaultChecked
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="security-notifications">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">Account security and login notifications</p>
                      </div>
                      <Switch
                        id="security-notifications"
                        defaultChecked
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-notifications">Marketing</Label>
                        <p className="text-sm text-muted-foreground">Promotions and marketing updates</p>
                      </div>
                      <Switch
                        id="marketing-notifications"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="w-full">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Notifications;
