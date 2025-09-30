
import { ArrowRight, Calendar, Search, Filter, ArrowDownUp, MapIcon, Clock, Settings, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import LocationSelector from './LocationSelector';

interface SearchBarProps {
  onSearch?: (data: { from: string; to: string; date: string }) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("SearchBar - Search triggered with:", { from, to, date });
    
    if (onSearch) {
      onSearch({ from, to, date });
    }
  };
  
  const handleFilter = () => {
    toast.info("Filter options", { description: "Additional filtering options would appear here" });
  };
  
  const handleSort = () => {
    toast.info("Sort results", { description: "Sorting options would appear here" });
  };
  
  const handleViewMap = () => {
    toast.info("Map view", { description: "A map view would open here showing routes" });
  };
  
  const handleRecentSearches = () => {
    toast.info("Recent searches", { description: "Your recent searches would appear here" });
  };
  
  const handleSearchSettings = () => {
    toast.info("Search settings", { description: "Search preferences and settings would appear here" });
  };
  
  const handleBitcoinPayment = () => {
    toast.info("Bitcoin Payments", { 
      description: "Pay for shipments using Bitcoin on the main network or Lightning Network",
      icon: <Bitcoin className="h-5 w-5 text-orange-500" />
    });
  };

  return (
    <motion.div 
      className={`glass shadow-lg rounded-2xl p-2 sm:p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <LocationSelector
            placeholder="From (Indian City)"
            value={from}
            onChange={(value) => {
              console.log("From location changed to:", value);
              setFrom(value);
            }}
          />
        </div>
        
        <div className="hidden sm:flex items-center justify-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground mx-1" />
        </div>
        
        <div className="flex-1">
          <LocationSelector
            placeholder="To (Indian City)"
            value={to}
            onChange={(value) => {
              console.log("To location changed to:", value);
              setTo(value);
            }}
          />
        </div>
        
        <div className="flex-1 relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="date"
            placeholder="Date"
            className="pl-10 h-12 rounded-xl"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" className="h-12 rounded-xl px-8">
              <Search className="h-5 w-5 mr-2" />
              <span>Search</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-background shadow-lg rounded-xl p-2">
            <DropdownMenuItem onClick={handleSearch} className="cursor-pointer">
              <Search className="mr-2 h-4 w-4" />
              <span>Search Now</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleFilter} className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              <span>Filter Options</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSort} className="cursor-pointer">
              <ArrowDownUp className="mr-2 h-4 w-4" />
              <span>Sort Results</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewMap} className="cursor-pointer">
              <MapIcon className="mr-2 h-4 w-4" />
              <span>View on Map</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRecentSearches} className="cursor-pointer">
              <Clock className="mr-2 h-4 w-4" />
              <span>Recent Searches</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleBitcoinPayment} className="cursor-pointer">
              <Bitcoin className="mr-2 h-4 w-4 text-orange-500" />
              <span>Bitcoin Payment</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSearchSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Search Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
    </motion.div>
  );
};

export default SearchBar;
