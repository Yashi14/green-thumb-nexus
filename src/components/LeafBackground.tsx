
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface LeafBackgroundProps {
  children: React.ReactNode;
}

const LeafBackground: React.FC<LeafBackgroundProps> = ({ children }) => {
  const [leaves, setLeaves] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random floating leaves
    const leafCount = 12;
    const newLeaves = Array.from({ length: leafCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      delay: Math.random() * 10
    }));
    
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-dark-900">
      <div className="absolute inset-0 bg-leaf-subtle opacity-30 pointer-events-none"></div>
      
      {/* Floating leaves */}
      <div className="floating-leaves">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="floating-leaf absolute"
            style={{
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              fontSize: `${leaf.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + leaf.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: leaf.delay,
            }}
          >
            <Leaf />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default LeafBackground;
