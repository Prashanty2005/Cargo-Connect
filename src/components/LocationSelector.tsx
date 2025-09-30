
import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// List of Indian cities for the dropdown - with consistent format "City, STATE"
const indianCities = [
  'Mumbai, MH',
  'Delhi, DL',
  'Bangalore, KA',
  'Hyderabad, TS',
  'Chennai, TN',
  'Kolkata, WB',
  'Pune, MH',
  'Ahmedabad, GJ',
  'Jaipur, RJ',
  'Surat, GJ',
  'Lucknow, UP',
  'Kanpur, UP',
  'Nagpur, MH',
  'Indore, MP',
  'Thane, MH',
  'Bhopal, MP',
  'Visakhapatnam, AP',
  'Patna, BR',
  'Vadodara, GJ',
  'Ghaziabad, UP',
  'Bhubaneswar, OR', // Added to match vehicle data
  'Vijayawada, AP', // Added to match vehicle data
];

interface LocationSelectorProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const LocationSelector = ({ placeholder, value, onChange, className }: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState(indianCities);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Update filtered cities when search term changes
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCities(indianCities);
    } else {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm]);
  
  // Update search term when value changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSelect = (city: string) => {
    onChange(city);
    setIsOpen(false);
    
    // Log selection for debugging
    console.log("Selected city:", city);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className={`relative ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="pl-10 h-12 rounded-xl"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
          <DropdownMenuTrigger asChild>
            <button 
              type="button" 
              className="absolute inset-y-0 right-0 flex items-center px-3"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent 
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[280px] overflow-y-auto p-1 bg-background"
          align="start"
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <DropdownMenuItem 
                key={city} 
                onSelect={() => handleSelect(city)}
                className="cursor-pointer flex items-center justify-between px-3 py-2"
              >
                {city}
                {value === city && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-center py-2 text-muted-foreground">No cities found</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LocationSelector;
