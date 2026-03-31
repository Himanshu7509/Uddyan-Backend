import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/product.model.js';

dotenv.config();

const categories = {
  EASY_CARE: "69c57814135d1c2ee683f0c2",
  AIR_PURIFYING: "69c57814135d1c2ee683f0c5",
  SUCCULENTS: "69c57814135d1c2ee683f0c8",
  VASTU: "69c57814135d1c2ee683f0cb",
  DECORATIVE: "69c57814135d1c2ee683f0ce",
  FLOWERING: "69c57815135d1c2ee683f0d1",
  PREMIUM: "69c57815135d1c2ee683f0d4",
};

const placeholderImage = "https://uddyan-bucket.s3.ap-south-1.amazonaws.com/products/placeholder-image.jpg";

const productsData = [
  {
    name: "Money Plant (Neon Pothos)",
    price: 249,
    category: categories.VASTU,
    image: placeholderImage,
    description: "A fast-growing vine with iconic heart-shaped leaves that thrive in various conditions, perfect for beginners. Scientific Name: Epipremnum aureum",
    vastuBenefits: ["Attracts wealth and prosperity into your home while reducing anxiety and promoting financial stability."],
    careInstructions: ["Bright, indirect light.", "Water when top inch of soil is dry.", "Use well-draining potting mix."]
  },
  {
    name: "Lucky Bamboo (Three Layer)",
    price: 299,
    category: categories.VASTU,
    image: placeholderImage,
    description: "A resilient plant grown in water with elegant stalks. The number of stalks signifies different blessings according to Vastu principles. Scientific Name: Dracaena sanderiana",
    vastuBenefits: ["Symbolizes luck, growth, and flexibility.", "Promotes calmness and balance, especially beneficial in work areas."],
    careInstructions: ["Bright, indirect light.", "Keep roots submerged in clean water.", "Change water weekly."]
  },
  {
    name: "Spider Plant",
    price: 249,
    category: categories.AIR_PURIFYING,
    image: placeholderImage,
    description: "An easy-care plant with long, arching variegated leaves that produce 'spiderettes' for easy propagation. Scientific Name: Chlorophytum comosum",
    vastuBenefits: ["Absorbs negative energy and purifies the air while promoting a sense of peace and well-being in your space."],
    careInstructions: ["Bright, indirect light.", "Water when top inch of soil feels dry.", "Use well-draining potting mix."]
  },
  {
    name: "ZZ Plant",
    price: 269,
    category: categories.EASY_CARE,
    image: placeholderImage,
    description: "Known for drought tolerance and low light growth, featuring attractive, waxy, dark green leaves. Scientific Name: Zamioculcas zamiifolia",
    vastuBenefits: ["Symbolizes resilience and perseverance.", "Attracts wealth and prosperity through its ability to thrive in challenging conditions."],
    careInstructions: ["Low to bright indirect light.", "Water sparingly only when soil is completely dry.", "Use well-draining potting mix."]
  },
  {
    name: "Snake Plant",
    price: 249,
    category: categories.AIR_PURIFYING,
    image: placeholderImage,
    description: "A hardy, architectural plant with stiff, upright leaves known for air-purifying qualities and minimal care requirements. Scientific Name: Sansevieria trifasciata",
    vastuBenefits: ["Acts as a protective barrier, warding off negative energy.", "Absorbs toxic air pollutants, improving indoor air quality."],
    careInstructions: ["Low to bright indirect light.", "Water only when soil is completely dry.", "Use cactus or well-draining potting mix."]
  },
  {
    name: "Bonsai",
    price: 549,
    category: categories.PREMIUM,
    image: placeholderImage,
    description: "A living art form, Bonsai trees are miniature versions of mature trees cultivated through careful pruning and shaping techniques.",
    vastuBenefits: ["Represents balance, harmony, and patience.", "Brings tranquility and grounding to your space."],
    careInstructions: ["Varies by species; generally bright, indirect light.", "Keep soil consistently moist but not waterlogged.", "Use specific Bonsai soil mix."]
  },
  {
    name: "Jade Plant",
    price: 249,
    category: categories.SUCCULENTS,
    image: placeholderImage,
    description: "A succulent plant with thick, glossy green leaves that resemble small coins. Popular as an indoor decorative and Vastu plant.",
    vastuBenefits: ["Considered a symbol of wealth and prosperity.", "Believed to attract positive energy and financial growth."],
    careInstructions: ["Prefers bright, indirect sunlight.", "Water sparingly and allow soil to dry between watering."]
  },
  {
    name: "Rubber Plant",
    price: 299,
    category: categories.DECORATIVE,
    image: placeholderImage,
    description: "A striking indoor plant known for its large, glossy dark green leaves that add a bold and modern touch to interiors.",
    vastuBenefits: ["Promotes stability and prosperity.", "Helps create a calm and balanced environment."],
    careInstructions: ["Thrives in bright, indirect light.", "Water moderately and allow the top soil to dry slightly before watering again."]
  },
  {
    name: "Silver Aralia",
    price: 299,
    category: categories.DECORATIVE,
    image: placeholderImage,
    description: "An elegant indoor plant with finely divided, silvery-green foliage that gives a soft, decorative, and premium look to any space.",
    vastuBenefits: ["Brings positivity and mental clarity.", "Helps create a peaceful and harmonious environment while reducing stress."],
    careInstructions: ["Thrives in bright, indirect light.", "Water moderately and allow the top soil to dry slightly before watering again."]
  },
  {
    name: "Crassula Plant",
    price: 249,
    category: categories.SUCCULENTS,
    image: placeholderImage,
    description: "A beautiful succulent plant with thick, fleshy, oval-shaped green leaves and a compact, tree-like structure. Its vibrant and glossy appearance adds a fresh, minimal, and modern aesthetic to indoor spaces.",
    vastuBenefits: ["Attracts wealth, prosperity, and positive energy.", "Commonly known as the 'money plant' in Vastu, it is believed to bring financial growth and good luck when placed near entrances or in the southeast direction."],
    careInstructions: ["Thrives in bright, indirect sunlight or partial direct sunlight.", "Water sparingly, allowing the soil to dry completely between watering.", "Requires well-draining soil and minimal maintenance, making it perfect for busy professionals and beginners."]
  },
  {
    name: "Coleus Plant",
    price: 249,
    category: categories.DECORATIVE,
    image: placeholderImage,
    description: "A highly decorative plant known for its stunning multicolored leaves in shades of green, red, pink, yellow, and purple. The soft, textured foliage and bold patterns make it a perfect choice for adding a pop of color to modern interiors.",
    vastuBenefits: ["Brings positivity and vibrant energy to living spaces.", "Its colorful foliage is believed to uplift mood and create a lively, welcoming environment.", "Ideal for enhancing creativity and reducing stress when placed indoors or in balconies."],
    careInstructions: ["Thrives in bright, indirect light; too much direct sunlight can fade leaf colors.", "Keep the soil consistently moist but not waterlogged.", "Prefers well-draining soil and benefits from occasional pruning to maintain a bushy, compact shape."]
  },
  {
    name: "Poinsettia",
    price: 249,
    category: categories.FLOWERING,
    image: placeholderImage,
    description: "A stunning ornamental plant known for its bright red, pink, or white bracts (often mistaken for flowers) surrounding small yellow blooms. Its bold and elegant appearance makes it a perfect centerpiece for modern interiors and festive décor.",
    vastuBenefits: ["Symbolizes positivity, celebration, and good fortune.", "Its vibrant red foliage is believed to attract positive energy and create a warm, festive atmosphere in homes and offices."],
    careInstructions: ["Thrives in bright, indirect light.", "Keep the soil slightly moist but avoid overwatering.", "Protect from cold drafts and sudden temperature changes.", "Prefers well-draining soil and moderate indoor humidity for healthy growth."]
  },
  {
    name: "Lucky Bamboo",
    price: 249,
    category: categories.VASTU,
    image: placeholderImage,
    description: "A resilient plant grown in water with elegant stalks. The number of stalks signifies different blessings according to Vastu principles. Scientific Name: Dracaena sanderiana",
    vastuBenefits: ["Symbolizes luck, growth, and flexibility.", "Promotes calmness and balance, especially beneficial in work areas."],
    careInstructions: ["Bright, indirect light.", "Keep roots submerged in clean water.", "Change water weekly."]
  },
  {
    name: "Cactus (Crested Peruvian Apple)",
    price: 369,
    category: categories.SUCCULENTS,
    image: placeholderImage,
    description: "A hardy desert plant known for its unique shapes and low maintenance nature, perfect for modern decor.",
    vastuBenefits: ["Believed to absorb negative energy when placed correctly.", "Symbolizes endurance and protection."],
    careInstructions: ["Needs bright sunlight and minimal watering.", "Allow soil to dry completely between watering."]
  },
  {
    name: "Cactus (Lady Finger)",
    price: 369,
    category: categories.SUCCULENTS,
    image: placeholderImage,
    description: "A hardy desert plant known for its unique shapes and low maintenance nature, perfect for modern decor.",
    vastuBenefits: ["Believed to absorb negative energy when placed correctly.", "Symbolizes endurance and protection."],
    careInstructions: ["Needs bright sunlight and minimal watering.", "Allow soil to dry completely between watering."]
  },
  {
    name: "Cactus (Easter Lily)",
    price: 369,
    category: categories.SUCCULENTS,
    image: placeholderImage,
    description: "A hardy desert plant known for its unique shapes and low maintenance nature, perfect for modern decor.",
    vastuBenefits: ["Believed to absorb negative energy when placed correctly.", "Symbolizes endurance and protection."],
    careInstructions: ["Needs bright sunlight and minimal watering.", "Allow soil to dry completely between watering."]
  },
  {
    name: "Peace Lily",
    price: 329,
    category: categories.AIR_PURIFYING,
    image: placeholderImage,
    description: "An elegant indoor plant with glossy leaves and graceful white blooms, widely known for its air-purifying qualities.",
    vastuBenefits: ["Symbolizes peace and purity.", "Helps create a calm and harmonious indoor environment."],
    careInstructions: ["Grows well in low to medium light.", "Water regularly and keep soil slightly moist."]
  },
  {
    name: "China Doll",
    price: 399,
    category: categories.DECORATIVE,
    image: placeholderImage,
    description: "A graceful indoor plant known for its fine, feathery foliage made up of many small, glossy green leaflets. It has a light, airy, and slightly tree-like structure that gives a premium and elegant look to modern interiors. Perfect for adding a natural, sophisticated touch to homes and offices.",
    vastuBenefits: ["Promotes peace, positivity, and harmonious energy in the home.", "Its lush green appearance is believed to reduce stress and create a calm, refreshing indoor environment.", "Ideal for living rooms and workspaces to enhance focus and well-being."],
    careInstructions: ["Thrives in bright, indirect light.", "Keep the soil slightly moist but avoid overwatering or letting it dry out completely.", "Prefers well-draining soil and stable indoor conditions—avoid sudden temperature changes and drafts.", "Regular light pruning helps maintain its shape and encourages bushy growth."]
  },
  {
    name: "Money Plant (Golden Pothos)",
    price: 249,
    category: categories.VASTU,
    image: placeholderImage,
    description: "A popular indoor plant known for its heart-shaped green leaves with beautiful golden-yellow variegation. Its trailing or climbing vines make it perfect for hanging baskets, shelves, or table décor, adding a fresh and vibrant touch to any space.",
    vastuBenefits: ["Considered a symbol of wealth, prosperity, and good luck.", "Placing it in the southeast direction is believed to attract financial growth and positive energy.", "It also helps reduce stress and promotes a harmonious environment."],
    careInstructions: ["Thrives in low to bright indirect light, making it highly versatile for indoor settings.", "Water when the top soil feels dry; avoid overwatering.", "Grows well in both soil and water, and requires minimal maintenance—ideal for beginners and busy lifestyles."]
  },
  {
    name: "Devil’s Backbone Plant",
    price: 249,
    category: categories.DECORATIVE,
    image: placeholderImage,
    description: "A distinctive ornamental plant known for its zig-zag shaped stems and lush green leaves. Some varieties also produce small pink or white flowers along the stems. Its unusual structure makes it a standout piece, perfect for adding a modern and artistic touch to interiors.",
    vastuBenefits: ["Believed to bring protection and positive energy to the home.", "Its unique zig-zag growth pattern symbolizes resilience and adaptability, helping create a balanced and stress-free environment."],
    careInstructions: ["Thrives in bright, indirect light but can tolerate some direct sunlight.", "Water moderately, allowing the soil to dry slightly between watering.", "Prefers well-draining soil and minimal maintenance.", "Avoid overwatering, as it is somewhat drought-tolerant."]
  },
  {
    name: "Boston Fern",
    price: 249,
    category: categories.AIR_PURIFYING,
    image: placeholderImage,
    description: "A classic indoor plant admired for its lush, arching fronds filled with soft, feathery leaflets. Its rich green foliage adds a natural, elegant, and slightly tropical feel to interiors, making it perfect for hanging baskets or elevated planters.",
    vastuBenefits: ["Promotes a calming and refreshing environment by reducing stress and enhancing positivity.", "Known for its air-purifying qualities, it helps create a healthier and more peaceful indoor space.", "Ideal for living rooms and balconies."],
    careInstructions: ["Thrives in bright, indirect light and high humidity.", "Keep the soil consistently moist but not soggy.", "Prefers well-draining soil and benefits from occasional misting to maintain its freshness.", "Avoid direct sunlight and dry air for best growth."]
  },
  {
    name: "Money Plant (Marble Queen Pothos)",
    price: 249,
    category: categories.VASTU,
    image: placeholderImage,
    description: "A stunning variety of pothos known for its creamy white and green marbled leaves. The elegant variegation gives it a premium, sophisticated look, perfect for modern interiors. Its trailing vines make it ideal for shelves, desks, or hanging planters.",
    vastuBenefits: ["Believed to attract prosperity, harmony, and positive energy.", "Its balanced green and white variegation symbolizes peace and growth, making it ideal for homes and offices.", "Best placed in the southeast direction for financial well-being."],
    careInstructions: ["Thrives in bright, indirect light to maintain its variegation (low light may reduce the white patterns).", "Water when the top soil feels dry and avoid overwatering.", "Prefers well-draining soil and occasional pruning for fuller growth.", "Easy to maintain and beginner-friendly."]
  },
  {
    name: "Adenium",
    price: 299,
    category: categories.FLOWERING,
    image: placeholderImage,
    description: "A beautiful flowering succulent also known as Desert Rose, admired for its thick trunk and colorful blooms.",
    vastuBenefits: ["Represents strength and positive growth.", "Adds vibrant energy to living spaces."],
    careInstructions: ["Requires bright sunlight and well-draining soil.", "Water sparingly to prevent root rot."]
  },
  {
    name: "Christmas Tree (Araucaria)",
    price: 329,
    category: categories.FLOWERING,
    image: placeholderImage,
    description: "A decorative evergreen plant with symmetrical branches, commonly used as a miniature indoor Christmas tree.",
    vastuBenefits: ["Symbolizes joy, growth, and positive festive energy.", "Enhances harmony and happiness in the home."],
    careInstructions: ["Prefers bright indirect light.", "Water moderately and keep soil slightly moist."]
  }
];

const uploadBulkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'test' });
    console.log('Connected to MongoDB');

    let count = 0;
    for (const data of productsData) {
      // Use findOneAndUpdate with upsert to avoid creating duplicates based on name
      await Product.findOneAndUpdate(
        { name: data.name },
        { $set: data },
        { upsert: true, new: true }
      );
      count++;
      console.log(`Upserted: ${data.name}`);
    }

    console.log(`Successfully processed ${count} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error uploading bulk products:', error);
    process.exit(1);
  }
};

uploadBulkProducts();
