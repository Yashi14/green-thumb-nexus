
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Flower, Wind } from "lucide-react";

interface LeafBackgroundProps {
  children: React.ReactNode;
}

const LeafBackground: React.FC<LeafBackgroundProps> = ({ children }) => {
  const [leaves, setLeaves] = useState<{ id: number; x: number; y: number; size: number; delay: number; rotation: number; type: string }[]>([]);

  useEffect(() => {
    // Generate random floating elements (leaves, flowers)
    const itemCount = 20; // Increased count for more animations
    const newLeaves = Array.from({ length: itemCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 20,
      rotation: Math.random() * 360,
      type: Math.random() > 0.7 ? "flower" : "leaf" // Mix of leaves and flowers
    }));
    
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-dark-900 overflow-hidden">
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-plant-900/30 to-dark-900/30 opacity-20 pointer-events-none"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Star-like particles in the background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute h-1 w-1 bg-plant-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Floating wind effect */}
      <motion.div
        className="absolute left-0 top-1/3 text-plant-400/10 pointer-events-none"
        animate={{
          x: [-100, window.innerWidth + 100],
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Wind size={200} />
      </motion.div>
      
      {/* Floating leaves and flowers */}
      <div className="floating-elements absolute inset-0 pointer-events-none">
        {leaves.map((item) => (
          <motion.div
            key={item.id}
            className="floating-item absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size}px`,
              color: item.type === "flower" ? "rgba(134, 239, 172, 0.2)" : "rgba(74, 222, 128, 0.15)",
              rotate: `${item.rotation}deg`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [`${item.rotation}deg`, `${item.rotation + 20}deg`, `${item.rotation - 20}deg`, `${item.rotation}deg`],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 8 + item.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.type === "flower" ? <Flower /> : <Leaf />}
          </motion.div>
        ))}
      </div>
      
      {/* Main content with a subtle animation */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default LeafBackground;
