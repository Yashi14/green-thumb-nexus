
import React, { Suspense, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { plantModels } from "@/data/plantModels";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  RotateCcw, 
  Play, 
  Download, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  Map,
  Thermometer,
  Sun,
  Scroll,
  Plant,
  Tablet
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PlantModel from "@/components/PlantModel";

const PlantModelViewer = () => {
  const { plantId } = useParams<{ plantId: string }>();
  const [isRotating, setIsRotating] = useState(true);
  const [activeTab, setActiveTab] = useState<'knowledge' | 'ayush' | 'health'>('knowledge');
  
  const plant = plantModels.find(p => p.id === plantId);
  
  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium">Plant not found</h2>
            <p className="mt-2 text-muted-foreground">The plant model you're looking for doesn't exist.</p>
            <Button className="mt-4" asChild>
              <Link to="/3d-models">Back to Models</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Find index of current plant to enable navigation
  const currentIndex = plantModels.findIndex(p => p.id === plantId);
  const prevPlant = currentIndex > 0 ? plantModels[currentIndex - 1] : null;
  const nextPlant = currentIndex < plantModels.length - 1 ? plantModels[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-dark-900">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" asChild className="text-foreground/70">
              <Link to="/3d-models">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Go back
              </Link>
            </Button>
            
            <div className="flex space-x-2">
              {prevPlant && (
                <Button variant="outline" asChild className="text-foreground/70">
                  <Link to={`/3d-models/${prevPlant.id}`}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    {prevPlant.name.split(' ')[0]}
                  </Link>
                </Button>
              )}
              
              {nextPlant && (
                <Button variant="outline" asChild className="text-foreground/70">
                  <Link to={`/3d-models/${nextPlant.id}`}>
                    {nextPlant.name.split(' ')[0]}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Model Section */}
            <motion.div 
              className="glass-card rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-[500px] relative">
                <Suspense fallback={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-plant-500"></div>
                  </div>
                }>
                  <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                    <PlantModel plantId={plantId || ""} rotation={isRotating} />
                  </Canvas>
                </Suspense>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full bg-dark-800/50 backdrop-blur-sm"
                    onClick={() => setIsRotating(!isRotating)}
                  >
                    <RotateCcw className={`h-4 w-4 ${isRotating ? 'text-plant-500' : 'text-foreground/70'}`} />
                  </Button>
                  
                  <Button size="icon" variant="secondary" className="rounded-full bg-dark-800/50 backdrop-blur-sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 flex justify-between items-center">
                <div>
                  <Badge className="bg-plant-500 text-dark-900">{plant.id.charAt(0).toUpperCase() + plant.id.slice(1)}</Badge>
                  <h2 className="text-2xl font-medium mt-2">{plant.name}</h2>
                </div>
                
                <Button className="bg-plant-500 text-dark-900 hover:bg-plant-600">
                  <Play className="h-4 w-4 mr-2" />
                  Plant Knowledge
                </Button>
              </div>
            </motion.div>
            
            {/* Plant Information Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tabs */}
              <div className="flex space-x-2">
                <Button 
                  variant={activeTab === 'knowledge' ? 'default' : 'outline'} 
                  className={activeTab === 'knowledge' ? 'bg-plant-500 text-dark-900' : ''}
                  onClick={() => setActiveTab('knowledge')}
                >
                  <Scroll className="h-4 w-4 mr-2" />
                  Plant Knowledge
                </Button>
                <Button 
                  variant={activeTab === 'ayush' ? 'default' : 'outline'}
                  className={activeTab === 'ayush' ? 'bg-plant-500 text-dark-900' : ''}
                  onClick={() => setActiveTab('ayush')}
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  AYUSH Application
                </Button>
                <Button 
                  variant={activeTab === 'health' ? 'default' : 'outline'}
                  className={activeTab === 'health' ? 'bg-plant-500 text-dark-900' : ''}
                  onClick={() => setActiveTab('health')}
                >
                  <Tablet className="h-4 w-4 mr-2" />
                  Health Benefits
                </Button>
              </div>
              
              {/* Plant Information Cards */}
              {activeTab === 'knowledge' && (
                <div className="space-y-4">
                  <motion.div 
                    className="glass-card p-4 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Plant className="h-5 w-5 text-plant-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Plant Size</h3>
                      <p className="text-sm text-muted-foreground">{plant.sizeValue}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Map className="h-5 w-5 text-plant-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Native Region</h3>
                      <p className="text-sm text-muted-foreground">{plant.region}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Thermometer className="h-5 w-5 text-plant-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Preferred Climate</h3>
                      <p className="text-sm text-muted-foreground">{plant.climate}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Sun className="h-5 w-5 text-plant-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Required Sunlight</h3>
                      <p className="text-sm text-muted-foreground">{plant.sunlight}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Leaf className="h-5 w-5 text-plant-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Required Soil</h3>
                      <p className="text-sm text-muted-foreground">{plant.soil}</p>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {activeTab === 'ayush' && (
                <div className="space-y-6">
                  <motion.div 
                    className="glass-card p-4 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-medium mb-2">Part used in medicinal preparations</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-dark-800/50">{plant.usedPart}</Badge>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="font-medium mb-2">Active compounds in plants</h3>
                    <div className="flex flex-wrap gap-2">
                      {plant.activeCompounds.map((compound, index) => (
                        <Badge key={index} className="bg-dark-800/50">{compound}</Badge>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h3 className="font-medium mb-2">Therapeutic properties</h3>
                    <div className="flex flex-wrap gap-2">
                      {plant.therapeuticProperties.map((property, index) => (
                        <Badge key={index} className="bg-dark-800/50">{property}</Badge>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <h3 className="font-medium mb-2">Dosage Form</h3>
                    <div className="flex flex-wrap gap-2">
                      {plant.dosageForms.map((form, index) => (
                        <Badge key={index} className="bg-dark-800/50">{form}</Badge>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
              
              {activeTab === 'health' && (
                <motion.div 
                  className="glass-card p-6 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-4">Health Benefits & Traditional Uses</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {plant.description}
                  </p>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Family</h4>
                      <Badge className="bg-dark-800/50">{plant.family}</Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Genus</h4>
                      <Badge className="bg-dark-800/50">{plant.genus}</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-plant-500 text-dark-900 hover:bg-plant-600">
                      Download Detailed Information
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlantModelViewer;
