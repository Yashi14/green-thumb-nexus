
export interface Product {
  id: number;
  slug: string;
  name: string;
  plantName: string;
  shortDescription: string;
  description: string;
  price: number;
  image: string;
  kitImage?: string;
  rating: number;
  features: string[];
  includes: { item: string; quantity: string }[];
  benefits: string[];
  careInstructions: string[];
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "ginger-plantation-kit",
    name: "Ginger Plantation Kit",
    plantName: "Zingiber officinale",
    shortDescription: "Complete kit with everything you need to grow fresh ginger at home",
    description: "Our premium Ginger Plantation Kit provides everything you need to successfully grow aromatic ginger at home. Perfect for beginners and experienced gardeners alike, this comprehensive kit contains high-quality ginger rhizomes, nutrient-rich soil, organic fertilizer, and a stylish pot. Ginger is not only a delicious culinary ingredient but also offers numerous health benefits. With our detailed plantation manual, you'll be harvesting your own ginger in no time!",
    price: 499,
    image: "/lovable-uploads/3cf4773e-538e-451b-9630-fadd3c798455.png",
    kitImage: "/lovable-uploads/6d832d82-c8b1-4112-8f7c-7ceaa59ede83.png",
    rating: 4.7,
    features: [
      "Ready to grow kit for fresh ginger",
      "High-quality rhizomes selected for best growth",
      "Specially formulated soil mix for root spices",
      "Organic slow-release fertilizer",
      "Decorative pot with drainage system",
      "Detailed plantation manual with care instructions"
    ],
    includes: [
      { item: "Ginger Rhizomes", quantity: "250g" },
      { item: "Nutrient-rich Soil Mix", quantity: "2kg" },
      { item: "Organic Fertilizer", quantity: "250g" },
      { item: "Eco-friendly Pot", quantity: "1" },
      { item: "Water Spray Bottle", quantity: "1" },
      { item: "Plantation Manual", quantity: "1" }
    ],
    benefits: [
      "Grow your own organic ginger at home",
      "Save money on store-bought ginger",
      "Educational activity for the whole family",
      "Know exactly what goes into growing your food",
      "Sustainable and eco-friendly gardening practice"
    ],
    careInstructions: [
      "Place in partial sunlight with temperatures between 20-30°C",
      "Keep soil consistently moist but not waterlogged",
      "Fertilize once a month during growing season",
      "Harvest after 8-10 months when leaves turn yellow",
      "Store harvested ginger in a cool, dry place"
    ],
    stock: 15
  },
  {
    id: 2,
    slug: "tulsi-plantation-kit",
    name: "Tulsi Plantation Kit",
    plantName: "Ocimum sanctum",
    shortDescription: "Complete kit to grow sacred Tulsi (Holy Basil) at home",
    description: "Our Tulsi Plantation Kit is carefully designed to help you grow this sacred medicinal plant at home with ease. Revered in Ayurvedic tradition for its healing properties, Tulsi (Holy Basil) is the perfect addition to any home garden. This comprehensive kit includes everything you need: premium Tulsi seeds, specially formulated soil, organic fertilizer, a decorative pot, and detailed instructions. Experience the spiritual and physical benefits of growing your own Tulsi plant!",
    price: 450,
    image: "/lovable-uploads/18694cba-7b5f-47c3-973a-b002a7cb13d6.png",
    kitImage: "/lovable-uploads/6d832d82-c8b1-4112-8f7c-7ceaa59ede83.png",
    rating: 4.8,
    features: [
      "Complete kit for growing sacred Tulsi at home",
      "Premium organic Tulsi seeds",
      "Specially formulated soil mix",
      "Organic plant food for optimal growth",
      "Elegant pot with drainage system",
      "Comprehensive growing guide"
    ],
    includes: [
      { item: "Organic Tulsi Seeds", quantity: "50 seeds" },
      { item: "Nutrient-rich Soil Mix", quantity: "1.5kg" },
      { item: "Organic Fertilizer", quantity: "200g" },
      { item: "Decorative Terracotta Pot", quantity: "1" },
      { item: "Water Spray Bottle", quantity: "1" },
      { item: "Detailed Planting Guide", quantity: "1" }
    ],
    benefits: [
      "Purifies air and adds oxygen to your home",
      "Known for stress-relief and adaptogenic properties",
      "Used in traditional medicine for respiratory support",
      "Makes delicious and healthy herbal tea",
      "Considered auspicious in many cultural traditions"
    ],
    careInstructions: [
      "Place in a sunny location with 6+ hours of sunlight",
      "Water regularly keeping soil slightly moist",
      "Apply fertilizer once a month",
      "Harvest leaves regularly to encourage bushier growth",
      "Pinch off flower buds to extend leaf production"
    ],
    stock: 20
  },
  {
    id: 3,
    slug: "aloe-vera-plantation-kit",
    name: "Aloe Vera Plantation Kit",
    plantName: "Aloe barbadensis miller",
    shortDescription: "Everything you need to grow your own healing Aloe Vera plant",
    description: "Our premium Aloe Vera Plantation Kit makes growing this incredible medicinal plant at home simple and rewarding. Aloe Vera is renowned for its healing properties and makes a stunning addition to any indoor garden. This complete kit includes a healthy Aloe Vera pup (young plant), specially formulated succulent soil, slow-release fertilizer, a stylish pot with proper drainage, and a comprehensive care guide. Start enjoying the benefits of fresh Aloe Vera gel straight from your own plant!",
    price: 599,
    image: "/lovable-uploads/9c862c5b-e573-438f-99db-588dba5a0e10.png",
    kitImage: "/lovable-uploads/6d832d82-c8b1-4112-8f7c-7ceaa59ede83.png",
    rating: 4.9,
    features: [
      "Complete kit for growing Aloe Vera at home",
      "Healthy young Aloe Vera plant",
      "Specialized succulent soil mix",
      "Slow-release organic fertilizer",
      "Contemporary pot with drainage system",
      "Detailed care guide and gel harvesting instructions"
    ],
    includes: [
      { item: "Young Aloe Vera Plant", quantity: "1" },
      { item: "Succulent Soil Mix", quantity: "2kg" },
      { item: "Slow-release Fertilizer", quantity: "150g" },
      { item: "Decorative Pot", quantity: "1" },
      { item: "Water Spray Bottle", quantity: "1" },
      { item: "Care Manual", quantity: "1" }
    ],
    benefits: [
      "Natural remedy for minor burns and skin irritations",
      "Air-purifying properties for healthier indoor environment",
      "Source of fresh aloe gel for skincare routines",
      "Low-maintenance houseplant perfect for beginners",
      "Beautiful decorative plant with striking appearance"
    ],
    careInstructions: [
      "Place in bright, indirect sunlight",
      "Allow soil to dry completely between waterings",
      "Fertilize sparingly (2-3 times per year)",
      "Repot every 2-3 years as plant grows",
      "Harvest outer leaves for gel as needed"
    ],
    stock: 18
  },
  {
    id: 4,
    slug: "turmeric-plantation-kit",
    name: "Turmeric Plantation Kit",
    plantName: "Curcuma longa",
    shortDescription: "Grow your own organic turmeric with this complete kit",
    description: "Our comprehensive Turmeric Plantation Kit provides everything you need to grow this powerful medicinal spice at home. Turmeric is celebrated for its anti-inflammatory properties and vibrant golden color. This carefully curated kit includes premium turmeric rhizomes, specialized soil mix, organic fertilizer, a decorative pot, and detailed growing instructions. Experience the satisfaction of harvesting your own organic turmeric and incorporating it into your culinary and wellness routines!",
    price: 549,
    image: "/lovable-uploads/b5c8ac5b-3215-4ec9-abc2-11b2175902d5.png",
    kitImage: "/lovable-uploads/6d832d82-c8b1-4112-8f7c-7ceaa59ede83.png",
    rating: 4.6,
    features: [
      "Complete kit for growing fresh turmeric at home",
      "High-quality turmeric rhizomes",
      "Premium soil blend formulated for root spices",
      "Organic plant nutrition for optimal growth",
      "Stylish pot with proper drainage",
      "Comprehensive growing and harvesting guide"
    ],
    includes: [
      { item: "Turmeric Rhizomes", quantity: "250g" },
      { item: "Specialized Soil Mix", quantity: "2kg" },
      { item: "Organic Fertilizer", quantity: "250g" },
      { item: "Decorative Pot", quantity: "1" },
      { item: "Water Spray Bottle", quantity: "1" },
      { item: "Detailed Growing Guide", quantity: "1" }
    ],
    benefits: [
      "Grow your own organic turmeric free from pesticides",
      "Save money compared to store-bought turmeric",
      "Educational gardening experience",
      "Enjoy the ornamental value of turmeric plants",
      "Sustainable approach to spice consumption"
    ],
    careInstructions: [
      "Place in partial sunlight with temperatures between 20-30°C",
      "Keep soil consistently moist but not waterlogged",
      "Fertilize monthly during growing season",
      "Harvest rhizomes after 8-10 months when leaves yellow",
      "Cure harvested rhizomes before storing or using"
    ],
    stock: 12
  },
  {
    id: 5,
    slug: "eucalyptus-plantation-kit",
    name: "Eucalyptus Plantation Kit",
    plantName: "Eucalyptus cinerea",
    shortDescription: "Complete kit to grow aromatic eucalyptus at home",
    description: "Our premium Eucalyptus Plantation Kit makes it easy to grow this aromatic and beneficial plant in your home garden. Eucalyptus is renowned for its refreshing scent and medicinal properties. This comprehensive kit includes everything you need: high-quality eucalyptus seeds, specialized soil mix, organic fertilizer, an elegant pot, and detailed growing instructions. Enjoy the beauty and benefits of fresh eucalyptus leaves for aromatherapy, decoration, and more!",
    price: 649,
    image: "/lovable-uploads/42ca8551-80ce-48d2-b16b-837d5fea8fc7.png",
    kitImage: "/lovable-uploads/6d832d82-c8b1-4112-8f7c-7ceaa59ede83.png",
    rating: 4.5,
    features: [
      "Complete kit for growing eucalyptus at home",
      "Premium eucalyptus seeds selected for container growth",
      "Specialized soil mix formulated for optimal drainage",
      "Slow-release organic fertilizer",
      "Modern pot with drainage system",
      "Comprehensive growing and care manual"
    ],
    includes: [
      { item: "Eucalyptus Seeds", quantity: "25 seeds" },
      { item: "Specialized Soil Mix", quantity: "3kg" },
      { item: "Organic Fertilizer", quantity: "300g" },
      { item: "Designer Pot", quantity: "1" },
      { item: "Water Spray Bottle", quantity: "1" },
      { item: "Detailed Growing Guide", quantity: "1" }
    ],
    benefits: [
      "Natural air freshener with invigorating aroma",
      "Can be used for aromatherapy and relaxation",
      "Makes beautiful cut foliage for floral arrangements",
      "May help relieve congestion when used in steam",
      "Attractive silvery-blue foliage adds visual interest"
    ],
    careInstructions: [
      "Place in full sunlight with good air circulation",
      "Allow soil to dry slightly between waterings",
      "Fertilize every 2-3 months during growing season",
      "Prune regularly to maintain desired size and shape",
      "Harvest leaves once plant is established (after 6+ months)"
    ],
    stock: 10
  },
  {
    id: 6,
    slug: "lavender-plantation-kit",
    name: "Lavender Plantation Kit",
    plantName: "Lavandula angustifolia",
    shortDescription: "Grow calming lavender at home with this complete kit",
    description: "Our elegant Lavender Plantation Kit provides everything you need to grow this beloved aromatic herb at home. Lavender is prized for its calming scent, beautiful purple blooms, and versatile uses. This carefully curated kit includes premium lavender seeds, specialized soil mix, organic plant food, a decorative pot, and comprehensive growing instructions. Bring the soothing fragrance and beauty of a lavender garden to your home with this all-inclusive growing kit!",
    price: 699,
    image: "/lovable-uploads/3595473e-20c9-4545-93f7-7f0c76b7702b.png",
    kitImage: "/lovable-uploads/6d832d82-c8b1-4112-8f7c-7ceaa59ede83.png",
    rating: 4.8,
    features: [
      "Complete kit for growing lavender at home",
      "Premium organic lavender seeds",
      "Specialized well-draining soil mix",
      "Organic plant food for optimal growth",
      "Elegant pot with proper drainage",
      "Detailed growing and harvesting guide"
    ],
    includes: [
      { item: "Organic Lavender Seeds", quantity: "50 seeds" },
      { item: "Specialized Soil Mix", quantity: "2kg" },
      { item: "Organic Plant Food", quantity: "200g" },
      { item: "Designer Ceramic Pot", quantity: "1" },
      { item: "Water Spray Bottle", quantity: "1" },
      { item: "Comprehensive Growing Guide", quantity: "1" }
    ],
    benefits: [
      "Creates calming aromatherapy for your home",
      "Attracts beneficial pollinators to your garden",
      "Can be harvested for sachets, teas, and crafts",
      "Adds beautiful color and texture to your space",
      "Known for its relaxing and sleep-promoting properties"
    ],
    careInstructions: [
      "Place in full sunlight (6+ hours daily)",
      "Water sparingly after establishment",
      "Ensure excellent drainage to prevent root rot",
      "Fertilize lightly in spring",
      "Prune after flowering to maintain shape"
    ],
    stock: 8
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getRelatedProducts = (currentProductId: number, limit: number = 4): Product[] => {
  return products
    .filter(product => product.id !== currentProductId)
    .sort(() => 0.5 - Math.random()) // Simple random selection
    .slice(0, limit);
};
