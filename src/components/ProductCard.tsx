
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  Star
} from "lucide-react";

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
    <div 
      className="group relative glass-card rounded-xl overflow-hidden"
      style={{ 
        "--index": index, 
      } as React.CSSProperties}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 bg-gradient-to-br from-plant-100 to-plant-300 flex items-center justify-center">
          <span className="text-plant-800 font-medium">{product.name}</span>
        </div>
        
        {/* When we have actual images */}
        {/* <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        /> */}
        
        {/* Quick add button */}
        <div className="absolute right-2 bottom-2">
          <Button 
            size="icon"
            className="rounded-full shadow-lg bg-white hover:bg-plant-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Wishlist button */}
        <Button 
          size="icon"
          variant="ghost" 
          className="absolute top-2 right-2 text-foreground/50 hover:text-rose-500 hover:bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4" />
        </Button>
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
            className="w-full border-plant-500 text-plant-700 hover:bg-plant-500 hover:text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            className="w-full bg-plant-500 text-white hover:bg-plant-600"
            asChild
          >
            <Link to={`/product/${product.slug}`}>
              Buy Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
