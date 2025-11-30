const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const cartController = {
  getCart: (req, res) => {
    const { userId } = req.params;

    // Check if user exists
    if (!User.findById(userId)) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cart = Cart.findByUserId(userId);
    if (!cart) {
      cart = Cart.create(userId);
    }

    // Populate cart with product details
    const cartWithDetails = {
      ...cart,
      items: cart.items.map(item => {
        const product = Product.findById(item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          product: product || null,
          subtotal: product ? product.price * item.quantity : 0
        };
      })
    };

    const total = cartWithDetails.items.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ success: true, data: { ...cartWithDetails, total: parseFloat(total.toFixed(2)) } });
  },

  addToCart: (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    // Validate user
    if (!User.findById(userId)) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Validate input
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Valid productId and quantity required' });
    }

    // Validate product
    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: `Only ${product.stock} items available in stock` });
    }

    const cart = Cart.addItem(userId, productId, quantity);
    res.json({ success: true, message: 'Item added to cart', data: cart });
  },

  updateCartItem: (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!User.findById(userId)) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ success: false, message: 'Valid quantity required' });
    }

    const cart = Cart.updateItem(userId, productId, quantity);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart or item not found' });
    }

    res.json({ success: true, message: 'Cart updated', data: cart });
  },

  removeFromCart: (req, res) => {
    const { userId, productId } = req.params;

    if (!User.findById(userId)) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cart = Cart.removeItem(userId, productId);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.json({ success: true, message: 'Item removed from cart', data: cart });
  },

  clearCart: (req, res) => {
    const { userId } = req.params;

    if (!User.findById(userId)) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cart = Cart.clear(userId);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.json({ success: true, message: 'Cart cleared', data: cart });
  }
};

module.exports = cartController;