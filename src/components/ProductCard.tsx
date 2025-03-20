
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Star,
  Flower
} from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div 
      className="group relative glass-card rounded-xl overflow-hidden"
      style={{ 
        "--index": index, 
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-square overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-plant-900 to-plant-700 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Flower className="h-12 w-12 text-plant-300" />
            </motion.div>
            <span className="absolute bottom-4 text-plant-100 font-medium">{product.name}</span>
          </div>
        )}
        
        {/* Quick add button */}
        <div className="absolute right-2 bottom-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              size="icon"
              className="rounded-full shadow-lg bg-dark-800 hover:bg-plant-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
      
      <Link to={`/product/${product.slug}`} className="block p-4">
        <h3 className="font-medium tracking-tight truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
          </div>
          <span className="font-medium">₹{product.price}</span>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="w-full border-plant-500 text-plant-400 hover:bg-plant-500 hover:text-dark-900"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            className="w-full bg-plant-500 text-dark-900 hover:bg-plant-600"
            asChild
          >
            <Link to={`/product/${product.slug}`}>
              Buy Now
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
