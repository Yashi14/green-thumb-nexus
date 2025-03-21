import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Leaf, 
  Sun, 
  Droplets, 
  Thermometer, 
  Info, 
  Clock, 
  Wind, 
  Flower
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlantModel from "@/components/PlantModel";
import { Button } from "@/components/ui/button";
import { plantModels } from "@/data/plantModels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlantModelViewer = () => {
  const { plantId } = useParams<{ plantId: string }>();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const foundPlant = plantModels.find((p) => p.id === plantId);
    setPlant(foundPlant);
  }, [plantId]);

  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <p>Plant model not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <Link to="/3d-models" className="inline-flex items-center mb-4 text-plant-300 hover:text-plant-200 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to 3D Models
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Model Viewer */}
          <div className="md:order-1">
            <div className="rounded-lg overflow-hidden bg-gray-800/50">
              <PlantModel plantId={plantId} />
            </div>
          </div>

          {/* Plant Details */}
          <div className="md:order-2">
            <h1 className="text-3xl font-semibold mb-4">{plant.name}</h1>
            <p className="text-gray-300 mb-6">{plant.description}</p>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-gray-800/50 rounded-md p-1 mb-4">
                <TabsTrigger value="details" className="data-[state=active]:bg-plant-500 data-[state=active]:text-white">Details</TabsTrigger>
                <TabsTrigger value="care" className="data-[state=active]:bg-plant-500 data-[state=active]:text-white">Care Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-plant-500" />
                  <h2 className="text-xl font-medium">Plant Overview</h2>
                </div>
                <p className="text-gray-300">
                  {plant.details || "No detailed information available for this plant."}
                </p>
              </TabsContent>
              <TabsContent value="care" className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-lg font-medium">Light Requirements</h3>
                </div>
                <p className="text-gray-300">{plant.light}</p>

                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-medium">Watering</h3>
                </div>
                <p className="text-gray-300">{plant.watering}</p>

                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-medium">Temperature</h3>
                </div>
                <p className="text-gray-300">{plant.temperature}</p>

                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-medium">Humidity</h3>
                </div>
                <p className="text-gray-300">{plant.humidity}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlantModelViewer;
