
// Fix ProductPage.tsx by replacing Chevron with the correct ChevronLeft/ChevronRight icons
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  ShoppingCart, 
  Truck, 
  Shield, 
  Star,
  ChevronRight,
  ChevronLeft,
  BadgeCheck, 
  Timer,
  Leaf
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductQuantity from "./ProductQuantity";
import ReviewSection from "./ReviewSection";
import WishlistButton from "./WishlistButton";
import Header from "./Header";
import Footer from "./Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium">Product not found</h2>
            <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Button className="mt-4" asChild>
              <Link to="/">Go back to home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="lg:w-1/2 space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-dark-800/30 relative">
                <motion.img 
                  key={activeImage}
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute left-4 top-4">
                  <Badge variant="outline" className="bg-dark-900/70 border-none text-white">
                    {product.category}
                  </Badge>
                </div>
                <div className="absolute right-4 top-4">
                  <WishlistButton productId={product.id} />
                </div>
              </div>
              
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/4 md:basis-1/5">
                        <div 
                          className={`cursor-pointer rounded-lg overflow-hidden h-20 border-2 ${
                            activeImage === index ? 'border-plant-500' : 'border-transparent'
                          }`}
                          onClick={() => setActiveImage(index)}
                        >
                          <img 
                            src={image} 
                            alt={`${product.name} thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-1" />
                  <CarouselNext className="right-1" />
                </Carousel>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="lg:w-1/2">
              <h1 className="text-2xl lg:text-3xl font-medium">{product.name}</h1>
              
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({Math.round(product.rating * 32)} reviews)
                </span>
              </div>
              
              <p className="mt-6 text-2xl font-semibold">₹{product.price}</p>
              
              <p className="mt-4 text-muted-foreground">
                {product.description}
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <BadgeCheck className="h-5 w-5 text-plant-500 mr-2" />
                  <span className="text-sm">Organic</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-plant-500 mr-2" />
                  <span className="text-sm">Eco-friendly</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-plant-500 mr-2" />
                  <span className="text-sm">Quality Assured</span>
                </div>
                <div className="flex items-center">
                  <Timer className="h-5 w-5 text-plant-500 mr-2" />
                  <span className="text-sm">Fast Growing</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <ProductQuantity 
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    min={1}
                    max={10}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="border-plant-500 text-plant-500 hover:bg-plant-500 hover:text-dark-900"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    className="bg-plant-500 text-dark-900 hover:bg-plant-600"
                    onClick={() => {
                      handleAddToCart();
                      // Navigate to checkout
                    }}
                    asChild
                  >
                    <Link to="/checkout">Buy Now</Link>
                  </Button>
                </div>
                
                <div className="space-y-2 rounded-lg bg-dark-800/30 p-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-plant-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">Free shipping</h4>
                      <p className="text-xs text-muted-foreground">
                        On orders over ₹500. Otherwise ₹50.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-plant-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">30-day plant health guarantee</h4>
                      <p className="text-xs text-muted-foreground">
                        We'll replace your plant if it arrives damaged or unhealthy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-xl font-medium mb-6">Customer Reviews</h2>
            <ReviewSection productId={product.id} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
