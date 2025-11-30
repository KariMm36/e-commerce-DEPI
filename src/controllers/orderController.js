const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const orderController = {
  getAllOrders: (req, res) => {
    const { userId, status } = req.query;
    let orders = Order.getAll();

    if (userId) {
      orders = orders.filter(o => o.userId === parseInt(userId));
    }
    if (status) {
      orders = orders.filter(o => o.status === status);
    }

    res.json({ success: true, count: orders.length, data: orders });
  },

  getOrder: (req, res) => {
    const order = Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  },

  createOrder: (req, res) => {
    const { userId, items } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'UserId is required' });
    }

    if (!User.findById(userId)) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Items are required' });
    }

    // Calculate total and validate stock
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      total += product.price * item.quantity;

      // Reduce stock
      Product.updateStock(item.productId, -item.quantity);
    }

    const newOrder = Order.create({
      userId,
      items: orderItems,
      total: parseFloat(total.toFixed(2))
    });

    // Clear cart after order
    Cart.clear(userId);

    res.status(201).json({ success: true, message: 'Order created successfully', data: newOrder });
  },

  updateOrder: (req, res) => {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updatedOrder = Order.update(req.params.id, { status });
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: updatedOrder });
  },

  deleteOrder: (req, res) => {
    const deleted = Order.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  }
};

module.exports = orderController;