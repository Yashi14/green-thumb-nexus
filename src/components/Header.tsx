
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  Leaf, 
  Heart, 
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import CartSheet from "./CartSheet";

const Header = () => {
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-8 py-4
      ${isScrolled ? 'glass-dark bg-plant-900/10 shadow-md' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-plant-500" />
          <span className="text-xl font-medium">GreenThumb</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Home
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Shop
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            About
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-plant-500">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-plant-500">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-plant-500">
            <User className="h-5 w-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-foreground/80 hover:text-plant-500">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-plant-500 text-white">
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <CartSheet />
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-foreground/80 hover:text-plant-500">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-plant-500 text-white">
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-y-auto">
              <CartSheet />
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground/80 hover:text-plant-500"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark bg-plant-900/10 p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center space-x-4 pt-2">
              <Button variant="ghost" size="icon" className="hover:bg-plant-500/10">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-plant-500/10">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-plant-500/10">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
