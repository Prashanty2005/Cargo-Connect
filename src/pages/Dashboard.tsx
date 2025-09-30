
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentShipments, setRecentShipments] = useState([
    { id: 'SHP-1234', origin: 'Pune, MH', destination: 'Mumbai, MH', status: 'In Transit', date: '2025-04-01' },
    { id: 'SHP-5678', origin: 'Hyderabad, AP', destination: 'Nagpur, MH', status: 'Delivered', date: '2025-03-28' },
    { id: 'SHP-9012', origin: 'Bangalore, KA', destination: 'Chennai, TN', status: 'Processing', date: '2025-04-05' },
  ]);
  
  useEffect(() => {
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-8">
          <p className="text-center">Please log in to access the dashboard.</p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => navigate('/login')} className="mx-2">Login</Button>
            <Button onClick={() => navigate('/signup')} variant="outline" className="mx-2">Sign Up</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
              <CardDescription>Currently in transit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">2</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate('/shipments')}>View All</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Registered Vehicles</CardTitle>
              <CardDescription>Available for transport</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">3</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate('/vehicles')}>View All</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">5</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate('/notifications')}>View All</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
            <CardDescription>Your latest shipping activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Origin</th>
                    <th className="text-left p-2">Destination</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-right p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentShipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b">
                      <td className="p-2">{shipment.id}</td>
                      <td className="p-2">{shipment.origin}</td>
                      <td className="p-2">{shipment.destination}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          shipment.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : shipment.status === 'In Transit' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="p-2">{shipment.date}</td>
                      <td className="text-right p-2">
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/shipments`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/shipments')}>View All Shipments</Button>
            <Button onClick={() => navigate('/shipment-posting')}>Create New Shipment</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
