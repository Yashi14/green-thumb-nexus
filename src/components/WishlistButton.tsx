import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  productId: number;
}

// This component is intentionally empty since wishlist functionality is being removed
// We're keeping the file for now to avoid breaking imports but won't render anything
const WishlistButton: React.FC<WishlistButtonProps> = () => {
  return null;
};

export default WishlistButton;
