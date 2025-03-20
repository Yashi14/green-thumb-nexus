
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, ArrowDown, Flower, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import LeafBackground from "@/components/LeafBackground";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LeafBackground>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div 
              className="flex-1 text-center lg:text-left space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-block bg-plant-900/50 text-plant-400 px-4 py-1.5 rounded-full text-sm font-medium border border-plant-700/50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Grow with confidence
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Plant Your Own <span className="text-plant-500">Green</span> Sanctuary
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Premium plantation kits with everything you need to grow medicinal herbs and plants at home - perfect for beginners and experts alike.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-plant-500 hover:bg-plant-600 text-dark-900"
                    onClick={scrollToProducts}
                  >
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-plant-500 text-plant-400 hover:bg-plant-500 hover:text-dark-900"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.div 
                className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden glass-card flex items-center justify-center"
                whileHover={{ boxShadow: "0px 0px 30px rgba(48, 172, 91, 0.2)" }}
              >
                <img 
                  src="/lovable-uploads/6d832d82-c8b1-4112-8f7c-7ceaa59ede83.png" 
                  alt="Herbal Garden Kit" 
                  className="w-full h-full object-cover"
                />
                
                {/* Animation elements */}
                <motion.div
                  className="absolute top-6 left-6 h-20 w-20 rounded-full bg-plant-800/30 backdrop-blur-md"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-plant-700/20 backdrop-blur-md"
                  animate={{ y: [0, 10, 0], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                ></motion.div>
                
                {/* Leaf icons animated */}
                <motion.div
                  className="absolute top-1/4 right-1/4"
                  animate={{ rotate: 360, y: [0, -5, 0] }}
                  transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                >
                  <Leaf className="h-10 w-10 text-plant-500/70" />
                </motion.div>
                <motion.div
                  className="absolute bottom-1/4 left-1/3"
                  animate={{ rotate: -360, y: [0, 8, 0] }}
                  transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
                >
                  <Sprout className="h-8 w-8 text-plant-600/60" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            <Button 
              variant="ghost" 
              className="rounded-full animate-bounce"
              onClick={scrollToProducts}
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <motion.section 
        id="products-section"
        className="py-16 px-4"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold" 
              variants={itemVariants}
            >
              Our Plantation Kits
            </motion.h2>
            <motion.p 
              className="mt-4 text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Each kit contains premium seeds, specialized soil, organic fertilizer, and everything else
              you need to successfully grow your plants at home.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {products.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants} layout>
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-dark-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our Kits?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our carefully designed plantation kits make growing medicinal plants at home simple and rewarding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Highest quality seeds, soil, and materials for optimal plant growth",
                icon: "🌱"
              },
              {
                title: "Complete Solution",
                description: "Everything you need in one box - just add water and sunlight",
                icon: "📦"
              },
              {
                title: "Expert Guidance",
                description: "Detailed manuals and online support for growing success",
                icon: "📚"
              },
              {
                title: "Eco-Friendly",
                description: "Sustainable materials and practices for a healthier planet",
                icon: "♻️"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0px 10px 30px rgba(48, 172, 91, 0.2)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="glass-dark rounded-3xl overflow-hidden bg-gradient-to-br from-dark-900 to-plant-950/80 border border-plant-900/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-12 lg:p-16 text-white text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Green Journey Today</h2>
                <p className="max-w-2xl mx-auto text-plant-100/80 mb-8">
                  Transform your space with the healing power of plants. Our plantation kits make it easy to bring
                  nature's benefits into your home.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-plant-500 hover:bg-plant-600 text-dark-900"
                    onClick={scrollToProducts}
                  >
                    Explore All Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </LeafBackground>
  );
};

export default Index;
