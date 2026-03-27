import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

// Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description, vastuBenefits, careInstructions, inStock } = req.body;
    
    // category will be passed as ObjectId
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const product = new Product({
      name,
      price,
      category,
      image,
      description,
      vastuBenefits,
      careInstructions,
      inStock
    });

    await product.save();

    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Optionally filter by category if passed as query params
    const filter = {};
    if (req.query.categoryId) {
      filter.category = req.query.categoryId;
    }

    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });
      
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, image, description, vastuBenefits, careInstructions, inStock } = req.body;
    
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ success: false, message: 'Invalid category' });
      }
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (image) product.image = image;
    if (description !== undefined) product.description = description;
    if (vastuBenefits) product.vastuBenefits = vastuBenefits;
    if (careInstructions) product.careInstructions = careInstructions;
    if (inStock !== undefined) product.inStock = inStock;

    await product.save();

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
