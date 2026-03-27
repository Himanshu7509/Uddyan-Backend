import Cart from '../models/cart.model.js';
import fs from 'fs';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    fs.appendFileSync('cart-debug.log', `[${new Date().toISOString()}] GET /api/cart for user: ${req.user._id}\n`);
    const cart = await Cart.findOne({ user: req.user._id });
    fs.appendFileSync('cart-debug.log', `[${new Date().toISOString()}] Found cart items: ${cart ? cart.items.length : 0}\n`);
    res.status(200).json({
      success: true,
      data: cart ? cart.items : [],
    });
  } catch (error) {
    fs.appendFileSync('cart-debug.log', `[${new Date().toISOString()}] Error in getCart: ${error.message}\n`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Save/update user's cart
// @route   PUT /api/cart
// @access  Private
export const saveCart = async (req, res) => {
  try {
    const { items } = req.body;
    fs.appendFileSync('cart-debug.log', `[${new Date().toISOString()}] PUT /api/cart for user: ${req.user._id}, items: ${items ? items.length : 0}\n`);
    fs.appendFileSync('cart-debug.log', `[${new Date().toISOString()}] PUT Payload: ${JSON.stringify(req.body)}\n`);

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { user: req.user._id, items: items || [] },
      { upsert: true, new: true }
    );

    fs.appendFileSync('cart-debug.log', `[${new Date().toISOString()}] Cart saved successfully: ${cart._id}\n`);
    res.status(200).json({ success: true, data: cart.items });
  } catch (error) {
    fs.appendFileSync('cart-debug.log', `[${new Date().toISOString()}] Error in saveCart: ${error.message}\n`);
    res.status(500).json({ success: false, message: error.message });
  }
};
