
import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet";

const CartSheet = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <SheetHeader className="text-center">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Your shopping cart is empty</SheetDescription>
        </SheetHeader>
        <div className="mt-8 mb-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/50" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full bg-plant-500 hover:bg-plant-600 text-white">
              Continue Shopping
            </Button>
          </SheetClose>
        </SheetFooter>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          You have {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </SheetDescription>
      </SheetHeader>
      
      <div className="flex-1 overflow-y-auto py-6">
        <ul className="divide-y divide-border">
          {cartItems.map((item) => (
            <li key={item.product.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-4">
                {/* Product image */}
                <div className="h-20 w-20 rounded-md bg-gradient-to-br from-plant-100 to-plant-300 flex items-center justify-center shrink-0">
                  <span className="text-xs text-plant-800 text-center px-1">{item.product.name}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Product name and price */}
                  <h4 className="font-medium truncate">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{item.product.price}</p>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center mt-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Item total and remove button */}
                <div className="text-right">
                  <p className="font-medium">₹{item.product.price * item.quantity}</p>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 mt-2 text-muted-foreground hover:text-red-500"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t border-border pt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{getCartTotal()}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-medium text-lg mt-4">
          <span>Total</span>
          <span>₹{getCartTotal()}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-6">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <SheetClose asChild>
            <Button 
              className="w-full bg-plant-500 hover:bg-plant-600 text-white"
              as={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </SheetClose>
        </div>
        
        <SheetClose asChild>
          <Button 
            variant="ghost" 
            className="w-full mt-2 text-muted-foreground"
          >
            Continue Shopping
          </Button>
        </SheetClose>
      </div>
    </div>
  );
};

export default CartSheet;
