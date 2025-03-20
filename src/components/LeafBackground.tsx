
import React from "react";

interface LeafBackgroundProps {
  children: React.ReactNode;
}

const LeafBackground: React.FC<LeafBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-plant-50/30">
      <div className="absolute inset-0 bg-leaf-subtle opacity-90 pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default LeafBackground;
