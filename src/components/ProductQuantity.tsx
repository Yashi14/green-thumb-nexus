
import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ProductQuantityProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max: number;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({ quantity, onChange, max }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 rounded-full"
        onClick={handleDecrement}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-12 text-center font-medium">{quantity}</span>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 rounded-full"
        onClick={handleIncrement}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductQuantity;
