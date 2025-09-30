
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Truck, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfileButton } from './UserProfileButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, getUserDisplayName } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass shadow-md backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={closeMenu}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl">
            <Truck className="h-5 w-5 text-primary group-hover:animate-subtle-slide transition-all" />
          </div>
          <span className="text-xl font-medium tracking-tight">Cargo Connect</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "px-4 py-2 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary"
            )}
          >
            Home
          </NavLink>
          <NavLink 
            to="/vehicles" 
            className={({ isActive }) => cn(
              "px-4 py-2 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary"
            )}
          >
            Find Vehicles
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => cn(
              "px-4 py-2 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary"
            )}
          >
            Services
          </NavLink>
          <NavLink 
            to="/shipments" 
            className={({ isActive }) => cn(
              "px-4 py-2 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary"
            )}
          >
            Shipments
          </NavLink>
          <NavLink 
            to="/post" 
            className={({ isActive }) => cn(
              "px-4 py-2 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary"
            )}
          >
            Post Space
          </NavLink>
          <div className="ml-2">
            {user ? (
              <UserProfileButton />
            ) : (
              <Button asChild size="sm" variant="outline" className="rounded-full px-5">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-secondary"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] bg-background/95 backdrop-blur-lg z-40 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6 gap-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "px-4 py-3 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary bg-secondary/60"
            )}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/vehicles" 
            className={({ isActive }) => cn(
              "px-4 py-3 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary bg-secondary/60"
            )}
            onClick={closeMenu}
          >
            Find Vehicles
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => cn(
              "px-4 py-3 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary bg-secondary/60"
            )}
            onClick={closeMenu}
          >
            Services
          </NavLink>
          <NavLink 
            to="/shipments" 
            className={({ isActive }) => cn(
              "px-4 py-3 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary bg-secondary/60"
            )}
            onClick={closeMenu}
          >
            Shipments
          </NavLink>
          <NavLink 
            to="/post" 
            className={({ isActive }) => cn(
              "px-4 py-3 rounded-lg transition-colors hover:bg-secondary",
              isActive && "font-medium text-primary bg-secondary/60"
            )}
            onClick={closeMenu}
          >
            Post Space
          </NavLink>
          <div className="mt-3">
            {user ? (
              <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/60">
                <div>
                  <p className="font-medium">{getUserDisplayName()}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => { 
                  logout();
                  closeMenu();
                }}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </div>
            ) : (
              <Button asChild size="lg" className="w-full rounded-xl">
                <Link to="/login" onClick={closeMenu}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
