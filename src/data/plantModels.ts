
// Store information about the 3D plant models
export interface PlantModelData {
  id: string;
  name: string;
  thumbnailImage: string;
  family: string;
  genus: string;
  size: string;
  sizeValue: string;
  region: string;
  climate: string;
  sunlight: string;
  soil: string;
  usedPart: string;
  activeCompounds: string[];
  therapeuticProperties: string[];
  dosageForms: string[];
  description: string;
}

export const plantModels: PlantModelData[] = [
  {
    id: "tulsi",
    name: "Holy Basil (Tulsi)",
    thumbnailImage: "/lovable-uploads/a6c22922-5042-4203-ab65-ab4095705eb7.png",
    family: "Lamiaceae",
    genus: "Ocimum",
    size: "60 cm",
    sizeValue: "Typically grows up to 60 cm (2 feet) in height.",
    region: "Indian subcontinent",
    climate: "Warm, tropical and subtropical climates.",
    sunlight: "Full sun to partial shade.",
    soil: "Well-drained, fertile soil rich in organic matter.",
    usedPart: "Leaves",
    activeCompounds: ["Eugenol", "Rosmarinic acid", "Ursolic acid", "Luteolin"],
    therapeuticProperties: ["Adaptogenic", "Antioxidant", "Anti-inflammatory", "Immunomodulatory"],
    dosageForms: ["Tea", "Capsules", "Tinctures", "Essential oils"],
    description: "Holy Basil, also known as Tulsi, is one of the most sacred plants in India. It has been used for thousands of years in Ayurvedic medicine. The plant has a strong clove-like aroma and is considered an adaptogen, helping the body adapt to stress. It's used to treat various conditions including fever, common cold, sore throat, and respiratory disorders."
  },
  {
    id: "aloe",
    name: "Aloe Vera",
    thumbnailImage: "/lovable-uploads/df852709-71b8-487a-90c8-c5fec033ff66.png",
    family: "Asphodelaceae",
    genus: "Aloe",
    size: "100 cm",
    sizeValue: "Can grow up to 100 cm (3.3 feet) tall.",
    region: "North Africa, Southern Europe, and the Canary Islands",
    climate: "Arid and semi-arid regions with warm temperatures.",
    sunlight: "Bright, indirect sunlight to partial shade.",
    soil: "Well-draining sandy or rocky soil.",
    usedPart: "Leaf gel and latex",
    activeCompounds: ["Aloin", "Acemannan", "Saponins", "Salicylic acid"],
    therapeuticProperties: ["Anti-inflammatory", "Antimicrobial", "Skin healing", "Laxative"],
    dosageForms: ["Gel", "Juice", "Powder", "Capsules"],
    description: "Aloe vera is a succulent plant species known for its medicinal properties. The gel from the plant is widely used for treating burns, skin irritations, and wounds. It's also consumed as a dietary supplement for various health benefits including digestive health and immune support. Aloe has been used for thousands of years across many cultures, dating back to ancient Egypt."
  },
  {
    id: "neem",
    name: "Neem",
    thumbnailImage: "/lovable-uploads/68473ae1-e1d8-4bfd-a1ea-b7a0aae52977.png",
    family: "Meliaceae",
    genus: "Azadirachta",
    size: "20 meters",
    sizeValue: "Can grow up to 20 meters (65 feet) tall.",
    region: "Indian subcontinent and Southeast Asia",
    climate: "Tropical and subtropical regions.",
    sunlight: "Full sun exposure.",
    soil: "Wide range of soils, including poor, rocky, and clayey.",
    usedPart: "Leaves, bark, seeds, oil",
    activeCompounds: ["Azadirachtin", "Nimbin", "Nimbidin", "Quercetin"],
    therapeuticProperties: ["Antimicrobial", "Antiparasitic", "Anti-inflammatory", "Blood purifier"],
    dosageForms: ["Oil", "Powder", "Tablets", "Soap"],
    description: "Neem is often called 'the village pharmacy' in India due to its extensive medicinal uses. All parts of the tree, including leaves, bark, seeds, and oil, are used in traditional Ayurvedic and Unani medicine. It's known for its antibacterial, antifungal, and blood-purifying properties. Neem oil is also widely used as a natural pesticide in agriculture and for skin conditions like eczema and psoriasis."
  },
  {
    id: "garlic",
    name: "Garlic",
    thumbnailImage: "/public/lovable-uploads/18694cba-7b5f-47c3-973a-b002a7cb13d6.png",
    family: "Amaryllidaceae",
    genus: "Allium",
    size: "90 cm",
    sizeValue: "Grows up to 90 cm (3 feet) tall.",
    region: "Central Asia and northeastern Iran",
    climate: "Cool to moderate climates.",
    sunlight: "Full sun to partial shade.",
    soil: "Well-drained, fertile soil rich in organic matter.",
    usedPart: "Bulbs (cloves)",
    activeCompounds: ["Allicin", "Diallyl disulfide", "S-allyl cysteine", "Ajoene"],
    therapeuticProperties: ["Antimicrobial", "Cardiovascular health", "Immune-boosting", "Antioxidant"],
    dosageForms: ["Fresh", "Capsules", "Aged extract", "Oil"],
    description: "Garlic has been used as both food and medicine throughout history. Known for its distinctive pungent flavor and odor, it's valued for its health-promoting properties. Garlic is particularly known for supporting cardiovascular health by helping to lower blood pressure and cholesterol levels. It also has potent antimicrobial properties and supports immune function."
  },
  {
    id: "brahmi",
    name: "Brahmi",
    thumbnailImage: "/public/lovable-uploads/9c862c5b-e573-438f-99db-588dba5a0e10.png",
    family: "Plantaginaceae",
    genus: "Bacopa",
    size: "30 cm",
    sizeValue: "Grows up to 30 cm (1 foot) tall.",
    region: "Wetlands of India, Australia, Europe, Africa, Asia, and North and South America",
    climate: "Tropical and subtropical wetlands.",
    sunlight: "Partial to full sun.",
    soil: "Moist to wet, nutrient-rich soil.",
    usedPart: "Whole plant, especially leaves and stems",
    activeCompounds: ["Bacosides", "Bacopasaponins", "Alkaloids", "Flavonoids"],
    therapeuticProperties: ["Cognitive enhancer", "Adaptogenic", "Anxiolytic", "Neuroprotective"],
    dosageForms: ["Powder", "Capsules", "Syrup", "Tea"],
    description: "Brahmi (Bacopa monnieri) is a perennial, creeping herb native to the wetlands of India. It has been used in Ayurvedic medicine for centuries, particularly for enhancing memory, intellect, and concentration. Modern research supports its cognitive-enhancing effects and potential benefits for anxiety, epilepsy, and Alzheimer's disease. It's considered an adaptogen, helping the body resist stress."
  },
  {
    id: "nagkesar",
    name: "Nagkesar",
    thumbnailImage: "/public/lovable-uploads/4f5b1702-3727-4a97-8437-31ee7d3974db.png",
    family: "Calophyllaceae",
    genus: "Mesua",
    size: "30 meters",
    sizeValue: "Can grow up to 30 meters (98 feet) tall.",
    region: "Sri Lanka, India, Myanmar, Thailand, Vietnam",
    climate: "Tropical climate.",
    sunlight: "Full sun to partial shade.",
    soil: "Well-drained, fertile soil.",
    usedPart: "Flowers, seeds, bark, roots",
    activeCompounds: ["Mesuol", "Mesuagin", "Essential oils", "Tannins"],
    therapeuticProperties: ["Anti-inflammatory", "Antimicrobial", "Astringent", "Carminative"],
    dosageForms: ["Powder", "Oil", "Decoction", "Paste"],
    description: "Nagkesar, also known as Indian Rose Chestnut or Ceylon Ironwood, is a flowering tree with significant medicinal importance in Ayurveda. Its fragrant flowers and oil-rich seeds are used for various therapeutic purposes. The dried flower buds are used for treating bleeding disorders, digestive problems, skin diseases, and respiratory conditions like asthma and bronchitis."
  },
  {
    id: "kapur",
    name: "Kapur (Camphor Tree)",
    thumbnailImage: "/public/lovable-uploads/cdd8bbb6-b4ee-4be7-bcf1-7d6b8404d2a1.png",
    family: "Lauraceae",
    genus: "Cinnamomum",
    size: "30 meters",
    sizeValue: "Can grow up to 30 meters (98 feet) tall.",
    region: "East Asia, particularly Taiwan, China, Japan, Korea",
    climate: "Subtropical to mild temperate climates.",
    sunlight: "Full sun to partial shade.",
    soil: "Well-drained, fertile soil.",
    usedPart: "Wood (for camphor extraction), leaves, bark",
    activeCompounds: ["Camphor", "Cineole", "Borneol", "Safrole"],
    therapeuticProperties: ["Analgesic", "Anti-inflammatory", "Antiseptic", "Antispasmodic"],
    dosageForms: ["Oil", "Tablets", "Balm", "Inhalation"],
    description: "The camphor tree (Cinnamomum camphora) is the source of natural camphor, a white crystalline substance with a strong aroma. Camphor has been used in traditional medicine across various cultures for its medicinal properties. It's commonly used topically as a pain reliever, anti-inflammatory, and to treat skin conditions. The oil and extracts are also used for respiratory conditions, digestive issues, and as an insect repellent."
  }
];
