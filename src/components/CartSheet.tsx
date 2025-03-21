
// Fixing the CartSheet.tsx error by replacing 'as' prop with 'asChild'
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { 
  X, 
  ShoppingCart, 
  Trash2,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductQuantity from "./ProductQuantity";
import { motion } from "framer-motion";

const CartSheet = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, total } = useCart();

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-4 px-6 border-b border-dark-700">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5 text-plant-500" />
          <h2 className="font-medium">Shopping Cart</h2>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
          <div className="bg-dark-800/50 rounded-full p-6">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-plant-500 text-plant-500 hover:bg-plant-500 hover:text-dark-900"
            asChild
          >
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div 
                  key={item.product.id} 
                  className="flex items-center space-x-4 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="w-16 h-16 overflow-hidden rounded-md bg-dark-800/30">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">₹{item.product.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ProductQuantity 
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) => handleQuantityChange(item.product.id, newQuantity)}
                      min={1}
                      max={10}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-auto p-6 border-t border-dark-700 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm font-medium">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Shipping</span>
                <span className="text-sm font-medium">₹0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tax</span>
                <span className="text-sm font-medium">₹{(total * 0.05).toFixed(2)}</span>
              </div>

              <Separator className="my-2" />
              
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>₹{(total + total * 0.05).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="w-full border-plant-500 text-plant-500 hover:bg-plant-500 hover:text-dark-900"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button 
                className="w-full bg-plant-500 text-dark-900 hover:bg-plant-600"
                asChild
              >
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSheet;
