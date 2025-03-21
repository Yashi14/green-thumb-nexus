
// Update Header.tsx to include the Connect link
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  Leaf, 
  User,
  ScanSearch,
  Scan,
  Flower,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import CartSheet from "./CartSheet";
import { products } from "@/data/products";
import { motion } from "framer-motion";

const Header = () => {
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(products);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-8 py-4
      ${isScrolled ? 'glass-dark shadow-md' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leaf className="h-8 w-8 text-plant-500" />
          </motion.div>
          <motion.span 
            className="text-xl font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Herbal Garden
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Home
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Garden
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Medicine
          </Link>
          <Link to="/connect" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Connect
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Identify Plants
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Identify Diseases
          </Link>
          <Link to="/" className="text-foreground/80 hover:text-plant-500 transition-colors">
            Shop
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-plant-500">
                <Search className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 glass-dark">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Search Products</h3>
                <Input 
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search for plantation kits..." 
                  className="bg-dark-800/50 border-dark-700"
                />
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.slug}`}
                        className="flex items-center p-2 rounded hover:bg-dark-800/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded bg-gradient-to-br from-plant-800 to-plant-600 flex items-center justify-center mr-3">
                          <Flower className="h-5 w-5 text-dark-100" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground truncate">₹{product.price}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center py-2 text-muted-foreground">No products found</p>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
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
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark p-4 animate-fade-in">
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
              Garden
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Medicine
            </Link>
            <Link 
              to="/connect" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Connect
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Identify Plants
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Identify Diseases
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-plant-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <div className="flex items-center space-x-4 pt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-plant-500/10">
                    <Search className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4 glass-dark">
                  <div className="space-y-4">
                    <h3 className="font-medium">Search Products</h3>
                    <Input 
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search for plantation kits..." 
                      className="bg-dark-800/50 border-dark-700"
                    />
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {searchResults.length > 0 ? (
                        searchResults.map(product => (
                          <Link 
                            key={product.id} 
                            to={`/product/${product.slug}`}
                            className="flex items-center p-2 rounded hover:bg-dark-800/50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-plant-800 to-plant-600 flex items-center justify-center mr-2">
                              <Flower className="h-4 w-4 text-dark-100" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-muted-foreground">₹{product.price}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center py-2 text-sm text-muted-foreground">No products found</p>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
