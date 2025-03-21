
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { plantModels } from "@/data/plantModels";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeafBackground from "@/components/LeafBackground";
import { Leaf, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ModelsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredModels, setFilteredModels] = useState(plantModels);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setFilteredModels(plantModels);
    } else {
      const filtered = plantModels.filter((plant) =>
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.genus.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredModels(filtered);
    }
  };

  return (
    <LeafBackground>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Explore the Healing Power of Plants and Herbs
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover medicinal plants in 3D, learn about their properties, and understand their traditional uses.
              </motion.p>
            </div>

            {/* Search Section */}
            <motion.div 
              className="mx-auto max-w-2xl rounded-xl glass-card p-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Search Your Herbal Plant By Name!"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-dark-800/50 border-dark-700"
                />
                <Button type="submit" className="bg-plant-500 text-dark-900 hover:bg-plant-600">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
            </motion.div>

            {/* Plants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredModels.map((plant, index) => (
                <motion.div
                  key={plant.id}
                  className="relative glass-card rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/3d-models/${plant.id}`} className="block">
                    <div className="aspect-square overflow-hidden bg-dark-800/30 flex items-center justify-center">
                      <img
                        src={plant.thumbnailImage}
                        alt={plant.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-medium">{plant.name}</h3>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Family</span>
                          <Badge variant="secondary" className="ml-2">{plant.family}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Genus</span>
                          <Badge variant="secondary" className="ml-2">{plant.genus}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Size</span>
                          <Badge variant="secondary" className="ml-2">{plant.size}</Badge>
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-4 w-full bg-plant-500 text-dark-900 hover:bg-plant-600"
                      >
                        <Leaf className="h-4 w-4 mr-2" />
                        View More
                      </Button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {filteredModels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No plants found matching your search criteria.</p>
                <Button 
                  className="mt-4 bg-plant-500 text-dark-900 hover:bg-plant-600"
                  onClick={() => {
                    setSearchQuery("");
                    setFilteredModels(plantModels);
                  }}
                >
                  Reset Search
                </Button>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </LeafBackground>
  );
};

export default ModelsPage;
