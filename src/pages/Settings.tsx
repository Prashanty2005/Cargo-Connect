
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Settings as SettingsIcon, Sun, Moon } from "lucide-react";
import Navbar from "@/components/Navbar";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    // Apply theme when dark mode setting changes
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  const handleSaveSettings = () => {
    // In a real app, this would call an API to save the user's settings
    toast.success("Settings saved successfully!");
  };

  if (!user) {
    return <div>Loading settings...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-3xl mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Application Settings</h1>
            <p className="text-muted-foreground">Manage your app preferences</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-secondary p-3">
            <SettingsIcon className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Cargo Connect looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  {darkMode ? 
                    <Moon className="h-4 w-4 text-blue-400" /> : 
                    <Sun className="h-4 w-4 text-yellow-500" />
                  }
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={(checked) => {
                    setDarkMode(checked);
                    toast.success(`${checked ? 'Dark' : 'Light'} theme activated`);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="shipment-updates">Shipment Updates</Label>
                <Switch
                  id="shipment-updates"
                  defaultChecked
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing">Marketing Communications</Label>
                <Switch
                  id="marketing"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Manage your privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="data-sharing">Data Sharing</Label>
                <Switch
                  id="data-sharing"
                  defaultChecked
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="analytics">Analytics</Label>
                <Switch
                  id="analytics"
                  defaultChecked
                />
              </div>
              <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-950/20 mt-4">
                <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">Data Privacy Notice</p>
                <p className="text-xs text-muted-foreground mt-1">
                  We collect and process your data to provide and improve our services. 
                  Read our <a href="#" className="text-primary underline">privacy policy</a> for more information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Settings;
