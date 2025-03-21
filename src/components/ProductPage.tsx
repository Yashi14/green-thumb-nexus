
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Info,
  Package,
  Leaf,
  Truck,
  Chevron
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { getProductBySlug, getRelatedProducts, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductQuantity from "@/components/ProductQuantity";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import LeafBackground from "@/components/LeafBackground";
import ReviewSection from "@/components/ReviewSection";
import { toast } from "sonner";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  
  const product = slug ? getProductBySlug(slug) : undefined;
  
  // Create an array of all product images
  const productImages = product ? [
    product.image,
    ...(product.additionalImages || [])
  ] : [];
  
  useEffect(() => {
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
    
    if (!product) {
      navigate("/");
      return;
    }
    
    // Reset quantity and active image when product changes
    setQuantity(1);
    setActiveImage(0);
    
    // Get related products
    setRelatedProducts(getRelatedProducts(product.id));
  }, [product, navigate, slug]);
  
  if (!product) {
    return null;
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to your cart`);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    // In a real app, navigate to checkout
    navigate("/checkout");
    toast.success("Proceeding to checkout...");
  };
  
  return (
    <LeafBackground>
      <Header />
      
      <div className="pt-24 px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-8">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link to="/" className="hover:text-foreground transition-colors">Shop</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium truncate">{product.name}</span>
              </li>
            </ol>
          </nav>
          
          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image Carousel */}
              <Carousel 
                className="w-full max-w-full overflow-hidden rounded-xl glass-card" 
                setActiveItem={setActiveImage}
                opts={{
                  startIndex: activeImage
                }}
              >
                <CarouselContent>
                  {productImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${product.name} - View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 z-10" />
                <CarouselNext className="absolute right-2 z-10" />
              </Carousel>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden ${
                      activeImage === index ? "ring-2 ring-plant-500" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-plant-900/50 text-plant-400 hover:bg-plant-800/50 border-plant-700/30">
                    In Stock
                  </Badge>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4" 
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.rating.toFixed(1)} ratings
                    </span>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                <p className="text-lg text-muted-foreground mt-2">{product.shortDescription}</p>
                
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">Scientific Name</div>
                  <div className="font-medium italic">{product.plantName}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dark-700/50">
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold">₹{product.price}</span>
                  <span className="text-muted-foreground line-through">
                    ₹{Math.round(product.price * 1.2)}
                  </span>
                  <span className="text-green-500 font-medium text-sm">
                    Save 20%
                  </span>
                </div>
                
                <div className="flex items-center text-green-500 mt-2">
                  <Truck className="h-4 w-4 mr-2" />
                  <span className="text-sm">Free shipping nationwide</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dark-700/50">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="text-xs text-muted-foreground">
                      {product.stock} available
                    </div>
                  </div>
                  <ProductQuantity 
                    quantity={quantity} 
                    onChange={setQuantity} 
                    max={product.stock} 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="w-full border-plant-500 text-plant-400 hover:bg-plant-500 hover:text-dark-900"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      size="lg"
                      className="w-full bg-plant-500 hover:bg-plant-600 text-dark-900"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dark-700/50">
                <h3 className="font-medium mb-3">Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {product.features.slice(0, 6).map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Check className="h-4 w-4 text-plant-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-dark-700/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Package, text: "Complete Kit" },
                    { icon: Leaf, text: "Organic Components" },
                    { icon: Info, text: "Expert Support" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-plant-900/30 text-center"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: 'rgba(48, 172, 91, 0.2)'
                      }}
                    >
                      <item.icon className="h-5 w-5 text-plant-500 mb-2" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-dark-700/50 rounded-none p-0 h-auto">
                {["description", "included", "benefits", "care", "reviews"].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab}
                    className="capitalize py-3 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-plant-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="pt-6">
                <TabsContent value="description" className="mt-0">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-medium mb-4">Features</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <Check className="h-5 w-5 text-plant-500 mr-3 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="included" className="mt-0">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-medium mb-4">What's in the Box</h3>
                    <ul className="space-y-4">
                      {product.includes.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start p-4 border border-dark-700/50 rounded-lg glass-card"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(48, 172, 91, 0.1)" }}
                        >
                          <div className="h-12 w-12 rounded-full bg-plant-900/50 flex items-center justify-center mr-4 shrink-0 border border-plant-700/30">
                            <span className="font-medium text-plant-400">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{item.item}</h4>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="benefits" className="mt-0">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-medium mb-4">Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.benefits.map((benefit, index) => (
                        <motion.div 
                          key={index} 
                          className="p-4 glass-card rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(48, 172, 91, 0.1)" }}
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-plant-900/50 flex items-center justify-center mr-3 shrink-0 border border-plant-700/30">
                              <Check className="h-4 w-4 text-plant-400" />
                            </div>
                            <span>{benefit}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="care" className="mt-0">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-medium mb-4">Care Instructions</h3>
                    <div className="space-y-6">
                      {product.careInstructions.map((instruction, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="h-8 w-8 rounded-full bg-plant-900/50 flex items-center justify-center text-plant-400 font-medium mr-4 shrink-0 border border-plant-700/30">
                            {index + 1}
                          </div>
                          <div>
                            <p>{instruction}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0">
                  <ReviewSection productId={product.id} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">You May Also Like</h2>
              <Button variant="ghost" className="hidden sm:flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div 
                  key={relatedProduct.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <ProductCard product={relatedProduct} index={index} />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-6 sm:hidden">
              <Button variant="ghost" className="w-full">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </LeafBackground>
  );
};

export default ProductPage;
