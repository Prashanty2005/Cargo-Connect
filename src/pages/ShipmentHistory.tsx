
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CalendarIcon, 
  Package, 
  Search, 
  ArrowDownUp,
  Filter,
  Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample historical shipment data
const historyData = [
  {
    id: 'SHP-1234',
    date: '2023-06-15',
    origin: 'Mumbai, MH',
    destination: 'Pune, MH',
    status: 'Delivered',
    cost: 2500,
  },
  {
    id: 'SHP-2345',
    date: '2023-05-10',
    origin: 'Delhi, DL',
    destination: 'Jaipur, RJ',
    status: 'Delivered',
    cost: 3500,
  },
  {
    id: 'SHP-3456',
    date: '2023-04-22',
    origin: 'Bangalore, KA',
    destination: 'Chennai, TN',
    status: 'Delivered',
    cost: 4200,
  },
  {
    id: 'SHP-4567',
    date: '2023-03-15',
    origin: 'Kolkata, WB',
    destination: 'Patna, BR',
    status: 'Cancelled',
    cost: 3800,
  },
  {
    id: 'SHP-5678',
    date: '2023-02-28',
    origin: 'Hyderabad, TS',
    destination: 'Visakhapatnam, AP',
    status: 'Delivered',
    cost: 2900,
  },
  {
    id: 'SHP-6789',
    date: '2023-01-17',
    origin: 'Ahmedabad, GJ',
    destination: 'Mumbai, MH',
    status: 'Delivered',
    cost: 3200,
  },
];

// Monthly statistics
const monthlyStats = [
  { month: 'Jan 2023', count: 5, totalCost: 12500 },
  { month: 'Feb 2023', count: 3, totalCost: 8700 },
  { month: 'Mar 2023', count: 4, totalCost: 13600 },
  { month: 'Apr 2023', count: 2, totalCost: 7400 },
  { month: 'May 2023', count: 3, totalCost: 9800 },
  { month: 'Jun 2023', count: 1, totalCost: 2500 },
];

const ShipmentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredHistory = historyData.filter(shipment => 
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <motion.h1 
              className="mb-4 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Shipment <span className="text-primary">History</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Review your past shipments and analyze shipping patterns
            </motion.p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold">{historyData.length}</p>
                    <p className="text-muted-foreground">Total Shipments</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold">
                      ₹{historyData.reduce((sum, item) => sum + item.cost, 0).toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">Total Spent</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold">
                      {historyData.filter(item => item.status === 'Delivered').length}
                    </p>
                    <p className="text-muted-foreground">Delivered Shipments</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="history" className="mb-8">
              <TabsList>
                <TabsTrigger value="history">Shipment History</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="space-y-6 mt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by ID or location"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowDownUp className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Shipment ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Origin</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHistory.length > 0 ? (
                          filteredHistory.map((shipment) => (
                            <TableRow key={shipment.id}>
                              <TableCell className="font-medium">{shipment.id}</TableCell>
                              <TableCell>{shipment.date}</TableCell>
                              <TableCell>{shipment.origin}</TableCell>
                              <TableCell>{shipment.destination}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getStatusColor(shipment.status)}>
                                  {shipment.status}
                                </Badge>
                              </TableCell>
                              <TableCell>₹{shipment.cost.toLocaleString()}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <div className="flex flex-col items-center">
                                <Package className="h-10 w-10 text-muted-foreground mb-3" />
                                <p className="mb-1">No shipment history found</p>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Try adjusting your search criteria
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-6 mt-6">
                <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Month</TableHead>
                          <TableHead>Number of Shipments</TableHead>
                          <TableHead>Total Cost</TableHead>
                          <TableHead>Average Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthlyStats.map((stat) => (
                          <TableRow key={stat.month}>
                            <TableCell className="font-medium">{stat.month}</TableCell>
                            <TableCell>{stat.count}</TableCell>
                            <TableCell>₹{stat.totalCost.toLocaleString()}</TableCell>
                            <TableCell>
                              ₹{(stat.totalCost / stat.count).toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShipmentHistory;
