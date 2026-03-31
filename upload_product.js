import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/product.model.js';

dotenv.config();

const uploadProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'test' });
    console.log('Connected to MongoDB');

    const newProduct = new Product({
      name: "Snake Plant",
      price: 249,
      category: "69c57814135d1c2ee683f0c5", // Air-Purifying Plants
      image: "https://uddyan-bucket.s3.ap-south-1.amazonaws.com/products/placeholder-snake-plant.jpg",
      description: "A hardy, architectural plant with stiff, upright leaves known for air-purifying qualities and minimal care requirements. Scientific Name: Sansevieria trifasciata",
      vastuBenefits: [
        "Acts as a protective barrier, warding off negative energy.",
        "Absorbs toxic air pollutants, improving indoor air quality."
      ],
      careInstructions: [
        "Low to bright indirect light.",
        "Water only when soil is completely dry.",
        "Use cactus or well-draining potting mix."
      ],
      inStock: true
    });

    const savedProduct = await newProduct.save();
    console.log('Product successfully uploaded!');
    console.log(savedProduct);

    process.exit(0);
  } catch (error) {
    console.error('Error uploading product:', error);
    process.exit(1);
  }
};

uploadProduct();
